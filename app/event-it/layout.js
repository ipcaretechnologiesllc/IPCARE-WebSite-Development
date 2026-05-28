import { events } from '@/lib/event-it-data'

export const metadata = {
  title: 'Event IT Infrastructure UAE | WiFi, Data Centres & NOC for Major Events | IP Care',
  description:
    'Enterprise event IT across UAE: high-density WiFi, temporary data centres, CCTV, and 24/7 NOC. Trusted on FIFA Club World Cup, UFC, NBA Abu Dhabi, FINA, IIFA, and more since 2003.',
  alternates: { canonical: 'https://www.ipcare.ae/event-it' },
  openGraph: {
    title: 'Event IT Infrastructure UAE — IP Care Technologies',
    description:
      'High-density event WiFi, temporary data centres, CCTV and 24/7 NOC for FIFA, UFC, NBA Abu Dhabi, EuroLeague Final Four 2025, FINA, IIFA, Coldplay, Saadiyat Nights and UAE National Day.',
    url: 'https://www.ipcare.ae/event-it',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Event IT Infrastructure UAE — IP Care',
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
      provider: {
        '@type': 'LocalBusiness',
        name: 'IP Care Technologies LLC',
        url: 'https://www.ipcare.ae',
        telephone: '+971506828290',
        email: 'info@ipcare.ae',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Salam Street',
          postOfficeBoxNumber: '53209',
          addressLocality: 'Abu Dhabi',
          addressCountry: 'AE',
        },
      },
      areaServed: [
        { '@type': 'Country', name: 'United Arab Emirates', sameAs: 'https://www.wikidata.org/wiki/Q878' },
        { '@type': 'Country', name: 'Canada', sameAs: 'https://www.wikidata.org/wiki/Q16' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Event IT Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'High-Density Event WiFi' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Temporary Data Centres' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Event CCTV & Security' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Structured Cabling — Rapid Deployment' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Point-to-Point Wireless Links' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Network Operations Centre' } },
        ],
      },
    },
    {
      '@type': 'ItemList',
      '@id': 'https://www.ipcare.ae/event-it#events',
      name: 'Major Events Powered by IP Care Technologies',
      description: 'Event IT infrastructure delivered across UAE and global events since 2003.',
      itemListElement: events.map((ev, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        item: {
          '@type': 'Event',
          name: ev.name,
          startDate: ev.startDate,
          endDate: ev.endDate,
          eventStatus: 'https://schema.org/EventScheduled',
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          location: {
            '@type': 'Place',
            name: ev.location,
            address: {
              '@type': 'PostalAddress',
              addressLocality: ev.location.split(',')[0].trim(),
              addressCountry: 'AE',
            },
          },
          description: ev.tech,
          image: ev.img
            ? ev.img.startsWith('/')
              ? `https://www.ipcare.ae${ev.img}`
              : ev.img
            : `https://www.ipcare.ae/ipcare-logo.png`,
          organizer: {
            '@type': 'Organization',
            name: 'IP Care Technologies LLC',
            url: 'https://www.ipcare.ae',
          },
          url: `https://www.ipcare.ae/event-it/${ev.slug}`,
        },
      })),
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
