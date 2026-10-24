import { headers } from 'next/headers'
import { serviceCategories } from '@/lib/services-data'
import { rentalCategories } from '@/lib/rental-data'
import { events, subpages as eventSubpages } from '@/lib/event-it-data'
import { industries } from '@/lib/industries-data'
import { portfolioProjects, caseStudyProjects } from '@/lib/portfolio-data'
import { narrativeCaseStudies, caseStudyPath } from '@/lib/case-studies-data'
import { kbArticles } from '@/lib/cyber-advisory-data'
import { articles, getKeyTakeaways } from '@/lib/blog-data'
import { isCaSite, uaeFocus } from '@/lib/seo-region'

// Long-form companion to /llms.txt (llmstxt.org convention): the facts, services, FAQs,
// prices and case studies an AI assistant needs to answer questions about IP Care without
// crawling 250 pages. Generated from the same lib/*-data.js modules the pages render, so it
// never describes content that isn't on the site. Same per-domain base as app/llms.txt.
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

// Data fields are a mix of strings, string arrays and {q, a} objects; flatten to plain text.
const text = (v) => {
  if (!v) return ''
  if (typeof v === 'string') return uaeFocus(v).replace(/\s+/g, ' ').trim()
  if (Array.isArray(v)) return v.map(text).filter(Boolean).join(' ')
  if (typeof v === 'object') return text(v.text || v.body || v.p || v.description || '')
  return String(v)
}
const faqBlock = (faqs) => (Array.isArray(faqs) ? faqs : [])
  .filter((f) => f && f.q && f.a)
  .map((f) => `**Q: ${text(f.q)}**\nA: ${text(f.a)}`)
  .join('\n\n')
const bullets = (items) => (Array.isArray(items) ? items : []).map((i) => `- ${text(i)}`).filter((l) => l.length > 2).join('\n')
const aed = (n) => (typeof n === 'number' ? `AED ${n.toLocaleString('en-US')}` : '')

function servicesSection(BASE, ca) {
  return Object.entries(serviceCategories).map(([slug, cat]) => {
    const subs = Object.entries(cat.subpages || {})
      // Toronto pages belong to the .ca build; the .ae file stays UAE-only.
      .filter(([sub]) => ca || !sub.includes('toronto'))
    const subList = subs.map(([sub, p]) => `- [${text(p.h1) || text(p.title)}](${BASE}/services/${slug}/${sub}): ${text(p.metaDescription)}`).join('\n')
    const subFaqs = subs.map(([sub, p]) => {
      const f = faqBlock(p.faqs)
      return f ? `#### ${text(p.h1) || text(p.title)} (${BASE}/services/${slug}/${sub})\n\n${f}` : ''
    }).filter(Boolean).join('\n\n')
    return [
      `### ${cat.name}`,
      `URL: ${BASE}/services/${slug}`,
      text(cat.metaDescription),
      text(cat.overview),
      subList && `Pages in this service:\n${subList}`,
      faqBlock(cat.faqs) && `FAQs:\n\n${faqBlock(cat.faqs)}`,
      subFaqs,
    ].filter(Boolean).join('\n\n')
  }).join('\n\n')
}

function rentalSection(BASE) {
  return Object.entries(rentalCategories).map(([slug, cat]) => {
    const products = (cat.products || []).map((p) => {
      const r = p.rates || {}
      const rates = [r.daily && `${aed(r.daily)}/day`, r.weekly && `${aed(r.weekly)}/week`, r.monthly && `${aed(r.monthly)}/month`].filter(Boolean).join(', ')
      return `- [${p.brand} ${p.model}](${BASE}/rental/${slug}/${p.slug}): ${(p.specs || []).join('; ')}${rates ? `. Rates: ${rates}` : ''}`
    }).join('\n')
    return [`### ${cat.name}`, `URL: ${BASE}/rental/${slug}`, text(cat.description), products].filter(Boolean).join('\n\n')
  }).join('\n\n')
}

function eventSection(BASE) {
  const record = events.map((e) => `- ${e.name} (${e.year}, ${e.location}): ${text(e.tech)}`).join('\n')
  const pages = Object.entries(eventSubpages).map(([slug, p]) => `- [${text(p.h1) || text(p.title)}](${BASE}/event-it/${slug}): ${text(p.metaDescription)}`).join('\n')
  return [`URL: ${BASE}/event-it`, `Event IT track record:\n${record}`, `Event IT pages:\n${pages}`].join('\n\n')
}

function caseStudySection(BASE) {
  const narrative = narrativeCaseStudies.map((s) => [
    // The SEO title says what the study is about; drop its "| IP Care UAE" suffix.
    `### ${text(s.title).replace(/\s*\|.*$/, '')}`,
    `URL: ${BASE}${caseStudyPath(s)}`,
    text(s.metaDescription),
    text(s.lede),
    faqBlock(s.faq),
  ].filter(Boolean).join('\n\n')).join('\n\n')
  const delivery = caseStudyProjects.map((p) => [
    `### ${p.name}`,
    `URL: ${BASE}/portfolio/${p.slug}`,
    [p.type, p.location, p.year].filter(Boolean).join(' · '),
    text(p.proofPoint),
    text(p.outcome),
  ].filter(Boolean).join('\n\n')).join('\n\n')
  const projects = portfolioProjects.map((p) => `- ${p.name} (${[p.type, p.location, p.year].filter(Boolean).join(', ')}): ${text(p.proofPoint)}`).join('\n')
  return [narrative, delivery, `### Delivery portfolio (${BASE}/portfolio)\n\n${projects}`].filter(Boolean).join('\n\n')
}

function industriesSection(BASE) {
  return Object.values(industries).map((ind) => [
    `### ${ind.name}`,
    `URL: ${BASE}/industries/${ind.slug}`,
    text(ind.metaDescription),
    faqBlock(ind.faqs),
  ].filter(Boolean).join('\n\n')).join('\n\n')
}

function articlesSection(BASE) {
  const kb = kbArticles.map((a) => [
    `### ${a.title}`,
    `URL: ${BASE}/cybersecurity-advisory/knowledge-base/${a.slug}`,
    text(a.excerpt),
    bullets(a.keyTakeaways),
  ].filter(Boolean).join('\n\n')).join('\n\n')
  const blog = articles.map((a) => [
    `### ${a.title}`,
    `URL: ${BASE}/blog/${a.slug}`,
    text(a.excerpt),
    bullets(getKeyTakeaways(a.slug)),
  ].filter(Boolean).join('\n\n')).join('\n\n')
  return `## Cybersecurity knowledge base\n\n${kb}\n\n## Blog\n\n${blog}`
}

export async function GET() {
  const h = await headers()
  const rawHost = (h.get('x-forwarded-host') || h.get('host') || '').toLowerCase().split(':')[0]
  const BASE = (CANONICAL_DOMAINS[rawHost] || process.env.NEXT_PUBLIC_BASE_URL || DEFAULT_BASE).replace(/\/$/, '')
  const ca = isCaSite()

  const body = `# IP Care Technologies: full reference

> ${uaeFocus('Managed IT, cybersecurity, cloud, ELV/physical security, event IT, and IT equipment rental services for businesses in the UAE and Canada.')} Short index: ${BASE}/llms.txt

## Company facts
- Legal name: IP Care Technologies LLC
- Founded: 2003; head office in Abu Dhabi, UAE (Salam Street, PO Box 53209)
- Serves: Dubai, Abu Dhabi and the wider UAE, plus GCC event and enterprise projects${ca ? '; Toronto, Canada (40 Wynford Drive, Suite 200B, North York)' : ''}
- Phone: +971 2 676 6935 · WhatsApp: +971 50 682 8290 · Email: info@ipcare.ae${ca ? ' · Canada: +1 416 786 0782, info@ipcare.ca' : ''}
- Contact form: ${BASE}/contact · Call-back requests are answered within 4 business hours (UAE 09:00-18:00)

## Services

${servicesSection(BASE, ca)}

## IT equipment rental

Rental includes delivery and setup in Dubai and Abu Dhabi. Rates are listed per item; quotes for multi-item or GCC projects are per project.

${rentalSection(BASE)}

## Event IT

${eventSection(BASE)}

## Case studies

${caseStudySection(BASE)}

## Industries

${industriesSection(BASE)}

${articlesSection(BASE)}

## Sitemap
${BASE}/sitemap.xml
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
