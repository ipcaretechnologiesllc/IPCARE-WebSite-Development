import Link from 'next/link'
import { notFound } from 'next/navigation'
import * as Icons from 'lucide-react'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import CTAPhoneButtons from '@/components/site/CTAPhoneButtons'
import { kbArticles, getKbArticle, getKbSlugs } from '@/lib/cyber-advisory-data'

export const revalidate = 3600
export const dynamicParams = false

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae'

// 'May 2025' -> ISO date (first of month) for schema / OG timestamps
function toISO(monthYear) {
  if (!monthYear) return undefined
  const months = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 }
  const [m, y] = String(monthYear).trim().split(/\s+/)
  const mi = months[(m || '').slice(0, 3).toLowerCase()]
  if (mi === undefined || !y) return undefined
  return new Date(Date.UTC(Number(y), mi, 1)).toISOString()
}

export async function generateStaticParams() {
  return getKbSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata(props) {
  const params = await props.params
  const a = getKbArticle(params.slug)
  if (!a) return {}
  return {
    title: a.seoTitle || `${a.title} | IP Care Cyber Advisory`,
    description: a.excerpt,
    alternates: { canonical: `/cybersecurity-advisory/knowledge-base/${a.slug}` },
    openGraph: {
      title: a.title,
      description: a.excerpt,
      url: `${BASE}/cybersecurity-advisory/knowledge-base/${a.slug}`,
      type: 'article',
      publishedTime: toISO(a.date),
      modifiedTime: toISO(a.updatedDate || a.date),
      authors: [a.author],
    },
  }
}

export default async function KnowledgeBaseArticlePage(props) {
  const params = await props.params
  const a = getKbArticle(params.slug)
  if (!a) notFound()

  // Related: same category first, then fill from others — 3 total
  const sameCat = kbArticles.filter((x) => x.slug !== a.slug && x.category === a.category)
  const others = kbArticles.filter((x) => x.slug !== a.slug && x.category !== a.category)
  const related = [...sameCat, ...others].slice(0, 3)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: a.title,
    description: a.excerpt,
    datePublished: toISO(a.date),
    dateModified: toISO(a.updatedDate || a.date),
    // Honest authorship: house byline maps to the organization, not a named person.
    author: { '@type': 'Organization', name: 'IP Care Technologies L.L.C.', url: BASE },
    publisher: { '@type': 'Organization', name: 'IP Care Technologies L.L.C.', url: BASE },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/cybersecurity-advisory/knowledge-base/${a.slug}` },
    articleSection: a.category,
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
      { '@type': 'ListItem', position: 2, name: 'Cybersecurity Advisory', item: `${BASE}/cybersecurity-advisory` },
      { '@type': 'ListItem', position: 3, name: 'Knowledge Base', item: `${BASE}/cybersecurity-advisory/knowledge-base` },
      { '@type': 'ListItem', position: 4, name: a.title, item: `${BASE}/cybersecurity-advisory/knowledge-base/${a.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Header />
      <main style={{ background: '#F4F6FA' }}>
        {/* ── HERO — navy + grid + orange border (site article convention) ── */}
        <section style={{ background: 'linear-gradient(160deg, #0B1A46 0%, #1E3A8A 100%)', borderBottom: '3px solid #E87722', position: 'relative', overflow: 'hidden' }}>
          <div className="premium-grid" style={{ position: 'absolute', inset: 0, opacity: 0.35 }} />
          <div style={{ position: 'absolute', top: '-80px', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(232,119,34,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div className="relative px-6 pt-6 pb-12 md:pb-16 max-w-[820px] mx-auto">
            {/* Breadcrumb */}
            <nav className="text-xs flex items-center gap-1.5 mb-8 flex-wrap" style={{ color: 'rgba(255,255,255,0.5)' }} aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Icons.ChevronRight size={12} />
              <Link href="/cybersecurity-advisory" className="hover:text-white transition-colors">Cybersecurity Advisory</Link>
              <Icons.ChevronRight size={12} />
              <Link href="/cybersecurity-advisory/knowledge-base" className="hover:text-white transition-colors">Knowledge Base</Link>
              <Icons.ChevronRight size={12} />
              <span className="truncate max-w-[220px]" style={{ color: 'rgba(255,255,255,0.8)' }}>{a.title}</span>
            </nav>
            <span className="mono text-[13px] uppercase tracking-widest px-2.5 py-1 rounded inline-block mb-5" style={{ background: '#E87722', color: '#fff' }}>{a.category}</span>
            <h1 className="text-white text-3xl md:text-5xl font-bold leading-[1.1] mb-6">{a.title}</h1>
            <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-sm mono" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <span className="flex items-center gap-1.5"><Icons.Users size={13} />{a.author}</span>
              <span>&bull;</span>
              <span>{a.date}</span>
              <span>&bull;</span>
              <span className="flex items-center gap-1"><Icons.Clock size={13} />{a.readTime} read</span>
            </div>
          </div>
        </section>

        {/* ── ARTICLE BODY ─────────────────────────────────────────────── */}
        <section className="px-6 py-12" style={{ background: '#fff' }}>
          <div className="max-w-[720px] mx-auto">
            {/* Key takeaways — answer-ready summary for readers and AI engines */}
            {a.keyTakeaways?.length > 0 && (
              <aside
                className="mb-10 rounded-2xl p-6 md:p-7"
                style={{ background: '#F4F6FA', border: '1px solid #E1E8F0', borderLeft: '4px solid #E87722' }}
                aria-label="Key takeaways"
              >
                <h2 className="mono text-[13px] uppercase tracking-widest mb-4" style={{ color: '#E87722' }}>Key Takeaways</h2>
                <ul className="space-y-3">
                  {a.keyTakeaways.map((t, i) => (
                    <li key={i} className="flex gap-3 text-base leading-relaxed" style={{ color: '#374151' }}>
                      <Icons.Check size={18} className="flex-shrink-0 mt-1 text-[#E87722]" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            )}

            {/* Body content */}
            <article className="space-y-5">
              {a.body.map((b, i) => {
                if (b.h2) return (
                  <h2 key={i} className="font-bold mt-10 mb-2" style={{ color: '#0B1A46', fontSize: '1.5rem', lineHeight: 1.3 }}>{b.h2}</h2>
                )
                if (b.cta) return (
                  <Link key={i} href={b.cta.href} className="block mt-8 p-5 rounded-xl group" style={{ background: 'rgba(232,119,34,0.06)', border: '1px solid rgba(232,119,34,0.28)' }}>
                    {b.cta.label && <div className="mono text-[13px] uppercase tracking-widest mb-1.5" style={{ color: '#E87722' }}>{b.cta.label}</div>}
                    <div className="text-base md:text-lg font-semibold group-hover:text-[#E87722] transition inline-flex items-center gap-2" style={{ color: '#0B1A46' }}>{b.cta.text} <Icons.ArrowRight size={16} /></div>
                  </Link>
                )
                return <p key={i} className="text-base md:text-lg leading-[1.75]" style={{ color: '#374151' }}>{b.p}</p>
              })}
            </article>

            {/* Pillar internal link */}
            {a.pillar && (
              <div className="mt-10 flex flex-wrap items-center gap-2 text-sm" style={{ color: '#667085' }}>
                <span className="mono text-[12px] uppercase tracking-widest" style={{ color: '#9CA3AF' }}>Related service</span>
                <Link href={a.pillar.href} className="inline-flex items-center gap-1.5 font-semibold hover:underline" style={{ color: '#B95812' }}>
                  {a.pillar.label} <Icons.ArrowUpRight size={14} />
                </Link>
              </div>
            )}

            {/* Practice / author box — honest house credit */}
            <div className="mt-12 rounded-2xl p-6 md:p-7 flex items-start gap-4" style={{ background: '#F4F6FA', border: '1px solid #E1E8F0' }}>
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl" style={{ background: '#0B1A46', color: '#E87722' }}>
                <Icons.ShieldCheck size={22} />
              </div>
              <div>
                <div className="font-bold" style={{ color: '#0B1A46' }}>{a.author}</div>
                <p className="mt-1 text-sm leading-6" style={{ color: '#475467' }}>
                  Engineering guidance from the IP Care Cyber Advisory practice (The Cyber Adviser) — vendor-current architecture, delivery and operations across Palo Alto, Check Point, Fortinet and multi-cloud for enterprise and government clients in the UAE, Canada and the wider GCC.
                </p>
                <Link href="/cybersecurity-advisory/track-record" className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold hover:underline" style={{ color: '#B95812' }}>
                  See our delivery track record <Icons.ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── RELATED ARTICLES ─────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="px-6 py-16" style={{ background: '#F4F6FA' }}>
            <div className="max-w-[1100px] mx-auto">
              <div className="mono text-[13px] uppercase tracking-widest mb-6" style={{ color: '#E87722' }}>Continue Reading</div>
              <div className="grid md:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Link key={r.slug} href={`/cybersecurity-advisory/knowledge-base/${r.slug}`} className="service-card group flex h-full flex-col p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="inline-flex items-center rounded-full border border-[#E87722]/25 bg-[#E87722]/10 px-2.5 py-1 text-[11px] font-semibold text-[#B95812]">{r.category}</span>
                      <span className="text-[11px] font-semibold" style={{ color: '#9CA3AF' }}>{r.readTime}</span>
                    </div>
                    <h3 className="service-card__title text-[15px] leading-snug mb-4 flex-1 group-hover:text-[#E87722] transition-colors" style={{ color: '#0B1A46' }}>{r.title}</h3>
                    <span className="inline-flex items-center gap-1.5 text-[13px] font-bold" style={{ color: '#E87722' }}>Read Article <Icons.ArrowRight size={13} /></span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CONSULTATION CTA ─────────────────────────────────────────── */}
        <section className="px-6 py-16" style={{ background: '#fff' }}>
          <div className="max-w-[880px] mx-auto rounded-2xl p-8 md:p-12 text-center" style={{ background: 'linear-gradient(160deg, #0B1A46 0%, #1E3A8A 100%)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="mono text-[13px] uppercase tracking-[0.25em] mb-3" style={{ color: '#E87722' }}>Consultation</div>
            <h2 className="text-white text-2xl md:text-4xl font-bold mb-4">Need a direct answer?</h2>
            <p className="mb-8 mx-auto max-w-2xl" style={{ color: 'rgba(255,255,255,0.75)' }}>
              The knowledge base is a starting point. For a specific architecture, upgrade or migration decision, 30 minutes with a senior advisor is often faster — and free.
            </p>
            <div className="flex justify-center">
              <CTAPhoneButtons />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
