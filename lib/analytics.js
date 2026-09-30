// GA4 event helper for client components.
//
// window.gtag is defined by the inline `ga4-init` script in components/global/Analytics.jsx
// (afterInteractive), so calls made before the lazyOnload gtag.js arrives are queued in
// dataLayer and sent when it loads. Consent Mode applies as for page views: visitors who
// declined cookies are sent as cookieless pings.
//
// Only call these after the API confirms success, so failed or rejected submits never count.

export function trackEvent(name, params = {}) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', name, params)
    }
  } catch {}
}

// Sales enquiries (contact form, rental quote). Mark `generate_lead` as a key event in
// GA4 Admin → Events. Careers and newsletter use their own events so they don't inflate
// lead counts.
export function trackLead(formType, params = {}) {
  trackEvent('generate_lead', { form_type: formType, ...params })
}
