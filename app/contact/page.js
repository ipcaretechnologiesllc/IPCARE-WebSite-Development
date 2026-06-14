import { preload } from 'react-dom'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import ContactClient from './ContactClient'

export const metadata = {
  title: 'Contact IP Care Technologies | IT Support UAE & Canada',
  description: 'Contact IP Care Technologies, enterprise IT support across UAE and Canada. Abu Dhabi: +971 2 676 6935. We respond within 4 business hours.',
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
  preload('/images/pages/contact-bg.webp', { as: 'image', fetchPriority: 'high' })
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}/>
      <Header />
      <ContactClient />
      <Footer />
    </>
  )
}
