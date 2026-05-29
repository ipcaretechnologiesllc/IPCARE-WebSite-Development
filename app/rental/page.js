import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import RentalHubClient from './RentalHubClient'

export const metadata = {
  title: 'IT Equipment Rental UAE & Canada — Laptops, WiFi, Servers, CCTV | IP Care Technologies',
  description:
    'Short-term and long-term IT equipment rental in UAE and Canada. Laptop rental, event WiFi, servers, CCTV, networking gear and bundle packages. Delivery, setup and certified engineers included.',
  alternates: { canonical: '/rental' },
  openGraph: {
    title: 'IT Equipment Rental UAE & Canada — Laptops, WiFi, Servers, CCTV | IP Care Technologies',
    description:
      'Short-term and long-term IT equipment rental in UAE and Canada. Laptop rental, event WiFi, servers, CCTV, networking gear and bundle packages. Delivery, setup and certified engineers included.',
    url: '/rental',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'IT equipment rental UAE — IP Care Technologies' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://www.ipcare.ae/rental',
      name: 'IT Equipment Rental UAE & Canada',
      description:
        'Short-term and long-term IT equipment rental in UAE and Canada — laptops, event WiFi, servers, CCTV, networking gear and bundle packages, with delivery, setup and on-site engineers.',
      url: 'https://www.ipcare.ae/rental',
      provider: {
        '@type': 'Organization',
        name: 'IP Care Technologies LLC',
        url: 'https://www.ipcare.ae',
        telephone: '+97126766935',
        email: 'info@ipcare.ae',
      },
      areaServed: [
        { '@type': 'Country', name: 'United Arab Emirates' },
        { '@type': 'Country', name: 'Canada' },
      ],
      serviceType: 'IT Equipment Rental',
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'AED',
        availability: 'https://schema.org/InStock',
      },
    },
    {
      '@type': 'ItemList',
      name: 'IT Equipment Rental Categories',
      url: 'https://www.ipcare.ae/rental',
      numberOfItems: 10,
      itemListElement: [
        { '@type': 'ListItem', position: 1,  name: 'Laptop & Desktop Rental',        url: 'https://www.ipcare.ae/rental/laptops-desktops' },
        { '@type': 'ListItem', position: 2,  name: 'iPad & Tablet Rental',           url: 'https://www.ipcare.ae/rental/tablets-ipads' },
        { '@type': 'ListItem', position: 3,  name: 'Printer & Peripheral Rental',    url: 'https://www.ipcare.ae/rental/printers' },
        { '@type': 'ListItem', position: 4,  name: 'Event WiFi & Router Rental',     url: 'https://www.ipcare.ae/rental/event-wifi' },
        { '@type': 'ListItem', position: 5,  name: 'Networking Equipment Rental',    url: 'https://www.ipcare.ae/rental/networking' },
        { '@type': 'ListItem', position: 6,  name: 'CCTV & Security Rental',         url: 'https://www.ipcare.ae/rental/cctv' },
        { '@type': 'ListItem', position: 7,  name: 'Cable & Fibre Testing Equipment',url: 'https://www.ipcare.ae/rental/testing-equipment' },
        { '@type': 'ListItem', position: 8,  name: 'Server & Storage Rental',        url: 'https://www.ipcare.ae/rental/servers' },
        { '@type': 'ListItem', position: 9,  name: 'MacBook & Mac Rental',           url: 'https://www.ipcare.ae/rental/macbooks' },
        { '@type': 'ListItem', position: 10, name: 'Bundle Packages',                url: 'https://www.ipcare.ae/rental/bundles' },
      ],
    },
  ],
}

export default function RentalHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <RentalHubClient />
      <Footer />
    </>
  )
}
