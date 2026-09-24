import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import DigitalSolutionsClient from './DigitalSolutionsClient'
import { getServiceGridEntries } from '@/lib/services-grid'
import { uaeFocus } from '@/lib/seo-region'

export const revalidate = 3600

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae'

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',     item: `${BASE}/` },
    { '@type': 'ListItem', position: 2, name: 'Services', item: `${BASE}/services` },
    { '@type': 'ListItem', position: 3, name: 'Digital Solutions', item: `${BASE}/services/digital-solutions` },
  ],
}

export const metadata = {
  title: 'Digital Solutions UAE: Web, Software & AI Development | IP Care',
  description: uaeFocus('Custom websites, web apps, software, and AI-driven tools built by our in-house team in Abu Dhabi. React, Next.js, Node.js, .NET, and Flutter. Serving UAE and Canada.'),
  alternates: { canonical: '/services/digital-solutions' },
  openGraph: {
    title: 'Digital Solutions UAE: Web, Software & AI Development | IP Care',
    description: uaeFocus('Custom websites, web apps, software, and AI-driven tools built by our in-house team in Abu Dhabi. React, Next.js, Node.js, .NET, and Flutter. Serving UAE and Canada.'),
    url: '/services/digital-solutions',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Digital solutions: web development, software and AI, IP Care Technologies' }],
  },
}

export default function DigitalSolutionsHub() {
  return (
    <>
      {/* No hero preload here: React preloads the hero <img> (fetchPriority="high")
          in this page's HTML itself. Don't add react-dom preload() — it also rides in
          Next's link-prefetch payload, so every page linking here downloaded this hero. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <DigitalSolutionsClient categories={getServiceGridEntries({ digitalSolutions: true })} />
      <Footer />
    </>
  )
}
