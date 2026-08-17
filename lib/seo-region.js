import { headers } from 'next/headers'

// Content that is inherently UAE-jurisdiction-specific (UAE regulatory frameworks,
// UAE-only location pages) but gets duplicated byte-for-byte onto ipcare.ca via the
// shared lib/*-data.js content modules. Google was indexing only the ipcare.ae copy
// and leaving the ipcare.ca copy "Crawled - currently not indexed" (duplicate content
// across the en-AE/en-CA hreflang pair). On ipcare.ca, these routes canonicalize to
// their ipcare.ae original instead of self, and are excluded from the ipcare.ca sitemap,
// so Google stops treating the .ca copy as a competing index candidate.
// Every service category has 'abu-dhabi' and 'dubai' location subpages (same content
// duplicated verbatim onto ipcare.ca) — confirmed across all 11 categories in
// lib/services-data.js. cybersecurity additionally has UAE-regulatory subpages
// (NESA, PAM, etc.) that only exist under that category.
const LOCATION_SUBPAGES = ['abu-dhabi', 'dubai']

export const UAE_ONLY_SERVICE_SUBPAGES = {
  'it-consulting': new Set(LOCATION_SUBPAGES),
  'infrastructure': new Set(LOCATION_SUBPAGES),
  'elv': new Set(LOCATION_SUBPAGES),
  'managed-it': new Set(LOCATION_SUBPAGES),
  'cloud': new Set(LOCATION_SUBPAGES),
  'cybersecurity': new Set([
    'security-assessment', 'incident-response', 'compliance', 'endpoint-protection',
    'pam', 'email-security', 'microsoft-entra-id', 'nesa-compliance', ...LOCATION_SUBPAGES,
  ]),
  'email-solutions': new Set(LOCATION_SUBPAGES),
  'web-development': new Set(LOCATION_SUBPAGES),
  'software-development': new Set(LOCATION_SUBPAGES),
  'ai-solutions': new Set(LOCATION_SUBPAGES),
  'digital-marketing': new Set(LOCATION_SUBPAGES),
}

export const UAE_ONLY_BLOG_SLUGS = new Set([
  'nesa-compliance-90-days', 'nesa-vs-iso-27001', 'inside-a-nesa-audit', 'nesa-188-controls-checklist',
])

export function isUaeOnlyServiceSubpage(category, slug) {
  return UAE_ONLY_SERVICE_SUBPAGES[category]?.has(slug) ?? false
}

export function isUaeOnlyBlogSlug(slug) {
  return UAE_ONLY_BLOG_SLUGS.has(slug)
}

// Path-based form of the two checks above, for callers that only have a pathname
// (app/layout.js builds hreflang from the `x-pathname` header, not from route params).
//
// Needed because hreflang and canonical were contradicting each other: on a UAE-only
// route the ipcare.ca copy canonicalizes to ipcare.ae, yet the layout still emitted an
// `en-CA` alternate pointing at that same non-canonical .ca URL. A hreflang target that
// isn't canonical invalidates the whole cluster, so Google discarded the pair — and GSC
// confirmed the .ca domain was ranking for UAE queries ("event wifi rental uae/dubai",
// "elv security systems uae") in direct competition with ipcare.ae.
export function isUaeOnlyPath(pathname) {
  if (typeof pathname !== 'string') return false
  const segments = pathname.split('?')[0].split('#')[0].split('/').filter(Boolean)
  if (segments[0] === 'services' && segments.length === 3) {
    return isUaeOnlyServiceSubpage(segments[1], segments[2])
  }
  if (segments[0] === 'blog' && segments.length === 2) {
    return isUaeOnlyBlogSlug(segments[1])
  }
  return false
}

const CA_HOSTS = new Set(['ipcare.ca', 'www.ipcare.ca'])

export async function isCaRequest() {
  const h = await headers()
  const rawHost = (h.get('x-forwarded-host') || h.get('host') || '').toLowerCase().split(':')[0]
  return CA_HOSTS.has(rawHost)
}
