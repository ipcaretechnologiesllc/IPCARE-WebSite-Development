// HTML email templates for IP Care Technologies forms.
// Keep inline styles (email clients strip <style> selectors). Brand colours: #0F245F navy, #E87722 orange.
import { escapeHtml } from './sanitize'

const E = escapeHtml

const wrap = (bodyHtml, { preheader = '' } = {}) => `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>IP Care Technologies</title></head>
<body style="margin:0;background:#F3F5F8;font-family:Arial,Helvetica,sans-serif;color:#0F245F;">
  <div style="display:none;max-height:0;overflow:hidden;color:#F3F5F8;">${E(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F3F5F8;padding:24px 0;"><tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 10px rgba(15,36,95,0.08);">
      <tr><td style="background:linear-gradient(135deg,#0B1A46 0%,#0F245F 100%);padding:24px 28px;">
        <div style="color:#E87722;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">IP Care Technologies</div>
        <div style="color:#ffffff;font-size:15px;margin-top:4px;opacity:0.85;">Enterprise IT · UAE & Canada</div>
      </td></tr>
      <tr><td style="padding:32px 28px;color:#0F245F;line-height:1.55;font-size:14.5px;">${bodyHtml}</td></tr>
      <tr><td style="background:#F9FAFC;padding:20px 28px;color:#6b7280;font-size:12px;line-height:1.6;border-top:1px solid #E5E7EB;">
        IP Care Technologies L.L.C. &middot; Abu Dhabi, UAE &middot; Toronto, Canada<br/>
        UAE: +971 2 676 6935 &nbsp;|&nbsp; Canada: +1 416 786 0782 &nbsp;|&nbsp; info@ipcare.ae<br/>
        <a href="https://www.ipcare.ae" style="color:#E87722;text-decoration:none;">www.ipcare.ae</a>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`

const field = (label, value) => value
  ? `<tr><td style="padding:6px 0;color:#6b7280;font-size:12px;width:150px;vertical-align:top;">${E(label)}</td><td style="padding:6px 0;color:#0F245F;font-size:14px;">${E(value)}</td></tr>`
  : ''

export function tplContactTeam({ name, company, email, phone, country, service, message, tab, reference, ipAddress, userAgent }) {
  const subject = `New contact form submission — ${name || 'Unknown'}${company ? ' (' + company + ')' : ''}`
  const body = `
    <h2 style="margin:0 0 12px;color:#0F245F;font-size:20px;">New contact form submission</h2>
    <p style="margin:0 0 16px;color:#4b5563;">A ${E(tab || 'general')} enquiry was submitted via the website contact form.</p>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;margin:16px 0;border-top:1px solid #E5E7EB;border-bottom:1px solid #E5E7EB;">
      ${field('Reference', reference)}
      ${field('Name', name)}
      ${field('Company', company)}
      ${field('Email', email)}
      ${field('Phone', phone)}
      ${field('Country', country)}
      ${field('Service Interest', service)}
      ${field('Enquiry type', tab)}
    </table>
    ${message ? `<div style="margin-top:20px;"><div style="color:#6b7280;font-size:12px;margin-bottom:6px;">Message</div><div style="background:#F9FAFC;padding:14px 16px;border-radius:8px;white-space:pre-wrap;color:#0F245F;">${E(message)}</div></div>` : ''}
    <p style="margin:24px 0 0;color:#9ca3af;font-size:11px;">IP: ${E(ipAddress || '—')} &middot; UA: ${E((userAgent || '').slice(0, 80))}</p>
  `
  return { subject, html: wrap(body, { preheader: `New enquiry from ${name || ''}` }) }
}

export function tplContactAutoReply({ name }) {
  const subject = 'Thanks for contacting IP Care Technologies'
  const body = `
    <h2 style="margin:0 0 12px;color:#0F245F;font-size:20px;">Thanks${name ? ', ' + E(name) : ''} — we have your message.</h2>
    <p>Our team replies within <b style="color:#E87722;">4 business hours</b> (UAE 09:00–18:00, Canada 09:00–17:00).</p>
    <p>If your matter is urgent, please call us directly:</p>
    <ul style="padding-left:18px;">
      <li>UAE: <a href="tel:+97126766935" style="color:#E87722;text-decoration:none;">+971 2 676 6935</a></li>
      <li>Canada: <a href="tel:+14167860782" style="color:#E87722;text-decoration:none;">+1 416 786 0782</a></li>
    </ul>
    <p style="margin-top:24px;color:#6b7280;font-size:13px;">— The IP Care Team</p>
  `
  return { subject, html: wrap(body, { preheader: 'We have your message. Reply within 4 business hours.' }) }
}

export function tplRentalQuoteTeam({ reference, fullName, company, email, phone, country, projectName, startDate, endDate, location, setupRequired, requirements, source, items, ipAddress, userAgent }) {
  const subject = `Rental quote request — ${reference} — ${fullName}${company ? ' (' + company + ')' : ''}`
  const itemRows = (items || []).map(it => `
    <tr>
      <td style="padding:8px 10px;border-bottom:1px solid #EEF1F5;font-size:13px;color:#0F245F;">${E(it.brand || '')} ${E(it.model || '')}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #EEF1F5;font-size:13px;color:#0F245F;text-align:center;">${E(it.quantity ?? it.qty ?? 1)}</td>
      <td style="padding:8px 10px;border-bottom:1px solid #EEF1F5;font-size:13px;color:#0F245F;text-align:center;">${E(it.duration || '—')}</td>
    </tr>
  `).join('')
  const body = `
    <h2 style="margin:0 0 12px;color:#0F245F;font-size:20px;">New rental quote request</h2>
    <p style="margin:0 0 16px;color:#4b5563;">Reference: <b style="color:#E87722;">${E(reference)}</b></p>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;margin:16px 0;border-top:1px solid #E5E7EB;border-bottom:1px solid #E5E7EB;">
      ${field('Full name', fullName)}
      ${field('Company', company)}
      ${field('Email', email)}
      ${field('Phone', phone)}
      ${field('Country', country)}
      ${field('Project', projectName)}
      ${field('Rental dates', `${startDate || ''} → ${endDate || ''}`)}
      ${field('Delivery location', location)}
      ${field('Setup required', setupRequired)}
      ${field('Heard about us via', source)}
    </table>
    ${itemRows ? `
      <div style="margin:20px 0 6px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Items Requested</div>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;border:1px solid #EEF1F5;border-radius:8px;overflow:hidden;">
        <thead><tr style="background:#F3F5F8;"><th align="left" style="padding:10px;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Item</th><th style="padding:10px;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Qty</th><th style="padding:10px;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Duration</th></tr></thead>
        <tbody>${itemRows}</tbody>
      </table>` : ''}
    ${requirements ? `<div style="margin-top:20px;"><div style="color:#6b7280;font-size:12px;margin-bottom:6px;">Additional requirements</div><div style="background:#F9FAFC;padding:14px 16px;border-radius:8px;white-space:pre-wrap;color:#0F245F;">${E(requirements)}</div></div>` : ''}
    <p style="margin:24px 0 0;color:#9ca3af;font-size:11px;">IP: ${E(ipAddress || '—')} &middot; UA: ${E((userAgent || '').slice(0,80))}</p>
  `
  return { subject, html: wrap(body, { preheader: `Rental quote ${reference} for ${fullName}` }) }
}

export function tplRentalQuoteAutoReply({ reference, fullName }) {
  const subject = `Quote request received — Ref ${reference}`
  const body = `
    <h2 style="margin:0 0 12px;color:#0F245F;font-size:20px;">Quote request received${fullName ? ', ' + E(fullName) : ''}</h2>
    <p>Thank you for choosing IP Care. Your reference number is <b style="color:#E87722;">${E(reference)}</b>.</p>
    <p>Our rental team will review your requirements and email you a tailored quote within <b>4 business hours</b>.</p>
    <p>If anything is time-critical, reply to this email or call us directly.</p>
    <p style="margin-top:24px;color:#6b7280;font-size:13px;">— The IP Care Rental Team</p>
  `
  return { subject, html: wrap(body, { preheader: `Your reference: ${reference}` }) }
}

export function tplCareerTeam({ name, email, role, cover, cvFileName, cvSize, ipAddress, userAgent }) {
  const subject = `New Job Application — ${role || 'General'} — ${name || 'Unknown'}`
  const body = `
    <h2 style="margin:0 0 12px;color:#0F245F;font-size:20px;">New job application</h2>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;margin:16px 0;border-top:1px solid #E5E7EB;border-bottom:1px solid #E5E7EB;">
      ${field('Position', role)}
      ${field('Applicant', name)}
      ${field('Email', email)}
      ${field('CV file', cvFileName ? `${cvFileName} (${Math.round((cvSize || 0) / 1024)} KB)` : '— no attachment')}
    </table>
    ${cover ? `<div style="margin-top:20px;"><div style="color:#6b7280;font-size:12px;margin-bottom:6px;">Cover note</div><div style="background:#F9FAFC;padding:14px 16px;border-radius:8px;white-space:pre-wrap;color:#0F245F;">${E(cover)}</div></div>` : ''}
    <p style="margin:24px 0 0;color:#9ca3af;font-size:11px;">IP: ${E(ipAddress || '—')} &middot; UA: ${E((userAgent || '').slice(0,80))}</p>
  `
  return { subject, html: wrap(body, { preheader: `${name || ''} applied for ${role || 'a role'}` }) }
}

export function tplCareerAutoReply({ name, role }) {
  const subject = `Application received — ${role || 'General'} — IP Care Technologies`
  const body = `
    <h2 style="margin:0 0 12px;color:#0F245F;font-size:20px;">Application received${name ? ', ' + E(name) : ''}</h2>
    <p>Thank you for applying${role ? ' for the <b style="color:#E87722;">' + E(role) + '</b> role' : ''} at IP Care Technologies.</p>
    <p>Our talent team will review your application carefully and come back within <b>7 business days</b>. Shortlisted candidates will be invited to a first-round interview.</p>
    <p style="margin-top:24px;color:#6b7280;font-size:13px;">— The IP Care Talent Team</p>
  `
  return { subject, html: wrap(body, { preheader: `We have your application for ${role || 'IP Care'}.` }) }
}

export function tplNewsletterWelcome({ unsubscribeUrl }) {
  const subject = 'Welcome to the IP Care Knowledge Base'
  const body = `
    <h2 style="margin:0 0 12px;color:#0F245F;font-size:20px;">Hi there,</h2>
    <p>Thanks for subscribing to the IP Care Technologies knowledge base. You're now on the list to receive <b>one monthly email</b> featuring our best articles on cybersecurity, cloud, managed IT and enterprise technology — no spam, ever.</p>
    <p>Our first issue lands on the <b>first Tuesday of next month</b>.</p>
    <p>In the meantime, browse our latest insights: <a href="https://www.ipcare.ae/blog" style="color:#E87722;text-decoration:none;">www.ipcare.ae/blog</a></p>
    <p style="margin-top:24px;color:#6b7280;font-size:13px;">— The IP Care Team</p>
    <p style="margin-top:16px;color:#9ca3af;font-size:11px;">If you ever want to unsubscribe, <a href="${E(unsubscribeUrl || '#')}" style="color:#9ca3af;">click here</a>.</p>
  `
  return { subject, html: wrap(body, { preheader: 'One monthly email. No spam, ever.' }) }
}
