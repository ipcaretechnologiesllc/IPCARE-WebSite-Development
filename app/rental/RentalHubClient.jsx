'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { rentalCategories, getFeaturedProducts } from '@/lib/rental-data'
import AddToQuoteButton from '@/components/rental/AddToQuoteButton'

/* ── Icon helper ─────────────────────────────────────────────── */
const Ic = ({ name, ...rest }) => { const C = Icons[name] || Icons.Package; return <C {...rest}/> }

/* ── Scroll-reveal hook ──────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) } }) },
      { threshold: 0.1 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ── Static data ─────────────────────────────────────────────── */
const featured = getFeaturedProducts(6)
const bundles  = rentalCategories['bundles'].products.slice(0, 3)
// All categories except 'bundles' (bundles get their own dedicated section)
const cats = Object.entries(rentalCategories).filter(([slug]) => slug !== 'bundles')

const WHY_ITEMS = [
  { icon: 'Truck',   t: 'Delivery & Setup Included',    d: 'White-glove delivery, rack-and-stack and full configuration — not a hidden extra like other vendors.' },
  { icon: 'Wrench',  t: 'Certified Engineers On-Site',  d: 'Our engineers stay through your event or project — not just for handover.' },
  { icon: 'Globe2',  t: 'UAE + Canada Coverage',        d: 'One partner, two regions, consistent SLA and support. Dubai, Abu Dhabi, Toronto, Vancouver.' },
  { icon: 'Award',   t: '20+ Years, 500+ Projects',     d: 'Deep vendor relationships since 2003 — real stock, real rates, no broker mark-ups.' },
]

/* ════════════════════════════════════════════════════════════════
   PAGE COMPONENT
════════════════════════════════════════════════════════════════ */
export default function RentalHubClient() {
  useReveal()

  return (
    <main>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative py-24 md:py-32 px-6 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0B1A46 0%, #0F245F 50%, #1E3A8A 100%)',
          borderBottom: '3px solid #E87722',
        }}
      >
        {/* Grid texture */}
        <div className="premium-grid absolute inset-0 pointer-events-none" />

        {/* Orange glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[700px] h-[420px] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(ellipse, rgba(232,119,34,0.20) 0%, transparent 70%)' }}
          />
        </div>

        <div className="relative max-w-[1200px] mx-auto text-center">
          <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-4 reveal">
            Rental Hub
          </div>
          <h1
            className="text-white font-bold leading-[1.08] tracking-tight max-w-4xl mx-auto reveal"
            style={{ fontSize: 'clamp(2.4rem,5vw,3.6rem)' }}
          >
            IT Equipment Rental —{' '}
            <span className="text-[#E87722]">UAE &amp; Canada</span>
          </h1>
          <p className="body-text mt-5 text-base md:text-lg max-w-2xl mx-auto reveal">
            Short-term &amp; long-term · Delivery &amp; setup included · Certified engineers on-site
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 reveal">
            <a href="#categories" className="btn-primary">
              Browse Catalogue <Icons.ArrowRight size={16}/>
            </a>
            <Link href="/#contact" className="btn-ghost">Talk to a Specialist</Link>
          </div>
        </div>
      </section>

      {/* ── BROWSE EQUIPMENT CATEGORIES ──────────────────────── */}
      <section id="categories" className="py-20 md:py-24 px-6" style={{ background: '#F4F6FA' }}>
        <div className="max-w-[1400px] mx-auto">

          <div className="text-center mb-12 reveal">
            <div className="mono text-[11px] uppercase tracking-[0.25em] mb-3" style={{ color: '#E87722' }}>
              Equipment Categories
            </div>
            <h2 className="font-bold text-3xl md:text-4xl" style={{ color: '#0B1A46' }}>
              Browse Equipment Categories
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {cats.map(([slug, c], i) => (
              <Link
                key={slug}
                href={`/rental/${slug}`}
                className="group service-card p-6 flex flex-col items-center text-center reveal"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-[#E87722]"
                  style={{ background: 'rgba(232,119,34,0.10)' }}
                >
                  <Ic
                    name={c.icon}
                    size={24}
                    className="text-[#E87722] group-hover:text-white transition-colors duration-300"
                  />
                </div>
                <h3 className="font-bold text-sm leading-tight mb-2" style={{ color: '#0B1A46' }}>
                  {c.name}
                </h3>
                <p className="mono text-[10px] uppercase tracking-widest" style={{ color: '#E87722' }}>
                  {c.products.length} items
                </p>
                <div
                  className="mt-3 flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300"
                  style={{ color: '#1E3A8A' }}
                >
                  Browse <Icons.ArrowRight size={12}/>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── MOST-REQUESTED ITEMS ─────────────────────────────── */}
      <section className="py-20 md:py-24 px-6" style={{ background: '#FFFFFF' }}>
        <div className="max-w-[1400px] mx-auto">

          <div className="text-center mb-12 reveal">
            <div className="mono text-[11px] uppercase tracking-[0.25em] mb-3" style={{ color: '#E87722' }}>
              Popular Rentals
            </div>
            <h2 className="font-bold text-3xl md:text-4xl" style={{ color: '#0B1A46' }}>
              Most-Requested Items
            </h2>
            <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: '#4A5568' }}>
              In stock and ready to ship across UAE and Canada. Daily, weekly and monthly rates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p, i) => (
              <LightProductCard
                key={`${p.categorySlug}/${p.slug}`}
                product={p}
                categorySlug={p.categorySlug}
                delay={i * 60}
              />
            ))}
          </div>

          <div className="text-center mt-10 reveal">
            <Link href="/rental/laptops-desktops" className="btn-primary">
              View Full Catalogue <Icons.ArrowRight size={16}/>
            </Link>
          </div>
        </div>
      </section>

      {/* ── BUNDLE PACKAGES ──────────────────────────────────── */}
      <section className="py-20 md:py-24 px-6" style={{ background: '#F4F6FA' }}>
        <div className="max-w-[1400px] mx-auto">

          <div className="text-center mb-12 reveal">
            <div className="mono text-[11px] uppercase tracking-[0.25em] mb-3" style={{ color: '#E87722' }}>
              Pre-Built Packages
            </div>
            <h2 className="font-bold text-3xl md:text-4xl" style={{ color: '#0B1A46' }}>
              Bundle Packages
            </h2>
            <p className="mt-4 text-base max-w-2xl mx-auto" style={{ color: '#4A5568' }}>
              Sized for common use cases — everything assembled, delivered and set up. One line item, one price.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {bundles.map((b, i) => (
              <Link
                key={b.slug}
                href={`/rental/bundles/${b.slug}`}
                className="group service-card p-7 flex flex-col reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: 'rgba(232,119,34,0.10)' }}
                >
                  <Icons.Package size={22} className="text-[#E87722]"/>
                </div>
                <h3 className="font-bold text-xl mb-3" style={{ color: '#0B1A46' }}>{b.model}</h3>
                <ul className="space-y-2 mb-6 flex-1">
                  {b.specs.map((s, j) => (
                    <li key={j} className="text-sm flex items-start gap-2" style={{ color: '#4A5568' }}>
                      <Icons.Check size={14} className="text-[#E87722] mt-0.5 flex-shrink-0"/>
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="inline-flex items-center gap-1.5 font-semibold text-sm group-hover:gap-2.5 transition-all" style={{ color: '#E87722' }}>
                  View Bundle <Icons.ArrowRight size={13}/>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10 reveal">
            <Link
              href="/rental/bundles"
              className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-full border transition-colors hover:bg-[#0B1A46] hover:text-white hover:border-[#0B1A46]"
              style={{ color: '#0B1A46', borderColor: '#0B1A46' }}
            >
              See All Bundles <Icons.ArrowRight size={14}/>
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY IP CARE ──────────────────────────────────────── */}
      <section className="py-20 md:py-24 px-6" style={{ background: '#FFFFFF' }}>
        <div className="max-w-[1300px] mx-auto">

          <div className="text-center mb-12 reveal">
            <div className="mono text-[11px] uppercase tracking-[0.25em] mb-3" style={{ color: '#E87722' }}>
              The IP Care Advantage
            </div>
            <h2 className="font-bold text-3xl md:text-4xl" style={{ color: '#0B1A46' }}>
              Why IP Care vs. Other Rental Vendors
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_ITEMS.map((a, i) => (
              <div
                key={a.t}
                className="service-card p-6 reveal"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(232,119,34,0.10)' }}
                >
                  <Ic name={a.icon} size={22} className="text-[#E87722]"/>
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: '#0B1A46' }}>{a.t}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#4A5568' }}>{a.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────────────── */}
      <section
        className="py-20 md:py-24 px-6 text-center"
        style={{
          background: 'linear-gradient(135deg, #0B1A46 0%, #1E3A8A 60%, #2E64D8 100%)',
          borderTop: '3px solid #E87722',
        }}
      >
        <div className="max-w-[1000px] mx-auto reveal">
          <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-4">
            Get a Quote Today
          </div>
          <h2
            className="text-white font-bold leading-tight mb-5"
            style={{ fontSize: 'clamp(1.8rem,3.5vw,2.6rem)' }}
          >
            Can&apos;t find what you need?
          </h2>
          <p className="text-white/75 text-base md:text-lg max-w-xl mx-auto mb-8">
            Our rental catalogue has 500+ items. Tell us your project and we&apos;ll source the right
            kit — delivered and configured.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link href="/#contact" className="btn-primary">
              Request Custom Quote <Icons.ArrowRight size={16}/>
            </Link>
            <a href="tel:+97126766935" className="btn-ghost">
              <Icons.Phone size={14}/> +971 2 676 6935
            </a>
          </div>
          {/* Contact line */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2" style={{ color: 'rgba(255,255,255,0.50)', fontSize: '0.85rem' }}>
            <span>
              <Icons.Phone size={13} className="inline mr-1.5 text-[#E87722]"/>
              +971 50 682 8290
            </span>
            <span>
              <Icons.Mail size={13} className="inline mr-1.5 text-[#E87722]"/>
              info@ipcare.ae
            </span>
            <span>
              <Icons.Globe size={13} className="inline mr-1.5 text-[#E87722]"/>
              www.ipcare.ae
            </span>
          </div>
        </div>
      </section>

    </main>
  )
}

/* ════════════════════════════════════════════════════════════════
   LIGHT PRODUCT CARD
   White service-card style — used only on this hub page.
   Does NOT replace the dark ProductCard used on category pages.
════════════════════════════════════════════════════════════════ */
function LightProductCard({ product: p, categorySlug, delay = 0 }) {
  return (
    <div
      className="group service-card overflow-hidden flex flex-col reveal"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* ── Image ── */}
      <Link
        href={`/rental/${categorySlug}/${p.slug}`}
        className="relative block overflow-hidden"
        style={{ height: '200px', background: '#F8F9FC' }}
      >
        <img
          src={p.image.startsWith('http') ? `${p.image}?w=600&q=80` : p.image}
          alt={`${p.brand} ${p.model}`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />
        {/* Brand badge */}
        <div
          className="absolute top-3 left-3 mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded"
          style={{ background: '#E87722', color: '#ffffff' }}
        >
          {p.brand}
        </div>
      </Link>

      {/* ── Body ── */}
      <div className="flex-1 flex flex-col p-5">
        <Link href={`/rental/${categorySlug}/${p.slug}`}>
          <h3
            className="font-bold text-base md:text-lg leading-snug mb-3 hover:text-[#E87722] transition-colors"
            style={{ color: '#0B1A46' }}
          >
            {p.model}
          </h3>
        </Link>

        {/* Spec bullets */}
        <ul className="space-y-1.5 mb-4 flex-1">
          {p.specs.slice(0, 3).map((s, i) => (
            <li key={i} className="text-xs flex items-start gap-2" style={{ color: '#4A5568' }}>
              <Icons.Check size={12} className="text-[#E87722] mt-0.5 flex-shrink-0"/>
              {s}
            </li>
          ))}
        </ul>

        {/* Duration chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {['daily', 'weekly', 'monthly'].map((d) => (
            <span
              key={d}
              className="mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{ background: '#F4F6FA', color: '#1E3A8A', border: '1px solid #E2E8F0' }}
            >
              {d}
            </span>
          ))}
        </div>

        {/* Dual CTAs */}
        <div className="flex items-center gap-2 pt-1">
          <Link
            href={`/rental/${categorySlug}/${p.slug}`}
            className="flex-1 text-center text-xs font-semibold py-2 rounded-lg border transition-colors hover:bg-[#0B1A46] hover:text-white hover:border-[#0B1A46]"
            style={{ color: '#0B1A46', borderColor: '#CBD5E0' }}
          >
            View Details
          </Link>
          <div className="flex-1">
            <AddToQuoteButton product={p} size="sm"/>
          </div>
        </div>
      </div>
    </div>
  )
}
