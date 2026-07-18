import { headers } from 'next/headers'

// Content that is inherently UAE-jurisdiction-specific (UAE regulatory frameworks,
// UAE-only location pages) but gets duplicated byte-for-byte onto ipcare.ca via the
// shared lib/*-data.js content modules. Google was indexing only the ipcare.ae copy
// and leaving the ipcare.ca copy "Crawled - currently not indexed" (duplicate content
// across the en-AE/en-CA hreflang pair). On ipcare.ca, these routes canonicalize to
// their ipcare.ae original instead of self, and are excluded from the ipcare.ca sitemap,
// so Google stops treating the .ca copy as a competing index candidate.
export const UAE_ONLY_SERVICE_SUBPAGES = {
  cybersecurity: new Set([
    'security-assessment', 'incident-response', 'compliance', 'endpoint-protection',
    'pam', 'email-security', 'microsoft-entra-id', 'nesa-compliance', 'abu-dhabi', 'dubai',
  ]),
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

const CA_HOSTS = new Set(['ipcare.ca', 'www.ipcare.ca'])

export async function isCaRequest() {
  const h = await headers()
  const rawHost = (h.get('x-forwarded-host') || h.get('host') || '').toLowerCase().split(':')[0]
  return CA_HOSTS.has(rawHost)
}
