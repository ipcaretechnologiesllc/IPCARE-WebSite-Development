import Link from 'next/link'
import { notFound } from 'next/navigation'
import * as Icons from 'lucide-react'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import ProductCard from '@/components/rental/ProductCard'
import { getCategory, getAllCategorySlugs } from '@/lib/rental-data'

export async function generateStaticParams() {
  return getAllCategorySlugs().map((category) => ({ category }))
}

export async function generateMetadata({ params }) {
  const cat = getCategory(params.category)
  if (!cat) return {}
  return {
    title: cat.title,
    description: cat.metaDescription,
    alternates: { canonical: `/rental/${params.category}` },
    openGraph: { title: cat.title, description: cat.metaDescription, url: `/rental/${params.category}` },
  }
}

export default function CategoryPage({ params }) {
  const cat = getCategory(params.category)
  if (!cat) notFound()

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: process.env.NEXT_PUBLIC_BASE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Rental Hub', item: process.env.NEXT_PUBLIC_BASE_URL + '/rental' },
      { '@type': 'ListItem', position: 3, name: cat.name, item: process.env.NEXT_PUBLIC_BASE_URL + `/rental/${params.category}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
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
            <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight max-w-3xl mx-auto">{cat.name} Rental — UAE &amp; Canada</h1>
            <p className="body-text mt-5 max-w-2xl mx-auto">{cat.description}</p>
          </div>
        </section>

        {/* Products */}
        <section className="pb-24 px-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="mono text-xs text-white/60">{cat.products.length} products</div>
              <div className="flex gap-2">
                <Link href="/rental" className="glass-pill">All Categories</Link>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {cat.products.map((p) => (
                <ProductCard key={p.slug} product={p} categorySlug={params.category}/>
              ))}
            </div>
          </div>
        </section>

        {/* Related categories */}
        <section className="py-12 px-6" style={{ background: 'rgba(7,16,42,0.5)' }}>
          <div className="max-w-[1300px] mx-auto text-center">
            <h2 className="text-white text-2xl font-bold mb-6">Explore Other Categories</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {getAllCategorySlugs().filter(s => s !== params.category).map(s => {
                const c = getCategory(s)
                return <Link key={s} href={`/rental/${s}`} className="glass-pill">{c.name}</Link>
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
