'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import * as Icons from 'lucide-react'

/* ── Scroll-reveal hook (same pattern as ServicePageTemplate) ───────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) }
        })
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ── Design tokens (light sections) ─────────────────────────────────────── */
const T_NAV   = '#0B1A46'
const T_BODY  = '#4B5563'
const BG_WHITE = '#FFFFFF'
const BG_GREY  = '#F4F6FA'

function Eyebrow({ children }) {
  return (
    <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', color: '#E87722', marginBottom: '12px' }}>
      {children}
    </p>
  )
}

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

/* Wraps the first occurrence of `accent` within `h1` in an orange span;
   falls back to plain text when accent is absent or not a substring. */
function renderH1(h1, accent) {
  if (!accent || !h1.includes(accent)) return h1
  const i = h1.indexOf(accent)
  return (
    <>
      {h1.slice(0, i)}
      <span style={{ color: '#E87722' }}>{accent}</span>
      {h1.slice(i + accent.length)}
    </>
  )
}

function CtaLink({ cta, className }) {
  if (!cta) return null
  if (cta.external) {
    return (
      <a href={cta.href} target="_blank" rel="noopener noreferrer" className={className}>
        {cta.label} <Icons.ArrowRight size={16} />
      </a>
    )
  }
  return (
    <Link href={cta.href} className={className}>
      {cta.label} <Icons.ArrowRight size={16} />
    </Link>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════════════════ */
export default function ProductPageTemplate({ data }) {
  useReveal()

  const {
    eyebrow, h1, h1Accent, tagline,
    heroImage, heroImageAlt,
    sectionImage, sectionImageAlt,
    overview, capabilities, industries,
    whyTitle, why, faqs,
    primaryCta, secondaryCta,
  } = data

  return (
    <>
      {/* ──────────────────────────────────────────────────────────────────
          BREADCRUMB
      ────────────────────────────────────────────────────────────────── */}
      <div style={{ background: '#1E3A8A' }}>
        <div className="max-w-[1400px] mx-auto px-6 pt-5">
          <nav className="text-xs text-white/50 flex items-center gap-1.5 flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Icons.ChevronRight size={12} />
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
            <Icons.ChevronRight size={12} />
            <span className="text-white/80">{h1}</span>
          </nav>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────
          1. HERO
      ────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: '#1E3A8A', borderBottom: '3px solid #E87722' }}>
        {heroImage && (
          <img
            src={heroImage}
            alt={heroImageAlt || h1}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', zIndex: 0 }}
          />
        )}
        {heroImage && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 65% 75% at 50% 45%, rgba(30,58,138,0.82) 0%, rgba(30,58,138,0.55) 55%, rgba(30,58,138,0.30) 100%)',
              zIndex: 1,
            }}
            aria-hidden="true"
          />
        )}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 2 }} aria-hidden="true">
          <div
            className="absolute -top-32 left-1/4 w-[600px] h-[500px] rounded-full blur-3xl opacity-20"
            style={{ background: 'radial-gradient(circle, #E87722 0%, transparent 70%)' }}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 premium-grid opacity-60" style={{ zIndex: 2 }} aria-hidden="true" />

        <div className="relative max-w-[1400px] mx-auto px-6" style={{ paddingTop: '80px', paddingBottom: '80px', zIndex: 3 }}>
          <div className="max-w-[840px] mx-auto text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 reveal"
              style={{ background: 'rgba(232,119,34,0.12)', border: '1px solid rgba(232,119,34,0.35)' }}
            >
              <span className="text-[#E87722] text-xs font-semibold uppercase tracking-wider">{eyebrow}</span>
            </div>

            <h1 className="text-white font-bold leading-[1.1] tracking-tight reveal" style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.25rem)' }}>
              {renderH1(h1, h1Accent)}
            </h1>

            <p
              className="mt-5 reveal mx-auto"
              style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', lineHeight: 1.65, maxWidth: '680px' }}
            >
              {tagline}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center reveal">
              <CtaLink cta={primaryCta} className="btn-primary" />
              <CtaLink cta={secondaryCta} className="btn-secondary-pill" />
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────
          2. OVERVIEW — image + text split
      ────────────────────────────────────────────────────────────────── */}
      <section style={{ background: BG_WHITE, padding: '72px 24px' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {sectionImage && (
              <div
                className="flex-shrink-0 reveal w-full md:w-[45%]"
                style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(10,26,70,0.14)', aspectRatio: '4/3' }}
              >
                <img
                  src={sectionImage}
                  alt={sectionImageAlt || h1}
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            )}

            <div className="flex-1 min-w-0 reveal" style={{ transitionDelay: '80ms' }}>
              <Eyebrow>Overview</Eyebrow>
              <SectionHeading centered={false}>What CrewForce360 Does</SectionHeading>
              <div className="mt-6 space-y-4" style={{ color: T_BODY, fontSize: '0.9375rem', lineHeight: 1.7 }}>
                {overview?.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────
          3. CAPABILITIES — grid of 10 tiles
      ────────────────────────────────────────────────────────────────── */}
      {capabilities?.length > 0 && (
        <section style={{ background: BG_GREY, padding: '72px 24px' }}>
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-12 reveal">
              <Eyebrow>Capabilities</Eyebrow>
              <SectionHeading>What's Included</SectionHeading>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
              {capabilities.map((c, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl reveal"
                  style={{
                    background: BG_WHITE,
                    borderTop: '3px solid #E87722',
                    boxShadow: '0 4px 20px rgba(10,26,70,0.07)',
                    transitionDelay: `${i * 50}ms`,
                  }}
                >
                  <h3 className="font-bold text-sm mb-2" style={{ color: T_NAV }}>{c.label}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: T_BODY }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          4. INDUSTRIES — pill chips
      ────────────────────────────────────────────────────────────────── */}
      {industries?.length > 0 && (
        <section style={{ background: BG_WHITE, padding: '64px 24px' }}>
          <div className="max-w-[1000px] mx-auto text-center reveal">
            <Eyebrow>Who It's For</Eyebrow>
            <SectionHeading>Industries We Serve</SectionHeading>
            <div className="flex flex-wrap justify-center gap-3 mt-10">
              {industries.map((ind) => (
                <span
                  key={ind}
                  className="px-5 py-2 rounded-full text-sm font-semibold max-w-full whitespace-normal break-words"
                  style={{ background: BG_GREY, color: T_NAV, border: '1.5px solid #E87722', boxShadow: '0 2px 8px rgba(10,26,70,0.06)' }}
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          5. WHY — built by IP Care, glass panel
      ────────────────────────────────────────────────────────────────── */}
      {why?.length > 0 && (
        <section style={{ background: '#1E3A8A', padding: '72px 24px' }}>
          <div className="max-w-[900px] mx-auto reveal">
            <div
              className="rounded-2xl p-8 md:p-12"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}
            >
              <Eyebrow>Why CrewForce360</Eyebrow>
              <h2 className="text-white font-bold mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}>
                {whyTitle}
              </h2>
              <div className="space-y-4" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', lineHeight: 1.75 }}>
                {why.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          6. FAQ
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
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4" style={{ padding: '20px 24px' }}>
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
          7. CTA STRIP — orange-tinted
      ────────────────────────────────────────────────────────────────── */}
      <section style={{ background: '#1E3A8A', borderTop: '3px solid #E87722', padding: '64px 24px' }}>
        <div className="max-w-[1100px] mx-auto">
          <div
            className="text-center reveal rounded-2xl p-10 md:p-14"
            style={{ background: 'rgba(232,119,34,0.10)', border: '1px solid rgba(232,119,34,0.30)' }}
          >
            <h2 className="text-white font-bold mb-4" style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)', letterSpacing: '-0.02em' }}>
              See CrewForce360 in action
            </h2>
            <p className="max-w-xl mx-auto mb-8" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', lineHeight: 1.7 }}>
              Talk to our team for a walkthrough of CrewForce360 on your own field operations.
            </p>
            <div className="flex justify-center">
              <CtaLink cta={primaryCta} className="btn-primary" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
