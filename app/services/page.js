import Link from 'next/link'
import * as Icons from 'lucide-react'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import { serviceCategories } from '@/lib/services-data'

export const metadata = {
  title: 'Enterprise IT Services UAE — Managed IT, Cybersecurity, Cloud | IP Care Technologies',
  description: 'Full portfolio of enterprise IT services in UAE & Canada: managed IT, cybersecurity, ELV, cloud, infrastructure, web, digital marketing and email.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Enterprise IT Services UAE — IP Care Technologies',
    description: 'Managed IT, cybersecurity, ELV, cloud, infrastructure and more across UAE & Canada.',
    url: '/services',
  },
}

const Ic = ({ name, ...rest }) => {
  const C = Icons[name] || Icons.Server
  return <C {...rest} />
}

export default function ServicesHub() {
  const cats = Object.entries(serviceCategories)
  return (
    <>
      <Header />
      <main>
        <section className="relative py-20 md:py-28 px-6">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(circle, #E87722 0%, transparent 70%)' }}/>
          </div>
          <div className="relative max-w-[1100px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6" style={{ background: 'rgba(232,119,34,0.12)', border: '1px solid rgba(232,119,34,0.35)' }}>
              <Icons.Sparkles size={14} className="text-[#E87722]"/>
              <span className="text-[#E87722] text-xs font-semibold uppercase tracking-wider">Our Services</span>
            </div>
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">Enterprise IT Solutions &amp; Services — UAE &amp; Canada</h1>
            <p className="body-text mt-6 text-base md:text-lg max-w-2xl mx-auto">Nine service pillars, one accountable partner. Explore the full IP Care portfolio below.</p>
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
                <Link key={slug} href={`/services/${slug}`} className="glass-card p-7 block group">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(232,119,34,0.12)', border: '1px solid rgba(232,119,34,0.3)' }}>
                    <Ic name={c.icon} size={26} className="text-[#E87722]"/>
                  </div>
                  <h2 className="text-white text-xl font-semibold mb-2">{c.name}</h2>
                  <p className="body-text text-sm mb-4 leading-relaxed">{c.short}</p>
                  {c.subpages && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {Object.entries(c.subpages).slice(0, 3).map(([s, sub]) => (
                        <span key={s} className="text-[11px] px-2 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>
                          {sub.h1?.replace(' in UAE','').replace(' Services','').slice(0,28)}
                        </span>
                      ))}
                      {Object.keys(c.subpages).length > 3 && (
                        <span className="text-[11px] px-2 py-1 text-white/50">+{Object.keys(c.subpages).length - 3} more</span>
                      )}
                    </div>
                  )}
                  <span className="inline-flex items-center gap-1.5 text-[#1B6CA8] font-semibold text-sm group-hover:gap-2.5 transition-all">Explore <Icons.ArrowRight size={14}/></span>
                </Link>
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
