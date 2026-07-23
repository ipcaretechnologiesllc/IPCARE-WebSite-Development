import Link from 'next/link'
import { notFound } from 'next/navigation'
import * as Icons from 'lucide-react'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import ProductDetailClient from './ProductDetailClient'
import ProductCard from '@/components/rental/ProductCard'
import { getProduct, getAllProductParams, getRelatedProducts } from '@/lib/rental-data'

export const revalidate = 3600

export async function generateStaticParams() {
  return getAllProductParams()
}

export const dynamicParams = false

export async function generateMetadata(props) {
  const params = await props.params;
  const p = getProduct(params.category, params.product)
  if (!p) return {}
  const title = `${p.brand} ${p.model} Rental UAE & Canada | IP Care Technologies`
  const description = `Rent ${p.brand} ${p.model} in UAE and Canada. ${p.specs[0]}. Daily, weekly and monthly rates. Delivery and setup included.`
  return {
    title,
    description,
    alternates: { canonical: `/rental/${params.category}/${params.product}` },
    openGraph: { title, description, url: `/rental/${params.category}/${params.product}`, images: [p.images ? p.images[0] : p.image + '?w=1200&q=85'] },
  }
}

export default async function ProductDetailPage(props) {
  const params = await props.params;
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
    image: product.images ? product.images : [product.image + '?w=1200&q=85'],
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

  // Single source for the FAQs: rendered below AND fed to FAQPage schema. Previously
  // this schema existed with four questions that appeared nowhere on the page, which
  // breaches Google's requirement that marked-up content be visible to users.
  const faqs = [
    {
      q: `What's included when I rent the ${product.brand} ${product.model}?`,
      a: `Rental of the ${product.brand} ${product.model} includes delivery, collection and setup across the UAE and Canada, plus standard accessories and configuration to your requirements. Technical support is included for the duration of the rental. MDM enrolment, locked stands and tethers, standby spare units, a dedicated on-site engineer and damage waiver are quoted separately.`,
    },
    {
      q: 'What is the minimum rental period?',
      a: 'One day. Daily, weekly and monthly rates are available, and the weekly and monthly bands offer better value on anything running beyond a few days. Rates shown are indicative, per unit and exclude VAT.',
    },
    {
      q: 'How quickly can this be delivered?',
      a: 'Plan on one to two days between confirmed order and delivery across the UAE. That window is the pre-delivery configuration work: imaging, enrolment and lockdown are completed before dispatch rather than at your site. Larger quantities or upcountry locations may need longer, so share your dates early.',
    },
    {
      q: 'Is technical support included during the rental period?',
      a: 'Yes. Setup and ongoing technical support are included for all rental equipment, with replacement options available in case of a fault. A dedicated on-site engineer for the duration of an event is available and quoted separately.',
    },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
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

        {/* Deployment detail + FAQs. The prose block renders only for products that
            define content in lib/rental-data.js; the FAQs render for every product,
            since their schema was already being emitted with nothing visible. */}
        <section className="py-14 md:py-16 px-6" style={{ background: '#FFFFFF' }}>
          <div className="max-w-[820px] mx-auto">
            {product.content && (
              <>
                <h2 className="text-2xl font-bold mb-5" style={{ color: '#0B1A46' }}>
                  Renting the {product.brand} {product.model}
                </h2>
                {product.content.body?.map((p, i) => (
                  <p key={i} className="leading-relaxed mb-4" style={{ color: '#58595B' }}>{p}</p>
                ))}

                {product.content.usedFor?.length > 0 && (
                  <div className="mt-8 mb-6">
                    <h2 className="text-2xl font-bold mb-4" style={{ color: '#0B1A46' }}>Typical deployments</h2>
                    <ul className="space-y-2">
                      {product.content.usedFor.map((u) => (
                        <li key={u} className="flex items-start gap-2.5" style={{ color: '#58595B' }}>
                          <Icons.Check size={16} className="text-[#E87722] mt-1 flex-shrink-0"/>
                          <span>{u}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Deep-dive article for this specific product, where one exists. Several
                    testing-equipment items have a dedicated blog post that previously had
                    no link from the rental page it belongs to. */}
                {product.content.readMore && (
                  <div className="mb-10 rounded-lg p-5" style={{ background: '#F4F6FA', borderLeft: '3px solid #E87722' }}>
                    <div className="mono text-[11px] uppercase tracking-widest mb-2" style={{ color: '#58595B' }}>Further reading</div>
                    <Link href={product.content.readMore.href} className="font-semibold hover:underline inline-flex items-center gap-1.5" style={{ color: '#0B1A46' }}>
                      {product.content.readMore.label}
                      <Icons.ArrowRight size={15} className="text-[#E87722]"/>
                    </Link>
                  </div>
                )}
              </>
            )}

            <h2 className="text-2xl font-bold mb-6" style={{ color: '#0B1A46' }}>Frequently asked questions</h2>
            {faqs.map(({ q, a }) => (
              <details key={q} className="mb-3 rounded-lg p-4" style={{ background: '#F4F6FA' }}>
                <summary className="font-semibold cursor-pointer" style={{ color: '#0B1A46' }}>{q}</summary>
                <p className="leading-relaxed mt-3" style={{ color: '#58595B' }}>{a}</p>
              </details>
            ))}

            <p className="mt-8 text-sm" style={{ color: '#58595B' }}>
              See all{' '}
              <Link href={`/rental/${params.category}`} className="text-[#E87722] hover:underline">
                {product.categoryName.toLowerCase()} available for rental
              </Link>
              , or{' '}
              <Link href="/contact" className="text-[#E87722] hover:underline">talk to our team</Link>{' '}
              about a specific deployment.
            </p>
          </div>
        </section>

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
