import Link from 'next/link'
import { notFound } from 'next/navigation'
import * as Icons from 'lucide-react'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import { industries, getAllIndustrySlugs, getIndustry } from '@/lib/industries-data'

export async function generateStaticParams() {
  return getAllIndustrySlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const ind = getIndustry(params.slug)
  if (!ind) return {}
  return {
    title: ind.title,
    description: ind.metaDescription,
    alternates: { canonical: `/industries/${params.slug}` },
    openGraph: {
      title: ind.title,
      description: ind.metaDescription,
      url: `/industries/${params.slug}`,
      type: 'website',
    },
  }
}

export default function IndustryDetailPage({ params }) {
  const ind = getIndustry(params.slug)
  if (!ind) notFound()
  const Icon = Icons[ind.icon] || Icons.Building2

  const BASE = (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae')
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE + '/' },
      { '@type': 'ListItem', position: 2, name: 'Industries', item: BASE + '/industries' },
      { '@type': 'ListItem', position: 3, name: ind.name, item: BASE + `/industries/${params.slug}` },
    ],
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (ind.faqs || []).map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  const others = Object.values(industries).filter((x) => x.slug !== params.slug)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main>
        <div className="max-w-[1400px] mx-auto px-6 pt-6">
          <nav className="text-xs text-white/50 flex items-center gap-1.5 flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <Icons.ChevronRight size={12} />
            <Link href="/industries" className="hover:text-white">Industries</Link>
            <Icons.ChevronRight size={12} />
            <span className="text-white/80">{ind.name}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="py-14 md:py-20 px-6">
          <div className="max-w-[1100px] mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ background: 'rgba(232,119,34,0.12)', border: '1px solid rgba(232,119,34,0.35)' }}>
              <Icon size={14} className="text-[#E87722]" />
              <span className="text-[#E87722] text-xs font-semibold uppercase tracking-wider">{ind.keyword}</span>
            </div>
            <h1 className="text-white text-3xl md:text-5xl font-bold leading-[1.1] tracking-tight">{ind.h1}</h1>
            <p className="body-text mt-6 text-base md:text-lg max-w-3xl">{ind.hero}</p>
          </div>
        </section>

        {/* Proof bar */}
        <section className="px-6 pb-12">
          <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
            {(ind.proof || []).map((p, i) => (
              <div key={i} className="glass-card p-5 text-center">
                <div className="text-[#E87722] text-2xl md:text-3xl font-bold mb-1">{p.stat}</div>
                <div className="text-white/70 text-xs uppercase tracking-wider">{p.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Overview narrative */}
        <section className="py-12 px-6">
          <div className="max-w-[900px] mx-auto">
            <div className="space-y-5">
              {ind.overview.map((p, i) => {
                if (p.startsWith('— ')) {
                  return <h2 key={i} className="text-white text-2xl md:text-3xl font-bold mt-10 mb-2">{p.replace(/^—\s*/, '').replace(/\s*—\s*$/, '')}</h2>
                }
                return <p key={i} className="body-text text-base md:text-lg leading-[1.75]">{p}</p>
              })}
            </div>
          </div>
        </section>

        {/* Regulatory framework */}
        {ind.regulatoryFramework && ind.regulatoryFramework.length > 0 && (
          <section className="py-16 px-6" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <div className="max-w-[1100px] mx-auto">
              <div className="text-center mb-10">
                <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">Regulatory framework</div>
                <h2 className="text-white text-2xl md:text-3xl font-bold">What actually applies in this sector</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ind.regulatoryFramework.map((r, i) => (
                  <div key={i} className="glass-card p-5">
                    <div className="text-white font-semibold mb-1">{r.name}</div>
                    <div className="body-text text-sm">{r.scope}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Service hooks */}
        {ind.serviceHooks && ind.serviceHooks.length > 0 && (
          <section className="py-16 px-6">
            <div className="max-w-[1200px] mx-auto">
              <div className="text-center mb-10">
                <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">What we deliver</div>
                <h2 className="text-white text-2xl md:text-3xl font-bold">Services tailored to {ind.name}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ind.serviceHooks.map((s, i) => {
                  const SIcon = Icons[s.icon] || Icons.Server
                  return (
                    <Link key={i} href={s.href} className="glass-card p-6 group block hover:ring-2 hover:ring-[#E87722]/40 transition-all">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(232,119,34,0.12)', border: '1px solid rgba(232,119,34,0.35)' }}>
                        <SIcon size={18} className="text-[#E87722]" />
                      </div>
                      <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-[#E87722] transition-colors">{s.title}</h3>
                      <p className="body-text text-sm leading-relaxed">{s.desc}</p>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* FAQs */}
        {ind.faqs && ind.faqs.length > 0 && (
          <section className="py-16 px-6" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <div className="max-w-[900px] mx-auto">
              <div className="text-center mb-10">
                <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">Frequently asked</div>
                <h2 className="text-white text-2xl md:text-3xl font-bold">Questions we get from {ind.name} clients</h2>
              </div>
              <div className="space-y-3">
                {ind.faqs.map((f, i) => (
                  <details key={i} className="glass-card p-5 group" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                    <summary className="text-white font-semibold cursor-pointer flex items-center justify-between gap-3">
                      <span>{f.q}</span>
                      <Icons.ChevronDown size={18} className="text-[#E87722] group-open:rotate-180 transition-transform flex-shrink-0" />
                    </summary>
                    <p className="body-text text-sm mt-3 leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 px-6">
          <div className="max-w-[900px] mx-auto rounded-2xl p-10 text-center" style={{ background: 'rgba(232,119,34,0.07)', border: '1px solid rgba(232,119,34,0.28)' }}>
            <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">Get started</div>
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-3">Bring your {ind.name.toLowerCase()} estate to a team that has been here before</h2>
            <p className="body-text mb-6">A focused assessment first, then a phased engagement against the sector framework. No hourly meter. No generic templates pulled from another industry.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/contact" className="btn-primary">Talk to us <Icons.ArrowRight size={16} /></Link>
              <Link href="/industries" className="btn-ghost">All industries</Link>
            </div>
          </div>
        </section>

        {/* Other industries */}
        {others.length > 0 && (
          <section className="py-16 px-6">
            <div className="max-w-[1100px] mx-auto">
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-8">Other industries we work in</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {others.map((o) => {
                  const OIcon = Icons[o.icon] || Icons.Building2
                  return (
                    <Link key={o.slug} href={`/industries/${o.slug}`} className="glass-card p-6 group block hover:ring-2 hover:ring-[#E87722]/40 transition-all">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(232,119,34,0.12)', border: '1px solid rgba(232,119,34,0.35)' }}>
                          <OIcon size={18} className="text-[#E87722]" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold mb-1 group-hover:text-[#E87722] transition-colors">{o.name}</h3>
                          <p className="body-text text-sm leading-relaxed">{o.hero}</p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
