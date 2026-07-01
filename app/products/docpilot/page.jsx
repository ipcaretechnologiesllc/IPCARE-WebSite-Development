import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import ProductPageTemplate from '@/components/site/ProductPageTemplate'
import { getProduct } from '@/lib/products-data'

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae'

export const revalidate = 3600

export const metadata = {
  title: 'DocPilot | Document & Compliance Platform by IP Care',
  description: "DocPilot is IP Care's document and compliance platform: track gate pass, vehicle, machinery, employee, and company document expiry in one place.",
  alternates: { canonical: '/products/docpilot' },
  openGraph: {
    title: 'DocPilot | Document & Compliance Platform by IP Care',
    description: "DocPilot is IP Care's document and compliance platform: track gate pass, vehicle, machinery, employee, and company document expiry in one place.",
    url: '/products/docpilot',
    type: 'website',
  },
}

export default function DocPilotPage() {
  const data = getProduct('docpilot')

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'DocPilot',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: data.tagline,
    creator: { '@type': 'Organization', name: 'IP Care Technologies' },
    publisher: { '@type': 'Organization', name: 'IP Care Technologies' },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${BASE}/products` },
      { '@type': 'ListItem', position: 3, name: 'DocPilot', item: `${BASE}/products/docpilot` },
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
