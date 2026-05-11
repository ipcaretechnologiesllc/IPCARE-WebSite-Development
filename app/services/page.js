import Link from 'next/link'
import * as Icons from 'lucide-react'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import { serviceCategories } from '@/lib/services-data'

export const metadata = {
  title: 'Enterprise IT Solutions & Services â€” UAE & Canada | IP Care Technologies',
  description: 'Comprehensive IT services in UAE and Canada. IT consulting, infrastructure, ELV, managed IT, cloud, cybersecurity, web development, digital marketing and email solutions.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Enterprise IT Solutions & Services â€” UAE & Canada | IP Care Technologies',
    description: 'Comprehensive IT services in UAE and Canada. IT consulting, infrastructure, ELV, managed IT, cloud, cybersecurity, web development, digital marketing and email solutions.',
    url: '/services',
    type: 'website',
  },
}

const Ic = ({ name, ...rest }) => {
  const C = Icons[name] || Icons.Server
  return <C {...rest} />
}

export default function ServicesHub() {
  const cats = Object.entries(serviceCategories)
  
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: (process.env.NEXT_PUBLIC_BASE_URL || 'https://ipcare.ae') + '/' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: (process.env.NEXT_PUBLIC_BASE_URL || 'https://ipcare.ae') + '/services' },
    ],
  }
  
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="max-w-[1400px] mx-auto px-6 pt-6">
          <nav className="text-xs text-white/50 flex items-center gap-1.5 flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <Icons.ChevronRight size={12}/>
            <span className="text-white/80">Services</span>
          </nav>
        </div>

        <section className="relative py-20 md:py-28 px-6">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(circle, #E87722 0%, transparent 70%)' }}/>
          </div>
          <div className="relative max-w-[1100px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ background: 'rgba(232,119,34,0.12)', border: '1px solid rgba(232,119,34,0.35)' }}>
              <Icons.Sparkles size={14} className="text-[#E87722]"/>
              <span className="text-[#E87722] text-xs font-semibold uppercase tracking-wider">Our Services</span>
            </div>
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">Enterprise IT Solutions & Services â€” UAE & Canada</h1>
            <p className="body-text mt-6 text-base md:text-lg max-w-3xl mx-auto">From strategy to implementation to 24Ã—7 operations â€” IP Care delivers the complete IT stack for enterprise, government and fast-growth organisations across the UAE and Canada.</p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/contact" className="btn-primary">Get a Free Consultation <Icons.ArrowRight size={16}/></Link>
              <Link href="/about" className="btn-ghost">About IP Care</Link>
            </div>
          </div>
        </section>

        <section className="pb-24 px-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {cats.map(([slug, c]) => (
                <div key={slug} className="glass-card p-7 group">
                  <Link href={`/services/${slug}`}>
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform" style={{ background: 'rgba(232,119,34,0.12)', border: '1px solid rgba(232,119,34,0.3)' }}>
                      <Ic name={c.icon} size={26} className="text-[#E87722]"/>
                    </div>
                    <h2 className="text-white text-xl font-semibold mb-2 group-hover:text-[#E87722] transition-colors">{c.name}</h2>
                    <p className="body-text text-sm mb-4 leading-relaxed">{c.short}</p>
                  </Link>
                  
                  {/* Sub-services list */}
                  {c.subpages && Object.keys(c.subpages).length > 0 && (
                    <div className="mt-5 pt-5 border-t border-white/10">
                      <ul className="space-y-2">
                        {Object.entries(c.subpages).slice(0, 5).map(([subSlug, sub]) => (
                          <li key={subSlug}>
                            <Link 
                              href={`/services/${slug}/${subSlug}`} 
                              className="flex items-start gap-2 text-white/70 text-xs hover:text-[#E87722] transition-colors"
                            >
                              <Icons.ArrowRight size={12} className="text-[#E87722] mt-0.5 flex-shrink-0"/>
                              <span className="leading-relaxed">{sub.h1}</span>
                            </Link>
                          </li>
                        ))}
                        {Object.keys(c.subpages).length > 5 && (
                          <li className="text-xs text-white/50 mt-2 pl-5">+ {Object.keys(c.subpages).length - 5} more services...</li>
                        )}
                      </ul>
                    </div>
                  )}
                  
                  <Link href={`/services/${slug}`} className="mt-6 inline-flex items-center gap-1.5 text-[#E87722] font-semibold text-sm px-4 py-2 rounded-lg border border-[#E87722]/50 bg-[#E87722]/5 hover:bg-[#E87722] hover:text-white hover:border-[#E87722] hover:gap-2.5 transition-all">
                    View All {c.name} <Icons.ArrowRight size={14}/>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="rounded-2xl p-10 md:p-14 text-center" style={{ background: 'rgba(232,119,34,0.07)', border: '1px solid rgba(232,119,34,0.28)' }}>
              <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">Not sure where to start?</h2>
              <p className="body-text max-w-xl mx-auto mb-8">Book a 30-minute discovery call with an IP Care solution architect. Free, no obligation.</p>
              <Link href="/contact" className="btn-primary">Book a Discovery Call <Icons.ArrowRight size={16}/></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
