import Link from 'next/link'
import { notFound } from 'next/navigation'
import * as Icons from 'lucide-react'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import ProductDetailClient from './ProductDetailClient'
import ProductCard from '@/components/rental/ProductCard'
import { getProduct, getAllProductParams, getRelatedProducts } from '@/lib/rental-data'

export async function generateStaticParams() {
  return getAllProductParams()
}

export async function generateMetadata({ params }) {
  const p = getProduct(params.category, params.product)
  if (!p) return {}
  const title = `${p.brand} ${p.model} Rental UAE & Canada | IP Care Technologies`
  const description = `Rent ${p.brand} ${p.model} in UAE and Canada. ${p.specs[0]}. Daily, weekly and monthly rates. Delivery and setup included.`
  return {
    title,
    description,
    alternates: { canonical: `/rental/${params.category}/${params.product}` },
    openGraph: { title, description, url: `/rental/${params.category}/${params.product}`, images: [p.image + '?w=1200&q=85'] },
  }
}

export default function ProductDetailPage({ params }) {
  const product = getProduct(params.category, params.product)
  if (!product) notFound()
  const related = getRelatedProducts(params.category, params.product, 3)

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${product.brand} ${product.model}`,
    brand: { '@type': 'Brand', name: product.brand },
    description: product.specs.join('. '),
    image: [product.image + '?w=1200&q=85'],
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'AED',
      lowPrice: product.rates.daily,
      highPrice: product.rates.monthly,
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'IP Care Technologies L.L.C.' },
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: process.env.NEXT_PUBLIC_BASE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Rental Hub', item: process.env.NEXT_PUBLIC_BASE_URL + '/rental' },
      { '@type': 'ListItem', position: 3, name: product.categoryName, item: process.env.NEXT_PUBLIC_BASE_URL + `/rental/${params.category}` },
      { '@type': 'ListItem', position: 4, name: `${product.brand} ${product.model}`, item: process.env.NEXT_PUBLIC_BASE_URL + `/rental/${params.category}/${params.product}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main>
        <div className="max-w-[1400px] mx-auto px-6 pt-6">
          <nav className="text-xs text-white/50 flex items-center gap-1.5 flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <Icons.ChevronRight size={12}/>
            <Link href="/rental" className="hover:text-white">Rental Hub</Link>
            <Icons.ChevronRight size={12}/>
            <Link href={`/rental/${params.category}`} className="hover:text-white">{product.categoryName}</Link>
            <Icons.ChevronRight size={12}/>
            <span className="text-white/80">{product.model}</span>
          </nav>
        </div>

        <ProductDetailClient product={product} categorySlug={params.category}/>

        {/* Related products */}
        <section className="py-16 md:py-20 px-6" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(8px)' }}>
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-10">
              <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">Frequently Rented Together</div>
              <h2 className="text-white text-2xl md:text-3xl font-bold">Related Products</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((r) => (
                <ProductCard key={r.slug} product={r} categorySlug={params.category}/>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
