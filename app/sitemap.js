import { headers } from 'next/headers'
import { articles } from '@/lib/blog-data'
import { rentalCategories, getAllProductParams } from '@/lib/rental-data'
import { serviceCategories, getAllSubpageParams } from '@/lib/services-data'
import { getAllEventSubSlugs } from '@/lib/event-it-data'
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

// Force dynamic so the sitemap is generated per-request and can read the host header.
// (Without this, Next.js would pre-render the sitemap once at build time and the
//  same XML would be served on every domain — defeating the multi-domain strategy.)
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function sitemap() {
  const h = headers()
  const rawHost = (h.get('x-forwarded-host') || h.get('host') || '').toLowerCase().split(':')[0]
  const BASE = (CANONICAL_DOMAINS[rawHost] || process.env.NEXT_PUBLIC_BASE_URL || DEFAULT_BASE).replace(/\/$/, '')

  const now = new Date().toISOString()

  // Priority buckets
  const P_HOME = 1.0
  const P_HUB = 0.9
  const P_CATEGORY = 0.7
  const P_DETAIL = 0.5
  const P_LEGAL = 0.3

  const entries = []

  // Home
  entries.push({ url: `${BASE}/`, lastModified: now, changeFrequency: 'weekly', priority: P_HOME })

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
  for (const [p, pri, ch] of hubs) entries.push({ url: `${BASE}${p}`, lastModified: now, changeFrequency: ch, priority: pri })

  // Services — categories + subpages
  for (const slug of Object.keys(serviceCategories || {})) {
    entries.push({ url: `${BASE}/services/${slug}`, lastModified: now, changeFrequency: 'monthly', priority: P_CATEGORY })
  }
  for (const { category, slug } of getAllSubpageParams() || []) {
    entries.push({ url: `${BASE}/services/${category}/${slug}`, lastModified: now, changeFrequency: 'monthly', priority: P_DETAIL })
  }

  // Rental — categories + products
  for (const slug of Object.keys(rentalCategories || {})) {
    entries.push({ url: `${BASE}/rental/${slug}`, lastModified: now, changeFrequency: 'monthly', priority: P_CATEGORY })
  }
  for (const { category, product } of getAllProductParams() || []) {
    entries.push({ url: `${BASE}/rental/${category}/${product}`, lastModified: now, changeFrequency: 'monthly', priority: P_DETAIL })
  }

  // Event IT — only slugs that have a built subpage (getAllEventSubSlugs = Object.keys(subpages)).
  // Previously this also looped over the raw `events` array, which emitted 4 slugs that exist
  // in the portfolio data but have no page route — causing live sitemap 404s. Removed that loop.
  for (const slug of getAllEventSubSlugs() || []) {
    entries.push({ url: `${BASE}/event-it/${slug}`, lastModified: now, changeFrequency: 'monthly', priority: P_DETAIL })
  }

  // Cybersecurity Advisory — fixed subroutes + dynamic slugs
  const advisoryFixed = ['cloud-security', 'zero-trust', 'executive-advisory', 'security-automation', 'sase']
  for (const slug of advisoryFixed) {
    entries.push({ url: `${BASE}/cybersecurity-advisory/${slug}`, lastModified: now, changeFrequency: 'monthly', priority: P_CATEGORY })
  }
  const dynamicAdvisory = (getAllAdvisorySlugs() || []).filter(s => !advisoryFixed.includes(s))
  for (const slug of dynamicAdvisory) {
    entries.push({ url: `${BASE}/cybersecurity-advisory/${slug}`, lastModified: now, changeFrequency: 'monthly', priority: P_DETAIL })
  }
  for (const art of kbArticles || []) {
    if (art?.slug) entries.push({ url: `${BASE}/cybersecurity-advisory/knowledge-base/${art.slug}`, lastModified: now, changeFrequency: 'monthly', priority: P_DETAIL })
  }

  // Blog — articles
  for (const a of articles || []) {
    entries.push({ url: `${BASE}/blog/${a.slug}`, lastModified: now, changeFrequency: 'monthly', priority: P_DETAIL })
  }

  // Industries — sector pages
  for (const slug of getAllIndustrySlugs() || []) {
    entries.push({ url: `${BASE}/industries/${slug}`, lastModified: now, changeFrequency: 'monthly', priority: P_CATEGORY })
  }

  // Legal
  const legal = ['/terms', '/privacy-policy', '/cookie-policy']
  for (const p of legal) entries.push({ url: `${BASE}${p}`, lastModified: now, changeFrequency: 'yearly', priority: P_LEGAL })

  // Dedupe by url (last wins)
  const map = new Map()
  for (const e of entries) map.set(e.url, e)
  return Array.from(map.values())
}
