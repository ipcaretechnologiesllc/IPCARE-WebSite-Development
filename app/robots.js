import { headers } from 'next/headers'

// Per-domain canonical base — keeps robots.txt aligned with the canonical
// strategy in app/layout.js + app/sitemap.js so each domain serves a robots.txt
// pointing at its own sitemap.
const CANONICAL_DOMAINS = {
  'ipcare.ae':       'https://ipcare.ae',
  'www.ipcare.ae':   'https://ipcare.ae',
  'ipcare.ca':       'https://ipcare.ca',
  'www.ipcare.ca':   'https://ipcare.ca',
  'ipcares.com':     'https://ipcare.ae',
  'www.ipcares.com': 'https://ipcare.ae',
}
const DEFAULT_BASE = 'https://ipcare.ae'

// Generate per-request so the sitemap URL matches the incoming host.
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function robots() {
  const h = headers()
  const rawHost = (h.get('x-forwarded-host') || h.get('host') || '').toLowerCase().split(':')[0]
  const BASE = (CANONICAL_DOMAINS[rawHost] || process.env.NEXT_PUBLIC_BASE_URL || DEFAULT_BASE).replace(/\/$/, '')

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/rental/quote',
          '/unsubscribe',
        ],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  }
}
