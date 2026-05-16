import Link from 'next/link'
import * as Icons from 'lucide-react'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import { getAllIndustries } from '@/lib/industries-data'

export const metadata = {
  title: 'Industries — Healthcare, Banking, Government IT | IP Care Technologies',
  description: 'IT services for UAE healthcare facilities, banks and financial services firms, and federal and government-adjacent entities. Sector-specific regulatory fluency and two decades of UAE delivery history.',
  alternates: { canonical: '/industries' },
  openGraph: {
    title: 'Industries — IP Care Technologies',
    description: 'Healthcare IT, banking and financial services IT, and federal and government IT for the UAE — sector-specific regulatory fluency and twenty years of delivery history.',
    url: '/industries',
    type: 'website',
  },
}

export default function IndustriesHubPage() {
  const list = getAllIndustries()
  const BASE = (process.env.NEXT_PUBLIC_BASE_URL || 'https://ipcare.ae')
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE + '/' },
      { '@type': 'ListItem', position: 2, name: 'Industries', item: BASE + '/industries' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main>
        <div className="max-w-[1400px] mx-auto px-6 pt-6">
          <nav className="text-xs text-white/50 flex items-center gap-1.5 flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <Icons.ChevronRight size={12} />
            <span className="text-white/80">Industries</span>
          </nav>
        </div>

        <section className="py-14 md:py-20 px-6">
          <div className="max-w-[1100px] mx-auto text-center">
            <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">Industries we serve</div>
            <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight">IT Built for the Sector, Not the Generic Template</h1>
            <p className="body-text mt-5 text-base md:text-lg max-w-3xl mx-auto">
              Healthcare, banking and federal IT each operate against regulatory environments that generic enterprise IT does not touch. The work is different. The teams are different. The runbooks are different. This page lays out what we deliver in each of the three sectors where we have the deepest UAE history.
            </p>
          </div>
        </section>

        <section className="pb-24 px-6">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
            {list.map((ind) => {
              const Icon = Icons[ind.icon] || Icons.Building2
              return (
                <Link key={ind.slug} href={`/industries/${ind.slug}`} className="glass-card p-7 group block hover:ring-2 hover:ring-[#E87722]/40 transition-all">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-5" style={{ background: 'rgba(232,119,34,0.12)', border: '1px solid rgba(232,119,34,0.35)' }}>
                    <Icon size={22} className="text-[#E87722]" />
                  </div>
                  <h2 className="text-white text-xl font-bold mb-2 group-hover:text-[#E87722] transition-colors">{ind.name}</h2>
                  <p className="body-text text-sm leading-relaxed mb-5">{ind.hero}</p>
                  <span className="inline-flex items-center gap-1.5 text-[#E87722] text-sm font-semibold group-hover:gap-2.5 transition-all">
                    Explore {ind.name} →
                  </span>
                </Link>
              )
            })}
          </div>
        </section>

        <section className="py-16 px-6" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <div className="max-w-[1000px] mx-auto text-center">
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">Other sectors we work in</h2>
            <p className="body-text mb-6">Beyond the three flagship industries above, we deliver across hospitality, retail, education, energy, real estate and the broader UAE enterprise market. The sector pattern recognition compounds — engagements feed forward and backward across the portfolio.</p>
            <Link href="/contact" className="btn-primary">Talk to us about your sector <Icons.ArrowRight size={16} /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
