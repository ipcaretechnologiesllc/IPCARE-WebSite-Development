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
      { '@type': 'ListItem', position: 1, name: 'Home', item: process.env.NEXT_PUBLIC_BASE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: process.env.NEXT_PUBLIC_BASE_URL + '/services' },
      { '@type': 'ListItem', position: 3, name: cat.name, item: process.env.NEXT_PUBLIC_BASE_URL + `/services/${params.category}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
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
                    <span className="inline-flex items-center gap-1.5 text-[#1B6CA8] font-semibold text-sm group-hover:gap-2.5 transition-all">Learn More <Icons.ArrowRight size={14}/></span>
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
