import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import PortfolioClient from './PortfolioClient'
import { portfolioProjects } from '@/lib/portfolio-data'

export const revalidate = 3600

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae'

export const metadata = {
  title: 'IT, ELV & Event Infrastructure Projects UAE | IP Care',
  description:
    'Explore IP Care Technologies delivery portfolio across major events, hotels, schools, arenas, towers, oil and gas, CCTV, access control, structured cabling, fiber and system integration projects.',
  alternates: { canonical: '/portfolio' },
  openGraph: {
    title: 'IT, ELV & Event Infrastructure Projects UAE | IP Care',
    description:
      'Project proof across major events, enterprise facilities, ELV, CCTV, access control, structured cabling and full-system infrastructure delivery.',
    url: '/portfolio',
    type: 'website',
    images: [{ url: '/images/hero-desktop/hero-overall.webp', width: 1200, height: 630, alt: 'IP Care Technologies delivery portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IT, ELV & Event Infrastructure Projects UAE | IP Care',
    description: 'Major event, enterprise facility, ELV, CCTV and infrastructure project proof from IP Care Technologies.',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
    { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${BASE}/portfolio` },
  ],
}

const portfolioSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${BASE}/portfolio#webpage`,
  name: 'IP Care Technologies Delivery Portfolio',
  description:
    'A unified delivery portfolio covering major event IT, enterprise facilities, ELV, CCTV, access control, structured cabling, fiber and network infrastructure projects.',
  url: `${BASE}/portfolio`,
  publisher: { '@id': `${BASE}#org` },
  mainEntity: {
    '@type': 'ItemList',
    name: 'IP Care Technologies project portfolio',
    itemListElement: portfolioProjects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.name,
        description: project.proofPoint,
        url: `${BASE}${project.relatedHref || '/portfolio'}`,
        image: project.image?.startsWith('http') ? project.image : `${BASE}${project.image}`,
        about: [
          project.industry,
          project.type,
          ...(project.services || []).map((item) => item.label),
        ],
        provider: { '@id': `${BASE}#org` },
      },
    })),
  },
}

export default function PortfolioPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }} />
      <link rel="preload" as="image" href="/images/hero-desktop/hero-overall.webp" fetchPriority="high" />
      <Header />
      <PortfolioClient />
      <Footer />
    </>
  )
}
