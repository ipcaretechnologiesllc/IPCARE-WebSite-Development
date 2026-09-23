// No `next/headers` import here, on purpose. This module is imported by the root
// layout's hreflang component (a Client Component) and by page metadata. Reading
// request headers in a layout or page opts the entire app out of static rendering
// — every page was being server-rendered on every request, 2–7s on Hostinger.

// The canonical base for THIS deployment, fixed at build time. Each Hostinger
// account builds its own copy of the codebase, so set NEXT_PUBLIC_BASE_URL per
// account (www.ipcare.ae / www.ipcare.ca); unset means the UAE site.
export const SITE_URL = (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae').replace(/\/+$/, '')

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
  'elv': new Set([...LOCATION_SUBPAGES, 'cctv-installation-abu-dhabi']),
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

// Mirror image of the UAE-only set: the /services/<category>/toronto location pages.
// On the .ae build they are kept reachable but noindexed and left out of the sitemap —
// ipcare.ae targets UAE search, and in Search Console none of them earned a click.
// Canada clicks to ipcare.ae come from brand searches on the homepage, not these pages.
export function isCaOnlyServiceSubpage(category, slug) {
  return slug === 'toronto'
}

export function isUaeOnlyServiceSubpage(category, slug) {
  return UAE_ONLY_SERVICE_SUBPAGES[category]?.has(slug) ?? false
}

export function isUaeOnlyBlogSlug(slug) {
  return UAE_ONLY_BLOG_SLUGS.has(slug)
}

// Path-based form of the two checks above, for callers that only have a pathname
// (components/site/HreflangLinks.jsx builds hreflang from usePathname(), not from route params).
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
  // Narrative case studies hang one level below a service subpage
  // (/services/cybersecurity/incident-response/case-study-session-theft) and
  // inherit that parent's treatment. Without this, a child of a UAE-only parent
  // would self-canonicalize on ipcare.ca and re-open the duplicate-content
  // split the 3-segment branch above exists to close.
  if (segments[0] === 'services' && segments.length === 4) {
    return isUaeOnlyServiceSubpage(segments[1], segments[2])
  }
  if (segments[0] === 'blog' && segments.length === 2) {
    return isUaeOnlyBlogSlug(segments[1])
  }
  return false
}

// True when this build serves the Canada site. Build-time, not per-request — see SITE_URL.
export function isCaSite() {
  return /(^|\.)ipcare\.ca$/.test(new URL(SITE_URL).hostname)
}

// Whether www.ipcare.ca is actually being served. It is not as of 2026-09-23, and the
// .ae build was emitting an `en-CA` hreflang to it on every page — an alternate that
// can't return a reciprocal tag, so Google drops the pair, while still reading the
// .ae site as half-Canadian. When .ca is re-hosted, set NEXT_PUBLIC_CA_SITE_LIVE=true
// on the .ae build to bring the en-CA alternates back. A .ca build is live by definition.
export const CA_SITE_LIVE = process.env.NEXT_PUBLIC_CA_SITE_LIVE === 'true' || isCaSite()

// Coverage wording for rental pages. The .ae build targets UAE searchers, and Search
// Console shows them typing cities ("rent macbook dubai", "rent ipad abu dhabi",
// "imac rental dubai"), not "UAE & Canada". The .ca build keeps its original wording.
//   short → H1s, badges ("MacBook & Mac Rental, Dubai & Abu Dhabi")
//   prose → sentences ("in Dubai, Abu Dhabi and across the UAE")
export const RENTAL_REGION = isCaSite()
  ? { short: 'UAE & Canada', prose: 'UAE and Canada' }
  : { short: 'Dubai & Abu Dhabi', prose: 'Dubai, Abu Dhabi and across the UAE' }

// Titles and meta descriptions across the site were written for both domains
// ("Zero Trust Consulting UAE & Canada", "IT services across UAE and Canada"). The .ae
// site targets UAE search, so on the .ae build this narrows them to the UAE; the .ca
// build gets the text unchanged. Titles use "&", prose uses "and":
//   'Executive Advisory UAE & Canada | IP Care' → 'Executive Advisory UAE | IP Care'
//   'consulting in UAE and Canada.'             → 'consulting in the UAE.'
export function uaeFocus(text) {
  if (isCaSite() || typeof text !== 'string') return text
  return text
    .replace(/\bUAE\s*&\s*Canada\b/g, 'UAE')
    .replace(/\b(?:the\s+)?UAE and Canada\b/g, 'the UAE')
}
