import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, ChevronRight, MapPin, AlertTriangle, Layers, CheckCircle2 } from 'lucide-react'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import CaseStudyWork from './CaseStudyWork'
import { getCaseStudy, getCaseStudySlugs } from '@/lib/portfolio-data'

export const revalidate = 3600
export const dynamicParams = false

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae'

export async function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }))
}

export async function generateMetadata(props) {
  const params = await props.params
  const project = getCaseStudy(params.slug)
  if (!project) return {}
  const title = `${project.name} — ${project.type} Project ${project.location} | IP Care`
  const ogImage = project.poster || project.image
  return {
    title,
    description: project.proofPoint,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      title,
      description: project.proofPoint,
      url: `${BASE}/portfolio/${project.slug}`,
      type: 'article',
      images: [{ url: ogImage, width: 1200, height: 630, alt: project.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: project.proofPoint,
    },
  }
}

function ServiceChips({ services = [] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {services.map((item) => (
        <Link
          key={`${item.label}-${item.href}`}
          href={item.href}
          className="inline-flex items-center rounded-full border border-[#E87722]/25 bg-[#E87722]/10 px-3 py-1.5 text-xs font-semibold text-[#B95812] transition hover:border-[#E87722] hover:bg-[#E87722] hover:text-white"
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}

const detailBlocks = [
  { key: 'challenge', label: 'The Challenge', Icon: AlertTriangle },
  { key: 'scope', label: 'The Scope', Icon: Layers },
  { key: 'outcome', label: 'The Outcome', Icon: CheckCircle2 },
]

export default async function CaseStudyPage(props) {
  const params = await props.params
  const project = getCaseStudy(params.slug)
  if (!project) notFound()

  const poster = project.poster || project.image
  const workBreakdown = project.workBreakdown || []

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
      { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${BASE}/portfolio` },
      { '@type': 'ListItem', position: 3, name: project.name, item: `${BASE}/portfolio/${project.slug}` },
    ],
  }

  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${BASE}/portfolio/${project.slug}#project`,
    name: project.name,
    description: project.proofPoint,
    url: `${BASE}/portfolio/${project.slug}`,
    image: poster?.startsWith('http') ? poster : `${BASE}${poster}`,
    locationCreated: { '@type': 'Place', name: project.location },
    about: [project.industry, project.type, ...(project.services || []).map((item) => item.label)],
    provider: { '@id': `${BASE}#org` },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }} />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#0B1A46]">
          {/* Ambient blurred backdrop — blur hides source resolution and adds depth */}
          <div className="absolute inset-0" aria-hidden="true">
            <img src={poster} alt="" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-20 blur-2xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B1A46] via-[#0B1A46]/85 to-[#0B1A46]/70" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-white/70">
              <Link href="/" className="transition hover:text-white">Home</Link>
              <ChevronRight size={14} className="text-white/40" />
              <Link href="/portfolio" className="transition hover:text-white">Portfolio</Link>
              <ChevronRight size={14} className="text-white/40" />
              <span className="font-semibold text-white">{project.name}</span>
            </nav>

            <div className="grid items-center gap-8 md:grid-cols-[1fr_auto] md:gap-12">
              <div>
                <span className="inline-flex rounded-full bg-[#E87722] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white">
                  {project.type}
                </span>
                <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                  {project.name}
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-white/80">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={15} />
                    {project.location}
                  </span>
                  <span className="text-white/40">/</span>
                  <span className="font-semibold text-white">{project.industry}</span>
                </div>
                <p className="mt-5 max-w-xl text-base leading-7 text-white/85 sm:text-lg">{project.proofPoint}</p>
                <div className="mt-6">
                  <ServiceChips services={project.services} />
                </div>
              </div>

              <div className="w-full max-w-sm justify-self-center md:w-[320px] md:justify-self-end">
                <div className="overflow-hidden rounded-2xl bg-[#08123a] shadow-2xl ring-1 ring-white/10">
                  <img
                    src={poster}
                    alt={project.imageAlt}
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenge / Scope / Outcome */}
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <div className="grid gap-5 md:grid-cols-3">
            {detailBlocks.map(({ key, label, Icon }) =>
              project[key] ? (
                <div key={key} className="rounded-xl border border-[#E5EAF3] bg-white p-6 shadow-sm">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#E87722]/10 text-[#E87722]">
                    <Icon size={20} />
                  </div>
                  <div className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-[#E87722]">{label}</div>
                  <p className="mt-2 text-[15px] leading-7 text-[#344054]">{project[key]}</p>
                </div>
              ) : null,
            )}
          </div>
        </section>

        {/* Scope-of-work breakdown with on-site photos */}
        {workBreakdown.length > 0 && (
          <section className="border-t border-[#E5EAF3] bg-[#F7F9FC]">
            <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
              <div className="mb-10 max-w-2xl">
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#E87722]">On site with our team</div>
                <h2 className="mt-2 text-2xl font-extrabold leading-tight text-[#0B1A46] sm:text-3xl">
                  Real delivery, real engineers
                </h2>
                <p className="mt-3 text-[15px] leading-7 text-[#475467]">
                  The work at {project.name}, discipline by discipline — CCTV, structured cabling and access
                  control, delivered on the ground by one accountable IP Care team.
                </p>
              </div>
              <CaseStudyWork blocks={workBreakdown} />
            </div>
          </section>
        )}

        {/* Related service + CTA */}
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-[#E5EAF3] bg-[#0B1A46] p-8 sm:flex-row sm:items-center sm:p-10">
            <div className="max-w-xl">
              <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                Planning a similar project?
              </h2>
              <p className="mt-3 text-[15px] leading-7 text-white/80">
                Talk to the team that delivered {project.name}. One accountable partner for ELV, security,
                cabling and network infrastructure across the UAE and GCC.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#E87722] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#d0691c]"
              >
                Request a Quote <ArrowRight size={16} />
              </Link>
              {project.relatedHref && (
                <Link
                  href={project.relatedHref}
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/25 px-5 py-3 text-sm font-bold text-white transition hover:border-white hover:bg-white/10"
                >
                  Related Service
                </Link>
              )}
            </div>
          </div>
          <div className="mt-8">
            <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm font-bold text-[#B95812] transition hover:text-[#E87722]">
              <ChevronRight size={15} className="rotate-180" /> Back to Portfolio
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
