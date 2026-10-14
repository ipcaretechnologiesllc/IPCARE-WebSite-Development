import { headers } from 'next/headers'
import { articles } from '@/lib/blog-data'
import { rentalCategories, getAllProductParams } from '@/lib/rental-data'
import { serviceCategories, getAllSubpageParams } from '@/lib/services-data'
import { getAllEventSubSlugs, events as eventPortfolio } from '@/lib/event-it-data'
import { kbArticles } from '@/lib/cyber-advisory-data'
import { getAllIndustrySlugs } from '@/lib/industries-data'
import { caseStudyProjects } from '@/lib/portfolio-data'
import { narrativeCaseStudies, caseStudyPath } from '@/lib/case-studies-data'
import { products } from '@/lib/products-data'
import { isUaeOnlyServiceSubpage, isCaOnlyServiceSubpage, isUaeOnlyBlogSlug } from '@/lib/seo-region'

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
  'ipcare.ca':       'https://www.ipcare.ca',
  'www.ipcare.ca':   'https://www.ipcare.ca',
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
  '/':                                     '2026-10-12',
  '/about':                                '2026-09-24',
  '/services':                             '2026-09-23',
  '/portfolio':                            '2026-07-05',
  '/case-studies':                         '2026-09-19',
  '/products':                             '2026-07-23',
  '/rental':                               '2026-10-12',  // Abu Dhabi/Dubai computer rental section
  '/event-it':                             '2026-10-07',
  '/event-it/portfolio':                   '2026-10-07',
  '/cybersecurity-advisory':               '2026-10-12',  // lists the newest KB articles
  '/cybersecurity-advisory/knowledge-base':'2026-10-12',  // Harmony SASE guide added
  '/blog':                                 '2026-10-08',
  '/industries':                           '2026-09-23',  // description rewritten
  '/partners':                             '2026-06-10',
  '/careers':                              '2026-09-23',
  '/contact':                              '2026-09-25',
  '/terms':                                '2026-04-21',
  '/privacy-policy':                       '2026-06-11',
  '/cookie-policy':                        '2026-04-21',
}

// Advisory sub-page static dates (service pages, not time-sensitive articles)
const ADVISORY_SUB_DATES = {
  'cloud-security':       '2026-09-29',  // related-service links fixed
  'zero-trust':           '2026-09-29',
  'executive-advisory':   '2026-09-29',
  'security-automation':  '2026-09-29',
  'sase':                 '2026-10-12',  // Check Point Harmony SASE added
  'track-record':         '2026-09-29',  // description rewritten
}

// Last real content change per service category and subpage, keyed 'category' or
// 'category/subpage'. Derived 2026-10-12 from the git history of lib/services-data.js
// (comment-only edits ignored), raised to 2026-09-23 for Dubai / Abu Dhabi pages and
// the CCTV Abu Dhabi page (local-proof section, lib/local-proof.js) and to 2026-09-29
// for Cybersecurity and Incident Response (case studies, lib/case-studies-data.js).
// Bump an entry when that page's visible content changes. Toronto pages are omitted:
// they are excluded from the ipcare.ae sitemap and fall back to the default on .ca.
const SERVICE_DATES = {
  'ai-solutions':                                            '2026-06-29',
  'ai-solutions/abu-dhabi':                                  '2026-09-23',
  'ai-solutions/ai-chatbots-virtual-assistants':             '2026-09-09',
  'ai-solutions/ai-integration-custom-models':               '2026-09-09',
  'ai-solutions/ai-voice-agents':                            '2026-09-09',
  'ai-solutions/business-process-automation':                '2026-09-09',
  'ai-solutions/document-data-intelligence':                 '2026-06-29',
  'ai-solutions/dubai':                                      '2026-09-23',
  'cloud':                                                   '2026-06-26',
  'cloud/abu-dhabi':                                         '2026-09-23',
  'cloud/backup-recovery':                                   '2026-06-26',
  'cloud/dubai':                                             '2026-09-23',
  'cloud/microsoft-365':                                     '2026-09-09',
  'cloud/migration':                                         '2026-06-26',
  'cybersecurity':                                           '2026-09-29',
  'cybersecurity/abu-dhabi':                                 '2026-09-23',
  'cybersecurity/compliance':                                '2026-06-26',
  'cybersecurity/dubai':                                     '2026-09-23',
  'cybersecurity/email-security':                            '2026-09-09',
  'cybersecurity/endpoint-protection':                       '2026-09-29',
  'cybersecurity/incident-response':                         '2026-09-29',
  'cybersecurity/microsoft-entra-id':                        '2026-06-26',
  'cybersecurity/nesa-compliance':                           '2026-09-29',
  'cybersecurity/pam':                                       '2026-06-26',
  'cybersecurity/security-assessment':                       '2026-06-26',
  'digital-marketing':                                       '2026-07-01',
  'digital-marketing/abu-dhabi':                             '2026-09-29',
  'digital-marketing/dubai':                                 '2026-09-23',
  'digital-marketing/email-marketing':                       '2026-07-01',
  'digital-marketing/sem-ppc':                               '2026-07-01',
  'digital-marketing/seo-services':                          '2026-09-29',
  'digital-marketing/social-media-marketing':                '2026-07-01',
  'elv':                                                     '2026-06-26',
  'elv/abu-dhabi':                                           '2026-09-23',
  'elv/access-control':                                      '2026-10-12',
  'elv/cctv-installation-abu-dhabi':                         '2026-09-23',
  'elv/cctv-systems':                                        '2026-06-26',
  'elv/dubai':                                               '2026-09-23',
  'elv/gate-barriers':                                       '2026-06-26',
  'elv/intercom-systems':                                    '2026-06-26',
  'elv/public-address-systems':                              '2026-06-26',
  'elv/structured-cabling':                                  '2026-06-26',
  'email-solutions':                                         '2026-06-26',
  'email-solutions/abu-dhabi':                               '2026-09-23',
  'email-solutions/dubai':                                   '2026-09-23',
  'email-solutions/email-hosting':                           '2026-06-10',
  'email-solutions/google-workspace':                        '2026-06-10',
  'email-solutions/hybrid':                                  '2026-06-10',
  'infrastructure':                                          '2026-06-26',
  'infrastructure/abu-dhabi':                                '2026-09-23',
  'infrastructure/data-centre-management':                   '2026-06-10',
  'infrastructure/dubai':                                    '2026-09-23',
  'infrastructure/hardware-procurement':                     '2026-06-10',
  'infrastructure/virtualization':                           '2026-06-10',
  'it-consulting':                                           '2026-08-24',
  'it-consulting/abu-dhabi':                                 '2026-09-23',
  'it-consulting/digital-transformation':                    '2026-06-26',
  'it-consulting/dubai':                                     '2026-09-23',
  'it-consulting/it-assessment':                             '2026-08-24',
  'it-consulting/technology-strategy':                       '2026-08-24',
  'managed-it':                                              '2026-06-26',
  'managed-it/abu-dhabi':                                    '2026-09-23',
  'managed-it/dubai':                                        '2026-09-23',
  'managed-it/it-support-helpdesk':                          '2026-06-26',
  'managed-it/network-management':                           '2026-06-26',
  'managed-it/server-management':                            '2026-06-26',
  'managed-it/sla':                                          '2026-09-29',
  'software-development':                                    '2026-07-01',
  'software-development/abu-dhabi':                          '2026-09-23',
  'software-development/api-systems-integration':            '2026-06-29',
  'software-development/custom-software-development':        '2026-06-29',
  'software-development/dubai':                              '2026-09-23',
  'software-development/enterprise-application-development': '2026-06-29',
  'software-development/mobile-app-development':             '2026-06-29',
  'software-development/saas-cloud-product-development':     '2026-06-29',
  'web-development':                                         '2026-07-01',
  'web-development/abu-dhabi':                               '2026-09-23',
  'web-development/cms-portal-development':                  '2026-06-30',
  'web-development/custom-website-development':              '2026-06-30',
  'web-development/dubai':                                   '2026-09-23',
  'web-development/ecommerce-development':                   '2026-06-30',
  'web-development/web-application-development':             '2026-06-30',
  'web-development/website-care-maintenance':                '2026-06-29',
}

// Industry pages: last visible content change per page, from git history of
// lib/industries-data.js (2026-09-29: Healthcare and Government titles and description
// rewritten; Banking last edited 2026-06-10).
const INDUSTRY_DATES = {
  'healthcare': '2026-09-29',
  'banking':    '2026-06-10',
  'government': '2026-09-29',
}

// Rental lastmod. Every rental category and product page shows its rates, and all rates
// changed on 2026-10-08, so that is the floor for the whole section. RENTAL_DATES holds
// later per-page edits, keyed by category slug or 'category/product'. Bump these when a
// rental page's visible content changes: a date that never moves tells Google nothing.
const RENTAL_LASTMOD = '2026-10-08'
const RENTAL_DATES = {
  'event-wifi':                        '2026-10-14',
  'servers':                           '2026-10-12',
  'servers/dell-r740':                 '2026-10-12',
  'macbooks':                          '2026-10-12',
  'laptops-desktops':                  '2026-10-12',
  'laptops-desktops/apple-imac-24-m4': '2026-10-12',
  'tablets-ipads':                     '2026-10-12',
  'printers':                          '2026-10-12',
  // Testing instruments and the testing-kit bundle repriced 2026-10-12.
  'testing-equipment':                          '2026-10-12',
  'testing-equipment/fluke-dsx-5000':           '2026-10-12',
  'testing-equipment/afl-noyes-m210-otdr':      '2026-10-12',
  'testing-equipment/fiber-splicing-machine':   '2026-10-12',
  'bundles':                                    '2026-10-12',
  'bundles/network-testing-kit':                '2026-10-12',
  // Product write-ups added 2026-10-13 (laptops, event WiFi, networking, bundles).
  'laptops-desktops/dell-latitude-5450':            '2026-10-13',
  'laptops-desktops/hp-elitebook-845-g11':          '2026-10-13',
  'laptops-desktops/lenovo-thinkpad-x1-carbon':     '2026-10-13',
  'laptops-desktops/dell-optiplex-7020':            '2026-10-13',
  'event-wifi/aruba-ap-635-wifi6e':                 '2026-10-13',
  'event-wifi/unifi-u6-pro':                        '2026-10-14',
  'event-wifi/unifi-uap-ac-pro':                    '2026-10-14',
  'event-wifi/ruckus-r770-wifi7':                   '2026-10-13',
  'event-wifi/unifi-e7':                            '2026-10-13',
  'event-wifi/ubiquiti-udm-pro-max':                '2026-10-13',
  'event-wifi/fortigate-200e':                      '2026-10-13',
  'networking':                                     '2026-10-14',
  'networking/aruba-cx-6300m-48g':                  '2026-10-14',
  'networking/cisco-c9300-48':                      '2026-10-13',
  'networking/fortinet-fortigate-100f':             '2026-10-13',
  'networking/palo-alto-pa-440':                    '2026-10-13',
  'networking/juniper-ex4400-24p':                  '2026-10-13',
  'networking/netgear-m4350-48x4v':                 '2026-10-13',
  'bundles/event-10-person':                        '2026-10-13',
  'bundles/conference-room-pack':                   '2026-10-13',
}

// /services/email-solutions/microsoft-365 is a 308 redirect to /services/cloud/microsoft-365.
// Exclude the redirect source so only the canonical URL appears in the sitemap.
const SITEMAP_EXCLUDE = new Set(['/services/email-solutions/microsoft-365'])

// Force dynamic so the sitemap is generated per-request and can read the host header.
// (Without this, Next.js would pre-render the sitemap once at build time and the
//  same XML would be served on every domain — defeating the multi-domain strategy.)
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function sitemap() {
  const h = await headers()
  const rawHost = (h.get('x-forwarded-host') || h.get('host') || '').toLowerCase().split(':')[0]
  const BASE = (CANONICAL_DOMAINS[rawHost] || process.env.NEXT_PUBLIC_BASE_URL || DEFAULT_BASE).replace(/\/$/, '')
  // UAE-only content cross-canonicalizes to ipcare.ae (see lib/seo-region.js) — a
  // non-canonical URL should not appear in the ipcare.ca sitemap.
  const isCaSitemap = BASE === 'https://www.ipcare.ca'

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
    ['/portfolio', P_HUB, 'monthly'],
    ['/case-studies', P_HUB, 'monthly'],
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

  // Products — software products built by IP Care (CrewForce360, DocPilot).
  // These routes build and return 200 and are linked from the Header nav, but were
  // never added here or to llms.txt, so Google was never told they exist.
  entries.push({ url: `${BASE}/products`, lastModified: HUB_DATES['/products'], changeFrequency: 'monthly', priority: P_CATEGORY })
  for (const slug of Object.keys(products || {})) {
    entries.push({ url: `${BASE}/products/${slug}`, lastModified: HUB_DATES['/products'], changeFrequency: 'monthly', priority: P_DETAIL })
  }

  // Services — categories + subpages
  // /services/digital-solutions is a standalone page (not part of serviceCategories),
  // so the loop below never emitted it. Same orphaning as /products above.
  entries.push({ url: `${BASE}/services/digital-solutions`, lastModified: '2026-09-23', changeFrequency: 'monthly', priority: P_CATEGORY })
  for (const slug of Object.keys(serviceCategories || {})) {
    entries.push({ url: `${BASE}/services/${slug}`, lastModified: SERVICE_DATES[slug] || '2026-09-23', changeFrequency: 'monthly', priority: P_CATEGORY })
  }
  for (const { category, slug } of getAllSubpageParams() || []) {
    const path = `/services/${category}/${slug}`
    if (SITEMAP_EXCLUDE.has(path)) continue  // Fix 2.3: skip redirect source
    if (isCaSitemap && isUaeOnlyServiceSubpage(category, slug)) continue  // canonicalizes to ipcare.ae
    if (!isCaSitemap && isCaOnlyServiceSubpage(category, slug)) continue  // Toronto pages: noindex on ipcare.ae
    entries.push({ url: `${BASE}${path}`, lastModified: SERVICE_DATES[`${category}/${slug}`] || '2026-09-23', changeFrequency: 'monthly', priority: P_DETAIL })
  }

  // Rental — categories + products
  for (const slug of Object.keys(rentalCategories || {})) {
    entries.push({ url: `${BASE}/rental/${slug}`, lastModified: RENTAL_DATES[slug] || RENTAL_LASTMOD, changeFrequency: 'monthly', priority: P_CATEGORY })
  }
  for (const { category, product } of getAllProductParams() || []) {
    entries.push({ url: `${BASE}/rental/${category}/${product}`, lastModified: RENTAL_DATES[`${category}/${product}`] || RENTAL_LASTMOD, changeFrequency: 'monthly', priority: P_DETAIL })
  }

  // Event IT — only slugs that have a built subpage (getAllEventSubSlugs = Object.keys(subpages)).
  // Previously this also looped over the raw `events` array, which emitted 4 slugs that exist
  // in the portfolio data but have no page route — causing live sitemap 404s. Removed that loop.
  // Lastmod: use the event's endDate when slug matches a portfolio event; fall back to service-page
  // 2026-09-29 floor for service sub-pages (event-wifi, temporary-data-centres, event-cctv).
  for (const slug of getAllEventSubSlugs() || []) {
    // event end dates predate the pages' last content edits (links/schema 2026-09-29; UFC and SuperCup rewrites 2026-10-07)
    const lastMod = [eventEndDateMap[slug], '2026-09-29'].filter(Boolean).sort().pop()
    entries.push({ url: `${BASE}/event-it/${slug}`, lastModified: lastMod, changeFrequency: 'monthly', priority: P_DETAIL })
  }

  // Cybersecurity Advisory — fixed subroutes
  const advisoryFixed = ['cloud-security', 'zero-trust', 'executive-advisory', 'security-automation', 'sase', 'track-record']
  for (const slug of advisoryFixed) {
    entries.push({ url: `${BASE}/cybersecurity-advisory/${slug}`, lastModified: ADVISORY_SUB_DATES[slug] || '2026-09-29', changeFrequency: 'monthly', priority: P_CATEGORY })
  }
  for (const art of kbArticles || []) {
    if (art?.slug) {
      const lastMod = [parseKbDate(art.updatedDate || art.date), '2026-07-15'].sort().pop()
      entries.push({ url: `${BASE}/cybersecurity-advisory/knowledge-base/${art.slug}`, lastModified: lastMod, changeFrequency: 'monthly', priority: P_DETAIL })
    }
  }

  // Blog — articles (use real publish date as lastmod)
  for (const a of articles || []) {
    if (isCaSitemap && isUaeOnlyBlogSlug(a.slug)) continue  // canonicalizes to ipcare.ae
    // updatedDate (lib/blog-data.js) is the last content change; falls back to the publish date.
    const lastMod = parseBlogDate(a.updatedDate || a.date) || now
    entries.push({ url: `${BASE}/blog/${a.slug}`, lastModified: lastMod, changeFrequency: 'monthly', priority: P_DETAIL })
  }

  // Portfolio — project case-study detail pages
  for (const project of caseStudyProjects || []) {
    entries.push({ url: `${BASE}/portfolio/${project.slug}`, lastModified: HUB_DATES['/portfolio'] || '2026-07-05', changeFrequency: 'monthly', priority: P_DETAIL })
  }

  // Narrative case studies — hung off their parent service subpage. They inherit
  // that parent's UAE-only treatment, so a UAE-only parent keeps its children out
  // of the ipcare.ca sitemap too (see lib/seo-region.js).
  for (const study of narrativeCaseStudies || []) {
    if (isCaSitemap && isUaeOnlyServiceSubpage(study.category, study.parent)) continue
    entries.push({ url: `${BASE}${caseStudyPath(study)}`, lastModified: study.datePublished || '2026-09-19', changeFrequency: 'monthly', priority: P_DETAIL })
  }

  // Industries — sector pages
  for (const slug of getAllIndustrySlugs() || []) {
    entries.push({ url: `${BASE}/industries/${slug}`, lastModified: INDUSTRY_DATES[slug] || '2026-09-23', changeFrequency: 'monthly', priority: P_CATEGORY })
  }

  // Legal
  const legal = ['/terms', '/privacy-policy', '/cookie-policy']
  for (const p of legal) entries.push({ url: `${BASE}${p}`, lastModified: HUB_DATES[p] || '2026-06-11', changeFrequency: 'yearly', priority: P_LEGAL })

  // Dedupe by url (last wins)
  const map = new Map()
  for (const e of entries) map.set(e.url, e)
  return Array.from(map.values())
}
