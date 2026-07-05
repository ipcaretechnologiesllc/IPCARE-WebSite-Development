'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle2,
  MapPin,
  Search,
  ShieldCheck,
  X,
} from 'lucide-react'
import {
  featuredPortfolioProjects,
  portfolioFilters,
  portfolioPillars,
  portfolioProjects,
  portfolioStats,
} from '@/lib/portfolio-data'

const categoryParamMap = {
  enterprise: { type: 'Enterprise Facilities' },
  'enterprise-projects': { type: 'Enterprise Facilities' },
  'elv-security': { type: 'ELV & Security' },
  'elv-security-projects': { type: 'ELV & Security' },
  hospitality: { industry: 'Hospitality' },
  education: { industry: 'Education & Training' },
  'education-training': { industry: 'Education & Training' },
  venues: { industry: 'Sports & Venues' },
  'sports-venues': { industry: 'Sports & Venues' },
  retail: { industry: 'Retail & Commercial' },
  commercial: { industry: 'Retail & Commercial' },
  towers: { industry: 'Towers & Real Estate' },
  'real-estate': { industry: 'Towers & Real Estate' },
  construction: { industry: 'Construction' },
  government: { industry: 'Government & Community' },
}

const serviceParamMap = {
  cctv: 'CCTV Systems',
  'cctv-systems': 'CCTV Systems',
  'access-control': 'Access Control',
  'cctv-access-control': 'CCTV & Access Control',
  'structured-cabling': 'Structured Cabling & Fiber',
  fiber: 'Structured Cabling & Fiber',
  'structured-cabling-fiber': 'Structured Cabling & Fiber',
  network: 'Network Infrastructure',
  infrastructure: 'Network Infrastructure',
}

function projectMatchesService(project, serviceFilter) {
  if (serviceFilter === 'All') return true
  if (serviceFilter === 'CCTV & Access Control') {
    return project.services.some((item) => item.label === 'CCTV Systems' || item.label === 'Access Control')
  }
  return project.services.some((item) => item.label === serviceFilter)
}

function SelectFilter({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-[#5B6475]">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-lg border border-[#D9E0EC] bg-white px-3 text-sm font-semibold text-[#0B1A46] outline-none transition focus:border-[#E87722] focus:ring-2 focus:ring-[#E87722]/20"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

function ServiceLinks({ services, compact = false }) {
  return (
    <div className="flex flex-wrap gap-2">
      {services.map((item) => (
        <Link
          key={`${item.label}-${item.href}`}
          href={item.href}
          className={`inline-flex items-center rounded-full border border-[#E87722]/25 bg-[#E87722]/10 font-semibold text-[#B95812] transition hover:border-[#E87722] hover:bg-[#E87722] hover:text-white ${
            compact ? 'px-2.5 py-1 text-[11px]' : 'px-3 py-1.5 text-xs'
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}

function FeaturedCard({ project, index }) {
  return (
    <article
      className="service-card group grid md:grid-cols-[42fr_58fr]"
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div className="relative min-h-[240px] overflow-hidden bg-[#0B1A46]">
        <img
          src={project.image}
          alt={project.imageAlt}
          loading={index < 2 ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A46]/65 via-[#0B1A46]/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#E87722] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white">
            {project.type}
          </span>
          {!project.imageVerified && (
            <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#0B1A46]">
              Representative visual
            </span>
          )}
        </div>
      </div>
      <div className="flex min-h-full flex-col p-6 md:p-7">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-[#596273]">
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={14} />
            {project.location}
          </span>
          <span className="text-[#C5CBD6]">/</span>
          <span className="font-semibold text-[#0B1A46]">{project.industry}</span>
        </div>
        <h3 className="text-2xl font-extrabold leading-tight text-[#0B1A46]">{project.name}</h3>
        <p className="mt-4 text-[15px] leading-7 text-[#344054]">{project.proofPoint}</p>
        <div className="mt-5">
          <ServiceLinks services={project.services} />
        </div>
        <div className="mt-6 rounded-lg border border-[#E5EAF3] bg-[#F4F6FA] p-4">
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#E87722]">Why it matters</div>
          <p className="mt-2 text-sm leading-6 text-[#475467]">{project.outcome}</p>
        </div>
        <div className="mt-auto pt-5">
          <Link href={project.relatedHref} className="service-card__cta inline-flex min-h-11 items-center gap-2 px-4 py-2 text-sm font-bold">
            View Details <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  )
}

function ProjectCard({ project }) {
  return (
    <article className="service-card group flex h-full flex-col">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0B1A46]">
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A46]/75 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 rounded bg-[#E87722] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
          {project.industry}
        </div>
        {!project.imageVerified && (
          <div className="absolute bottom-3 left-4 right-4 text-[11px] font-medium text-white/85">
            {project.imageCaption}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#E87722]">
          <CheckCircle2 size={14} />
          {project.type}
        </div>
        <h3 className="text-xl font-extrabold leading-tight text-[#0B1A46]">{project.name}</h3>
        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm text-[#667085]">
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={13} />
            {project.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={13} />
            {project.year}
          </span>
        </div>
        <p className="mt-4 text-sm leading-6 text-[#475467]">{project.proofPoint}</p>
        <div className="mt-5">
          <ServiceLinks services={project.services} compact />
        </div>
        <div className="mt-auto pt-5">
          <Link href={project.relatedHref} className="service-card__cta inline-flex min-h-11 items-center gap-2 px-4 py-2 text-sm font-bold">
            View Details <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  )
}

export default function PortfolioClient() {
  const [typeFilter, setTypeFilter] = useState('All')
  const [industryFilter, setIndustryFilter] = useState('All')
  const [serviceFilter, setServiceFilter] = useState('All')
  const [query, setQuery] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const categoryParam = params.get('category') || params.get('type')
    const serviceParam = params.get('service')
    const searchParam = params.get('q')

    if (categoryParam) {
      const mapped = categoryParamMap[categoryParam.toLowerCase()]
      if (mapped?.type) setTypeFilter(mapped.type)
      if (mapped?.industry) setIndustryFilter(mapped.industry)
    }

    if (serviceParam) {
      const mappedService = serviceParamMap[serviceParam.toLowerCase()]
      if (mappedService) setServiceFilter(mappedService)
    }

    if (searchParam) setQuery(searchParam)
  }, [])

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return portfolioProjects.filter((project) => {
      const matchesType = typeFilter === 'All' || project.type === typeFilter
      const matchesIndustry = industryFilter === 'All' || project.industry === industryFilter
      const matchesService = projectMatchesService(project, serviceFilter)
      const searchText = [
        project.name,
        project.type,
        project.industry,
        project.location,
        project.proofPoint,
        project.scope,
        ...project.services.map((item) => item.label),
      ]
        .join(' ')
        .toLowerCase()
      const matchesQuery = !normalizedQuery || searchText.includes(normalizedQuery)
      return matchesType && matchesIndustry && matchesService && matchesQuery
    })
  }, [industryFilter, query, serviceFilter, typeFilter])

  const resetFilters = () => {
    setTypeFilter('All')
    setIndustryFilter('All')
    setServiceFilter('All')
    setQuery('')
  }

  return (
    <main className="bg-[#F4F6FA]">
      <section
        className="relative flex min-h-[560px] items-center overflow-hidden px-6 py-[120px] text-white md:py-[140px]"
        style={{
          background: 'linear-gradient(135deg, #0B1A46 0%, #0F245F 50%, #1E3A8A 100%)',
          borderBottom: '3px solid #E87722',
        }}
      >
        <img
          src="/images/pages/services-bg.webp"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 65% 75% at 50% 45%, rgba(11,26,70,0.64) 0%, rgba(11,26,70,0.36) 55%, rgba(11,26,70,0.20) 100%)' }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
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
            <span className="text-white">Portfolio</span>
          </nav>
          <div className="mx-auto max-w-[900px] text-center">
            <div className="section-eyebrow">Delivery Portfolio</div>
            <h1 className="mx-auto max-w-[900px] text-4xl font-extrabold leading-[1.12] md:text-6xl">
              Enterprise Facilities, ELV and{' '}
              <span className="text-[#E87722]">Infrastructure Projects</span>{' '}
              Delivered
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/80 md:text-lg">
              From hotels, schools, arenas, towers, retail spaces and industrial sites, IP Care turns past delivery into practical proof for your next facility project.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/contact" className="btn-primary">
                Request a Project Consultation <ArrowRight size={16} />
              </Link>
              <Link href="#portfolio-grid" className="btn-secondary-pill">
                Explore Projects
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-12 grid max-w-[760px] grid-cols-2 gap-3 md:grid-cols-4">
            {portfolioStats.map((stat) => (
              <div key={stat.label} className="hero-glass rounded-xl p-5 text-center">
                <div className="text-3xl font-extrabold text-[#E87722]">{stat.value}</div>
                <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#DFE6F1] bg-white px-6 py-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="mx-auto mb-10 max-w-[820px] text-center">
            <div className="section-eyebrow">What We Deliver</div>
            <h2 className="heading-accent text-3xl font-extrabold leading-tight md:text-4xl" style={{ color: '#0B1A46' }}>
              Enterprise Facilities &amp; ELV Infrastructure
            </h2>
          </div>
          <div className="mx-auto grid max-w-[980px] gap-6 md:grid-cols-2">
            {portfolioPillars.map((pillar) => (
              <div key={pillar.title} className="service-card p-7">
                <div className="service-card__icon mb-5 flex h-12 w-12 items-center justify-center text-[#E87722]">
                  {pillar.title === 'Enterprise Facilities' ? <Building2 size={22} /> : <ShieldCheck size={22} />}
                </div>
                <h2 className="service-card__title text-xl">{pillar.title}</h2>
                <p className="service-card__desc mt-3 text-sm leading-6">{pillar.text}</p>
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-[#E87722]">{pillar.proof}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 text-center">
            <div className="section-eyebrow">Featured Proof</div>
            <h2 className="heading-accent mx-auto max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl" style={{ color: '#0B1A46' }}>
              Facility and infrastructure delivery that reduces buyer doubt.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#4B5563]">
              Featured projects are focused on facility infrastructure, CCTV, cabling, access control and network backbone.
              That is the practical IP Care delivery story.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {featuredPortfolioProjects.slice(0, 6).map((project, index) => (
              <FeaturedCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio-grid" className="border-y border-[#DFE6F1] bg-white px-6 py-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-8 text-center">
            <div className="section-eyebrow">Filter Portfolio</div>
            <h2 className="heading-accent text-3xl font-extrabold leading-tight md:text-4xl" style={{ color: '#0B1A46' }}>
              Find Relevant Project Proof
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#667085]">
              Showing {filteredProjects.length} of {portfolioProjects.length} delivery records
            </p>
          </div>
          <div className="mb-6 flex justify-center">
            <div className="relative w-full max-w-md">
              <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#667085]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search project, service or industry"
                className="h-12 w-full rounded-lg border border-[#D9E0EC] bg-white pl-11 pr-4 text-sm font-semibold text-[#0B1A46] outline-none transition placeholder:text-[#8A94A6] focus:border-[#E87722] focus:ring-2 focus:ring-[#E87722]/20"
              />
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.05fr_1fr_1fr_auto] lg:items-end">
            <SelectFilter label="Project Type" value={typeFilter} onChange={setTypeFilter} options={portfolioFilters.types} />
            <SelectFilter label="Industry" value={industryFilter} onChange={setIndustryFilter} options={portfolioFilters.industries} />
            <SelectFilter label="Service" value={serviceFilter} onChange={setServiceFilter} options={portfolioFilters.services} />
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex h-12 min-w-[132px] items-center justify-center gap-2 rounded-lg border border-[#D9E0EC] bg-[#F8FAFD] px-4 text-sm font-bold text-[#0B1A46] transition hover:border-[#E87722] hover:text-[#E87722]"
            >
              <X size={16} />
              Reset
            </button>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-[1400px]">
          {filteredProjects.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <div className="service-card mx-auto max-w-2xl px-6 py-16 text-center">
              <Search size={42} className="mx-auto text-[#B8C0CE]" />
              <h3 className="mt-5 text-2xl font-extrabold text-[#0B1A46]">No matching projects</h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#667085]">
                Try a broader industry or service filter. Some delivery records are intentionally grouped under their strongest proof category.
              </p>
              <button type="button" onClick={resetFilters} className="btn-primary mt-6">
                Clear Filters <X size={15} />
              </button>
            </div>
          )}
        </div>
      </section>

      <section
        className="px-6 py-20 text-white"
        style={{
          background: 'linear-gradient(135deg, #0B1A46 0%, #1E3A8A 100%)',
          borderTop: '3px solid #E87722',
        }}
      >
        <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="section-eyebrow">Next Project</div>
            <h2 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">
              Planning CCTV, ELV, structured cabling, access control or network infrastructure?
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/75">
              Bring IP Care in early and get a practical deployment plan from engineers who understand site work, operations and long-term support.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link href="/contact" className="btn-primary">
              Talk to IP Care <ArrowRight size={16} />
            </Link>
            <Link href="/services/elv" className="btn-secondary-pill">
              Explore ELV Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
