'use client'

// GA4 + Google Consent Mode v2 wrapper (Google-recommended pattern).
//
// gtag.js is loaded on EVERY page so Google's tag detector and GA4 modeled-conversions
// (cookieless pings) work. All storage consent categories are defaulted to "denied"
// in /app/app/layout.js BEFORE this script loads. When the visitor clicks
// Accept All (or toggles Analytics in Manage Preferences) we send a
// gtag('consent', 'update', { analytics_storage: 'granted', ... }) call.
//
// Consent state is persisted in localStorage by CookieBanner.jsx:
//   ipcare_cookie_consent  = 'accepted' | 'rejected'
//   ipcare_cookie_prefs    = JSON { analytics: bool, marketing: bool, ... }

import { useEffect } from 'react'
import Script from 'next/script'

const LS_KEY = 'ipcare_cookie_consent'
const LS_PREFS = 'ipcare_cookie_prefs'

function readConsent() {
  try {
    const choice = typeof window !== 'undefined' ? localStorage.getItem(LS_KEY) : null
    if (choice === 'rejected') {
      return { analytics: false, marketing: false }
    }
    if (choice === 'accepted') {
      const prefsRaw = localStorage.getItem(LS_PREFS)
      if (prefsRaw) {
        try {
          const p = JSON.parse(prefsRaw) || {}
          return { analytics: !!p.analytics, marketing: !!p.marketing }
        } catch {
          return { analytics: true, marketing: true }
        }
      }
      // Plain "Accept All" with no prefs stored → all granted
      return { analytics: true, marketing: true }
    }
    return { analytics: false, marketing: false }
  } catch {
    return { analytics: false, marketing: false }
  }
}

function pushConsentUpdate({ analytics, marketing }) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('consent', 'update', {
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: marketing ? 'granted' : 'denied',
    ad_user_data: marketing ? 'granted' : 'denied',
    ad_personalization: marketing ? 'granted' : 'denied',
  })
}

// Hardcoded GA4 measurement ID for IP Care Technologies.
// We intentionally hardcode (vs. NEXT_PUBLIC_ env var) because NEXT_PUBLIC_*
// vars are baked in at build time — if the production build runs without
// the var set, the tag silently disappears. Hardcoding guarantees the tag
// ships in every build, every environment.
const GA4_MEASUREMENT_ID = 'G-YY2Q2629E7'

export default function Analytics() {
  // Allow env var to override the hardcoded ID (useful for staging / different GA4 properties)
  const measurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || GA4_MEASUREMENT_ID

  useEffect(() => {
    if (!measurementId) return

    // On mount, sync any previously-stored consent state to gtag.
    const apply = () => pushConsentUpdate(readConsent())
    // Small delay so gtag has a chance to load before first update.
    const t = setTimeout(apply, 300)

    const onStorage = (e) => {
      if (e.key === LS_KEY || e.key === LS_PREFS) apply()
    }
    const onCustom = () => apply()

    window.addEventListener('storage', onStorage)
    window.addEventListener('ipcare:consent-updated', onCustom)
    return () => {
      clearTimeout(t)
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('ipcare:consent-updated', onCustom)
    }
  }, [measurementId])

  if (!measurementId) return null

  return (
    <>
      {/* Load gtag.js on every page so Google can detect the tag and collect
          Consent Mode v2 cookieless pings. Storage categories remain DENIED
          (set in layout.js) until the visitor accepts via the Cookie Banner. */}
      <Script
        id="ga4-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script id="ga4-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${measurementId}', {
          anonymize_ip: true,
          send_page_view: true
        });
      `}</Script>
    </>
  )
}
