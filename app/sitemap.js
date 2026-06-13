import { headers } from 'next/headers'
import { articles } from '@/lib/blog-data'
import { rentalCategories, getAllProductParams } from '@/lib/rental-data'
import { serviceCategories, getAllSubpageParams } from '@/lib/services-data'
import { getAllEventSubSlugs, events as eventPortfolio } from '@/lib/event-it-data'
import { getAllAdvisorySlugs, kbArticles } from '@/lib/cyber-advisory-data'
import { getAllIndustrySlugs } from '@/lib/industries-data'

// Per-domain canonical base. The sitemap MUST be host-aware so each domain
// serves a sitemap listing only its own URLs:
//   https://ipcare.ae/sitemap.xml  →  ipcare.ae URLs only
//   https://ipcare.ca/sitemap.xml  →  ipcare.ca URLs only
//   https://ipcares.com/sitemap.xml → redirected at edge to ipcare.ae (so this
//     code branch is effectively unreachable from production, but we still
//     fall through to ipcare.ae as a safety default)
const CANONICAL_DOMAINS = {
  'ipcare.ae':       'https://www.ipcare.ae',
  'www.ipcare.ae':   'https://www.ipcare.ae',
  'ipcare.ca':       'https://ipcare.ca',
  'www.ipcare.ca':   'https://ipcare.ca',
  'ipcares.com':     'https://www.ipcare.ae',
  'www.ipcares.com': 'https://www.ipcare.ae',
}
const DEFAULT_BASE = 'https://www.ipcare.ae'

// ── Lastmod helpers ──────────────────────────────────────────────────────────
// Parse 'May 06, 2026' → '2026-05-06'
const MONTH_MAP = { Jan:1, Feb:2, Mar:3, Apr:4, May:5, Jun:6, Jul:7, Aug:8, Sep:9, Oct:10, Nov:11, Dec:12 }
function parseBlogDate(str) {
  if (!str) return null
  const m = str.match(/^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})$/)
  if (!m) return null
  const mo = String(MONTH_MAP[m[1].slice(0, 3)] || 1).padStart(2, '0')
  const dy = String(m[2]).padStart(2, '0')
  return `${m[3]}-${mo}-${dy}`
}
// Parse 'Jun 2025' → '2025-06-01'
function parseKbDate(str) {
  if (!str) return null
  const m = str.match(/^([A-Za-z]+)\s+(\d{4})$/)
  if (!m) return null
  const mo = String(MONTH_MAP[m[1].slice(0, 3)] || 1).padStart(2, '0')
  return `${m[2]}-${mo}-01`
}

// Static lastmod dates for hub/category pages (real deploy/refresh dates, not build time).
const HUB_DATES = {
  '/':                                     '2026-05-10',
  '/about':                                '2025-01-01',
  '/services':                             '2025-03-01',
  '/rental':                               '2025-03-01',
  '/event-it':                             '2025-05-25',
  '/event-it/portfolio':                   '2025-05-25',
  '/cybersecurity-advisory':               '2025-06-01',
  '/cybersecurity-advisory/knowledge-base':'2025-06-01',
  '/blog':                                 '2026-05-10',
  '/industries':                           '2025-01-01',
  '/partners':                             '2025-01-01',
  '/careers':                              '2025-04-01',
  '/contact':                              '2025-01-01',
  '/terms':                                '2024-01-01',
  '/privacy-policy':                       '2024-01-01',
  '/cookie-policy':                        '2024-01-01',
}

// Advisory sub-page static dates (service pages, not time-sensitive articles)
const ADVISORY_SUB_DATES = {
  'cloud-security':       '2025-03-01',
  'zero-trust':           '2025-03-01',
  'executive-advisory':   '2025-01-01',
  'security-automation':  '2025-03-01',
  'sase':                 '2025-03-01',
}

// /services/email-solutions/microsoft-365 is a 308 redirect to /services/cloud/microsoft-365.
// Exclude the redirect source so only the canonical URL appears in the sitemap.
const SITEMAP_EXCLUDE = new Set(['/services/email-solutions/microsoft-365'])

// Force dynamic so the sitemap is generated per-request and can read the host header.
// (Without this, Next.js would pre-render the sitemap once at build time and the
//  same XML would be served on every domain — defeating the multi-domain strategy.)
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function sitemap() {
  const h = headers()
  const rawHost = (h.get('x-forwarded-host') || h.get('host') || '').toLowerCase().split(':')[0]
  const BASE = (CANONICAL_DOMAINS[rawHost] || process.env.NEXT_PUBLIC_BASE_URL || DEFAULT_BASE).replace(/\/$/, '')

  // Build event slug → endDate lookup from the portfolio events array.
  const eventEndDateMap = {}
  for (const ev of (eventPortfolio || [])) {
    if (ev.slug && ev.endDate) eventEndDateMap[ev.slug] = ev.endDate
  }

  const now = new Date().toISOString() // fallback only — should not appear in final output

  // Priority buckets
  const P_HOME = 1.0
  const P_HUB = 0.9
  const P_CATEGORY = 0.7
  const P_DETAIL = 0.5
  const P_LEGAL = 0.3

  const entries = []

  // Home
  entries.push({ url: `${BASE}/`, lastModified: HUB_DATES['/'] || now, changeFrequency: 'weekly', priority: P_HOME })

  // Primary hubs / top pages
  const hubs = [
    ['/about', P_HUB, 'monthly'],
    ['/services', P_HUB, 'weekly'],
    ['/rental', P_HUB, 'weekly'],
    ['/event-it', P_HUB, 'weekly'],
    ['/event-it/portfolio', P_HUB, 'monthly'],
    ['/cybersecurity-advisory', P_HUB, 'weekly'],
    ['/cybersecurity-advisory/knowledge-base', P_HUB, 'weekly'],
    ['/blog', P_HUB, 'weekly'],
    ['/industries', P_HUB, 'monthly'],
    ['/partners', P_CATEGORY, 'monthly'],
    ['/careers', P_CATEGORY, 'weekly'],
    ['/contact', P_CATEGORY, 'monthly'],
  ]
  for (const [p, pri, ch] of hubs) entries.push({ url: `${BASE}${p}`, lastModified: HUB_DATES[p] || now, changeFrequency: ch, priority: pri })

  // Services — categories + subpages
  for (const slug of Object.keys(serviceCategories || {})) {
    entries.push({ url: `${BASE}/services/${slug}`, lastModified: '2025-03-01', changeFrequency: 'monthly', priority: P_CATEGORY })
  }
  for (const { category, slug } of getAllSubpageParams() || []) {
    const path = `/services/${category}/${slug}`
    if (SITEMAP_EXCLUDE.has(path)) continue  // Fix 2.3: skip redirect source
    entries.push({ url: `${BASE}${path}`, lastModified: '2025-03-01', changeFrequency: 'monthly', priority: P_DETAIL })
  }

  // Rental — categories + products
  for (const slug of Object.keys(rentalCategories || {})) {
    if (slug === 'bundles') continue  // TODO: re-enable when /rental/bundles/* pages are built
    entries.push({ url: `${BASE}/rental/${slug}`, lastModified: '2025-03-01', changeFrequency: 'monthly', priority: P_CATEGORY })
  }
  for (const { category, product } of getAllProductParams() || []) {
    if (category === 'bundles') continue  // TODO: re-enable when /rental/bundles/* pages are built
    entries.push({ url: `${BASE}/rental/${category}/${product}`, lastModified: '2025-03-01', changeFrequency: 'monthly', priority: P_DETAIL })
  }

  // Event IT — only slugs that have a built subpage (getAllEventSubSlugs = Object.keys(subpages)).
  // Previously this also looped over the raw `events` array, which emitted 4 slugs that exist
  // in the portfolio data but have no page route — causing live sitemap 404s. Removed that loop.
  // Lastmod: use the event's endDate when slug matches a portfolio event; fall back to service-page
  // launch estimate ('2025-06-01') for service sub-pages (event-wifi, temporary-data-centres, event-cctv).
  for (const slug of getAllEventSubSlugs() || []) {
    const lastMod = eventEndDateMap[slug] || '2025-06-01'
    entries.push({ url: `${BASE}/event-it/${slug}`, lastModified: lastMod, changeFrequency: 'monthly', priority: P_DETAIL })
  }

  // Cybersecurity Advisory — fixed subroutes + dynamic slugs
  const advisoryFixed = ['cloud-security', 'zero-trust', 'executive-advisory', 'security-automation', 'sase']
  for (const slug of advisoryFixed) {
    entries.push({ url: `${BASE}/cybersecurity-advisory/${slug}`, lastModified: ADVISORY_SUB_DATES[slug] || '2025-03-01', changeFrequency: 'monthly', priority: P_CATEGORY })
  }
  const dynamicAdvisory = (getAllAdvisorySlugs() || []).filter(s => !advisoryFixed.includes(s))
  for (const slug of dynamicAdvisory) {
    entries.push({ url: `${BASE}/cybersecurity-advisory/${slug}`, lastModified: '2025-03-01', changeFrequency: 'monthly', priority: P_DETAIL })
  }
  for (const art of kbArticles || []) {
    if (art?.slug) {
      const lastMod = parseKbDate(art.date) || '2025-06-01'
      entries.push({ url: `${BASE}/cybersecurity-advisory/knowledge-base/${art.slug}`, lastModified: lastMod, changeFrequency: 'monthly', priority: P_DETAIL })
    }
  }

  // Blog — articles (use real publish date as lastmod)
  for (const a of articles || []) {
    const lastMod = parseBlogDate(a.date) || now
    entries.push({ url: `${BASE}/blog/${a.slug}`, lastModified: lastMod, changeFrequency: 'monthly', priority: P_DETAIL })
  }

  // Industries — sector pages
  for (const slug of getAllIndustrySlugs() || []) {
    entries.push({ url: `${BASE}/industries/${slug}`, lastModified: '2025-01-01', changeFrequency: 'monthly', priority: P_CATEGORY })
  }

  // Legal
  const legal = ['/terms', '/privacy-policy', '/cookie-policy']
  for (const p of legal) entries.push({ url: `${BASE}${p}`, lastModified: HUB_DATES[p] || '2024-01-01', changeFrequency: 'yearly', priority: P_LEGAL })

  // Dedupe by url (last wins)
  const map = new Map()
  for (const e of entries) map.set(e.url, e)
  return Array.from(map.values())
}
