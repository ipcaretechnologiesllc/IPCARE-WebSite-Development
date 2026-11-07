/**
 * IP Care leads sheet: Google Apps Script web app.
 *
 * A standalone script (owned by the same Google account as the sheet), deployed as a web app:
 *   Execute as: Me, Who has access: Anyone. Access is guarded by SHARED_TOKEN below, which
 *   must equal LEADS_SHEET_TOKEN in the website's environment. The real token is NOT kept in
 *   this repo copy; replace the placeholders when pasting into the Apps Script editor.
 *
 * The site (lib/server/leads-sheet.js) POSTs JSON: { token, rows: [{ tab, data: { Header: value } }] }
 * Tabs and headers are created on demand, values are matched to columns by header name,
 * and every column is plain text so phone numbers keep their "+" and nothing is evaluated
 * as a formula.
 */

const SHARED_TOKEN = '__REPLACE_WITH_LEADS_SHEET_TOKEN__'
const SHEET_ID = '1_U81bj73DW-hdjFF9lWHQViQKJ-EnvOeGKBs0FQ_AC0'
const TIMEZONE = 'Asia/Dubai'

const TABS = {
  'All leads': ['Date', 'Type', 'Reference', 'Name', 'Company', 'Phone', 'Email', 'Country', 'Service', 'Message', 'Source', 'Enquiry tab', 'Status', 'Owner', 'Notes'],
  'Click log': ['Date', 'Action', 'Page', 'Location'],
  'Careers': ['Date', 'Reference', 'Name', 'Email', 'Role', 'Cover note', 'CV received'],
  'Newsletter': ['Date', 'Email', 'Source'],
}

const STATUS_OPTIONS = ['New', 'Contacted', 'Quoted', 'Won', 'Lost', 'Spam']

function doGet() {
  return json_({ ok: true, service: 'ipcare-leads-sheet' })
}

function doPost(e) {
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || '{}')
    if (!body.token || body.token !== SHARED_TOKEN) return json_({ ok: false, error: 'unauthorized' })
    const rows = Array.isArray(body.rows) ? body.rows : []
    if (!rows.length) return json_({ ok: false, error: 'no-rows' })

    const lock = LockService.getScriptLock()
    lock.waitLock(20000)
    try {
      const ss = SpreadsheetApp.openById(SHEET_ID)
      let written = 0
      rows.forEach(function (r) {
        if (!TABS[r.tab]) return
        appendRow_(ss, r.tab, r.data || {})
        written++
      })
      return json_({ ok: true, written: written })
    } finally {
      lock.releaseLock()
    }
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message ? err.message : err) })
  }
}

// Run once from the editor to create every tab with its headers.
function setup() {
  const ss = SpreadsheetApp.openById(SHEET_ID)
  Object.keys(TABS).forEach(function (name) { sheet_(ss, name) })
  const first = ss.getSheetByName('Sheet1')
  if (first && first.getLastRow() === 0 && ss.getSheets().length > 1) ss.deleteSheet(first)
}

function sheet_(ss, name) {
  let sh = ss.getSheetByName(name)
  if (sh) return sh
  const headers = TABS[name]
  sh = ss.insertSheet(name)
  sh.getRange(1, 1, sh.getMaxRows(), headers.length).setNumberFormat('@')
  sh.getRange(1, 1, 1, headers.length).setValues([headers])
    .setFontWeight('bold').setBackground('#0B1A46').setFontColor('#FFFFFF')
  sh.setFrozenRows(1)
  if (name === 'All leads') {
    const col = headers.indexOf('Status') + 1
    sh.getRange(2, col, sh.getMaxRows() - 1, 1).setDataValidation(
      SpreadsheetApp.newDataValidation().requireValueInList(STATUS_OPTIONS, true).setAllowInvalid(true).build()
    )
    sh.setColumnWidth(headers.indexOf('Message') + 1, 360)
  }
  return sh
}

function appendRow_(ss, tab, data) {
  const sh = sheet_(ss, tab)
  const headers = TABS[tab]
  const row = headers.map(function (h) {
    let v = data[h]
    if (h === 'Date' && v) v = Utilities.formatDate(new Date(v), TIMEZONE, 'yyyy-MM-dd HH:mm:ss')
    if (h === 'Status' && !v && tab === 'All leads') v = 'New'
    v = v == null ? '' : String(v).slice(0, 5000)
    // The "@" text format keeps "+971..." as text, but setValues still parses a leading "="
    // as a formula (a lead message of "=1+1" showed #ERROR!). A leading apostrophe forces text
    // and is not displayed.
    return /^[=]/.test(v) ? "'" + v : v
  })
  const next = sh.getLastRow() + 1
  sh.getRange(next, 1, 1, headers.length).setNumberFormat('@').setValues([row])
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
}
