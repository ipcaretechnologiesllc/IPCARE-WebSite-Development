import { notFound } from 'next/navigation'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import ServicePageTemplate from '@/components/site/ServicePageTemplate'
import { getAllEventSubSlugs, getEventSubpage, eventServices, events } from '@/lib/event-it-data'

export async function generateStaticParams() {
  return getAllEventSubSlugs().map((slug) => ({ slug }))
}

// Any slug not returned by generateStaticParams returns a 404 at the framework
// level - no page code runs, no risk of a 5xx from an unrecognised slug.
export const dynamicParams = false

export async function generateMetadata({ params }) {
  const sub = getEventSubpage(params.slug)
  if (!sub) return {}

  // Pull the event's own hero image for the og:image - the `events` array
  // (already imported below for the page component) holds per-event img paths.
  // Fall back to the site default if the slug is a service sub-page (event-wifi etc.)
  // that has no matching entry in the events portfolio array.
  const event = (events || []).find((e) => e.slug === params.slug)
  const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae'
  const imgSrc = event?.img
    ? event.img.startsWith('http')
      ? event.img
      : `${BASE}${event.img}`
    : `${BASE}/opengraph-image.png`
  const ogImages = [{ url: imgSrc, width: 1200, height: 630, alt: `${sub.h1}, Event IT by IP Care` }]

  return {
    title: sub.title,
    description: sub.metaDescription,
    alternates: { canonical: `/event-it/${params.slug}` },
    openGraph: {
      title: sub.title,
      description: sub.metaDescription,
      url: `/event-it/${params.slug}`,
      type: 'website',
      images: ogImages,
    },
  }
}

export default function EventSubPage({ params }) {
  const sub = getEventSubpage(params.slug)
  if (!sub) notFound()

  // Look up the matching event in the events array so we can render its hero
  // image alongside the case study content. Service sub-pages (event-wifi,
  // temporary-data-centres, event-cctv) will not match - that's expected.
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
      { '@type': 'ListItem', position: 1, name: 'Home', item: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae') + '/' },
      { '@type': 'ListItem', position: 2, name: 'Event IT', item: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae') + '/event-it' },
      { '@type': 'ListItem', position: 3, name: sub.h1, item: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae') + `/event-it/${params.slug}` },
    ],
  }
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: sub.h1,
    description: sub.metaDescription,
    provider: { '@type': 'Organization', name: 'IP Care Technologies L.L.C.', url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae') },
    areaServed: [{ '@type': 'Country', name: 'United Arab Emirates' }, { '@type': 'Country', name: 'Canada' }],
  }

  // Case-study sub-pages (those with a matching `events` portfolio entry) get an
  // Article schema with `about: Event`, surfacing the delivery's dates, venue and
  // organizer for AI/LLM citation, without claiming an upcoming-event rich result.
  const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae'
  const imgSrc = event?.img
    ? (event.img.startsWith('http') ? event.img : `${BASE}${event.img}`)
    : `${BASE}/opengraph-image.png`
  const caseStudySchema = event ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: sub.h1,
    description: sub.metaDescription,
    image: [imgSrc],
    author: { '@type': 'Organization', name: 'IP Care Technologies L.L.C.', url: BASE },
    publisher: { '@type': 'Organization', name: 'IP Care Technologies L.L.C.', url: BASE },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/event-it/${params.slug}` },
    about: {
      '@type': 'Event',
      name: event.name,
      startDate: event.startDate,
      endDate: event.endDate,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: { '@type': 'Place', name: event.location },
      organizer: { '@type': 'Organization', name: 'IP Care Technologies L.L.C.', url: BASE },
    },
  } : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {caseStudySchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }} />}
      {/* Preload the hero image so the browser fetches it before parsing body */}
      {event?.img && <link rel="preload" as="image" href={event.img} fetchPriority="high" />}
      <Header />
      <main>
        <ServicePageTemplate
          data={event?.img ? { ...sub, heroImage: event.img, heroImageAlt: sub.heroImageAlt || `${sub.h1}, event IT delivery by IP Care` } : sub}
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
