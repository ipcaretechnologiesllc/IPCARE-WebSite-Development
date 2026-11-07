import { headers } from 'next/headers'

// robots.txt as a route handler (not app/robots.js) because the metadata API cannot emit
// the non-standard `Content-Signal` directive (https://contentsignals.org).
//
// Per-domain canonical base keeps the sitemap URL aligned with app/layout.js + app/sitemap.js.
const CANONICAL_DOMAINS = {
  'ipcare.ae':       'https://www.ipcare.ae',
  'www.ipcare.ae':   'https://www.ipcare.ae',
  'ipcare.ca':       'https://www.ipcare.ca',
  'www.ipcare.ca':   'https://www.ipcare.ca',
  'ipcares.com':     'https://www.ipcare.ae',
  'www.ipcares.com': 'https://www.ipcare.ae',
}
const DEFAULT_BASE = 'https://www.ipcare.ae'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// search = appear in search results; ai-input = be quoted/grounded in AI answers;
// ai-train = use for model training (not permitted).
const CONTENT_SIGNAL = 'search=yes, ai-input=yes, ai-train=no'

// No '/_next/' disallow: it blocked Googlebot from the CSS and JS chunks it needs to render
// pages. /_next/static is public build output with nothing to hide.
const DISALLOW = ['/api/', '/admin/', '/cdn-cgi/', '/rental/quote', '/unsubscribe']

export async function GET() {
  const h = await headers()
  const rawHost = (h.get('x-forwarded-host') || h.get('host') || '').toLowerCase().split(':')[0]
  const BASE = (CANONICAL_DOMAINS[rawHost] || process.env.NEXT_PUBLIC_BASE_URL || DEFAULT_BASE).replace(/\/$/, '')

  const body = [
    'User-Agent: *',
    `Content-Signal: ${CONTENT_SIGNAL}`,
    'Allow: /',
    ...DISALLOW.map((p) => `Disallow: ${p}`),
    '',
    `Host: ${BASE}`,
    `Sitemap: ${BASE}/sitemap.xml`,
    '',
  ].join('\n')

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  })
}
