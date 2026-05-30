'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import * as Icons from 'lucide-react'

/* ── Icon helper ─────────────────────────────────────────────────────────── */
const Ic = ({ name, ...rest }) => {
  const C = Icons[name] || Icons.Check
  return <C {...rest} />
}

/* ── Scroll-reveal hook ──────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) }
        })
      },
      { threshold: 0.10 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ── Design tokens (light sections) ─────────────────────────────────────── */
// Headings on light bg
const T_NAV   = '#0B1A46'
// Body text on light bg
const T_BODY  = '#4B5563'
// Section backgrounds — alternating
const BG_WHITE = '#FFFFFF'
const BG_GREY  = '#F4F6FA'

/* ── Reusable section-eyebrow (light version) ────────────────────────────── */
function Eyebrow({ children }) {
  return (
    <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', color: '#E87722', marginBottom: '12px' }}>
      {children}
    </p>
  )
}

/* ── Light H2 with orange accent bar ────────────────────────────────────── */
function SectionHeading({ children, centered = true }) {
  return (
    <div className={centered ? 'text-center' : ''}>
      <h2 style={{ color: T_NAV, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
        {children}
      </h2>
      <div
        style={{
          width: '56px', height: '3px', background: '#E87722', borderRadius: '3px',
          marginTop: '14px', ...(centered ? { margin: '14px auto 0' } : { marginTop: '14px' }),
        }}
        aria-hidden="true"
      />
    </div>
  )
}

/* ── Feature card — matches home .service-card exactly ──────────────────── */
function FeatureCard({ icon, title, desc, delay = 0 }) {
  return (
    <div
      className="service-card p-7 reveal"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
        style={{ background: 'rgba(232,119,34,0.10)' }}
      >
        <Ic name={icon} size={20} className="text-[#E87722]" />
      </div>
      <h3 className="service-card__title text-base mb-2">{title}</h3>
      <p className="service-card__desc text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════════════════ */
export default function ServicePageTemplate({ data, related, breadcrumb }) {
  useReveal()

  const {
    h1, hero, overview, features, benefits, process, industries, faqs, icon,
    // Optional fields — all backwards-compatible (undefined = graceful no-op)
    eyebrow,        // Hero pill label; default 'IP Care Enterprise Service'
    overviewTitle,  // Overview H2; default 'Overview'
    phonePrimary,   // '+971 50 6828290' — phone button in hero + bottom CTA
    heroImage,      // Unsplash URL or /public path — right panel on desktop
    heroImageAlt,   // Descriptive alt text for heroImage
    sectionImage,   // Photo for the image+text split section
    sectionImageAlt,// Descriptive alt for sectionImage
    sectionContent, // { eyebrow, heading, body, checklist[] } — drives the split section copy
  } = data

  return (
    <>
      {/* ──────────────────────────────────────────────────────────────────
          BREADCRUMB — sits inside the navy hero zone
      ────────────────────────────────────────────────────────────────── */}
      {breadcrumb && (
        /* Full-width outer wrapper carries the background so it covers
           the entire viewport on any screen size — even beyond max-w-[1400px].
           Previously the background was on the inner constrained div, which
           left the body's #1E3A8A bleeding through at the corners on wide
           displays (>1400 px), producing the hard bright-blue rectangle. */
        <div style={{ background: '#0B1A46' }}>
          <div className="max-w-[1400px] mx-auto px-6 pt-5">
            <nav
              className="text-xs text-white/50 flex items-center gap-1.5 flex-wrap"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Icons.ChevronRight size={12} />
              <Link href="/services" className="hover:text-white transition-colors">Services</Link>
              {breadcrumb.map((b, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <Icons.ChevronRight size={12} />
                  {b.href
                    ? <Link href={b.href} className="hover:text-white transition-colors">{b.label}</Link>
                    : <span className="text-white/80">{b.label}</span>
                  }
                </span>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          1. HERO — navy background, orange bottom border, optional image
      ────────────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#0B1A46', borderBottom: '3px solid #E87722' }}
      >
        {/* Orange glow blotch */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute -top-32 left-1/4 w-[600px] h-[500px] rounded-full blur-3xl opacity-20"
            style={{ background: 'radial-gradient(circle, #E87722 0%, transparent 70%)' }}
          />
        </div>

        {/* Grid texture overlay (matches cybersecurity advisory premium look) */}
        <div
          className="pointer-events-none absolute inset-0 premium-grid opacity-60"
          aria-hidden="true"
        />

        {/* Inner — split on desktop when heroImage is set, centered otherwise */}
        <div
          className="relative max-w-[1400px] mx-auto px-6"
          style={{ paddingTop: heroImage ? '64px' : '80px', paddingBottom: heroImage ? '64px' : '80px' }}
        >
          <div className={`flex ${heroImage ? 'flex-col lg:flex-row items-center gap-10 lg:gap-16' : 'flex-col items-center text-center'}`}>

            {/* Text column */}
            <div className={heroImage ? 'flex-1 min-w-0' : 'max-w-[840px]'}>
              {/* Eyebrow pill */}
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 reveal"
                style={{ background: 'rgba(232,119,34,0.12)', border: '1px solid rgba(232,119,34,0.35)' }}
              >
                {icon && <Ic name={icon} size={14} className="text-[#E87722]" />}
                <span className="text-[#E87722] text-xs font-semibold uppercase tracking-wider">
                  {eyebrow || 'IP Care Enterprise Service'}
                </span>
              </div>

              {/* H1 */}
              <h1
                className="text-white font-bold leading-[1.1] tracking-tight reveal"
                style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.25rem)' }}
              >
                {h1}
              </h1>

              {/* Subtitle */}
              <p
                className="mt-5 reveal"
                style={{ color: 'rgba(255,255,255,0.78)', fontSize: '1.05rem', lineHeight: 1.65, maxWidth: heroImage ? '560px' : '680px' }}
              >
                {hero}
              </p>

              {/* CTAs */}
              <div className={`mt-8 flex flex-col sm:flex-row gap-3 reveal ${heroImage ? '' : 'justify-center'}`}>
                <Link href="/contact" className="btn-primary">
                  Get a Free Quote <Icons.ArrowRight size={16} />
                </Link>
                {phonePrimary
                  ? (
                    <a
                      href={`tel:${phonePrimary.replace(/\s/g, '')}`}
                      className="btn-ghost"
                    >
                      <Icons.Phone size={14} /> {phonePrimary}
                    </a>
                  )
                  : (
                    <Link href="/services" className="btn-ghost">
                      View All Services
                    </Link>
                  )
                }
              </div>
            </div>

            {/* Hero image — desktop only, hidden on mobile */}
            {heroImage && (
              <div
                className="hidden lg:block flex-shrink-0 reveal"
                style={{ width: '420px', height: '340px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.10)' }}
              >
                <img
                  src={heroImage}
                  alt={heroImageAlt || h1}
                  loading="eager"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────
          2. OVERVIEW — white, navy headings, slate body text
      ────────────────────────────────────────────────────────────────── */}
      <section style={{ background: BG_WHITE, padding: '72px 24px' }}>
        <div className="max-w-[860px] mx-auto reveal">
          <SectionHeading centered={false}>
            {overviewTitle || 'Overview'}
          </SectionHeading>
          <div
            className="mt-8 space-y-5"
            style={{ color: T_BODY, fontSize: '1.0625rem', lineHeight: 1.75 }}
          >
            {overview?.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────
          3. IMAGE + TEXT SPLIT — data-driven via sectionContent; renders
             only when sectionImage is set. Backwards-compat: falls back to
             generic labels when sectionContent is not defined.
      ────────────────────────────────────────────────────────────────── */}
      {sectionImage && (
        <section style={{ background: BG_GREY, padding: '72px 24px' }}>
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
              {/* Image */}
              <div
                className="flex-shrink-0 reveal w-full md:w-[45%]"
                style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(10,26,70,0.14)', aspectRatio: '4/3' }}
              >
                <img
                  src={sectionImage}
                  alt={sectionImageAlt || 'Service details'}
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Text — driven by sectionContent field in subpage data */}
              <div className="flex-1 min-w-0 reveal" style={{ transitionDelay: '80ms' }}>
                <Eyebrow>{sectionContent?.eyebrow || 'What We Include'}</Eyebrow>
                <SectionHeading centered={false}>
                  {sectionContent?.heading || 'Service Details'}
                </SectionHeading>
                <div
                  className="mt-6 space-y-4"
                  style={{ color: T_BODY, fontSize: '0.9375rem', lineHeight: 1.7 }}
                >
                  {sectionContent?.body && <p>{sectionContent.body}</p>}
                  {sectionContent?.checklist?.length > 0 && (
                    <ul className="space-y-2.5">
                      {sectionContent.checklist.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Icons.CheckCircle2
                            size={18}
                            className="flex-shrink-0 mt-0.5"
                            style={{ color: '#E87722' }}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          4. KEY FEATURES — white, service-card style (3-col grid)
      ────────────────────────────────────────────────────────────────── */}
      {features?.length > 0 && (
        <section style={{ background: BG_WHITE, padding: '72px 24px' }}>
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-12 reveal">
              <Eyebrow>Capabilities</Eyebrow>
              <SectionHeading>What's Included</SectionHeading>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <FeatureCard
                  key={i}
                  icon={f.icon}
                  title={f.title}
                  desc={f.desc}
                  delay={i * 70}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          5. BUSINESS BENEFITS — light grey, 2-col benefit items
      ────────────────────────────────────────────────────────────────── */}
      {benefits?.length > 0 && (
        <section style={{ background: BG_GREY, padding: '72px 24px' }}>
          <div className="max-w-[1100px] mx-auto">
            <div className="text-center mb-12 reveal">
              <Eyebrow>Why IP Care</Eyebrow>
              <SectionHeading>What Sets Us Apart</SectionHeading>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {benefits.map((b, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-6 rounded-2xl reveal"
                  style={{
                    background: BG_WHITE,
                    borderTop: '3px solid #E87722',
                    boxShadow: '0 4px 20px rgba(10,26,70,0.07)',
                    transitionDelay: `${i * 70}ms`,
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 10px 32px rgba(10,26,70,0.13)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(10,26,70,0.07)'
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(232,119,34,0.10)' }}
                  >
                    <Ic name={b.icon} size={22} className="text-[#E87722]" />
                  </div>
                  <div>
                    <div className="font-bold text-base" style={{ color: T_NAV }}>{b.t}</div>
                    <div className="text-sm mt-1 leading-relaxed" style={{ color: T_BODY }}>{b.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          6. PROCESS — white, numbered steps with orange circles
      ────────────────────────────────────────────────────────────────── */}
      {process?.length > 0 && (
        <section style={{ background: BG_WHITE, padding: '72px 24px' }}>
          <div className="max-w-[1300px] mx-auto">
            <div className="text-center mb-14 reveal">
              <Eyebrow>Our Delivery Approach</Eyebrow>
              <SectionHeading>How We Deliver</SectionHeading>
              <p className="mt-4 text-sm" style={{ color: T_BODY }}>A proven, repeatable approach — used on every engagement.</p>
            </div>
            <div
              className={`grid gap-6 relative ${process.length <= 4 ? 'md:grid-cols-4' : 'md:grid-cols-5'}`}
            >
              {/* Connector line */}
              <div
                className="hidden md:block absolute top-7 h-px pointer-events-none"
                style={{
                  left: `${(1 / (process.length * 2)) * 100}%`,
                  right: `${(1 / (process.length * 2)) * 100}%`,
                  background: 'linear-gradient(90deg, transparent, rgba(232,119,34,0.4), transparent)',
                }}
                aria-hidden="true"
              />
              {process.map((s, i) => (
                <div
                  key={i}
                  className="relative reveal text-center"
                  style={{ transitionDelay: `${i * 90}ms` }}
                >
                  {/* Numbered circle */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 text-white font-bold text-lg relative z-10"
                    style={{ background: '#E87722', boxShadow: '0 0 0 6px rgba(232,119,34,0.12)' }}
                  >
                    {s.n}
                  </div>
                  <h3 className="font-bold text-base mb-2" style={{ color: T_NAV }}>{s.t}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: T_BODY }}>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          7. WHO IT'S FOR — light grey, orange pill tags
      ────────────────────────────────────────────────────────────────── */}
      {industries?.length > 0 && (
        <section style={{ background: BG_GREY, padding: '64px 24px' }}>
          <div className="max-w-[1000px] mx-auto text-center reveal">
            <Eyebrow>Who It's For</Eyebrow>
            <SectionHeading>Industries We Serve</SectionHeading>
            <div className="flex flex-wrap justify-center gap-3 mt-10">
              {industries.map((ind) => (
                <span
                  key={ind}
                  className="px-5 py-2 rounded-full text-sm font-semibold"
                  style={{
                    background: BG_WHITE,
                    color: T_NAV,
                    border: '1.5px solid #E87722',
                    boxShadow: '0 2px 8px rgba(10,26,70,0.06)',
                  }}
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          8. RELATED SERVICES — white, service-card style
      ────────────────────────────────────────────────────────────────── */}
      {related?.length > 0 && (
        <section style={{ background: BG_WHITE, padding: '72px 24px' }}>
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-12 reveal">
              <Eyebrow>You May Also Need</Eyebrow>
              <SectionHeading>Related Services</SectionHeading>
            </div>
            <div className={`grid gap-6 ${related.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
              {related.map((r, i) => (
                <Link
                  key={r.href || r.slug}
                  href={r.href || `/services/${r.slug}`}
                  className="service-card p-7 block group reveal"
                  style={{ transitionDelay: `${i * 75}ms` }}
                >
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: 'rgba(232,119,34,0.10)' }}
                  >
                    <Ic name={r.icon} size={20} className="text-[#E87722]" />
                  </div>
                  <h3 className="service-card__title text-base mb-2">{r.name}</h3>
                  <p className="service-card__desc text-sm mb-5 leading-relaxed">{r.short}</p>
                  <span className="service-card__cta inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2">
                    Explore <Icons.ArrowRight size={13} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          9. FAQ — light grey, white accordion cards, navy text
      ────────────────────────────────────────────────────────────────── */}
      {faqs?.length > 0 && (
        <section style={{ background: BG_GREY, padding: '72px 24px' }}>
          <div className="max-w-[860px] mx-auto">
            <div className="text-center mb-12 reveal">
              <Eyebrow>Questions & Answers</Eyebrow>
              <SectionHeading>Frequently Asked Questions</SectionHeading>
            </div>
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <details
                  key={i}
                  className="reveal group"
                  style={{
                    background: BG_WHITE,
                    borderRadius: '14px',
                    borderTop: '3px solid #E87722',
                    boxShadow: '0 4px 20px rgba(10,26,70,0.07)',
                    overflow: 'hidden',
                    transitionDelay: `${i * 55}ms`,
                  }}
                >
                  <summary
                    className="cursor-pointer list-none flex items-center justify-between gap-4"
                    style={{ padding: '20px 24px' }}
                  >
                    <h3 className="font-semibold text-base" style={{ color: T_NAV }}>{f.q}</h3>
                    <Icons.Plus
                      size={18}
                      className="flex-shrink-0 group-open:rotate-45 transition-transform duration-200"
                      style={{ color: '#E87722' }}
                    />
                  </summary>
                  <div style={{ padding: '0 24px 20px', borderTop: '1px solid #EEF1F5' }}>
                    <p className="text-sm leading-relaxed pt-4" style={{ color: T_BODY }}>{f.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          10. BOTTOM CTA BAND — navy, orange border top (matches home OfficesCTA)
      ────────────────────────────────────────────────────────────────── */}
      <section
        style={{ background: '#0B1A46', borderTop: '3px solid #E87722', padding: '64px 24px' }}
      >
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center reveal">
            <h2
              className="text-white font-bold mb-4"
              style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)', letterSpacing: '-0.02em' }}
            >
              Ready to Start Your Migration?
            </h2>
            <p
              className="max-w-xl mx-auto mb-8"
              style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', lineHeight: 1.7 }}
            >
              Talk to our UAE-based team for a free readiness assessment — we'll scope the work, size the business case, and tell you honestly what moves where and when.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
              <Link href="/contact" className="btn-primary">
                Start a Conversation <Icons.ArrowRight size={16} />
              </Link>
              {phonePrimary && (
                <a
                  href={`tel:${phonePrimary.replace(/\s/g, '')}`}
                  className="btn-ghost"
                >
                  <Icons.Phone size={14} /> {phonePrimary}
                </a>
              )}
              <a href="tel:+97126766935" className="btn-ghost">
                <Icons.Phone size={14} /> +971 2 676 6935
              </a>
            </div>
            {/* NAP — Salam St address */}
            <p
              className="mt-8 text-xs"
              style={{ color: 'rgba(255,255,255,0.40)', lineHeight: 1.7 }}
            >
              info@ipcare.ae &nbsp;·&nbsp; Salam Street, P.O. Box 53209, Abu Dhabi, UAE &nbsp;·&nbsp; UAE: +971 2 676 6935 &nbsp;·&nbsp; Canada: +1 416 786 0782
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
