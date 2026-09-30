// Prabhav Construction: lead + career capture.
// Deploy as Web app → execute as Me → access Anyone. Put the /exec URL in GSCRIPT_WEBHOOK_URL.
// Script properties: SHARED_SECRET (required), NOTIFY_EMAIL (optional), RESUME_FOLDER_ID (for careers).

const HEADERS = {
  Leads: ["timestamp","fullName","mobile","email","project","unit","intent","message","source",
          "utm_source","utm_medium","utm_campaign","utm_term","utm_content","gclid","fbclid",
          "landingPage","referrer","recaptchaScore","quality","duplicate"],
  Careers: ["timestamp","fullName","mobile","email","position","experience","currentLocation",
          "resumeUrl","message","source","recaptchaScore","quality","duplicate"],
};
// Keep "mobile" as the 3rd column in every tab; isDuplicate() relies on it.

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const body = JSON.parse(e.postData.contents);
    const props = PropertiesService.getScriptProperties();
    if (body.secret !== props.getProperty("SHARED_SECRET")) return json({ ok: false, error: "unauthorized" });

    const sheetName = HEADERS[body.sheet] ? body.sheet : "Leads";
    const sheet = getSheet(sheetName);
    const data = body.data || {};

    if (sheetName === "Careers" && data.resumeBase64) data.resumeUrl = saveResume(data, props.getProperty("RESUME_FOLDER_ID"));
    data.duplicate = isDuplicate(sheet, data.mobile) ? "yes" : "";

    sheet.appendRow(HEADERS[sheetName].map((h) => (h === "mobile" ? "'" + (data[h] || "") : data[h] ?? "")));

    const notify = props.getProperty("NOTIFY_EMAIL");
    if (notify) MailApp.sendEmail(notify, `New ${sheetName} enquiry: ${data.fullName}`,
      `${data.fullName}\n${data.mobile}\n${data.project || data.position || ""}\n${data.source}`);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function getSheet(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(name) || ss.insertSheet(name);
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS[name]);
  return sheet;
}

function isDuplicate(sheet, mobile) {
  const last = sheet.getLastRow();
  if (last < 2 || !mobile) return false;
  const start = Math.max(2, last - 200);
  const rows = sheet.getRange(start, 1, last - start + 1, 3).getValues();
  const dayAgo = Date.now() - 24 * 60 * 60 * 1000;
  return rows.some((r) => String(r[2]).replace("'", "") === mobile && new Date(r[0]).getTime() > dayAgo);
}

function saveResume(data, folderId) {
  const blob = Utilities.newBlob(Utilities.base64Decode(data.resumeBase64), data.resumeMime, data.resumeName);
  const file = DriveApp.getFolderById(folderId).createFile(blob);
  delete data.resumeBase64;
  return file.getUrl();
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
