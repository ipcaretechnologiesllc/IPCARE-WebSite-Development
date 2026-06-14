'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { rentalCategories, getFeaturedProducts } from '@/lib/rental-data'
import CTAPhoneButtons from '@/components/site/CTAPhoneButtons'
import AddToQuoteButton from '@/components/rental/AddToQuoteButton'

/* ── Icon helper ─────────────────────────────────────────────── */
const Ic = ({ name, ...rest }) => { const C = Icons[name] || Icons.Package; return <C {...rest}/> }

/* ── Scroll-reveal hook ──────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) } }) },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ── Static data ─────────────────────────────────────────────── */
const featured = getFeaturedProducts(3)
const bundles  = rentalCategories['bundles'].products.slice(0, 3)
// All categories except 'bundles' (bundles get their own dedicated section)
const cats = Object.entries(rentalCategories).filter(([slug]) => slug !== 'bundles')

const CATEGORY_PHOTOS = {
  'laptops-desktops':  'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
  'tablets-ipads':     'https://images.unsplash.com/photo-1561154464-82e9adf32764',
  'printers':          '/Rental/rental-printers.jpg',
  'event-wifi':        '/Rental/rental-event-wifi.webp',
  'networking':        '/Rental/category-networking-equipment.webp',
  'cctv':              '/Rental/category-cctv-security.webp',
  'testing-equipment': '/Rental/category-testing-equipment.webp',
  'servers':           '/Rental/servers-data.webp',
  'macbooks':          'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
}

const CATEGORY_ALT = {
  'laptops-desktops':  'Laptop rental UAE, IP Care Technologies',
  'tablets-ipads':     'iPad and tablet rental UAE, IP Care Technologies',
  'printers':          'Printer rental UAE, IP Care Technologies',
  'event-wifi':        'Event WiFi and router rental UAE, IP Care Technologies',
  'networking':        'Networking equipment rental UAE, IP Care Technologies',
  'cctv':              'CCTV and security camera rental UAE, IP Care Technologies',
  'testing-equipment': 'Cable and fibre testing equipment rental UAE, IP Care Technologies',
  'servers':           'Servers and data equipment rental',
  'macbooks':          'MacBook and Mac rental UAE, IP Care Technologies',
}

const WHY_ITEMS = [
  { icon: 'Truck',   t: 'Delivery & Setup Included',    d: 'White-glove delivery, rack-and-stack and full configuration, not a hidden extra like other vendors.' },
  { icon: 'Wrench',  t: 'Experienced Engineers On-Site', d: 'Our engineers stay through your event or project, not just for handover.' },
  { icon: 'Globe2',  t: 'UAE + Canada Coverage',        d: 'One partner, two regions, consistent SLA and support. Dubai, Abu Dhabi, Toronto, Vancouver.' },
  { icon: 'Award',   t: '20+ Years, 500+ Projects',     d: 'Deep vendor relationships since 2003, real stock, real rates, no broker mark-ups.' },
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
          background: '#0B1A46',
          borderBottom: '3px solid #E87722',
        }}
      >
        {/* Hero photo — subject RIGHT, dark zone LEFT carries H1 */}
        <img
          src="/images/pages/rental-hero.webp"
          alt="Event IT equipment rental Abu Dhabi"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 pointer-events-none"
          style={{ width: '100%', height: '100%', maxWidth: '100%', objectFit: 'cover', objectPosition: 'right', zIndex: 0 }}
        />
        {/* Navy radial scrim — weighted left where the H1 sits, clear over the rest of the image */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 90% at 20% 50%, rgba(11,26,70,0.62) 0%, rgba(11,26,70,0.30) 55%, rgba(11,26,70,0.15) 100%)', zIndex: 10 }} />
        {/* Grid texture */}
        <div className="premium-grid absolute inset-0 pointer-events-none" style={{ zIndex: 11 }} />

        {/* Orange glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 11 }}>
          <div
            className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[700px] h-[420px] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(ellipse, rgba(232,119,34,0.20) 0%, transparent 70%)' }}
          />
        </div>

        <div className="relative w-full md:max-w-[50%] text-center md:text-left" style={{ zIndex: 20 }}>
          <div className="section-eyebrow reveal">
            Rental Hub
          </div>
          <h1
            className="text-white font-bold leading-[1.08] tracking-tight reveal"
            style={{ fontSize: 'clamp(2.4rem,5vw,3.6rem)' }}
          >
            IT <span className="text-[#E87722]">Equipment Rental</span><br />
            UAE and Canada
          </h1>
          <p className="body-text mt-5 text-base md:text-lg reveal">
            Short-term and long-term rentals. Delivery and setup included. Experienced engineers on-site.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 reveal">
            <a href="#categories" className="btn-primary">
              Browse Catalogue <Icons.ArrowRight size={16}/>
            </a>
            <Link href="/#contact" className="btn-secondary-pill">Talk to a Specialist</Link>
          </div>
        </div>
      </section>

      {/* ── BROWSE EQUIPMENT CATEGORIES ──────────────────────── */}
      <section id="categories" className="py-20 md:py-24 px-6" style={{ background: '#F4F6FA' }}>
        <div className="max-w-[1400px] mx-auto">

          <div className="text-center mb-12 reveal">
            <div className="section-eyebrow">
              Equipment Categories
            </div>
            <h2 className="font-bold text-3xl md:text-4xl" style={{ color: '#0B1A46' }}>
              Browse Equipment Categories
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cats.map(([slug, c], i) => (
              <Link
                key={slug}
                href={`/rental/${slug}`}
                className="group service-card rental-category-card overflow-hidden flex flex-col reveal"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {/* Photo — edge-to-edge, zooms on hover */}
                <div className="w-full overflow-hidden flex items-center justify-center p-4" style={{ aspectRatio: '16/10', background: '#F8F9FC' }}>
                  <img
                    src={(() => {
                      const photo = CATEGORY_PHOTOS[slug] || 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8'
                      return photo.startsWith('http') ? `${photo}?w=900&fm=webp&q=82` : photo
                    })()}
                    alt={CATEGORY_ALT[slug] || `${c.name} rental UAE, IP Care`}
                    width={900}
                    height={563}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>

                {/* Content area */}
                <div className="flex flex-col items-center text-center" style={{ padding: '20px 24px 24px' }}>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors duration-300 group-hover:bg-[#E87722]"
                    style={{ background: 'rgba(232,119,34,0.10)' }}
                  >
                    <Ic
                      name={c.icon}
                      size={22}
                      className="text-[#E87722] group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  <h3
                    className="font-bold leading-tight mb-2"
                    style={{ color: '#0B1A46', fontSize: '1.5rem' }}
                  >
                    {c.name}
                  </h3>
                  <span className="mono uppercase rental-category-card__pill">
                    {c.products.length} Items
                  </span>
                  <div
                    className="mt-3 flex items-center gap-1 text-sm font-semibold opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300"
                    style={{ color: '#1E3A8A' }}
                  >
                    Browse <Icons.ArrowRight size={13}/>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── MOST-REQUESTED ITEMS ─────────────────────────────── */}
      <section className="py-12 md:py-14 px-6" style={{ background: '#1E3A8A' }}>
        <div className="max-w-[1400px] mx-auto">

          <div className="text-center mb-8 reveal">
            <div className="section-eyebrow">
              Popular Rentals
            </div>
            <h2 className="font-bold text-2xl md:text-3xl" style={{ color: '#FFFFFF' }}>
              Most-Requested Items
            </h2>
            <p className="mt-2 text-sm max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.8)' }}>
              In stock and ready to ship across UAE and Canada. Daily, weekly and monthly rates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((p, i) => (
              <LightProductCard
                key={`${p.categorySlug}/${p.slug}`}
                product={p}
                categorySlug={p.categorySlug}
                delay={i * 60}
                compact
              />
            ))}
          </div>

          <div className="text-center mt-8 reveal">
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
            <div className="section-eyebrow">
              Pre-Built Packages
            </div>
            <h2 className="font-bold text-3xl md:text-4xl" style={{ color: '#0B1A46' }}>
              Bundle Packages
            </h2>
            <p className="mt-4 text-base max-w-2xl mx-auto" style={{ color: '#4A5568' }}>
              Sized for common use cases, everything assembled, delivered and set up. One line item, one price.
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
            <div className="section-eyebrow">
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
          background: '#1E3A8A',
          borderTop: '3px solid #E87722',
        }}
      >
        <div className="max-w-[1000px] mx-auto reveal">
          <div className="section-eyebrow">Get a Quote Today</div>
          <h2
            className="text-white font-bold leading-tight mb-5"
            style={{ fontSize: 'clamp(1.8rem,3.5vw,2.6rem)' }}
          >
            Can&apos;t find what you need?
          </h2>
          <p className="text-white/75 text-base md:text-lg max-w-xl mx-auto mb-8">
            Our rental catalogue has 500+ items. Tell us your project and we&apos;ll source the right
            kit, delivered and configured.
          </p>
          <CTAPhoneButtons />
        </div>
      </section>

    </main>
  )
}

/* ════════════════════════════════════════════════════════════════
   LIGHT PRODUCT CARD
   White service-card style, used only on this hub page.
   Does NOT replace the dark ProductCard used on category pages.
════════════════════════════════════════════════════════════════ */
function LightProductCard({ product: p, categorySlug, delay = 0, compact = false }) {
  const imgHeight = compact ? '140px' : '200px'
  const bodyPadding = compact ? 'p-3.5' : 'p-5'
  const specCount = compact ? 2 : 3

  return (
    <div
      className="group service-card overflow-hidden flex flex-col reveal"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* ── Image ── */}
      <Link
        href={`/rental/${categorySlug}/${p.slug}`}
        className="relative block overflow-hidden"
        style={{ height: imgHeight, background: '#F8F9FC' }}
      >
        <img
          src={p.image.startsWith('http') ? `${p.image}?w=600&fm=webp&q=82` : p.image}
          alt={`${p.brand} ${p.model} rental, IP Care Technologies`}
          width={600}
          height={200}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 w-full h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105 ${compact ? 'p-2.5' : 'p-4'}`}
        />
        {/* Brand badge */}
        <div
          className="absolute top-2.5 left-2.5 mono text-[11px] uppercase tracking-widest px-2 py-0.5 rounded"
          style={{ background: '#E87722', color: '#ffffff' }}
        >
          {p.brand}
        </div>
      </Link>

      {/* ── Body ── */}
      <div className={`flex-1 flex flex-col ${bodyPadding}`}>
        <Link href={`/rental/${categorySlug}/${p.slug}`}>
          <h3
            className={`font-bold leading-snug hover:text-[#E87722] transition-colors ${compact ? 'text-sm mb-2' : 'text-base md:text-lg mb-3'}`}
            style={{ color: '#0B1A46' }}
          >
            {p.model}
          </h3>
        </Link>

        {/* Spec bullets */}
        <ul className={`space-y-1 flex-1 ${compact ? 'mb-2.5' : 'mb-4'}`}>
          {p.specs.slice(0, specCount).map((s, i) => (
            <li key={i} className="text-xs flex items-start gap-2" style={{ color: '#4A5568' }}>
              <Icons.Check size={12} className="text-[#E87722] mt-0.5 flex-shrink-0"/>
              {s}
            </li>
          ))}
        </ul>

        {/* Duration chips */}
        <div className={`flex flex-wrap gap-1.5 ${compact ? 'mb-2.5' : 'mb-4'}`}>
          {['daily', 'weekly', 'monthly'].map((d) => (
            <span
              key={d}
              className={`mono uppercase tracking-widest rounded-full ${compact ? 'text-[11px] px-2 py-0.5' : 'text-[13px] px-2.5 py-1'}`}
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
