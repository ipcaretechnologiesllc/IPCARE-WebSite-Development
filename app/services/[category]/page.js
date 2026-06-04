import Link from 'next/link'
import { notFound } from 'next/navigation'
import * as Icons from 'lucide-react'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import ServicePageTemplate from '@/components/site/ServicePageTemplate'
import { serviceCategories, getAllCategorySlugs, getCategory, getRelatedServices } from '@/lib/services-data'

export async function generateStaticParams() {
  return getAllCategorySlugs().map((category) => ({ category }))
}

export const dynamicParams = false

export async function generateMetadata({ params }) {
  const cat = getCategory(params.category)
  if (!cat) return {}
  return {
    title: cat.title,
    description: cat.metaDescription,
    alternates: { canonical: `/services/${params.category}` },
    openGraph: {
      title: cat.title,
      description: cat.metaDescription,
      url: `/services/${params.category}`,
      type: 'website',
    },
  }
}

export default function CategoryPage({ params }) {
  const cat = getCategory(params.category)
  if (!cat) notFound()
  // Prefer curated relatedLinks defined on the category; fall back to auto-generated list
  const related = cat.relatedLinks || getRelatedServices(params.category, 3)
  const subpages = cat.subpages ? Object.entries(cat.subpages) : []
  // Location/city pages (icon:'MapPin') are standalone SEO pages — exclude from spoke grid
  const spokeEntries = subpages.filter(([, sub]) => sub.icon !== 'MapPin')

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (cat.faqs || []).map(f => ({
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
      { '@type': 'ListItem', position: 3, name: cat.name, item: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae') + `/services/${params.category}` },
    ],
  }
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: cat.name,
    description: cat.metaDescription,
    serviceType: cat.name,
    provider: {
      '@type': 'Organization',
      name: 'IP Care Technologies L.L.C.',
      url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae'),
    },
    areaServed: [{ '@type': 'Country', name: 'United Arab Emirates' }, { '@type': 'Country', name: 'Canada' }],
    url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae') + `/services/${params.category}`,
    hasOfferCatalog: subpages.length > 0 ? {
      '@type': 'OfferCatalog',
      name: `${cat.name} sub-services`,
      itemListElement: subpages.map(([slug, sp]) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: sp.h1 || sp.title,
          url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae') + `/services/${params.category}/${slug}`,
        },
      })),
    } : undefined,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Header />
      <main>
        <ServicePageTemplate
          data={cat}
          related={related}
          breadcrumb={[{ label: cat.name }]}
          spokeGrid={spokeEntries.length > 0 ? (
            <section style={{ background: '#F4F6FA', padding: '72px 24px' }}>
              <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-12">
                  <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', color: '#E87722', marginBottom: '12px' }}>
                    Explore
                  </p>
                  <h2 style={{ color: '#0B1A46', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                    {cat.name} — Explore Specific Services
                  </h2>
                  <div style={{ width: '56px', height: '3px', background: '#E87722', borderRadius: '3px', margin: '14px auto 0' }} aria-hidden="true" />
                </div>
                <div className={`grid gap-6 ${spokeEntries.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
                  {spokeEntries.map(([slug, sub], i) => (
                    <Link
                      key={slug}
                      href={`/services/${params.category}/${slug}`}
                      className="service-card p-7 block group reveal"
                      style={{ transitionDelay: `${i * 75}ms` }}
                    >
                      <h3 className="service-card__title text-base mb-2">{sub.h1}</h3>
                      <p className="service-card__desc text-sm mb-5 leading-relaxed line-clamp-3">{sub.hero}</p>
                      <span className="service-card__cta inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2">
                        Learn More <Icons.ArrowRight size={13} />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          ) : null}
        />
      </main>
      <Footer />
    </>
  )
}
