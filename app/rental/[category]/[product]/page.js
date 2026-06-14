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

export const dynamicParams = false

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

  const BASE = (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae')
  const productUrl = `${BASE}/rental/${params.category}/${params.product}`
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${product.brand} ${product.model}`,
    brand: { '@type': 'Brand', name: product.brand },
    description: product.specs.join('. '),
    image: [product.image + '?w=1200&q=85'],
    sku: product.slug,
    mpn: product.model,
    category: product.categoryName,
    url: productUrl,
    offers: {
      '@type': 'AggregateOffer',
      businessFunction: 'https://schema.org/LeaseOut',
      priceCurrency: 'AED',
      lowPrice: product.rates.daily,
      highPrice: product.rates.monthly,
      offerCount: 3,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      url: productUrl,
      seller: { '@type': 'Organization', name: 'IP Care Technologies L.L.C.', url: BASE },
      areaServed: [
        { '@type': 'Country', name: 'United Arab Emirates' },
        { '@type': 'Country', name: 'Canada' },
      ],
      priceSpecification: [
        { '@type': 'UnitPriceSpecification', price: product.rates.daily,   priceCurrency: 'AED', referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'DAY' },   name: 'Daily rental rate' },
        { '@type': 'UnitPriceSpecification', price: product.rates.weekly,  priceCurrency: 'AED', referenceQuantity: { '@type': 'QuantitativeValue', value: 7, unitCode: 'DAY' },   name: 'Weekly rental rate' },
        { '@type': 'UnitPriceSpecification', price: product.rates.monthly, priceCurrency: 'AED', referenceQuantity: { '@type': 'QuantitativeValue', value: 30, unitCode: 'DAY' },  name: 'Monthly rental rate' },
      ],
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What's included when I rent the ${product.brand} ${product.model}?`,
        acceptedAnswer: { '@type': 'Answer', text: `Rental of the ${product.brand} ${product.model} includes delivery, setup, and collection across the UAE and Canada, plus standard accessories and configuration to your requirements. Support is available for the duration of the rental period.` },
      },
      {
        '@type': 'Question',
        name: 'What is the minimum rental period?',
        acceptedAnswer: { '@type': 'Answer', text: 'Daily, weekly, and monthly rates are available, with daily rental as the minimum period. Longer-term rentals receive better rates, as shown in the pricing above.' },
      },
      {
        '@type': 'Question',
        name: 'How quickly can this be delivered?',
        acceptedAnswer: { '@type': 'Answer', text: 'Delivery timelines depend on quantity, location, and current stock availability. Contact our team with your dates and location for a confirmed delivery schedule.' },
      },
      {
        '@type': 'Question',
        name: 'Is technical support included during the rental period?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes. IP Care Technologies provides setup and ongoing technical support for all rental equipment, with replacement options available in case of a fault.' },
      },
    ],
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae') + '/' },
      { '@type': 'ListItem', position: 2, name: 'Rental Hub', item: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae') + '/rental' },
      { '@type': 'ListItem', position: 3, name: product.categoryName, item: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae') + `/rental/${params.category}` },
      { '@type': 'ListItem', position: 4, name: `${product.brand} ${product.model}`, item: (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae') + `/rental/${params.category}/${params.product}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main>
        <div className="px-6 pt-6" style={{ background: '#F4F6FA' }}>
          <nav className="max-w-[1400px] mx-auto text-xs flex items-center gap-1.5 flex-wrap" aria-label="Breadcrumb" style={{ color: '#58595B' }}>
            <Link href="/" className="hover:text-[#E87722]">Home</Link>
            <Icons.ChevronRight size={12}/>
            <Link href="/rental" className="hover:text-[#E87722]">Rental Hub</Link>
            <Icons.ChevronRight size={12}/>
            <Link href={`/rental/${params.category}`} className="hover:text-[#E87722]">{product.categoryName}</Link>
            <Icons.ChevronRight size={12}/>
            <span style={{ color: '#0B1A46' }}>{product.model}</span>
          </nav>
        </div>

        <ProductDetailClient product={product} categorySlug={params.category}/>

        {/* Related products */}
        <section className="py-16 md:py-20 px-6" style={{ background: '#F4F6FA' }}>
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-10">
              <div className="mono text-[#E87722] text-xs uppercase tracking-[0.25em] mb-3">Frequently Rented Together</div>
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: '#0B1A46' }}>Related Products</h2>
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
