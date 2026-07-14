'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  CheckCircle2,
  Cloud,
  Globe2,
  MapPin,
  Minus,
  Network,
  Plus,
  Search,
  Server,
  ShieldCheck,
  X,
} from 'lucide-react'
import {
  cyberCapabilities,
  cyberDeliveryStats,
  cyberFaqs,
  cyberPractitioner,
  cyberProjects,
  cyberRelatedLinks,
  featuredCyberProjects,
} from '@/lib/cyber-advisory-data'

const iconMap = {
  Globe2,
  Server,
  ShieldCheck,
  Cloud,
  Network,
}

// id → { label, icon } for quick lookup when rendering cards
const capabilityMap = cyberCapabilities.reduce((acc, cap) => {
  acc[cap.id] = cap
  return acc
}, {})

function CapabilityIcon({ id, size = 22 }) {
  const cap = capabilityMap[id]
  const Icon = iconMap[cap?.icon] || ShieldCheck
  return <Icon size={size} />
}

function TechPills({ tech }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tech.map((item) => (
        <span
          key={item}
          className="inline-flex items-center rounded-full border border-[#E87722]/25 bg-[#E87722]/10 px-2.5 py-1 text-[11px] font-semibold text-[#B95812]"
        >
          {item}
        </span>
      ))}
    </div>
  )
}

function ProjectCard({ project }) {
  const primary = capabilityMap[project.capabilities[0]]
  return (
    <article className="service-card group flex h-full flex-col p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="service-card__icon flex h-12 w-12 items-center justify-center text-[#E87722]">
          <CapabilityIcon id={project.capabilities[0]} />
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0B1A46] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
          <MapPin size={12} />
          {project.region}
        </span>
      </div>

      <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#E87722]">
        <CheckCircle2 size={14} />
        {primary?.label}
      </div>
      <h3 className="text-xl font-extrabold leading-tight text-[#0B1A46]">{project.descriptor}</h3>
      <p className="mt-1.5 text-sm font-semibold text-[#667085]">{project.industry}</p>

      <div className="mt-4">
        <TechPills tech={project.tech} />
      </div>

      <p className="mt-4 text-sm leading-6 text-[#475467]">{project.scope}</p>

      <div className="mt-auto pt-5">
        <div className="rounded-lg border border-[#E5EAF3] bg-[#F4F6FA] p-4">
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#E87722]">Outcome</div>
          <p className="mt-2 text-sm leading-6 text-[#475467]">{project.outcome}</p>
        </div>
      </div>
    </article>
  )
}

function FeaturedEngagementCard({ project, index }) {
  const primary = capabilityMap[project.capabilities[0]]
  return (
    <article id={project.id} className="service-card group grid scroll-mt-24 overflow-hidden md:grid-cols-[38fr_62fr]">
      {/* Left rail — navy, carries identity + tech */}
      <div className="relative flex flex-col justify-between gap-6 bg-[#0B1A46] p-7">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-[#E87722]">
            <CapabilityIcon id={project.capabilities[0]} />
          </div>
          <span className="text-4xl font-extrabold leading-none text-white/15">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <div>
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#E87722] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
            <MapPin size={12} />
            {project.region}
          </div>
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#E87722]">{primary?.label}</div>
          <h3 className="mt-2 text-2xl font-extrabold leading-tight text-white">{project.descriptor}</h3>
          <p className="mt-1.5 text-sm font-semibold text-white/55">{project.industry}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <span
                key={item}
                className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-white/80"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Situation / Approach / Outcome narrative */}
      <div className="flex flex-col gap-4 p-7 md:p-8">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#0B1A46]">Situation</div>
          <p className="mt-1.5 text-sm leading-6 text-[#475467]">{project.narrative.situation}</p>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#0B1A46]">Approach</div>
          <p className="mt-1.5 text-sm leading-6 text-[#475467]">{project.narrative.approach}</p>
        </div>
        <div className="mt-auto rounded-lg border border-[#E5EAF3] bg-[#F4F6FA] p-4">
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#E87722]">Outcome</div>
          <p className="mt-2 text-sm leading-6 text-[#475467]">{project.narrative.outcome}</p>
        </div>
      </div>
    </article>
  )
}

export default function TrackRecordClient() {
  const [capabilityFilter, setCapabilityFilter] = useState('All')
  const [query, setQuery] = useState('')
  const [openFaq, setOpenFaq] = useState(0)

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return cyberProjects.filter((project) => {
      const matchesCapability =
        capabilityFilter === 'All' || project.capabilities.includes(capabilityFilter)
      const searchText = [
        project.descriptor,
        project.industry,
        project.region,
        project.scope,
        project.outcome,
        ...project.tech,
        ...project.capabilities.map((id) => capabilityMap[id]?.label || ''),
      ]
        .join(' ')
        .toLowerCase()
      const matchesQuery = !normalizedQuery || searchText.includes(normalizedQuery)
      return matchesCapability && matchesQuery
    })
  }, [capabilityFilter, query])

  const resetFilters = () => {
    setCapabilityFilter('All')
    setQuery('')
  }

  return (
    <main className="bg-[#F4F6FA]">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative flex min-h-[540px] items-center overflow-hidden px-6 py-[120px] text-white md:py-[140px]"
        style={{
          background: 'linear-gradient(135deg, #0B1A46 0%, #0F245F 50%, #1E3A8A 100%)',
          borderBottom: '3px solid #E87722',
        }}
      >
        <img
          src="/images/pages/cyber-advisory-track-record-bg.webp"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 65% 75% at 50% 45%, rgba(11,26,70,0.72) 0%, rgba(11,26,70,0.42) 55%, rgba(11,26,70,0.22) 100%)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(232,119,34,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(232,119,34,0.06) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 85%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute -left-28 -top-24 h-[520px] w-[520px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(232,119,34,0.18) 0%, transparent 65%)' }}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1400px]">
          <nav className="mb-12 flex flex-wrap items-center justify-center gap-2 text-xs text-white/70" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/cybersecurity-advisory" className="hover:text-white">Cyber Advisory</Link>
            <span>/</span>
            <span className="text-white">Delivery Track Record</span>
          </nav>
          <div className="mx-auto max-w-[920px] text-center">
            <div className="section-eyebrow">Canada Delivery Track Record</div>
            <h1 className="mx-auto max-w-[920px] text-4xl font-extrabold leading-[1.12] md:text-6xl">
              Palo Alto &amp; Prisma Access Delivery for{' '}
              <span className="text-[#E87722]">Enterprise and Government</span>{' '}
              in Canada
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/80 md:text-lg">
              Proven firewall deployments, SASE transformations and Strata Cloud Manager migrations
              across regulated industries. Engagements are shown anonymized — clients are protected
              by design.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/contact" className="btn-primary">
                Discuss Your Deployment <ArrowRight size={16} />
              </Link>
              <Link href="#track-grid" className="btn-secondary-pill">
                Explore Engagements
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-12 grid max-w-[760px] grid-cols-2 gap-3 md:grid-cols-4">
            {cyberDeliveryStats.map((stat) => (
              <div key={stat.label} className="hero-glass rounded-xl p-5 text-center">
                <div className="text-3xl font-extrabold text-[#E87722]">{stat.value}</div>
                <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust strip ──────────────────────────────────────────────────── */}
      <section className="border-b border-[#DFE6F1] bg-white px-6 py-5">
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#5B6475]">
          <span className="inline-flex items-center gap-2"><BadgeCheck size={15} className="text-[#E87722]" /> PCNSE-Certified Delivery</span>
          <span className="inline-flex items-center gap-2"><ShieldCheck size={15} className="text-[#E87722]" /> Palo Alto &amp; Prisma Specialized</span>
          <span className="inline-flex items-center gap-2"><MapPin size={15} className="text-[#E87722]" /> Operating in Canada Since 2011</span>
        </div>
      </section>

      {/* ── Featured Engagements ─────────────────────────────────────────── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto mb-12 max-w-[820px] text-center">
            <div className="section-eyebrow">Featured Engagements</div>
            <h2 className="heading-accent text-3xl font-extrabold leading-tight md:text-4xl" style={{ color: '#0B1A46' }}>
              Three Deployments in Depth
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#667085]">
              A closer look at how three of these engagements were scoped and delivered — still
              anonymized, still without client-identifying detail.
            </p>
          </div>
          <div className="space-y-6">
            {featuredCyberProjects.map((project, index) => (
              <FeaturedEngagementCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Practitioner / expertise ─────────────────────────────────────── */}
      <section className="border-t border-[#DFE6F1] bg-white px-6 py-20">
        <div className="mx-auto max-w-[1100px]">
          <div className="mx-auto mb-10 max-w-[820px] text-center">
            <div className="section-eyebrow">Who Delivers This</div>
            <h2 className="heading-accent text-3xl font-extrabold leading-tight md:text-4xl" style={{ color: '#0B1A46' }}>
              Led by a Canada-Based Palo Alto Specialist
            </h2>
          </div>
          <div className="service-card mx-auto grid max-w-[900px] overflow-hidden md:grid-cols-[260px_1fr]">
            <div className="flex flex-col items-center justify-center gap-4 bg-[#0B1A46] p-8 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E87722] text-2xl font-extrabold text-white">
                {cyberPractitioner.initials}
              </div>
              <div>
                <div className="text-lg font-extrabold text-white">{cyberPractitioner.name}</div>
                <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#E87722]">
                  {cyberPractitioner.title}
                </div>
                <div className="mt-2 inline-flex items-center gap-1 text-xs text-white/60">
                  <MapPin size={12} /> {cyberPractitioner.location}
                </div>
              </div>
            </div>
            <div className="p-7 md:p-8">
              <p className="text-[15px] leading-8 text-[#4B5563]">{cyberPractitioner.bio}</p>
              <div className="mt-6">
                <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0B1A46]">Certifications</div>
                <div className="flex flex-wrap gap-2">
                  {cyberPractitioner.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="inline-flex items-center gap-1 rounded-md border border-[#E87722]/25 bg-[#E87722]/10 px-2.5 py-1 text-xs font-semibold text-[#B95812]"
                    >
                      <Award size={12} /> {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filter bar ───────────────────────────────────────────────────── */}
      <section id="track-grid" className="border-b border-[#DFE6F1] bg-white px-6 py-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-8 text-center">
            <div className="section-eyebrow">Filter by Capability</div>
            <h2 className="heading-accent text-3xl font-extrabold leading-tight md:text-4xl" style={{ color: '#0B1A46' }}>
              Anonymized Delivery Proof
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#667085]">
              Showing {filteredProjects.length} of {cyberProjects.length} engagements
            </p>
          </div>

          <div className="mb-6 flex justify-center">
            <div className="relative w-full max-w-md">
              <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#667085]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search capability, technology or industry"
                aria-label="Search engagements"
                className="h-12 w-full rounded-lg border border-[#D9E0EC] bg-white pl-11 pr-4 text-sm font-semibold text-[#0B1A46] outline-none transition placeholder:text-[#8A94A6] focus:border-[#E87722] focus:ring-2 focus:ring-[#E87722]/20"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5" role="group" aria-label="Filter by capability">
            <button
              type="button"
              onClick={() => setCapabilityFilter('All')}
              aria-pressed={capabilityFilter === 'All'}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-[#E87722]/30 ${
                capabilityFilter === 'All'
                  ? 'border-[#E87722] bg-[#E87722] text-white'
                  : 'border-[#D9E0EC] bg-[#F8FAFD] text-[#0B1A46] hover:border-[#E87722] hover:text-[#E87722]'
              }`}
            >
              All Engagements
            </button>
            {cyberCapabilities.map((cap) => {
              const active = capabilityFilter === cap.id
              return (
                <button
                  key={cap.id}
                  type="button"
                  onClick={() => setCapabilityFilter(cap.id)}
                  aria-pressed={active}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-[#E87722]/30 ${
                    active
                      ? 'border-[#E87722] bg-[#E87722] text-white'
                      : 'border-[#D9E0EC] bg-[#F8FAFD] text-[#0B1A46] hover:border-[#E87722] hover:text-[#E87722]'
                  }`}
                >
                  <CapabilityIcon id={cap.id} size={15} />
                  {cap.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Results grid ─────────────────────────────────────────────────── */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-[1400px]">
          {filteredProjects.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="service-card mx-auto max-w-2xl px-6 py-16 text-center">
              <Search size={42} className="mx-auto text-[#B8C0CE]" />
              <h3 className="mt-5 text-2xl font-extrabold text-[#0B1A46]">No matching engagements</h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#667085]">
                Try a broader capability filter or a different search term.
              </p>
              <button type="button" onClick={resetFilters} className="btn-primary mt-6">
                Clear Filters <X size={15} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Trust / credibility note ─────────────────────────────────────── */}
      <section className="border-y border-[#DFE6F1] bg-white px-6 py-14">
        <div className="mx-auto max-w-[900px] text-center">
          <div className="service-card__icon mx-auto mb-5 flex h-12 w-12 items-center justify-center text-[#E87722]">
            <ShieldCheck size={22} />
          </div>
          <h2 className="text-2xl font-extrabold leading-tight text-[#0B1A46] md:text-3xl">
            Why these projects are anonymized
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-8 text-[#4B5563]">
            Firewall and access-security work exposes sensitive details about an organization’s
            defenses. We withhold client names as a matter of professional discipline. Verifiable
            references can be provided under NDA during a scoped conversation.
          </p>
          <div className="mt-7">
            <Link
              href="/contact?topic=case-study-request&source=track-record"
              className="btn-primary"
            >
              Request the Full Case Study Under NDA <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-[860px]">
          <div className="mb-10 text-center">
            <div className="section-eyebrow">FAQ</div>
            <h2 className="heading-accent text-3xl font-extrabold leading-tight md:text-4xl" style={{ color: '#0B1A46' }}>
              Common Questions
            </h2>
          </div>
          <div className="space-y-3">
            {cyberFaqs.map((faq, i) => {
              const open = openFaq === i
              return (
                <div key={faq.q} className="service-card overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-[15px] font-bold text-[#0B1A46]">{faq.q}</span>
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#E87722]/10 text-[#E87722]">
                      {open ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                  <div className={`px-6 pb-5 ${open ? 'block' : 'hidden'}`}>
                    <p className="text-sm leading-7 text-[#475467]">{faq.a}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Related capabilities ─────────────────────────────────────────── */}
      <section className="border-t border-[#DFE6F1] bg-white px-6 py-16">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-8 text-center">
            <div className="section-eyebrow">Related Capabilities</div>
            <h2 className="text-2xl font-extrabold leading-tight text-[#0B1A46] md:text-3xl">
              Explore the Advisory Practice
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cyberRelatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="service-card group flex items-center justify-between gap-3 p-5 text-[#0B1A46]"
              >
                <span className="text-sm font-bold">{link.label}</span>
                <ArrowUpRight size={18} className="flex-shrink-0 text-[#E87722] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA band ─────────────────────────────────────────────────────── */}
      <section
        className="px-6 py-20 text-white"
        style={{
          background: 'linear-gradient(135deg, #0B1A46 0%, #1E3A8A 100%)',
          borderTop: '3px solid #E87722',
        }}
      >
        <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="section-eyebrow">Your Deployment</div>
            <h2 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">
              Planning a Palo Alto, Prisma Access or Strata Cloud Manager project?
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/75">
              Work with practitioners who have delivered firewall migrations, SASE rollouts and
              IT/OT segmentation for regulated enterprises and government in Canada.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link href="/contact" className="btn-primary">
              Talk to IP Care <ArrowRight size={16} />
            </Link>
            <Link href="/cybersecurity-advisory/sase" className="btn-secondary-pill">
              Explore SASE Advisory
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
