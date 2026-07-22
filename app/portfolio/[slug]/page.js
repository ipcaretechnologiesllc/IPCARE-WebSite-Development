import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, ChevronRight, MapPin, ShieldCheck } from 'lucide-react'
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
  const title = `${project.name} Case Study — ${project.type} | IP Care`
  const description = project.metaDescription || project.proofPoint
  const ogImage = project.poster || project.image
  return {
    title,
    description,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      title,
      description,
      url: `${BASE}/portfolio/${project.slug}`,
      type: 'article',
      images: [{ url: ogImage, width: 1200, height: 630, alt: project.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
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
          className="inline-flex cursor-pointer items-center rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition duration-200 hover:border-[#E87722] hover:bg-[#E87722] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E87722] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1A46]"
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}

// The brief reads as an ordered argument (problem → approach → result) rather
// than three interchangeable cards, so the numbering is meaningful.
const briefBlocks = [
  { key: 'challenge', label: 'The Challenge' },
  { key: 'scope', label: 'The Approach' },
  { key: 'outcome', label: 'The Outcome' },
]

export default async function CaseStudyPage(props) {
  const params = await props.params
  const project = getCaseStudy(params.slug)
  if (!project) notFound()

  const poster = project.poster || project.image
  const posterLandscape = project.posterAspect === '16/10'
  const workBreakdown = project.workBreakdown || []
  const facts = project.facts || []
  const stats = project.stats || []
  const techStack = project.techStack || []
  const handover = project.handover || []

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
    description: project.metaDescription || project.proofPoint,
    url: `${BASE}/portfolio/${project.slug}`,
    image: poster?.startsWith('http') ? poster : `${BASE}${poster}`,
    locationCreated: { '@type': 'Place', name: project.location },
    about: [project.industry, project.type, ...(project.services || []).map((item) => item.label)],
    provider: { '@id': `${BASE}#org` },
    ...(project.deliveredYear ? { dateCreated: project.deliveredYear } : {}),
    // Labour-scope projects carry no vendors, so guard against an all-undefined set.
    ...(() => {
      const vendors = [...new Set(techStack.map((group) => group.vendor).filter(Boolean))]
      return vendors.length ? { keywords: vendors.join(', ') } : {}
    })(),
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

            <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
              <div>
                {/* Client marks are usually dark-on-white and illegible straight on
                    the navy hero, so the logo sits in a white clear-space chip
                    rather than being recolored. */}
                {project.clientLogo && (
                  <div className="mb-6 inline-flex items-center rounded-xl bg-white px-4 py-3 shadow-lg ring-1 ring-white/20">
                    {/* Held at 36–40px: the source mark is 83px tall, so anything
                        larger drops below 2x and softens on retina displays. */}
                    <img
                      src={project.clientLogo}
                      alt={`${project.name} logo`}
                      width="160"
                      height="83"
                      className="h-9 w-auto object-contain sm:h-10"
                    />
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex rounded-full bg-[#E87722] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white">
                    {project.type}
                  </span>
                  {project.deliveredYear && (
                    <span className="inline-flex rounded-full border border-white/25 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white/85">
                      Delivered {project.deliveredYear}
                    </span>
                  )}
                </div>
                <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-[2.9rem]">
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

              {/* Site photography is overwhelmingly portrait and modest in
                  resolution, so a portrait poster is framed to its source size
                  rather than stretched across the column and upscaled.
                  Opt a project into a wide poster with posterAspect: '16/10'. */}
              <div className={`w-full ${posterLandscape ? '' : 'max-w-[340px] justify-self-center lg:justify-self-end'}`}>
                <div className="overflow-hidden rounded-2xl bg-[#08123a] shadow-2xl ring-1 ring-white/15">
                  {/* The poster is the LCP element, so serve a smaller file to
                      narrow viewports where one is provided. */}
                  <img
                    src={poster}
                    srcSet={project.posterSrcSet}
                    sizes={project.posterSrcSet ? '(min-width: 1024px) 560px, 100vw' : undefined}
                    alt={project.imageAlt}
                    className={`w-full object-cover ${posterLandscape ? 'aspect-[4/3] sm:aspect-[16/10]' : 'aspect-[4/5]'}`}
                  />
                </div>
                {project.imageCaption && (
                  <p className="mt-3 text-center text-xs text-white/55 lg:text-right">{project.imageCaption}</p>
                )}
              </div>
            </div>

            {/* At-a-glance facts. Discrete tiles rather than one divided bar: 5 facts
                never divide evenly into the column count, and a shared surface would
                leave a visible empty cell at 2- and 3-across. */}
            {facts.length > 0 && (
              <dl className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-3 lg:grid-cols-5">
                {facts.map((fact) => (
                  <div key={fact.label} className="rounded-lg bg-white/[0.06] px-5 py-4 ring-1 ring-white/10">
                    <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#F5A96A]">{fact.label}</dt>
                    <dd className="mt-1.5 text-sm font-semibold leading-6 text-white">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </section>

        {/* By the numbers */}
        {stats.length > 0 && (
          <section className="border-b border-[#E5EAF3] bg-white">
            <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#B95812]">By the numbers</div>
              <h2 className="mt-2 text-2xl font-extrabold leading-tight text-[#0B1A46] sm:text-3xl">
                The scale of the delivery
              </h2>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-[#E5EAF3] bg-[#F7F9FC] p-5 transition duration-200 hover:border-[#E87722]/40 hover:bg-white hover:shadow-sm"
                  >
                    <div className="text-2xl font-extrabold leading-none tracking-tight text-[#0B1A46] tabular-nums sm:text-[1.75rem]">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-[13px] font-semibold leading-5 text-[#344054]">{stat.label}</div>
                    {stat.note && <div className="mt-1 text-[12px] leading-5 text-[#667085]">{stat.note}</div>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Brief: challenge → approach → outcome */}
        <section className="bg-[#F7F9FC]">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
            <div className="grid gap-8 md:grid-cols-3 md:gap-10">
              {briefBlocks.map(({ key, label }, index) =>
                project[key] ? (
                  <div key={key} className="border-t-2 border-[#E87722] pt-5">
                    <div className="flex items-baseline gap-3">
                      {/* Ordinal is decorative — the label below carries the meaning,
                          so the faded treatment doesn't need to meet text contrast. */}
                      <span aria-hidden="true" className="text-2xl font-extrabold leading-none text-[#E87722]/45 tabular-nums">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#B95812]">{label}</span>
                    </div>
                    <p className="mt-4 text-[15px] leading-7 text-[#344054]">{project[key]}</p>
                  </div>
                ) : null,
              )}
            </div>
          </div>
        </section>

        {/* Scope-of-work breakdown with on-site photos */}
        {workBreakdown.length > 0 && (
          <section className="border-t border-[#E5EAF3] bg-white">
            <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
              <div className="mb-12 max-w-2xl">
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#B95812]">On site with our team</div>
                <h2 className="mt-2 text-2xl font-extrabold leading-tight text-[#0B1A46] sm:text-3xl">
                  Real delivery, real engineers
                </h2>
                <p className="mt-3 text-[15px] leading-7 text-[#475467]">
                  The work at {project.name}, discipline by discipline — every system specified, installed, tested
                  and commissioned on the ground by one accountable IP Care team.
                </p>
              </div>
              <CaseStudyWork blocks={workBreakdown} />
            </div>
          </section>
        )}

        {/* Technical summary */}
        {techStack.length > 0 && (
          <section className="border-t border-[#E5EAF3] bg-[#F7F9FC]">
            <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
              <div className="mb-10 max-w-2xl">
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#B95812]">
                  {project.techStackEyebrow || 'Technical summary'}
                </div>
                <h2 className="mt-2 text-2xl font-extrabold leading-tight text-[#0B1A46] sm:text-3xl">
                  {project.techStackTitle || 'What was installed'}
                </h2>
                <p className="mt-3 text-[15px] leading-7 text-[#475467]">
                  {project.techStackIntro ||
                    'The delivered equipment schedule, system by system — tier-one hardware specified for a facility that has to run every day.'}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {techStack.map((group) => (
                  <div
                    key={group.system}
                    className="overflow-hidden rounded-xl border border-[#E5EAF3] bg-white shadow-sm"
                  >
                    {/* Vendor badge is omitted on labour/installation scopes,
                        where there is no supplied equipment to attribute. */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5EAF3] bg-[#0B1A46] px-5 py-4">
                      <h3 className="text-sm font-extrabold uppercase tracking-[0.1em] text-white">{group.system}</h3>
                      {group.vendor && (
                        <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#F5A96A]">
                          {group.vendor}
                        </span>
                      )}
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-[14px]">
                        <caption className="sr-only">
                          {group.system} {project.techStackCaption || 'equipment supplied and installed'} at{' '}
                          {project.name}
                        </caption>
                        <thead>
                          <tr className="border-b border-[#E5EAF3] text-[11px] uppercase tracking-[0.12em] text-[#667085]">
                            <th scope="col" className="px-5 py-3 font-bold">{project.techStackItemLabel || 'Item'}</th>
                            <th scope="col" className="px-5 py-3 text-right font-bold">Qty</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Keyed by index: a schedule can legitimately repeat the
                              same work item at different quantities. */}
                          {group.items.map((row, rowIndex) => (
                            <tr key={`${row.item}-${rowIndex}`} className="border-b border-[#F0F3F8] last:border-0">
                              <td className="px-5 py-3 leading-6 text-[#344054]">{row.item}</td>
                              <td className="whitespace-nowrap px-5 py-3 text-right font-semibold text-[#0B1A46] tabular-nums">
                                {row.qty}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Handover + CTA */}
        <section className="bg-[#0B1A46]">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
            {handover.length > 0 && (
              <>
                <div className="max-w-2xl">
                  <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#F5A96A]">At handover</div>
                  <h2 className="mt-2 text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                    Finished means documented
                  </h2>
                </div>
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {handover.map((item) => (
                    <div key={item.title} className="border-t border-white/15 pt-5">
                      <ShieldCheck size={20} className="text-[#E87722]" aria-hidden="true" />
                      <h3 className="mt-3 text-[15px] font-bold leading-6 text-white">{item.title}</h3>
                      <p className="mt-2 text-[14px] leading-6 text-white/75">{item.text}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div
              className={`flex flex-col items-start justify-between gap-6 rounded-2xl bg-white/[0.06] p-8 ring-1 ring-white/10 sm:flex-row sm:items-center sm:p-10 ${
                handover.length > 0 ? 'mt-12' : ''
              }`}
            >
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
                  className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg bg-[#E87722] px-5 py-3 text-sm font-bold text-white transition duration-200 hover:bg-[#d0691c] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Request a Quote <ArrowRight size={16} />
                </Link>
                {project.relatedHref && (
                  <Link
                    href={project.relatedHref}
                    className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-white/25 px-5 py-3 text-sm font-bold text-white transition duration-200 hover:border-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    Related Service
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <Link
            href="/portfolio"
            className="inline-flex cursor-pointer items-center gap-2 text-sm font-bold text-[#B95812] transition hover:text-[#E87722]"
          >
            <ChevronRight size={15} className="rotate-180" /> Back to Portfolio
          </Link>
        </div>
      </main>

      <Footer />
    </>
  )
}
