import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import ContactClient from './ContactClient'
import { uaeFocus } from '@/lib/seo-region'

export const revalidate = 3600

export const metadata = {
  title: uaeFocus('Contact IP Care Technologies | IT Support UAE & Canada'),
  description: uaeFocus('Contact IP Care Technologies, enterprise IT support across UAE and Canada. Abu Dhabi: +971 2 676 6935. We respond within 4 business hours.'),
  alternates: { canonical: '/contact' },
}

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ipcare.ae'

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: `${BASE}/contact` },
  ],
}

export default function ContactPage() {
  return (
    <>
      {/* No hero preload here: React preloads the hero <img> (fetchPriority="high")
          in this page's HTML itself. Don't add react-dom preload() — it also rides in
          Next's link-prefetch payload, so every page linking here downloaded this hero. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}/>
      <Header />
      <ContactClient />
      <Footer />
    </>
  )
}
