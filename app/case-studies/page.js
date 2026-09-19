import Link from 'next/link'
import { ChevronRight, ArrowRight } from 'lucide-react'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import { caseStudyProjects, portfolioStats } from '@/lib/portfolio-data'
import { narrativeCaseStudies, caseStudyPath } from '@/lib/case-studies-data'
import { getEventSubpage } from '@/lib/event-it-data'

// Master proof index. This page LISTS case studies and links out to wherever
// each one already lives — it never duplicates their content.
//
// Case studies are deliberately scattered by discipline: delivery projects sit
// under /portfolio, event work under /event-it, and narrative cybersecurity
// engagements under their parent service page. That is right for topical
// relevance and wrong for browsing, so this page is the one place a visitor
// can see all the proof at once. Keep it a directory, not a second /portfolio.

export const revalidate = 3600

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae'

const NAVY = '#0B1A46'
const ORANGE = '#E87722'
const BODY = '#4B5563'
const MUTED = '#6B7280'
const LINE = '#E3E9EF'
const TINT = '#F4F6FA'

export const metadata = {
  title: 'Case Studies — Delivery & Incident Response Proof | IP Care',
  description:
    'Every IP Care case study in one place: enterprise ICT and ELV delivery, major-event IT infrastructure, and cybersecurity incident response — with the scope, the method and the outcome for each.',
  alternates: { canonical: '/case-studies' },
  openGraph: {
    title: 'Case Studies — Delivery & Incident Response Proof | IP Care',
    description:
      'Enterprise ICT and ELV delivery, major-event IT infrastructure and cybersecurity incident response — IP Care case studies in one index.',
    url: `${BASE}/case-studies`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Studies — Delivery & Incident Response Proof | IP Care',
    description: 'Enterprise delivery, event IT and incident response case studies from IP Care Technologies.',
  },
}

// One shape for every card, whatever module it came from.
function buildEntries() {
  const security = narrativeCaseStudies.map((study) => ({
    href: caseStudyPath(study),
    title: study.card.title,
    summary: study.card.summary,
    tag: study.card.tag,
    meta: study.card.sector,
    group: 'Cybersecurity & incident response',
  }))

  const delivery = caseStudyProjects.map((project) => ({
    href: `/portfolio/${project.slug}`,
    title: project.name,
    summary: project.proofPoint,
    tag: project.type,
    meta: [project.location, project.deliveredYear].filter(Boolean).join(' · '),
    group: 'Enterprise delivery & ELV',
  }))

  // Only FIFA Club World Cup has a built /event-it/[slug] case-study route;
  // the rest of the event record lives on /event-it/portfolio. Linking a slug
  // without a page would put a 404 in the index, so it is gated on the lookup.
  const fifa = getEventSubpage('fifa-club-world-cup')
  const events = fifa
    ? [{
        href: '/event-it/fifa-club-world-cup',
        title: 'FIFA Club World Cup',
        summary:
          'Temporary data centre, 400+ Wi-Fi access points, a 50 Gbps edge uplink, broadcast LAN and a tournament SOC across six venues for ten days.',
        tag: 'Event IT',
        meta: 'Abu Dhabi, UAE · 2022',
        group: 'Major events',
      }]
    : []

  return [...security, ...delivery, ...events]
}

export default function CaseStudiesPage() {
  const entries = buildEntries()
  const groups = [...new Set(entries.map((e) => e.group))]

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
      { '@type': 'ListItem', position: 2, name: 'Case Studies', item: `${BASE}/case-studies` },
    ],
  }

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${BASE}/case-studies#webpage`,
    name: 'IP Care Technologies Case Studies',
    description: metadata.description,
    url: `${BASE}/case-studies`,
    inLanguage: 'en',
    // Hardcoded to match app/layout.js's BRAND_URL-anchored Organization @id.
    publisher: { '@id': 'https://www.ipcare.ae#org' },
    mainEntity: {
      '@type': 'ItemList',
      name: 'IP Care case studies',
      itemListElement: entries.map((entry, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: entry.title,
        url: `${BASE}${entry.href}`,
      })),
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <Header />

      <main>
        <section className="relative overflow-hidden" style={{ background: NAVY }}>
          <div
            className="absolute inset-0 opacity-[0.07]"
            aria-hidden="true"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
              backgroundSize: '44px 44px',
            }}
          />
          <div className="relative max-w-[1140px] mx-auto px-6 py-14 sm:py-16 lg:py-20">
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-white/70">
              <Link href="/" className="transition hover:text-white">Home</Link>
              <ChevronRight size={14} className="text-white/40" />
              <span className="font-semibold text-white">Case Studies</span>
            </nav>
            <p className="text-[12px] font-bold uppercase mb-3" style={{ letterSpacing: '0.16em', color: '#FF9455' }}>
              Proof of delivery
            </p>
            <h1
              className="text-white font-extrabold max-w-[20ch]"
              style={{ fontSize: 'clamp(2rem, 4.6vw, 3rem)', lineHeight: 1.15, letterSpacing: '-0.02em' }}
            >
              Case studies
            </h1>
            <p className="mt-5 max-w-[64ch] text-[#C6D6E6]" style={{ fontSize: 'clamp(1rem, 1.7vw, 1.15rem)', lineHeight: 1.7 }}>
              Enterprise ICT and ELV delivery, major-event IT infrastructure, and cybersecurity incident
              response. Each one sets out the scope, the method and what was actually handed over.
            </p>
          </div>
        </section>

        {/* Credibility band — an index of anonymized and named work still has to
            establish who is doing it. Numbers reused from portfolioStats so the
            claims stay in one place. */}
        <section style={{ background: '#FFFFFF', padding: '40px 24px', borderBottom: `1px solid ${LINE}` }}>
          <div className="max-w-[1140px] mx-auto grid grid-cols-2 gap-6 lg:grid-cols-4">
            {portfolioStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="font-extrabold"
                  style={{ color: NAVY, fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', letterSpacing: '-0.02em' }}
                >
                  {stat.value}
                </div>
                <div
                  className="mt-1 text-[11px] font-bold uppercase"
                  style={{ letterSpacing: '0.12em', color: MUTED }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: TINT, padding: '72px 24px' }}>
          <div className="max-w-[1140px] mx-auto space-y-14">
            {groups.map((group) => (
              <div key={group}>
                <h2
                  className="font-extrabold"
                  style={{ color: NAVY, fontSize: 'clamp(1.35rem, 2.4vw, 1.75rem)', letterSpacing: '-0.02em' }}
                >
                  {group}
                </h2>
                <div className="mt-2 h-[3px] w-14 rounded" style={{ background: ORANGE }} aria-hidden="true" />

                <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {entries.filter((e) => e.group === group).map((entry) => (
                    <Link
                      key={entry.href}
                      href={entry.href}
                      className="group flex flex-col rounded-2xl bg-white p-6 transition hover:-translate-y-0.5"
                      style={{ border: `1px solid ${LINE}` }}
                    >
                      <span
                        className="inline-flex w-fit rounded-full px-3 py-1 text-[11px] font-bold uppercase"
                        style={{ letterSpacing: '0.1em', background: 'rgba(232,119,34,0.10)', color: ORANGE }}
                      >
                        {entry.tag}
                      </span>
                      <h3 className="mt-4 font-bold" style={{ color: NAVY, fontSize: '1.08rem', lineHeight: 1.35 }}>
                        {entry.title}
                      </h3>
                      {entry.meta && (
                        <p className="mt-1.5 text-[13px]" style={{ color: MUTED }}>{entry.meta}</p>
                      )}
                      <p className="mt-3 flex-1 text-[15px]" style={{ color: BODY, lineHeight: 1.65 }}>
                        {entry.summary}
                      </p>
                      <span
                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold"
                        style={{ color: ORANGE }}
                      >
                        Read the case study <ArrowRight size={14} />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div className="rounded-2xl p-8 lg:p-11" style={{ background: NAVY }}>
              <h2 className="font-extrabold text-white" style={{ fontSize: 'clamp(1.3rem, 2.4vw, 1.7rem)', lineHeight: 1.25 }}>
                More delivery proof
              </h2>
              <p className="mt-3 max-w-[62ch] text-[#C6D6E6]" style={{ lineHeight: 1.7 }}>
                The full project record — over 500 deliveries across enterprise facilities, ELV and security,
                structured cabling and network infrastructure — sits on the delivery portfolio. Major-event
                work has its own record.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5"
                  style={{ background: ORANGE }}
                >
                  Delivery portfolio <ArrowRight size={15} />
                </Link>
                <Link
                  href="/event-it/portfolio"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Event IT portfolio <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
