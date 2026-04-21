'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import * as Icons from 'lucide-react'

const Ic = ({ name, ...rest }) => {
  const C = Icons[name] || Icons.Check
  return <C {...rest} />
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) } })
    }, { threshold: 0.12 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function ServicePageTemplate({ data, related, breadcrumb }) {
  useReveal()
  const { h1, hero, overview, features, benefits, process, industries, faqs, icon } = data

  return (
    <>
      {/* Breadcrumb */}
      {breadcrumb && (
        <div className="max-w-[1400px] mx-auto px-6 pt-6">
          <nav className="text-xs text-white/50 flex items-center gap-1.5 flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <Icons.ChevronRight size={12}/>
            <Link href="/services" className="hover:text-white">Services</Link>
            {breadcrumb.map((b, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <Icons.ChevronRight size={12}/>
                {b.href ? <Link href={b.href} className="hover:text-white">{b.label}</Link> : <span className="text-white/80">{b.label}</span>}
              </span>
            ))}
          </nav>
        </div>
      )}

      {/* 1. Hero */}
      <section className="relative py-20 md:py-28 px-6">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(circle, #E87722 0%, transparent 70%)' }}/>
        </div>
        <div className="relative max-w-[1000px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 reveal" style={{ background: 'rgba(232,119,34,0.12)', border: '1px solid rgba(232,119,34,0.35)' }}>
            {icon && <Ic name={icon} size={14} className="text-[#E87722]"/>}
            <span className="text-[#E87722] text-xs font-semibold uppercase tracking-wider">IP Care Enterprise Service</span>
          </div>
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight reveal">{h1}</h1>
          <p className="body-text mt-6 text-base md:text-lg max-w-2xl mx-auto reveal">{hero}</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 reveal">
            <Link href="/#contact" className="btn-primary">Get a Free Quote <Icons.ArrowRight size={16}/></Link>
            <Link href="/services" className="btn-ghost">View All Services</Link>
          </div>
        </div>
      </section>

      {/* 2. Overview */}
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-[900px] mx-auto">
          <div className="glass-card p-8 md:p-12 reveal">
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-6">Overview</h2>
            <div className="space-y-4 body-text text-base md:text-[17px] leading-relaxed">
              {overview?.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Key features */}
      {features?.length > 0 && (
        <section className="py-16 md:py-20 px-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-12 reveal">
              <h2 className="text-white text-3xl md:text-4xl font-bold heading-accent">Key Features</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {features.map((f, i) => (
                <div key={i} className="glass-card p-7 reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(232,119,34,0.12)', border: '1px solid rgba(232,119,34,0.3)' }}>
                    <Ic name={f.icon} size={22} className="text-[#E87722]"/>
                  </div>
                  <h3 className="text-white text-lg font-semibold mb-2">{f.title}</h3>
                  <p className="body-text text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Benefits */}
      {benefits?.length > 0 && (
        <section className="py-16 md:py-20 px-6" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(8px)' }}>
          <div className="max-w-[1100px] mx-auto">
            <div className="text-center mb-12 reveal">
              <h2 className="text-white text-3xl md:text-4xl font-bold heading-accent">Business Benefits</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((b, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-xl reveal" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(232,119,34,0.15)' }}>
                    <Ic name={b.icon} size={20} className="text-[#E87722]"/>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-base">{b.t}</div>
                    <div className="body-text text-sm mt-0.5">{b.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Process */}
      {process?.length > 0 && (
        <section className="py-16 md:py-20 px-6">
          <div className="max-w-[1300px] mx-auto">
            <div className="text-center mb-12 reveal">
              <h2 className="text-white text-3xl md:text-4xl font-bold heading-accent">How It Works</h2>
              <p className="body-text mt-4">A proven, repeatable delivery approach.</p>
            </div>
            <div className="grid md:grid-cols-4 gap-5 relative">
              <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,119,34,0.5), transparent)' }}/>
              {process.map((s, i) => (
                <div key={i} className="relative reveal" style={{ transitionDelay: `${i * 90}ms` }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 text-white font-bold relative z-10" style={{ background: '#E87722', boxShadow: '0 0 0 6px rgba(232,119,34,0.15)' }}>
                    {s.n}
                  </div>
                  <div className="text-center">
                    <h3 className="text-white font-semibold text-lg mb-2">{s.t}</h3>
                    <p className="body-text text-sm">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Industries */}
      {industries?.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-[1100px] mx-auto text-center reveal">
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-6">Relevant Industries</h2>
            <div className="flex flex-wrap justify-center gap-2.5">
              {industries.map((ind) => (
                <span key={ind} className="px-5 py-2 rounded-full text-sm font-medium" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.85)' }}>{ind}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. Related services */}
      {related?.length > 0 && (
        <section className="py-16 md:py-20 px-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-10 reveal">
              <h2 className="text-white text-3xl md:text-4xl font-bold heading-accent">Related Services</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map((r, i) => (
                <Link key={r.slug} href={`/services/${r.slug}`} className="glass-card p-7 block reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(232,119,34,0.12)', border: '1px solid rgba(232,119,34,0.3)' }}>
                    <Ic name={r.icon} size={22} className="text-[#E87722]"/>
                  </div>
                  <h3 className="text-white text-lg font-semibold mb-2">{r.name}</h3>
                  <p className="body-text text-sm mb-4">{r.short}</p>
                  <span className="inline-flex items-center gap-1.5 text-[#1B6CA8] text-sm font-semibold">Explore <Icons.ArrowRight size={14}/></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. FAQ */}
      {faqs?.length > 0 && (
        <section className="py-16 md:py-20 px-6" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(8px)' }}>
          <div className="max-w-[900px] mx-auto">
            <div className="text-center mb-10 reveal">
              <h2 className="text-white text-3xl md:text-4xl font-bold heading-accent">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <details key={i} className="glass-card p-5 reveal group" style={{ transitionDelay: `${i * 60}ms` }}>
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
                    <h3 className="text-white font-semibold text-base md:text-lg">{f.q}</h3>
                    <Icons.Plus size={20} className="text-[#E87722] group-open:rotate-45 transition-transform flex-shrink-0"/>
                  </summary>
                  <p className="body-text text-sm md:text-base mt-4 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="rounded-2xl p-10 md:p-14 text-center reveal" style={{ background: 'rgba(232,119,34,0.07)', border: '1px solid rgba(232,119,34,0.28)', backdropFilter: 'blur(12px)' }}>
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">Ready to get started?</h2>
            <p className="body-text max-w-xl mx-auto mb-8">Talk to our enterprise team for a free consultation and tailored proposal — typically within 48 hours.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/#contact" className="btn-primary">Get a Free Quote <Icons.ArrowRight size={16}/></Link>
              <a href="tel:+97126766935" className="btn-ghost"><Icons.Phone size={14}/> +971 2 676 6935</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
