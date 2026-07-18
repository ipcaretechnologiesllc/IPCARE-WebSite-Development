import { notFound } from 'next/navigation'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import ServicePageTemplate from '@/components/site/ServicePageTemplate'
import { getAllSubpageParams, getSubpage, getRelatedServices } from '@/lib/services-data'
import { isUaeOnlyServiceSubpage, isCaRequest } from '@/lib/seo-region'

export const revalidate = 3600

export async function generateStaticParams() {
  return getAllSubpageParams()
}

export const dynamicParams = false

export async function generateMetadata(props) {
  const params = await props.params;
  const sub = getSubpage(params.category, params.slug)
  if (!sub) return {}
  // UAE-only service subpages are duplicated onto ipcare.ca; cross-canonicalize to the
  // ipcare.ae original there so Google stops treating both copies as duplicates.
  // See lib/seo-region.js.
  const canonical = (isUaeOnlyServiceSubpage(params.category, params.slug) && await isCaRequest())
    ? `https://www.ipcare.ae/services/${params.category}/${params.slug}`
    : `/services/${params.category}/${params.slug}`
  return {
    title: sub.title,
    description: sub.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: sub.title,
      description: sub.metaDescription,
      url: `/services/${params.category}/${params.slug}`,
      type: 'website',
    },
  }
}

export default async function SubPage(props) {
  const params = await props.params;
  const sub = getSubpage(params.category, params.slug)
  if (!sub) notFound()
  // Prefer curated relatedLinks defined on the subpage; fall back to auto-generated category list
  const related = sub.relatedLinks || getRelatedServices(params.category, 3)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (sub.faqs || []).map(f => ({
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
      { '@type': 'ListItem', position: 2, name: 'Services', item: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae') + '/services' },
      { '@type': 'ListItem', position: 3, name: sub.parentName, item: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae') + `/services/${params.category}` },
      { '@type': 'ListItem', position: 4, name: sub.h1, item: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae') + `/services/${params.category}/${params.slug}` },
    ],
  }
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: sub.h1,
    description: sub.metaDescription,
    provider: {
      '@type': 'Organization',
      name: 'IP Care Technologies L.L.C.',
      url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae'),
    },
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
            { label: sub.parentName, href: `/services/${params.category}` },
            { label: sub.h1 },
          ]}
        />
      </main>
      <Footer />
    </>
  )
}
