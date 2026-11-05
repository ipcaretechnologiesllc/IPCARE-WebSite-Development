import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import ProductPageTemplate from '@/components/site/ProductPageTemplate'
import { getProduct } from '@/lib/products-data'
import { ORG_REF } from '@/lib/schema'
import { OG_IMAGES } from '@/lib/og'

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae'

export const revalidate = 3600

export const metadata = {
  title: 'CrewForce360 | Field Workforce Platform by IP Care',
  description: "CrewForce360 is IP Care Technologies' field workforce platform: GPS-verified attendance, geofence check-ins, project-linked shifts, payroll-ready records.",
  alternates: { canonical: '/products/crewforce360' },
  openGraph: {
    title: 'CrewForce360 | Field Workforce Platform by IP Care',
    description: "CrewForce360 is IP Care Technologies' field workforce platform: GPS-verified attendance, geofence check-ins, project-linked shifts, payroll-ready records.",
    url: '/products/crewforce360',
    type: 'website',
    images: OG_IMAGES,
  },
}

export default function CrewForce360Page() {
  const data = getProduct('crewforce360')

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'CrewForce360',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, iOS, Android',
    description: data.tagline,
    url: 'https://www.crewforce360.com/',
    // Starter and Professional only: Enterprise is priced to order, so it has no price to
    // state. These mirror the "How much does CrewForce360 cost?" FAQ on this page and the
    // plans at crewforce360.com/pricing; update all three together.
    offers: [
      {
        '@type': 'Offer',
        name: 'Starter',
        description: 'Up to 50 staff members, billed monthly, 14-day free trial.',
        price: '199',
        priceCurrency: 'USD',
        url: 'https://www.crewforce360.com/pricing',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Professional',
        description: 'Up to 150 staff members, billed monthly, 14-day free trial.',
        price: '499',
        priceCurrency: 'USD',
        url: 'https://www.crewforce360.com/pricing',
        availability: 'https://schema.org/InStock',
      },
    ],
    creator: ORG_REF,
    publisher: ORG_REF,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${BASE}/products` },
      { '@type': 'ListItem', position: 3, name: 'CrewForce360', item: `${BASE}/products/crewforce360` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />
      <main>
        <ProductPageTemplate data={data} />
      </main>
      <Footer />
    </>
  )
}
