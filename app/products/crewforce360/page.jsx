import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import ProductPageTemplate from '@/components/site/ProductPageTemplate'
import { getProduct } from '@/lib/products-data'

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
    creator: { '@type': 'Organization', name: 'IP Care Technologies' },
    publisher: { '@type': 'Organization', name: 'IP Care Technologies' },
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
