import { notFound } from 'next/navigation'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import ServicePageTemplate from '@/components/site/ServicePageTemplate'
import { getAllAdvisorySlugs, getAdvisorySubpage, services as advisoryServices } from '@/lib/cyber-advisory-data'

export async function generateStaticParams() {
  return getAllAdvisorySlugs().map((slug) => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }) {
  const sub = getAdvisorySubpage(params.slug)
  if (!sub) return {}
  return {
    title: sub.title,
    description: sub.metaDescription,
    alternates: { canonical: `/cybersecurity-advisory/${params.slug}` },
    openGraph: {
      title: sub.title,
      description: sub.metaDescription,
      url: `/cybersecurity-advisory/${params.slug}`,
      type: 'website',
    },
  }
}

export default function AdvisorySubPage({ params }) {
  const sub = getAdvisorySubpage(params.slug)
  if (!sub) notFound()

  // Related = other advisory services (not the current one)
  const related = advisoryServices
    .filter((s) => s.slug !== params.slug)
    .slice(0, 3)
    .map((s) => ({ slug: `cybersecurity-advisory/${s.slug}`, name: s.name, short: s.short, icon: s.icon }))

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
      { '@type': 'ListItem', position: 2, name: 'Cybersecurity Advisory', item: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae') + '/cybersecurity-advisory' },
      { '@type': 'ListItem', position: 3, name: sub.h1, item: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae') + `/cybersecurity-advisory/${params.slug}` },
    ],
  }
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: sub.h1,
    description: sub.metaDescription,
    provider: { '@type': 'Organization', name: 'IP Care Technologies L.L.C.: The Cyber Adviser', url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae') },
    areaServed: [{ '@type': 'Country', name: 'Canada' }, { '@type': 'Country', name: 'United Arab Emirates' }],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Header />
      <main className="bg-premium-dark">
        <ServicePageTemplate
          data={sub}
          related={related}
          breadcrumb={[
            { label: 'Cybersecurity Advisory', href: '/cybersecurity-advisory' },
            { label: sub.h1 },
          ]}
        />
      </main>
      <Footer />
    </>
  )
}
