import { isCaSite } from '@/lib/seo-region'
import { ORG_REF } from '@/lib/schema'

export const metadata = {
  title: 'Event IT Infrastructure UAE | WiFi, Data Centres & NOC for Major Events | IP Care',
  description:
    'Enterprise event IT across UAE: high-density WiFi, temporary data centres, CCTV, and 24/7 NOC. Trusted on FIFA Club World Cup, UFC, NBA Abu Dhabi, FINA, IIFA, and more since 2003.',
  alternates: { canonical: 'https://www.ipcare.ae/event-it' },
  openGraph: {
    title: 'Event IT Infrastructure UAE: IP Care Technologies',
    description:
      'High-density event WiFi, temporary data centres, CCTV and 24/7 NOC for FIFA, UFC, NBA Abu Dhabi, EuroLeague Final Four 2025, FINA, IIFA, Coldplay, Saadiyat Nights and UAE National Day.',
    url: 'https://www.ipcare.ae/event-it',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Event IT Infrastructure UAE: IP Care',
    description:
      'FIFA, UFC UAE, NBA Abu Dhabi, EuroLeague Final Four 2025, FINA, IIFA, Coldplay, Saadiyat Nights, UAE National Day. High-density WiFi, broadcast LAN, NOC operations.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://www.ipcare.ae/event-it#service',
      name: 'Event IT Infrastructure',
      description:
        'Enterprise event IT infrastructure across UAE: high-density WiFi, temporary data centres, structured cabling, CCTV, point-to-point wireless links and 24/7 NOC operations.',
      url: 'https://www.ipcare.ae/event-it',
      provider: ORG_REF,
      areaServed: [
        { '@type': 'Country', name: 'United Arab Emirates', sameAs: 'https://www.wikidata.org/wiki/Q878' },
        ...(isCaSite() ? [{ '@type': 'Country', name: 'Canada', sameAs: 'https://www.wikidata.org/wiki/Q16' }] : []),
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Event IT Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'High-Density Event WiFi' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Temporary Data Centres' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Event CCTV & Security' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Structured Cabling: Rapid Deployment' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Point-to-Point Wireless Links' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Network Operations Centre' } },
        ],
      },
    },
  ],
}

export default function EventITLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
