import Link from 'next/link'
import { notFound } from 'next/navigation'
import * as Icons from 'lucide-react'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import ProductCard from '@/components/rental/ProductCard'
import { getCategory, getAllCategorySlugs } from '@/lib/rental-data'

export const revalidate = 3600

export async function generateStaticParams() {
  return getAllCategorySlugs().map((category) => ({ category }))
}

export const dynamicParams = false

export async function generateMetadata(props) {
  const params = await props.params;
  const cat = getCategory(params.category)
  if (!cat) return {}
  return {
    title: cat.title,
    description: cat.metaDescription,
    alternates: { canonical: `/rental/${params.category}` },
    openGraph: { title: cat.title, description: cat.metaDescription, url: `/rental/${params.category}` },
  }
}

export default async function CategoryPage(props) {
  const params = await props.params;
  const cat = getCategory(params.category)
  if (!cat) notFound()

  const BASE = (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae')
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE + '/' },
      { '@type': 'ListItem', position: 2, name: 'Rental Hub', item: BASE + '/rental' },
      { '@type': 'ListItem', position: 3, name: cat.name, item: BASE + `/rental/${params.category}` },
    ],
  }
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${cat.name} for rent in UAE & Canada`,
    itemListOrder: 'https://schema.org/ItemListUnordered',
    numberOfItems: cat.products.length,
    itemListElement: cat.products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${BASE}/rental/${params.category}/${p.slug}`,
      item: {
        '@type': 'Product',
        name: `${p.brand} ${p.model}`,
        brand: { '@type': 'Brand', name: p.brand },
        image: p.image + '?w=1200&q=85',
        url: `${BASE}/rental/${params.category}/${p.slug}`,
        offers: {
          '@type': 'AggregateOffer',
          businessFunction: 'https://schema.org/LeaseOut',
          priceCurrency: 'AED',
          lowPrice: p.rates.daily,
          highPrice: p.rates.monthly,
          offerCount: 3,
          availability: 'https://schema.org/InStock',
          seller: { '@type': 'Organization', name: 'IP Care Technologies L.L.C.' },
        },
      },
    })),
  }

  // FAQ schema is generated from the same cat.content.faqs the page renders below, so the
  // markup can never describe content that isn't visible — the mismatch that had these
  // pages sending prices to Google that no visitor could see.
  const faqSchema = cat.content?.faqs?.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: cat.content.faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  } : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <Header />
      <main>
        <div className="max-w-[1400px] mx-auto px-6 pt-6">
          <nav className="text-xs text-white/50 flex items-center gap-1.5 flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <Icons.ChevronRight size={12}/>
            <Link href="/rental" className="hover:text-white">Rental Hub</Link>
            <Icons.ChevronRight size={12}/>
            <span className="text-white/80">{cat.name}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="py-14 md:py-16 px-6">
          <div className="max-w-[1200px] mx-auto text-center">
            <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">{cat.keyword}</div>
            <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight max-w-3xl mx-auto">{cat.name} Rental, <span className="text-[#E87722]">UAE &amp; Canada</span></h1>
            <p className="body-text mt-5 max-w-2xl mx-auto">{cat.description}</p>
          </div>
        </section>

        {/* Products */}
        <section className="pb-24 px-6" style={{ background: '#F4F6FA', paddingTop: '56px' }}>
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="mono text-xs" style={{ color: '#58595B' }}>{cat.products.length} products</div>
              <div className="flex gap-2">
                <Link href="/rental" className="filter-pill-light" style={{ background: '#E87722', borderColor: '#E87722', color: '#ffffff' }}>All Categories</Link>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {cat.products.map((p) => (
                <ProductCard key={p.slug} product={p} categorySlug={params.category}/>
              ))}
            </div>
          </div>
        </section>

        {/* Long-form category content — rendered only for categories that define it. */}
        {cat.content && (
          <section className="py-16 px-6" style={{ background: '#FFFFFF' }}>
            <div className="max-w-[820px] mx-auto">
              {cat.content.intro && (
                <p className="text-lg leading-relaxed mb-10" style={{ color: '#0B1A46' }}>{cat.content.intro}</p>
              )}

              {cat.content.sections?.map((s) => (
                <div key={s.h2} className="mb-10">
                  <h2 className="text-2xl font-bold mb-4" style={{ color: '#0B1A46' }}>{s.h2}</h2>
                  {s.body.map((p, i) => (
                    <p key={i} className="leading-relaxed mb-4" style={{ color: '#58595B' }}>{p}</p>
                  ))}
                </div>
              ))}

              {cat.content.caseStudy && (
                <div className="mb-10 rounded-xl p-6 md:p-8" style={{ background: '#F4F6FA', borderLeft: '3px solid #E87722' }}>
                  <h2 className="text-2xl font-bold mb-4" style={{ color: '#0B1A46' }}>{cat.content.caseStudy.h2}</h2>
                  <p className="leading-relaxed mb-4" style={{ color: '#58595B' }}>{cat.content.caseStudy.body}</p>
                  {cat.content.caseStudy.href && (
                    <Link href={cat.content.caseStudy.href} className="mono text-[12px] uppercase tracking-widest text-[#E87722] hover:underline inline-flex items-center gap-1">
                      {cat.content.caseStudy.linkLabel || 'Read more'} <Icons.ArrowRight size={13}/>
                    </Link>
                  )}
                </div>
              )}

              {cat.content.faqs?.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6" style={{ color: '#0B1A46' }}>Frequently asked questions</h2>
                  {cat.content.faqs.map(({ q, a }) => (
                    <details key={q} className="mb-3 rounded-lg p-4" style={{ background: '#F4F6FA' }}>
                      <summary className="font-semibold cursor-pointer" style={{ color: '#0B1A46' }}>{q}</summary>
                      <p className="leading-relaxed mt-3" style={{ color: '#58595B' }}>{a}</p>
                    </details>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Related categories */}
        <section className="py-12 px-6" style={{ background: '#F4F6FA' }}>
          <div className="max-w-[1300px] mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#0B1A46' }}>Explore Other Categories</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {getAllCategorySlugs().filter(s => s !== params.category).map(s => {
                const c = getCategory(s)
                return <Link key={s} href={`/rental/${s}`} className="filter-pill-light">{c.name}</Link>
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
