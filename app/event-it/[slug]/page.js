import { notFound } from 'next/navigation'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import ServicePageTemplate from '@/components/site/ServicePageTemplate'
import { getAllEventSubSlugs, getEventSubpage, eventServices } from '@/lib/event-it-data'

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
      { '@type': 'ListItem', position: 1, name: 'Home', item: process.env.NEXT_PUBLIC_BASE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Event IT', item: process.env.NEXT_PUBLIC_BASE_URL + '/event-it' },
      { '@type': 'ListItem', position: 3, name: sub.h1, item: process.env.NEXT_PUBLIC_BASE_URL + `/event-it/${params.slug}` },
    ],
  }
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: sub.h1,
    description: sub.metaDescription,
    provider: { '@type': 'Organization', name: 'IP Care Technologies L.L.C.', url: process.env.NEXT_PUBLIC_BASE_URL },
    areaServed: [{ '@type': 'Country', name: 'United Arab Emirates' }, { '@type': 'Country', name: 'Canada' }],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Header />
      <main>
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
