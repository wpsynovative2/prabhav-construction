# Form backend — Google Apps Script

Every form on the website posts directly to a Google Apps Script Web App. The
script verifies reCAPTCHA, writes a row to a Google Sheet, stores CVs in Drive,
and sends the notification and acknowledgement e-mails. There is no server to
run and nothing to pay for.

---

## 1. Create the Google Sheet

1. Go to <https://sheets.new> and name the file, e.g. **Prabhav — Website Leads**.
2. You do not need to create any tabs. The script creates and formats these on
   first use:
   - `Enquiries` — every popup / CTA enquiry
   - `Contact Form` — the contact page form
   - `Career Applications` — job applications, with a link to each CV
   - `Errors` — raw payloads of any submission that failed, so no lead is lost

## 2. Add the script

1. In that Sheet: **Extensions → Apps Script**.
2. Delete the placeholder `Code.gs` content and paste in the contents of
   [`Code.gs`](./Code.gs).
3. Rename the project to something recognisable, e.g. *Prabhav Form Receiver*.
4. Save.

## 3. Get reCAPTCHA v3 keys

1. Go to <https://www.google.com/recaptcha/admin/create>.
2. Label: *Prabhav Construction*. Type: **reCAPTCHA v3**.
3. Domains: your live domain, plus `localhost` for development.
4. You get two keys:
   - **Site key** → goes in `.env.local` as `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
   - **Secret key** → goes in Script Properties as `RECAPTCHA_SECRET_KEY` (step 4)

## 4. Set the Script Properties

In the Apps Script editor: **Project Settings (⚙) → Script Properties → Add
script property**.

| Property | Required | Value |
| --- | --- | --- |
| `RECAPTCHA_SECRET_KEY` | yes | reCAPTCHA v3 **secret** key from step 3 |
| `NOTIFY_EMAILS` | yes | Comma-separated recipients for new leads, e.g. `sales@prabhavconstruction.com,md@prabhavconstruction.com` |
| `CAREERS_EMAILS` | recommended | Comma-separated recipients for job applications. Falls back to `NOTIFY_EMAILS`. |
| `SPREADSHEET_ID` | no | Only needed if the script is *not* bound to the Sheet. The ID is the long string in the Sheet URL. |
| `CV_FOLDER_ID` | no | Drive folder for CVs. Created automatically on first upload if omitted. |
| `MIN_RECAPTCHA_SCORE` | no | Defaults to `0.5`. Raise towards `0.7` if you get spam, lower to `0.3` if genuine leads are being blocked. |
| `SEND_ACKNOWLEDGEMENT` | no | Set to `false` to stop the automatic thank-you e-mail to the visitor. |

## 5. Deploy as a Web App

1. **Deploy → New deployment**.
2. Click the gear next to *Select type* → **Web app**.
3. Settings:
   - **Description:** `v1`
   - **Execute as:** **Me** (your Google account)
   - **Who has access:** **Anyone** ← this must be *Anyone*, not *Anyone with a Google account*
4. **Deploy**, then authorise the scopes when prompted (Sheets, Drive, Gmail,
   external requests). The "Google hasn't verified this app" screen is expected
   for your own script — choose **Advanced → Go to … (unsafe)**.
5. Copy the **Web app URL**. It ends in `/exec`.

> **Every time you edit `Code.gs`, you must redeploy:** *Deploy → Manage
> deployments → ✏️ edit → Version: New version → Deploy.* The `/exec` URL stays
> the same. Skipping this step means the live site keeps hitting the old code.

## 6. Point the website at it

Create `.env.local` in the project root (copy `.env.example`):

```bash
NEXT_PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycb.../exec
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lc...
```

Then rebuild — these are inlined at build time, so a running dev server needs a
restart and a deployed site needs a fresh `npm run build`.

## 7. Test it

- **From Apps Script:** select `testSubmission` in the function dropdown and click
  **Run**. A row should appear in the `Enquiries` tab and a notification e-mail
  should arrive.
- **From the site:** run `npm run dev`, submit any enquiry form, and confirm the
  row, the notification e-mail and the acknowledgement e-mail.

---

## How the request works

The site is a static export, so the browser posts straight to Apps Script.
Apps Script cannot answer a CORS preflight request, so `lib/submitForm.ts` sends
`Content-Type: text/plain;charset=utf-8` — a "simple request" that needs no
preflight — and the script reads the raw body via `e.postData.contents`. If the
response still cannot be read (some corporate proxies), the site retries once in
`no-cors` mode: the row is still written, the browser just cannot see the reply.

## Quotas

A consumer Gmail account gets 100 recipients/day for `MailApp`; Google Workspace
gets 1,500. Well beyond normal enquiry volume, but worth knowing if you run a
campaign. `UrlFetchApp` (the reCAPTCHA check) allows 20,000 calls/day.

## Troubleshooting

| Symptom | Cause |
| --- | --- |
| Form says the service is not configured | `NEXT_PUBLIC_APPS_SCRIPT_URL` is empty — add it to `.env.local` and rebuild. |
| Rows appear, no e-mail | `NOTIFY_EMAILS` not set, or the daily MailApp quota is exhausted. |
| Nothing arrives at all | Deployment access is not set to **Anyone**, or you edited the script without redeploying. |
| Genuine users blocked | Lower `MIN_RECAPTCHA_SCORE`, or check that the site key and secret key are from the *same* reCAPTCHA registration. |
| CV link says "Upload failed" | Drive permissions were not granted — re-run the authorisation flow from the editor. |
| Mobile numbers show as `5.55E+09` | Should not happen — the script prefixes them with `'` — but if you paste data in manually, format the column as plain text. |
