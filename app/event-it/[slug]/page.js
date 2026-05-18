import { notFound } from 'next/navigation'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import ServicePageTemplate from '@/components/site/ServicePageTemplate'
import { getAllEventSubSlugs, getEventSubpage, eventServices, events } from '@/lib/event-it-data'

export async function generateStaticParams() {
  return getAllEventSubSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const sub = getEventSubpage(params.slug)
  if (!sub) return {}
  return {
    title: sub.title,
    description: sub.metaDescription,
    alternates: { canonical: `/event-it/${params.slug}` },
    openGraph: {
      title: sub.title,
      description: sub.metaDescription,
      url: `/event-it/${params.slug}`,
      type: 'website',
    },
  }
}

export default function EventSubPage({ params }) {
  const sub = getEventSubpage(params.slug)
  if (!sub) notFound()

  // Look up the matching event in the events array so we can render its hero
  // image alongside the case study content. Service sub-pages (event-wifi,
  // temporary-data-centres, event-cctv) will not match — that's expected.
  const event = (events || []).find((e) => e.slug === params.slug)

  // Related = other event services
  const related = eventServices
    .filter((s) => s.slug !== params.slug && ['event-wifi', 'temporary-data-centres', 'event-cctv'].includes(s.slug))
    .slice(0, 3)
    .map((s) => ({ slug: `event-it/${s.slug}`, name: s.name, short: s.short, icon: s.icon }))

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (sub.faqs || []).map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: (process.env.NEXT_PUBLIC_BASE_URL || 'https://ipcare.ae') + '/' },
      { '@type': 'ListItem', position: 2, name: 'Event IT', item: (process.env.NEXT_PUBLIC_BASE_URL || 'https://ipcare.ae') + '/event-it' },
      { '@type': 'ListItem', position: 3, name: sub.h1, item: (process.env.NEXT_PUBLIC_BASE_URL || 'https://ipcare.ae') + `/event-it/${params.slug}` },
    ],
  }
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: sub.h1,
    description: sub.metaDescription,
    provider: { '@type': 'Organization', name: 'IP Care Technologies L.L.C.', url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://ipcare.ae') },
    areaServed: [{ '@type': 'Country', name: 'United Arab Emirates' }, { '@type': 'Country', name: 'Canada' }],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Header />
      <main>
        {event?.img && (
          <section className="relative w-full overflow-hidden" style={{ aspectRatio: '16/7' }}>
            <img src={event.img} alt={`${sub.h1} — event IT delivery by IP Care`} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(7,16,42,0.35) 0%, rgba(7,16,42,0.85) 100%)' }} />
            <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 md:pb-14">
              <div className="max-w-[1100px] mx-auto">
                <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">{event.year} • {event.location}</div>
                <h1 className="text-white text-3xl md:text-5xl font-bold leading-[1.1] max-w-3xl">{sub.h1}</h1>
              </div>
            </div>
          </section>
        )}
        <ServicePageTemplate
          data={sub}
          related={related}
          breadcrumb={[
            { label: 'Event IT', href: '/event-it' },
            { label: sub.h1 },
          ]}
        />
      </main>
      <Footer />
    </>
  )
}
