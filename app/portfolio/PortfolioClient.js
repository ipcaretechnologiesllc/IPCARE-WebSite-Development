'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Filter,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
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
      className="group grid overflow-hidden rounded-xl border border-[#DCE3EF] bg-white shadow-[0_18px_48px_rgba(11,26,70,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(11,26,70,0.18)] md:grid-cols-[42fr_58fr]"
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A46]/80 via-[#0B1A46]/30 to-transparent" />
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
        <div className="mt-6 rounded-lg border border-[#E5EAF3] bg-[#F7F9FD] p-4">
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#E87722]">Why it matters</div>
          <p className="mt-2 text-sm leading-6 text-[#475467]">{project.outcome}</p>
        </div>
        <div className="mt-auto pt-5">
          <Link href={project.relatedHref} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#0B1A46] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#152F7F]">
            View Details <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  )
}

function ProjectCard({ project }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#DFE6F1] bg-white shadow-[0_10px_30px_rgba(11,26,70,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#E87722]/45 hover:shadow-[0_20px_48px_rgba(11,26,70,0.14)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0B1A46]">
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A46]/75 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0B1A46]">
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
          <Link href={project.relatedHref} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#DCE3EF] px-4 py-2 text-sm font-bold text-[#0B1A46] transition hover:border-[#E87722] hover:bg-[#E87722] hover:text-white">
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
      <section className="relative overflow-hidden bg-[#0B1A46] px-6 py-6 text-white">
        <img
          src="/images/hero-desktop/hero-overall.webp"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07112F] via-[#0B1A46]/90 to-[#0B1A46]/35" />
        <div className="relative mx-auto max-w-[1400px]">
          <nav className="mb-16 flex flex-wrap items-center gap-2 text-xs text-white/70" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">Portfolio</span>
          </nav>
          <div className="grid gap-10 pb-16 pt-6 lg:grid-cols-[58fr_42fr] lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E87722]/35 bg-[#E87722]/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FFB37B]">
                <Sparkles size={15} />
                Delivery Portfolio
              </div>
              <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
                Enterprise facilities, ELV and infrastructure projects delivered across UAE.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 md:text-lg">
                From hotels, schools, arenas, towers, retail spaces and industrial sites, IP Care turns past delivery into practical proof for your next facility project.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="btn-primary">
                  Request a Project Consultation <ArrowRight size={16} />
                </Link>
                <Link href="#portfolio-grid" className="btn-secondary-pill">
                  Explore Projects
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {portfolioStats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
                  <div className="text-3xl font-extrabold text-[#FFB37B]">{stat.value}</div>
                  <div className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/65">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#DFE6F1] bg-white px-6 py-12">
        <div className="mx-auto grid max-w-[980px] gap-4 md:grid-cols-2">
          {portfolioPillars.map((pillar) => (
            <div key={pillar.title} className="rounded-xl border border-[#E1E7F0] bg-[#F8FAFD] p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[#0B1A46] text-white">
                {pillar.title === 'Enterprise Facilities' ? <Building2 size={20} /> : <ShieldCheck size={20} />}
              </div>
              <h2 className="text-xl font-extrabold text-[#0B1A46]">{pillar.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#475467]">{pillar.text}</p>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-[#E87722]">{pillar.proof}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#E87722]">Featured Proof</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight text-[#0B1A46] md:text-5xl">
                Facility and infrastructure delivery that reduces buyer doubt.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-[#5B6475]">
              Featured projects are intentionally focused on facility infrastructure, CCTV, cabling, access control and network backbone. That is the practical IP Care delivery story.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {featuredPortfolioProjects.slice(0, 6).map((project, index) => (
              <FeaturedCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio-grid" className="border-y border-[#DFE6F1] bg-white px-6 py-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#E87722]">
                <Filter size={16} />
                Filter Portfolio
              </div>
              <p className="mt-2 text-sm text-[#667085]">
                Showing {filteredProjects.length} of {portfolioProjects.length} delivery records
              </p>
            </div>
            <div className="relative w-full lg:max-w-sm">
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
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-[#DFE6F1] bg-white px-6 py-16 text-center">
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

      <section className="bg-[#0B1A46] px-6 py-20 text-white">
        <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#FFB37B]">Next Project</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">
              Planning CCTV, ELV, structured cabling, access control or network infrastructure?
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/75">
              Bring IP Care in early and get a practical deployment plan from engineers who understand site work, live operations and long-term support.
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
