// Writes leads and contact-button taps to the "IP Care Leads" Google Sheet.
//
// The sheet is fed through a Google Apps Script web app (source: docs/leads-sheet/apps-script.gs)
// that appends rows and creates tabs on demand. Two env vars connect it:
//   LEADS_SHEET_URL    the web app's /exec URL
//   LEADS_SHEET_TOKEN  shared secret, must equal SHARED_TOKEN in the script
// When either is unset every call here is a silent no-op, so local dev and any build without
// the vars behave exactly as before. A sheet failure must never fail or slow a lead: the team
// email and the Mongo copy remain the system of record, the sheet is a convenience view.
//
// No imports from '@/...' so scripts/backfill-leads-sheet.mjs can reuse the row builders.

const clip = (v, n = 2000) => (v == null ? '' : String(v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').slice(0, n))

export function sheetConfigured() {
  return !!(process.env.LEADS_SHEET_URL && process.env.LEADS_SHEET_TOKEN)
}

// rows: [{ tab, data: { Header: value } }]. Never throws. Returns { ok, written? , skipped? }.
export async function sendRows(rows, { timeoutMs = 9000 } = {}) {
  if (!sheetConfigured() || !Array.isArray(rows) || rows.length === 0) return { ok: false, skipped: true }
  for (let attempt = 0; attempt < 2; attempt++) {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), timeoutMs)
    try {
      const res = await fetch(process.env.LEADS_SHEET_URL, {
        method: 'POST',
        // text/plain keeps this a "simple" request; Apps Script reads the raw body either way.
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ token: process.env.LEADS_SHEET_TOKEN, rows }),
        signal: ctrl.signal,
        redirect: 'follow',
      })
      const data = await res.json().catch(() => null)
      if (res.ok && data?.ok) return { ok: true, written: data.written }
      // Auth/validation rejections will not improve on retry; only retry server-side hiccups.
      console.error('[sheet] rejected:', res.status, data?.error || '')
      if (res.status < 500) return { ok: false }
    } catch (e) {
      console.error('[sheet] request failed:', e?.name || 'error')
      // A timeout may mean the row was written but the reply was slow, so retrying could
      // duplicate it. Only retry hard network errors.
      if (e?.name === 'AbortError') return { ok: false }
    } finally {
      clearTimeout(timer)
    }
    if (attempt === 0) await new Promise((r) => setTimeout(r, 1200))
  }
  return { ok: false }
}

// ---------- Row builders (shared by the API route, /api/track and the backfill script) ----------

const iso = (d) => d || new Date().toISOString()

// Contact page form, rental tab of the contact form, and the call-back (quick) form.
export function contactRow({ reference, name, company, phone, email, country, service, message, tab, source, createdAt }) {
  const type = tab === 'quick' ? 'Call-back' : tab === 'rental' ? 'Contact form (rental)' : 'Contact form'
  return {
    tab: 'All leads',
    data: {
      Date: iso(createdAt), Type: type, Reference: reference,
      Name: clip(name, 120), Company: clip(company, 160), Phone: clip(phone, 40), Email: clip(email, 160),
      Country: clip(country, 40), Service: clip(service, 80), Message: clip(message, 3000),
      Source: clip(source || (tab === 'quick' ? 'quick-enquiry' : 'contact-page'), 60),
      'Enquiry tab': clip(tab, 20),
    },
  }
}

// Rental quote request from the cart (RQ- reference). `items` are the sanitised cart items.
export function rentalRow({ reference, fullName, company, phone, email, country, projectName, startDate, endDate, location, setupRequired, requirements, source, items, createdAt }) {
  const itemsText = (items || []).map((it) => `${it.brand || ''} ${it.model || ''}`.trim() + ` x${it.quantity ?? 1}` + (it.duration ? ` (${it.duration})` : '')).join('; ')
  const lines = [
    projectName && `Project: ${projectName}`,
    (startDate || endDate) && `Dates: ${startDate || '?'} to ${endDate || '?'}`,
    location && `Location: ${location}`,
    setupRequired && `Setup required: ${setupRequired}`,
    requirements && `Requirements: ${requirements}`,
    source && `Heard about us: ${source}`,
  ].filter(Boolean)
  return {
    tab: 'All leads',
    data: {
      Date: iso(createdAt), Type: 'Rental quote', Reference: reference,
      Name: clip(fullName, 120), Company: clip(company, 160), Phone: clip(phone, 40), Email: clip(email, 160),
      Country: clip(country, 40), Service: clip(itemsText, 1000), Message: clip(lines.join('\n'), 3000),
      Source: 'rental-cart', 'Enquiry tab': 'rental-quote',
    },
  }
}

export function careerRow({ reference, name, email, role, cover, cvReceived, createdAt }) {
  return {
    tab: 'Careers',
    data: {
      Date: iso(createdAt), Reference: reference, Name: clip(name, 120), Email: clip(email, 160),
      Role: clip(role, 160), 'Cover note': clip(cover, 1500), 'CV received': cvReceived ? 'Yes' : 'No',
    },
  }
}

export function newsletterRow({ email, source, createdAt }) {
  return { tab: 'Newsletter', data: { Date: iso(createdAt), Email: clip(email, 160), Source: clip(source || 'website', 40) } }
}

// Phone / WhatsApp / email button tap. `text` is the link text, `target` the href.
export function clickRow({ action, page, text, target, createdAt }) {
  const location = [clip(text, 100), clip(target, 120)].filter(Boolean).join(' | ')
  return { tab: 'Click log', data: { Date: iso(createdAt), Action: action, Page: clip(page, 200), Location: location } }
}
