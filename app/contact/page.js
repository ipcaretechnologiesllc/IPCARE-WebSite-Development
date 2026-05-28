import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import WhatsAppBubble from '@/components/site/WhatsAppBubble'
import ContactClient from './ContactClient'

export const metadata = {
  title: 'Contact IP Care Technologies — UAE & Canada | Get in Touch',
  description: 'Contact IP Care Technologies. Abu Dhabi +971 2 676 6935 | Toronto +1 416 786 0782 | info@ipcare.ae. Office hours and location details.',
  alternates: { canonical: '/contact' },
}

const localBusiness = [
  {
    '@context': 'https://schema.org', '@type': 'LocalBusiness',
    name: 'IP Care Technologies — Abu Dhabi', '@id': 'https://www.ipcare.ae/#abu-dhabi',
    telephone: '+971-2-676-6935', email: 'info@ipcare.ae',
    address: { '@type': 'PostalAddress', streetAddress: 'Salaam Street, Behind Fabrix', postOfficeBoxNumber: '53209', addressLocality: 'Abu Dhabi', addressCountry: 'AE' },
    openingHours: 'Su-Th 09:00-18:00',
  },
  {
    '@context': 'https://schema.org', '@type': 'LocalBusiness',
    name: 'IP Care Technologies — Toronto', '@id': 'https://www.ipcare.ae/#toronto',
    telephone: '+1-416-786-0782', email: 'info@ipcare.ae',
    address: { '@type': 'PostalAddress', streetAddress: '1 Concorde Gate', addressLocality: 'North York', addressRegion: 'ON', addressCountry: 'CA' },
    openingHours: 'Mo-Fr 09:00-17:00',
  },
]

export default function ContactPage() {
  return (
    <>
      {localBusiness.map((lb, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(lb) }}/>)}
      <Header />
      <ContactClient />
      <WhatsAppBubble />
      <Footer />
    </>
  )
}
