/**
 * ===========================================================================
 * Prabhav Construction — form receiver
 * ===========================================================================
 * Receives every form submission from the static website, verifies the
 * reCAPTCHA v3 token, appends a row to a Google Sheet, stores any uploaded CV
 * in Drive, and sends notification + acknowledgement e-mails.
 *
 * Setup lives in README.md, next to this file. In short:
 *   1. Create a Google Sheet, then Extensions → Apps Script, and paste this in.
 *   2. Project Settings → Script Properties, add the keys listed in CONFIG below.
 *   3. Deploy → New deployment → Web app
 *        Execute as:        Me
 *        Who has access:    Anyone
 *   4. Copy the /exec URL into NEXT_PUBLIC_APPS_SCRIPT_URL in .env.local.
 *
 * Re-deploy ("Manage deployments" → edit → New version) after every edit,
 * otherwise the live URL keeps serving the old code.
 * ===========================================================================
 */

/** Script Properties keys — set these in the Apps Script editor, not here. */
var CONFIG = {
  // Required
  RECAPTCHA_SECRET_KEY: 'RECAPTCHA_SECRET_KEY', // reCAPTCHA v3 secret
  NOTIFY_EMAILS: 'NOTIFY_EMAILS', // comma-separated recipients for new leads
  CAREERS_EMAILS: 'CAREERS_EMAILS', // comma-separated recipients for job applications
  // Optional
  SPREADSHEET_ID: 'SPREADSHEET_ID', // omit when bound to a sheet
  CV_FOLDER_ID: 'CV_FOLDER_ID', // Drive folder for CVs; created if absent
  MIN_RECAPTCHA_SCORE: 'MIN_RECAPTCHA_SCORE', // default 0.5
  ALLOWED_ORIGINS: 'ALLOWED_ORIGINS', // comma-separated, informational only
  SEND_ACKNOWLEDGEMENT: 'SEND_ACKNOWLEDGEMENT', // "false" to disable auto-reply
};

var COMPANY = {
  name: 'Prabhav Construction',
  phone: '+91 98200 00000',
  email: 'sales@prabhavconstruction.com',
  website: 'https://prabhavconstruction.com',
};

/** One tab per form type, each with its own column order. */
var SHEETS = {
  enquiry: {
    name: 'Enquiries',
    headers: [
      'Timestamp', 'Form', 'Name', 'Mobile', 'Email', 'Project', 'Interest',
      'Message', 'Source', 'Page URL', 'Referrer', 'reCAPTCHA Score', 'Consent',
    ],
  },
  contact: {
    name: 'Contact Form',
    headers: [
      'Timestamp', 'Form', 'Name', 'Mobile', 'Email', 'Project', 'Interest',
      'Message', 'Source', 'Page URL', 'Referrer', 'reCAPTCHA Score', 'Consent',
    ],
  },
  career: {
    name: 'Career Applications',
    headers: [
      'Timestamp', 'Form', 'Name', 'Mobile', 'Email', 'Role', 'Experience',
      'CV Link', 'Message', 'Source', 'Page URL', 'reCAPTCHA Score', 'Consent',
    ],
  },
};

/* ------------------------------------------------------------------------ */
/* Entry points                                                              */
/* ------------------------------------------------------------------------ */

function doGet() {
  return jsonResponse({
    ok: true,
    message: 'Prabhav Construction form receiver is running.',
  });
}

function doPost(e) {
  try {
    var payload = parseRequest(e);

    if (!payload) {
      return jsonResponse({ ok: false, message: 'Empty or unreadable request.' });
    }

    // Honeypot — a real visitor never fills a hidden field.
    if (payload.website) {
      return jsonResponse({ ok: true, message: 'Thank you.' });
    }

    var name = trimmed(payload.name);
    var mobile = digitsOnly(payload.mobile);

    if (!name) {
      return jsonResponse({ ok: false, message: 'Please enter your full name.' });
    }
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return jsonResponse({
        ok: false,
        message: 'Please enter a valid 10-digit Indian mobile number.',
      });
    }
    if (payload.email && !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(payload.email)) {
      return jsonResponse({ ok: false, message: 'Please enter a valid e-mail address.' });
    }

    var captcha = verifyRecaptcha(payload.recaptchaToken);
    if (!captcha.allowed) {
      return jsonResponse({
        ok: false,
        message:
          'We could not verify that this submission is genuine. Please reload the page and try again, or call us directly.',
      });
    }

    var formType = SHEETS[payload.formType] ? payload.formType : 'enquiry';
    var cvLink = '';

    if (formType === 'career' && payload.cv && payload.cv.data) {
      cvLink = saveCv(payload.cv, name);
    }

    var record = buildRecord(formType, payload, name, mobile, captcha.score, cvLink);
    appendRow(formType, record);
    sendNotification(formType, record);

    if (payload.email && getProperty(CONFIG.SEND_ACKNOWLEDGEMENT) !== 'false') {
      sendAcknowledgement(formType, record);
    }

    return jsonResponse({
      ok: true,
      message:
        formType === 'career'
          ? 'Thank you — your application has reached our HR team. If your profile matches an open role, we will be in touch within seven working days.'
          : 'Thank you — your enquiry has reached our sales team. We will call you back within one working day.',
    });
  } catch (error) {
    // Log the failure so a lead is never silently lost.
    console.error('doPost failed: ' + error + '\n' + (error && error.stack));
    logFailure(e, error);
    return jsonResponse({
      ok: false,
      message:
        'Something went wrong at our end. Please try again, or call us on ' +
        COMPANY.phone + '.',
    });
  }
}

/* ------------------------------------------------------------------------ */
/* Request handling                                                          */
/* ------------------------------------------------------------------------ */

/** The site posts JSON as text/plain; form-encoded posts are handled too. */
function parseRequest(e) {
  if (!e) return null;

  if (e.postData && e.postData.contents) {
    var body = e.postData.contents;
    try {
      return JSON.parse(body);
    } catch (ignored) {
      // Fall through to the parameter-based parse below.
    }
  }

  if (e.parameter && Object.keys(e.parameter).length > 0) {
    if (e.parameter.payload) {
      try {
        return JSON.parse(e.parameter.payload);
      } catch (ignored) {
        return null;
      }
    }
    return e.parameter;
  }

  return null;
}

/* ------------------------------------------------------------------------ */
/* reCAPTCHA v3                                                              */
/* ------------------------------------------------------------------------ */

/**
 * Returns { allowed, score }. When no secret is configured the check is
 * skipped entirely — a misconfigured captcha must not block genuine leads.
 */
function verifyRecaptcha(token) {
  var secret = getProperty(CONFIG.RECAPTCHA_SECRET_KEY);

  if (!secret) return { allowed: true, score: 'not configured' };
  if (!token) return { allowed: true, score: 'no token' };

  try {
    var response = UrlFetchApp.fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'post',
        payload: { secret: secret, response: token },
        muteHttpExceptions: true,
      }
    );

    var result = JSON.parse(response.getContentText());
    var minScore = Number(getProperty(CONFIG.MIN_RECAPTCHA_SCORE) || 0.5);

    if (!result.success) {
      return { allowed: false, score: 'failed: ' + (result['error-codes'] || []).join(', ') };
    }

    var score = typeof result.score === 'number' ? result.score : 1;
    return { allowed: score >= minScore, score: score };
  } catch (error) {
    // Google unreachable — let the submission through rather than lose the lead.
    console.warn('reCAPTCHA verification failed: ' + error);
    return { allowed: true, score: 'verification error' };
  }
}

/* ------------------------------------------------------------------------ */
/* Sheet storage                                                             */
/* ------------------------------------------------------------------------ */

function getSpreadsheet() {
  var id = getProperty(CONFIG.SPREADSHEET_ID);
  if (id) return SpreadsheetApp.openById(id);

  var active = SpreadsheetApp.getActiveSpreadsheet();
  if (!active) {
    throw new Error(
      'No spreadsheet found. Bind this script to a Sheet, or set the SPREADSHEET_ID script property.'
    );
  }
  return active;
}

function getSheet(formType) {
  var definition = SHEETS[formType];
  var spreadsheet = getSpreadsheet();
  var sheet = spreadsheet.getSheetByName(definition.name);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(definition.name);
  }

  // Write (or repair) the header row and freeze it.
  if (sheet.getLastRow() === 0) {
    sheet
      .getRange(1, 1, 1, definition.headers.length)
      .setValues([definition.headers])
      .setFontWeight('bold')
      .setBackground('#1a1613')
      .setFontColor('#faf6f0');
    sheet.setFrozenRows(1);
    sheet.setColumnWidths(1, definition.headers.length, 160);
  }

  return sheet;
}

function buildRecord(formType, payload, name, mobile, score, cvLink) {
  var extra = payload.extra || {};

  return {
    formType: formType,
    timestamp: new Date(),
    formTitle: trimmed(payload.formTitle) || 'Enquiry',
    name: name,
    mobile: "'+91 " + mobile, // leading quote keeps Sheets from mangling the number
    mobilePlain: '+91' + mobile,
    email: trimmed(payload.email),
    project: trimmed(payload.project),
    interest: trimmed(extra.interest),
    role: trimmed(payload.role),
    experience: trimmed(payload.experience),
    cvLink: cvLink,
    message: trimmed(payload.message),
    source: trimmed(extra.source) || trimmed(payload.formTitle),
    pageUrl: trimmed(payload.pageUrl),
    referrer: trimmed(payload.referrer),
    score: score,
    consent: trimmed(extra.consent) || 'Yes',
  };
}

function appendRow(formType, record) {
  var sheet = getSheet(formType);

  var row =
    formType === 'career'
      ? [
          record.timestamp, record.formTitle, record.name, record.mobile,
          record.email, record.role, record.experience, record.cvLink,
          record.message, record.source, record.pageUrl, record.score,
          record.consent,
        ]
      : [
          record.timestamp, record.formTitle, record.name, record.mobile,
          record.email, record.project, record.interest, record.message,
          record.source, record.pageUrl, record.referrer, record.score,
          record.consent,
        ];

  sheet.appendRow(row);
}

/* ------------------------------------------------------------------------ */
/* CV storage                                                                */
/* ------------------------------------------------------------------------ */

var MAX_CV_BYTES = 5 * 1024 * 1024;

function saveCv(cv, applicantName) {
  try {
    var bytes = Utilities.base64Decode(cv.data);
    if (bytes.length > MAX_CV_BYTES) return 'Rejected — larger than 5 MB';

    var extension = (cv.filename || '').split('.').pop().toLowerCase();
    if (['pdf', 'doc', 'docx'].indexOf(extension) === -1) {
      return 'Rejected — unsupported file type';
    }

    var safeName =
      applicantName.replace(/[^\w\s.-]/g, '').replace(/\s+/g, '-') || 'applicant';
    var stamp = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyyMMdd-HHmmss');

    var blob = Utilities.newBlob(
      bytes,
      cv.mimeType || 'application/octet-stream',
      safeName + '-' + stamp + '.' + extension
    );

    var file = getCvFolder().createFile(blob);
    // Anyone in the company with the link can open it; not publicly listed.
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    return file.getUrl();
  } catch (error) {
    console.error('CV upload failed: ' + error);
    return 'Upload failed — ask the applicant to e-mail their CV';
  }
}

function getCvFolder() {
  var folderId = getProperty(CONFIG.CV_FOLDER_ID);

  if (folderId) {
    try {
      return DriveApp.getFolderById(folderId);
    } catch (ignored) {
      // Fall through and create/find by name.
    }
  }

  var folderName = 'Prabhav — Career CVs';
  var existing = DriveApp.getFoldersByName(folderName);
  if (existing.hasNext()) return existing.next();

  var created = DriveApp.createFolder(folderName);
  PropertiesService.getScriptProperties().setProperty(
    CONFIG.CV_FOLDER_ID,
    created.getId()
  );
  return created;
}

/* ------------------------------------------------------------------------ */
/* E-mail                                                                    */
/* ------------------------------------------------------------------------ */

function sendNotification(formType, record) {
  var recipients =
    formType === 'career'
      ? getProperty(CONFIG.CAREERS_EMAILS) || getProperty(CONFIG.NOTIFY_EMAILS)
      : getProperty(CONFIG.NOTIFY_EMAILS);

  if (!recipients) {
    console.warn('No notification recipients configured — skipping e-mail.');
    return;
  }

  var subject =
    formType === 'career'
      ? '[Career] ' + record.name + ' — ' + (record.role || 'General application')
      : '[Lead] ' + record.name + (record.project ? ' — ' + record.project : '') +
        ' (' + record.formTitle + ')';

  var rows =
    formType === 'career'
      ? [
          ['Name', record.name],
          ['Mobile', record.mobilePlain],
          ['E-mail', record.email],
          ['Role applied for', record.role],
          ['Experience', record.experience],
          ['CV', record.cvLink],
          ['Message', record.message],
          ['Submitted from', record.pageUrl],
          ['reCAPTCHA score', String(record.score)],
        ]
      : [
          ['Name', record.name],
          ['Mobile', record.mobilePlain],
          ['E-mail', record.email],
          ['Project', record.project],
          ['Enquiring about', record.interest],
          ['Message', record.message],
          ['CTA / source', record.source],
          ['Submitted from', record.pageUrl],
          ['Referrer', record.referrer],
          ['reCAPTCHA score', String(record.score)],
        ];

  MailApp.sendEmail({
    to: recipients,
    replyTo: record.email || undefined,
    subject: subject,
    htmlBody: notificationHtml(formType, record, rows),
    name: COMPANY.name + ' Website',
  });
}

function notificationHtml(formType, record, rows) {
  var body = rows
    .filter(function (row) {
      return row[1];
    })
    .map(function (row) {
      var value = escapeHtml(String(row[1]));
      if (row[0] === 'CV' && /^https?:\/\//.test(String(row[1]))) {
        value = '<a href="' + value + '">Open CV</a>';
      }
      return (
        '<tr>' +
        '<td style="padding:9px 14px;border-bottom:1px solid #e7ddcd;color:#6b6259;' +
        'font-size:13px;white-space:nowrap;vertical-align:top;">' + escapeHtml(row[0]) + '</td>' +
        '<td style="padding:9px 14px;border-bottom:1px solid #e7ddcd;color:#1a1613;' +
        'font-size:14px;">' + value + '</td>' +
        '</tr>'
      );
    })
    .join('');

  return (
    '<div style="font-family:Arial,Helvetica,sans-serif;background:#faf6f0;padding:24px;">' +
    '<div style="max-width:620px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;' +
    'border:1px solid #e7ddcd;">' +
    '<div style="background:#1a1613;padding:20px 24px;">' +
    '<p style="margin:0;color:#e4c089;font-size:11px;letter-spacing:2px;text-transform:uppercase;">' +
    (formType === 'career' ? 'New job application' : 'New website enquiry') +
    '</p>' +
    '<p style="margin:6px 0 0;color:#faf6f0;font-size:20px;">' + escapeHtml(record.formTitle) + '</p>' +
    '</div>' +
    '<table style="width:100%;border-collapse:collapse;">' + body + '</table>' +
    '<div style="padding:16px 24px;background:#faf6f0;color:#6b6259;font-size:12px;">' +
    'Received ' +
    Utilities.formatDate(record.timestamp, 'Asia/Kolkata', 'd MMM yyyy, h:mm a') +
    ' IST · logged to the ' + COMPANY.name + ' leads sheet.' +
    '</div>' +
    '</div></div>'
  );
}

function sendAcknowledgement(formType, record) {
  var isCareer = formType === 'career';

  var subject = isCareer
    ? 'We have received your application — ' + COMPANY.name
    : 'Thank you for your enquiry — ' + COMPANY.name;

  var intro = isCareer
    ? 'Thank you for applying to ' + COMPANY.name + '. Your application has reached our HR team, and every application is read by a person. If your profile matches an open role, we will be in touch within seven working days.'
    : 'Thank you for reaching out to ' + COMPANY.name + '. Your enquiry has reached our sales team and a member of the team will call you back within one working day.';

  try {
    MailApp.sendEmail({
      to: record.email,
      subject: subject,
      name: COMPANY.name,
      htmlBody:
        '<div style="font-family:Arial,Helvetica,sans-serif;background:#faf6f0;padding:24px;">' +
        '<div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;' +
        'border:1px solid #e7ddcd;overflow:hidden;">' +
        '<div style="background:#1a1613;padding:26px 28px;">' +
        '<p style="margin:0;color:#faf6f0;font-size:22px;">' + COMPANY.name + '</p>' +
        '<p style="margin:6px 0 0;color:#e4c089;font-size:12px;letter-spacing:2px;' +
        'text-transform:uppercase;">Since 2000</p>' +
        '</div>' +
        '<div style="padding:28px;color:#2c2521;font-size:15px;line-height:1.65;">' +
        '<p style="margin:0 0 16px;">Dear ' + escapeHtml(record.name) + ',</p>' +
        '<p style="margin:0 0 16px;">' + intro + '</p>' +
        (record.project
          ? '<p style="margin:0 0 16px;color:#6b6259;font-size:14px;">Your enquiry relates to: <strong style="color:#1a1613;">' +
            escapeHtml(record.project) + '</strong></p>'
          : '') +
        '<p style="margin:0 0 16px;">If it is urgent, call us on <a href="tel:' +
        COMPANY.phone.replace(/\s/g, '') + '" style="color:#b07c37;">' + COMPANY.phone +
        '</a> between 10:00 AM and 7:00 PM, Monday to Saturday.</p>' +
        '<p style="margin:24px 0 0;color:#6b6259;font-size:14px;">Warm regards,<br>' +
        'Team ' + COMPANY.name + '<br>' +
        '<a href="' + COMPANY.website + '" style="color:#b07c37;">' + COMPANY.website + '</a></p>' +
        '</div>' +
        '<div style="padding:14px 28px;background:#faf6f0;color:#6b6259;font-size:11px;">' +
        'This is an automated acknowledgement. Please do not reply to this message.' +
        '</div>' +
        '</div></div>',
    });
  } catch (error) {
    // A bounced acknowledgement must never fail the submission itself.
    console.warn('Acknowledgement e-mail failed: ' + error);
  }
}

/* ------------------------------------------------------------------------ */
/* Helpers                                                                   */
/* ------------------------------------------------------------------------ */

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function getProperty(key) {
  return PropertiesService.getScriptProperties().getProperty(key);
}

function trimmed(value) {
  return value === null || value === undefined ? '' : String(value).trim();
}

function digitsOnly(value) {
  var digits = trimmed(value).replace(/\D/g, '');
  if (digits.length === 12 && digits.indexOf('91') === 0) return digits.slice(2);
  if (digits.length === 11 && digits.charAt(0) === '0') return digits.slice(1);
  return digits;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Keeps a raw copy of anything that failed, so no lead is lost. */
function logFailure(e, error) {
  try {
    var spreadsheet = getSpreadsheet();
    var sheet = spreadsheet.getSheetByName('Errors');
    if (!sheet) {
      sheet = spreadsheet.insertSheet('Errors');
      sheet.appendRow(['Timestamp', 'Error', 'Raw payload']);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([
      new Date(),
      String(error),
      e && e.postData ? String(e.postData.contents).slice(0, 40000) : '(no body)',
    ]);
  } catch (ignored) {
    // Nothing more we can do here.
  }
}

/* ------------------------------------------------------------------------ */
/* Run this once from the editor to confirm everything is wired up.          */
/* ------------------------------------------------------------------------ */

function testSubmission() {
  var response = doPost({
    postData: {
      contents: JSON.stringify({
        formType: 'enquiry',
        formTitle: 'Test — Schedule a Site Visit',
        name: 'Test Visitor',
        mobile: '9820000000',
        email: '',
        project: 'Codename Crown',
        message: 'This is a test submission from the Apps Script editor.',
        extra: { interest: 'Buying a home', source: 'Manual test', consent: 'Yes' },
        pageUrl: COMPANY.website,
        submittedAt: new Date().toISOString(),
      }),
    },
  });

  console.log(response.getContent());
}
