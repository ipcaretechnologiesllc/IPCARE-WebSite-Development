'use client'

// GA4 + Google Consent Mode v2 wrapper.
// Loads gtag.js ONLY after the visitor grants analytics consent (via Cookie Banner).
// We keep consent in localStorage ('ipcare_cookie_consent' + 'ipcare_cookie_prefs') — see CookieBanner.jsx.

import { useEffect, useState } from 'react'
import Script from 'next/script'

const LS_KEY = 'ipcare_cookie_consent'
const LS_PREFS = 'ipcare_cookie_prefs'

export default function Analytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    if (!measurementId) return

    const read = () => {
      try {
        const choice = localStorage.getItem(LS_KEY)
        if (choice === 'rejected') return false
        if (choice === 'accepted') {
          // If user used 'Manage Preferences', check analytics flag
          const prefsRaw = localStorage.getItem(LS_PREFS)
          if (prefsRaw) {
            try { return !!JSON.parse(prefsRaw)?.analytics } catch { return true }
          }
          return true
        }
        return false
      } catch { return false }
    }

    setAllowed(read())

    // Listen for preference changes (same-tab via custom event, cross-tab via storage)
    const onStorage = (e) => { if (e.key === LS_KEY || e.key === LS_PREFS) setAllowed(read()) }
    const onCustom = () => setAllowed(read())
    window.addEventListener('storage', onStorage)
    window.addEventListener('ipcare:consent-updated', onCustom)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('ipcare:consent-updated', onCustom)
    }
  }, [measurementId])

  if (!measurementId || !allowed) return null

  return (
    <>
      <Script id="ga4-src" strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} />
      <Script id="ga4-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        // Consent Mode v2 — user has granted analytics
        gtag('consent', 'default', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          analytics_storage: 'granted',
          functionality_storage: 'granted',
          security_storage: 'granted'
        });
        gtag('js', new Date());
        gtag('config', '${measurementId}', { anonymize_ip: true });
      `}</Script>
    </>
  )
}
