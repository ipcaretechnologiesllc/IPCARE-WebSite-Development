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
  const related = getRelatedServices(params.category, 3)
  const subpages = cat.subpages ? Object.entries(cat.subpages) : []

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
      { '@type': 'ListItem', position: 1, name: 'Home', item: (process.env.NEXT_PUBLIC_BASE_URL || 'https://ipcare.ae') + '/' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: (process.env.NEXT_PUBLIC_BASE_URL || 'https://ipcare.ae') + '/services' },
      { '@type': 'ListItem', position: 3, name: cat.name, item: (process.env.NEXT_PUBLIC_BASE_URL || 'https://ipcare.ae') + `/services/${params.category}` },
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
      url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://ipcare.ae'),
    },
    areaServed: [{ '@type': 'Country', name: 'United Arab Emirates' }, { '@type': 'Country', name: 'Canada' }],
    url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://ipcare.ae') + `/services/${params.category}`,
    hasOfferCatalog: subpages.length > 0 ? {
      '@type': 'OfferCatalog',
      name: `${cat.name} sub-services`,
      itemListElement: subpages.map(([slug, sp]) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: sp.h1 || sp.title,
          url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://ipcare.ae') + `/services/${params.category}/${slug}`,
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
        />

        {/* Sub-services listing */}
        {subpages.length > 0 && (
          <section className="py-16 md:py-20 px-6">
            <div className="max-w-[1400px] mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-white text-3xl md:text-4xl font-bold heading-accent">{cat.name} — Explore Specific Services</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {subpages.map(([slug, sub]) => (
                  <Link key={slug} href={`/services/${params.category}/${slug}`} className="glass-card p-6 block group">
                    <h3 className="text-white text-lg font-semibold mb-2">{sub.h1}</h3>
                    <p className="body-text text-sm mb-4 line-clamp-2">{sub.hero}</p>
                    <span className="inline-flex items-center gap-1.5 text-[#E87722] font-semibold text-sm px-4 py-1.5 rounded-full border border-[#E87722]/50 bg-[#E87722]/5 group-hover:bg-[#E87722] group-hover:text-white group-hover:border-[#E87722] group-hover:gap-2.5 transition-all">Learn More <Icons.ArrowRight size={13}/></span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
