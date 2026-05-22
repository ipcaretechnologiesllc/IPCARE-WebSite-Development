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

const CATEGORY_IMAGES = {
  'laptops-desktops': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80',
  'tablets-ipads':    'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&q=80',
  'printers':         'https://images.unsplash.com/photo-1650094980833-7373de26feb6?w=600&q=80',
  'event-wifi':       'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=600&q=80',
  'networking':       'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80',
  'cctv':             'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80',
  'testing-equipment':'https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?w=600&q=80',
  'servers':          'https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?w=600&q=80',
  'bundles':          'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
  'macbooks':         'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
}

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
                className="group relative rounded-2xl overflow-hidden reveal block"
                style={{ transitionDelay: `${i * 40}ms`, aspectRatio: '4/5', minHeight: '200px' }}
              >
                {/* Full-bleed category image */}
                <img
                  src={CATEGORY_IMAGES[slug] || 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80'}
                  alt={c.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Base gradient */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(180deg, rgba(7,16,42,0.08) 0%, rgba(7,16,42,0.45) 40%, rgba(7,16,42,0.94) 100%)' }}
                />

                {/* Orange tint on hover from top */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(180deg, rgba(232,119,34,0.18) 0%, transparent 55%)' }}
                />

                {/* Orange top border that sweeps in on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                  style={{ background: '#E87722' }}
                />

                {/* Icon badge — top left */}
                <div
                  className="absolute top-3 left-3 p-2 rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ background: '#E87722', boxShadow: '0 4px 14px rgba(232,119,34,0.50)' }}
                >
                  <Ic name={c.icon} size={16} className="text-white" />
                </div>

                {/* Arrow — top right, slides in on hover */}
                <div
                  className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}
                >
                  <Icons.ArrowRight size={13} className="text-white" />
                </div>

                {/* Content pinned to bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-sm leading-tight mb-1.5">{c.name}</h3>
                  <p
                    className="mono text-[10px] uppercase tracking-widest"
                    style={{ color: '#E87722' }}
                  >
                    {c.products.length} items
                  </p>
                </div>
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
                <span className="inline-flex items-center gap-1.5 text-[#E87722] font-semibold text-sm px-4 py-1.5 rounded-full border border-[#E87722]/50 bg-[#E87722]/5 group-hover:bg-[#E87722] group-hover:text-white group-hover:border-[#E87722] group-hover:gap-2.5 transition-all">View Details <Icons.ArrowRight size={13}/></span>
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
