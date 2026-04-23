'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { rentalCategories, getFeaturedProducts } from '@/lib/rental-data'
import ProductCard from '@/components/rental/ProductCard'

const Ic = ({ name, ...rest }) => { const C = Icons[name] || Icons.Package; return <C {...rest}/> }

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) } })
    }, { threshold: 0.1 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

const bundles = Object.values(rentalCategories.bundles.products).slice(0, 3)
const featured = getFeaturedProducts(6)
const cats = Object.entries(rentalCategories)

export default function RentalHubClient() {
  useReveal()
  return (
    <main>
      {/* HERO */}
      <section className="relative py-20 md:py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-3xl opacity-25" style={{ background: 'radial-gradient(ellipse, #E87722 0%, transparent 60%)' }}/>
        </div>
        <div className="relative max-w-[1200px] mx-auto text-center">
          <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-4 reveal">Rental Hub</div>
          <h1 className="text-white text-4xl md:text-6xl font-bold leading-[1.08] tracking-tight max-w-5xl mx-auto reveal">IT Equipment Rental — <span className="text-[#E87722]">UAE &amp; Canada</span></h1>
          <p className="body-text mt-5 text-base md:text-lg max-w-2xl mx-auto reveal">Short-Term &amp; Long-Term · Delivery &amp; Setup Included · Certified Engineers</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 reveal">
            <a href="#categories" className="btn-primary">Browse Catalogue <Icons.ArrowRight size={16}/></a>
            <Link href="/#contact" className="btn-ghost">Talk to a Specialist</Link>
          </div>
        </div>
      </section>

      {/* CATEGORY GRID */}
      <section id="categories" className="py-16 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12 reveal">
            <h2 className="text-white text-3xl md:text-4xl font-bold heading-accent">Browse Equipment Categories</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {cats.map(([slug, c], i) => (
              <Link
                key={slug}
                href={`/rental/${slug}`}
                className="glass-card text-center group reveal flex flex-col items-center justify-between"
                style={{
                  paddingTop: '32px',
                  paddingBottom: '24px',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  minHeight: '180px',
                  transitionDelay: `${i * 40}ms`,
                }}
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform flex-shrink-0" style={{ background: 'rgba(232,119,34,0.12)', border: '1px solid rgba(232,119,34,0.3)' }}>
                  <Ic name={c.icon} size={24} className="text-[#E87722]"/>
                </div>
                <h3 className="text-white font-semibold text-sm leading-tight flex-1 flex items-center justify-center">{c.name}</h3>
                <p className="mono text-[10px] text-white/50 uppercase tracking-wider" style={{ marginTop: '12px' }}>{c.products.length} items</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-16 md:py-20 px-6" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(8px)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12 reveal">
            <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">Popular Rentals</div>
            <h2 className="text-white text-3xl md:text-4xl font-bold">Most-Requested Items</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((p) => (
              <div key={`${p.categorySlug}/${p.slug}`} className="reveal">
                <ProductCard product={p} categorySlug={p.categorySlug}/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUNDLES */}
      <section className="py-20 md:py-24 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12 reveal">
            <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">Pre-Built Packages</div>
            <h2 className="text-white text-3xl md:text-4xl font-bold heading-accent">Bundle Packages</h2>
            <p className="body-text mt-5 max-w-2xl mx-auto">Tailored for common use cases — everything included, delivered and set up.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {bundles.map((b, i) => (
              <Link key={b.slug} href={`/rental/bundles/${b.slug}`} className="glass-card p-7 block reveal group" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(232,119,34,0.15)', border: '1px solid rgba(232,119,34,0.4)' }}>
                  <Icons.Package size={22} className="text-[#E87722]"/>
                </div>
                <h3 className="text-white text-xl font-bold mb-3">{b.model}</h3>
                <ul className="space-y-2 mb-6">
                  {b.specs.map((s, j) => (
                    <li key={j} className="body-text text-sm flex items-start gap-2"><Icons.Check size={14} className="text-[#E87722] mt-0.5 flex-shrink-0"/>{s}</li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-1.5 text-[#E87722] font-semibold text-sm group-hover:gap-2.5 transition-all">View Details <Icons.ArrowRight size={14}/></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ADVANTAGE STRIP */}
      <section className="py-16 px-6" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(8px)' }}>
        <div className="max-w-[1300px] mx-auto">
          <div className="text-center mb-10 reveal">
            <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">The IP Care Advantage</div>
            <h2 className="text-white text-3xl md:text-4xl font-bold">Why IP Care vs. Other Rental Vendors</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { icon: 'Truck', t: 'Delivery &amp; Setup', d: 'Included — not a hidden extra like other vendors.' },
              { icon: 'Wrench', t: 'Certified Engineers', d: 'On-site technical support for events and installs.' },
              { icon: 'Globe2', t: 'UAE + Canada', d: 'One partner, two regions, one SLA.' },
              { icon: 'Award', t: '20+ Years', d: 'Since 2003 — deep vendor relationships, best rates.' },
            ].map((a, i) => (
              <div key={a.t} className="glass-card p-6 reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(232,119,34,0.12)' }}>
                  <Ic name={a.icon} size={20} className="text-[#E87722]"/>
                </div>
                <h3 className="text-white font-semibold text-base mb-2" dangerouslySetInnerHTML={{__html: a.t}}/>
                <p className="body-text text-sm leading-relaxed">{a.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-16 px-6">
        <div className="max-w-[1100px] mx-auto rounded-2xl p-10 md:p-14 text-center reveal" style={{ background: 'rgba(232,119,34,0.07)', border: '1px solid rgba(232,119,34,0.28)' }}>
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">Can&apos;t find what you need?</h2>
          <p className="body-text max-w-xl mx-auto mb-8">Our rental catalogue has 500+ items. Tell us what you&apos;re planning and we&apos;ll source the right kit.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/#contact" className="btn-primary">Request Custom Quote <Icons.ArrowRight size={16}/></Link>
            <a href="tel:+97126766935" className="btn-ghost"><Icons.Phone size={14}/> +971 2 676 6935</a>
          </div>
        </div>
      </section>
    </main>
  )
}
