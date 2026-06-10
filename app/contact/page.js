import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import WhatsAppBubble from '@/components/site/WhatsAppBubble'
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

const localBusiness = [
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'IP Care Technologies: Abu Dhabi',
    '@id': `${BASE}/#abu-dhabi`,
    url: BASE,
    telephone: '+971-2-676-6935',
    email: 'info@ipcare.ae',
    image: `${BASE}/ipcare-logo.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Salam Street',
      postOfficeBoxNumber: '53209',
      addressLocality: 'Abu Dhabi',
      addressCountry: 'AE',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 24.4947355, longitude: 54.3732241 },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '18:00' },
    ],
    openingHours: 'Mo-Fr 09:00-18:00',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'IP Care Technologies: Toronto',
    '@id': `${BASE}/#toronto`,
    url: 'https://www.ipcare.ca',
    telephone: '+1-416-786-0782',
    email: 'info@ipcare.ca',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1 Concorde Gate',
      addressLocality: 'North York',
      addressRegion: 'ON',
      addressCountry: 'CA',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 43.5019444, longitude: -79.8344167 },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '18:00' },
    ],
    openingHours: 'Mo-Fr 09:00-18:00',
  },
]

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}/>
      {localBusiness.map((lb, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(lb) }}/>
      ))}
      <Header />
      <ContactClient />
      <WhatsAppBubble />
      <Footer />
    </>
  )
}
