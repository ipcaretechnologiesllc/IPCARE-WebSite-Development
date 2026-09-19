import Link from 'next/link'
import { ChevronRight, ArrowRight, ShieldAlert, Monitor, KeyRound, ServerCog, Check } from 'lucide-react'

// Presentation layer for narrative (non-physical) case studies — see
// lib/case-studies-data.js for the data contract.
//
// Server component by design: the page is static text with one native <details>
// accordion, so nothing here needs client JS. The site's ELV case-study
// template (app/portfolio/[slug]) is built around poster images, work photos
// and hardware quantity tables, none of which an incident-response engagement
// has — hence a separate component rather than a variant flag on that one.

const NAVY = '#0B1A46'
const ORANGE = '#E87722'
const BLUE = '#0066B3'
const BODY = '#4B5563'
const MUTED = '#6B7280'
const LINE = '#E3E9EF'
const TINT = '#F4F6FA'

const ICONS = { ShieldAlert, Monitor, KeyRound, ServerCog }

function Eyebrow({ children, onDark = false }) {
  return (
    <p
      className="text-[12px] font-bold uppercase mb-3"
      style={{ letterSpacing: '0.16em', color: onDark ? '#FF9455' : ORANGE }}
    >
      {children}
    </p>
  )
}

// Mirrors ServicePageTemplate's SectionHeading: same clamp, same weight, same
// 56x3px orange accent bar. Left-aligned here because this page's sections are
// editorial rather than centered, but the type scale must not drift from the
// rest of the site.
function Heading({ children }) {
  return (
    <>
      <h2
        className="font-extrabold"
        style={{
          color: NAVY,
          fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
        }}
      >
        {children}
      </h2>
      <div className="mt-3.5 h-[3px] w-14 rounded" style={{ background: ORANGE }} aria-hidden="true" />
    </>
  )
}

const METRIC_TONE = { navy: NAVY, orange: ORANGE, blue: BLUE }

export default function CaseStudyNarrative({ study, breadcrumb }) {
  const {
    eyebrow, h1, lede, facts = [], metrics = [],
    situation, challenge, timeline, approach, findings, results, faq,
    cta, related = [], footnote,
  } = study

  return (
    <article>
      {/* ── Hero ──────────────────────────────────────────────────────────
          Abstract brand graphic rather than a stock photo: there is no
          photographable artefact in a forensic engagement, and a stock
          "hacker in a hoodie" would undercut the page's credibility. */}
      <header
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, #17436A 0%, ${NAVY} 45%, #081B2E 100%)` }}
      >
        <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden="true">
          <svg viewBox="0 0 1440 620" preserveAspectRatio="xMaxYMid slice" className="w-full h-full">
            <g stroke="#4E82B8" strokeOpacity=".35" fill="#6FA3D6" fillOpacity=".45">
              <line x1="1040" y1="90" x2="1150" y2="150" strokeWidth="1.5" />
              <line x1="1150" y1="150" x2="1268" y2="96" strokeWidth="1.5" />
              <line x1="1150" y1="150" x2="1210" y2="262" strokeWidth="1.5" />
              <line x1="1210" y1="262" x2="1330" y2="210" strokeWidth="1.5" />
              <line x1="1268" y1="96" x2="1380" y2="140" strokeWidth="1.5" />
              <line x1="1040" y1="90" x2="1096" y2="250" strokeWidth="1.5" />
              <circle cx="1040" cy="90" r="5" /><circle cx="1150" cy="150" r="7" />
              <circle cx="1268" cy="96" r="4" /><circle cx="1210" cy="262" r="6" />
              <circle cx="1330" cy="210" r="4" /><circle cx="1380" cy="140" r="5" />
              <circle cx="1096" cy="250" r="4" />
              <circle cx="1150" cy="150" r="16" fill="none" strokeWidth="1.5" />
              <circle cx="1210" cy="262" r="14" fill="none" strokeWidth="1.5" />
            </g>
            <path d="M1440 400 L1440 620 L1235 620 Z" fill={ORANGE} fillOpacity=".92" />
            <path d="M1440 520 L1440 620 L1345 620 Z" fill="#FF8A5C" fillOpacity=".35" />
          </svg>
        </div>

        <div className="relative max-w-[1140px] mx-auto px-6 py-14 sm:py-16 lg:py-20">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-white/70">
            {breadcrumb.map((crumb, i) => (
              <span key={crumb.href || crumb.label} className="inline-flex items-center gap-1.5">
                {i > 0 && <ChevronRight size={14} className="text-white/40" />}
                {crumb.href
                  ? <Link href={crumb.href} className="transition hover:text-white">{crumb.label}</Link>
                  : <span className="font-semibold text-white">{crumb.label}</span>}
              </span>
            ))}
          </nav>

          <Eyebrow onDark>{eyebrow}</Eyebrow>
          <h1
            className="text-white font-extrabold max-w-[19ch]"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', lineHeight: 1.15, letterSpacing: '-0.02em' }}
          >
            {h1}
          </h1>
          <p className="mt-5 max-w-[62ch] text-[#C6D6E6]" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.18rem)', lineHeight: 1.65 }}>
            {lede}
          </p>

          <Link
            href={cta.href}
            className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-white transition hover:-translate-y-0.5"
            style={{ background: ORANGE }}
          >
            Book a security review <ArrowRight size={16} />
          </Link>

          {facts.length > 0 && (
            <dl className="mt-10 grid gap-5 sm:gap-8 pt-7 border-t border-[rgba(160,190,220,0.28)] sm:grid-cols-2 lg:grid-cols-4">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[11px] font-bold uppercase" style={{ letterSpacing: '0.14em', color: '#FF9455' }}>
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 text-white text-[15px] leading-relaxed">
                    {fact.value}
                    {fact.note && <span className="block text-[13px] text-[#8FA6BC]">{fact.note}</span>}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </header>

      {/* ── Metrics ───────────────────────────────────────────────────────
          Deliberately non-financial. The engagement's headline figure was a
          disputed spend amount and is withheld; these four stand on their own. */}
      {metrics.length > 0 && (
        <section style={{ background: TINT, padding: '56px 24px' }}>
          <div className="max-w-[1140px] mx-auto grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl bg-white p-6" style={{ border: `1px solid ${LINE}` }}>
                <div
                  className="font-extrabold"
                  style={{
                    color: METRIC_TONE[metric.tone] || NAVY,
                    fontSize: 'clamp(1.4rem, 2.4vw, 1.9rem)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {metric.value}
                </div>
                <p className="mt-2.5 text-sm leading-relaxed" style={{ color: MUTED }}>{metric.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Situation & challenge ─────────────────────────────────────────── */}
      <section style={{ background: '#FFFFFF', padding: '72px 24px' }}>
        <div className="max-w-[1140px] mx-auto grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <Eyebrow>{situation.eyebrow}</Eyebrow>
            <Heading>{situation.heading}</Heading>
            <div className="mt-5 space-y-4" style={{ color: BODY, lineHeight: 1.7 }}>
              {situation.body.map((para, i) => <p key={i}>{para}</p>)}
            </div>
          </div>
          <div>
            <Eyebrow>{challenge.eyebrow}</Eyebrow>
            <Heading>{challenge.heading}</Heading>
            <ul className="mt-5 space-y-3.5">
              {challenge.items.map((item) => (
                <li key={item.lead} className="relative pl-7" style={{ color: BODY, lineHeight: 1.7 }}>
                  <span
                    className="absolute left-0 top-[0.62em] h-2 w-2 rounded-full"
                    style={{ background: ORANGE }}
                    aria-hidden="true"
                  />
                  <strong style={{ color: NAVY }}>{item.lead}</strong> {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────────────────
          Relative days, not calendar dates — the ten-week arc is the point,
          and nothing here should pin the incident to a date. */}
      {timeline?.events?.length > 0 && (
        <section style={{ background: TINT, padding: '72px 24px' }}>
          <div className="max-w-[1140px] mx-auto">
            <Eyebrow>{timeline.eyebrow}</Eyebrow>
            <Heading>{timeline.heading}</Heading>
            <ol className="mt-9 border-l-2" style={{ borderColor: LINE }}>
              {timeline.events.map((event, i) => (
                <li
                  key={event.when}
                  className="relative pl-7"
                  style={{ paddingBottom: i === timeline.events.length - 1 ? 0 : '26px' }}
                >
                  <span
                    className="absolute -left-[7px] top-[9px] h-3 w-3 rounded-full bg-white"
                    style={{ border: `3px solid ${BLUE}` }}
                    aria-hidden="true"
                  />
                  <div className="text-[12px] font-bold uppercase" style={{ letterSpacing: '0.1em', color: ORANGE }}>
                    {event.when}
                  </div>
                  <div className="mt-0.5 font-semibold" style={{ color: NAVY }}>{event.what}</div>
                  <div className="text-[15px]" style={{ color: BODY }}>{event.meaning}</div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ── Approach ──────────────────────────────────────────────────────── */}
      <section style={{ background: '#FFFFFF', padding: '72px 24px' }}>
        <div className="max-w-[1140px] mx-auto">
          <Eyebrow>{approach.eyebrow}</Eyebrow>
          <Heading>{approach.heading}</Heading>
          <p className="mt-4 max-w-[62ch] text-[1.08rem]" style={{ color: NAVY, lineHeight: 1.7 }}>{approach.lede}</p>

          <ol className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {approach.steps.map((step, i) => (
              <li key={step.title} className="rounded-2xl bg-white p-6" style={{ border: `1px solid ${LINE}` }}>
                <div
                  className="mb-3.5 flex h-9 w-9 items-center justify-center rounded-full font-bold text-white"
                  style={{ background: NAVY, border: `2px solid ${ORANGE}` }}
                >
                  {i + 1}
                </div>
                <h3 className="mb-2 font-bold" style={{ color: NAVY, fontSize: '1.05rem' }}>{step.title}</h3>
                <p className="text-[15px]" style={{ color: BODY, lineHeight: 1.65 }}>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Findings ──────────────────────────────────────────────────────── */}
      <section style={{ background: TINT, padding: '72px 24px' }}>
        <div className="max-w-[1140px] mx-auto">
          <Eyebrow>{findings.eyebrow}</Eyebrow>
          <Heading>{findings.heading}</Heading>
          <p className="mt-4 max-w-[62ch] text-[1.08rem]" style={{ color: NAVY, lineHeight: 1.7 }}>{findings.lede}</p>

          <div className="mt-8 overflow-x-auto rounded-2xl" style={{ border: `1px solid ${LINE}` }}>
            <table className="w-full min-w-[640px] border-collapse bg-white">
              <caption className="sr-only">{findings.tableCaption}</caption>
              <thead>
                <tr>
                  {findings.columns.map((col) => (
                    <th
                      key={col}
                      scope="col"
                      className="px-5 py-3.5 text-left text-[14px] font-semibold text-white"
                      style={{ background: NAVY }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {findings.chain.map((row, i) => (
                  <tr key={row[0]} style={{ background: i % 2 === 1 ? TINT : '#FFFFFF' }}>
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className="px-5 py-3.5 align-top text-[15px]"
                        style={{
                          borderTop: `1px solid ${LINE}`,
                          color: j === 0 ? BLUE : BODY,
                          fontWeight: j === 0 ? 700 : 400,
                          whiteSpace: j === 0 ? 'nowrap' : 'normal',
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-7 rounded-2xl p-7" style={{ background: '#FDF2EE', border: '1px solid #F6C3B2' }}>
            <Eyebrow>Root cause</Eyebrow>
            <p style={{ color: NAVY, lineHeight: 1.7 }}>{findings.rootCause}</p>
          </div>
        </div>
      </section>

      {/* ── Results ───────────────────────────────────────────────────────── */}
      <section style={{ background: '#FFFFFF', padding: '72px 24px' }}>
        <div className="max-w-[1140px] mx-auto">
          <Eyebrow>{results.eyebrow}</Eyebrow>
          <Heading>{results.heading}</Heading>

          <div className="mt-9 grid gap-10 lg:grid-cols-2 lg:gap-14">
            {[
              { title: 'Delivered', items: results.delivered },
              { title: 'What changed going forward', items: results.changed },
            ].map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 font-bold" style={{ color: NAVY, fontSize: '1.1rem' }}>{col.title}</h3>
                <ul className="space-y-3.5">
                  {col.items.map((item, i) => (
                    <li key={i} className="relative pl-7" style={{ color: BODY, lineHeight: 1.7 }}>
                      <Check size={16} className="absolute left-0 top-[0.35em]" style={{ color: ORANGE }} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* The honest-limits panel is the most commercially valuable part of
              this page: it is what a prospect checks for before trusting a
              forensics vendor. Keep it. */}
          <div className="mt-11 rounded-2xl p-8 lg:p-11" style={{ background: NAVY }}>
            <h3 className="mb-3 font-bold text-white" style={{ fontSize: '1.15rem' }}>{results.honesty.heading}</h3>
            <p className="text-[#C6D6E6]" style={{ lineHeight: 1.75 }}>{results.honesty.text}</p>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────
          Native <details> so the accordion works without client JS. These
          three questions are kept distinct from the parent Incident Response
          page's five — both emit FAQPage schema. */}
      {faq?.items?.length > 0 && (
        <section style={{ background: TINT, padding: '72px 24px' }}>
          <div className="max-w-[880px] mx-auto">
            <Eyebrow>{faq.eyebrow}</Eyebrow>
            <Heading>{faq.heading}</Heading>
            <div className="mt-7" style={{ borderTop: `1px solid ${LINE}` }}>
              {faq.items.map((item, i) => (
                <details key={item.q} open={i === 0} className="group" style={{ borderBottom: `1px solid ${LINE}` }}>
                  <summary
                    className="cursor-pointer list-none py-4 pr-9 font-semibold marker:content-none [&::-webkit-details-marker]:hidden"
                    style={{ color: NAVY }}
                  >
                    {item.q}
                    <span
                      className="float-right text-2xl font-normal leading-none transition-transform group-open:rotate-45"
                      style={{ color: ORANGE }}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="pb-5 text-[15px]" style={{ color: BODY, lineHeight: 1.7 }}>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Related services ──────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section style={{ background: '#FFFFFF', padding: '72px 24px' }}>
          <div className="max-w-[1140px] mx-auto">
            <Eyebrow>Related services</Eyebrow>
            <Heading>How we can help</Heading>
            <div className={`mt-8 grid gap-5 ${related.length % 4 === 0 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
              {related.map((item) => {
                const Icon = ICONS[item.icon] || ShieldAlert
                return (
                  <Link key={item.href} href={item.href} className="service-card block p-7 group">
                    <div
                      className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg"
                      style={{ background: 'rgba(232,119,34,0.10)' }}
                    >
                      <Icon size={20} style={{ color: ORANGE }} />
                    </div>
                    <h3 className="service-card__title mb-2 text-base">{item.name}</h3>
                    <p className="service-card__desc mb-5 text-sm leading-relaxed">{item.short}</p>
                    <span className="service-card__cta inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold">
                      Explore <ArrowRight size={13} />
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA + footnote ────────────────────────────────────────────────── */}
      <section style={{ background: '#FFFFFF', padding: '0 24px 72px' }}>
        <div className="max-w-[1140px] mx-auto">
          <div
            className="flex flex-col items-start gap-6 rounded-2xl p-8 lg:flex-row lg:items-center lg:justify-between lg:p-11"
            style={{ background: ORANGE }}
          >
            <div>
              <h2 className="font-extrabold text-white" style={{ fontSize: 'clamp(1.4rem, 2.6vw, 1.9rem)', lineHeight: 1.25 }}>
                {cta.heading}
              </h2>
              <p className="mt-2 max-w-[52ch] text-[#FFE3D9]" style={{ lineHeight: 1.65 }}>{cta.text}</p>
            </div>
            <Link
              href={cta.href}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold transition hover:bg-[#0B1A46] hover:text-white"
              style={{ color: ORANGE }}
            >
              {cta.label} <ArrowRight size={16} />
            </Link>
          </div>

          {footnote && (
            <p className="mt-10 pt-5 text-[13px]" style={{ borderTop: `1px solid ${LINE}`, color: MUTED, lineHeight: 1.7 }}>
              {footnote}
            </p>
          )}
        </div>
      </section>
    </article>
  )
}
