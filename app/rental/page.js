import Link from 'next/link'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import RentalHubClient from './RentalHubClient'
import { isCaSite, RENTAL_REGION } from '@/lib/seo-region'

export const revalidate = 3600

const HUB_DESCRIPTION = `IT equipment rental in ${RENTAL_REGION.prose}: laptops, MacBooks, iPads, event WiFi, servers and CCTV. Delivered and set up by certified engineers.`

export const metadata = {
  title: 'IT Equipment Rental Dubai & Abu Dhabi: Laptops, WiFi & Servers',
  description: HUB_DESCRIPTION,
  alternates: { canonical: '/rental' },
  openGraph: {
    title: 'IT Equipment Rental Dubai & Abu Dhabi: Laptops, WiFi & Servers',
    description: HUB_DESCRIPTION,
    url: '/rental',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'IT equipment rental UAE, IP Care Technologies' }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://www.ipcare.ae/rental',
      name: `IT Equipment Rental ${RENTAL_REGION.short}`,
      description:
        `Short-term and long-term IT equipment rental in ${RENTAL_REGION.prose}, laptops, event WiFi, servers, CCTV, networking gear and bundle packages, with delivery, setup and on-site engineers.`,
      url: 'https://www.ipcare.ae/rental',
      provider: { '@id': 'https://www.ipcare.ae#org' },
      areaServed: [
        { '@type': 'City', name: 'Dubai' },
        { '@type': 'City', name: 'Abu Dhabi' },
        { '@type': 'Country', name: 'United Arab Emirates' },
        ...(isCaSite() ? [{ '@type': 'Country', name: 'Canada' }] : []),
      ],
      serviceType: 'IT Equipment Rental',
      offers: {
        '@type': 'AggregateOffer',
        businessFunction: 'https://schema.org/LeaseOut',
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

// "computer rental abu dhabi" put /rental at position 19 in the 28 days to 2026-10-09 (UAE)
// while the homepage ranked 3.3 for it: the hub never said "computer rental" or described
// Abu Dhabi delivery. Rendered here on the server and passed into the client hub, so the
// copy is in the HTML without adding to the client bundle. UAE build only.
const LOCAL_LINKS = [
  { href: '/rental/laptops-desktops', label: 'Laptop & desktop rental' },
  { href: '/rental/macbooks',         label: 'MacBook & iMac rental' },
  { href: '/rental/tablets-ipads',    label: 'iPad rental' },
  { href: '/rental/printers',         label: 'Printer rental' },
]

function LocalRentalSection() {
  if (isCaSite()) return null
  return (
    <section className="py-16 md:py-20 px-6" style={{ background: '#F4F6FA' }}>
      <div className="max-w-[900px] mx-auto text-center">
        <div className="section-eyebrow">Abu Dhabi &amp; Dubai</div>
        <h2 className="font-bold text-3xl md:text-4xl mb-6" style={{ color: '#0B1A46' }}>
          Computer Rental in Abu Dhabi and Dubai
        </h2>
        <p className="text-base md:text-lg leading-relaxed mb-4" style={{ color: '#4A5568' }}>
          Our rental team is based in Abu Dhabi, so laptops, desktops, MacBooks, iPads and printers are delivered, set up and collected across Abu Dhabi, Al Ain and Dubai, and on to Sharjah and the rest of the UAE. Plan on one to two days between confirmed order and delivery, whichever emirate the office, training room or event is in.
        </p>
        <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: '#4A5568' }}>
          Computers are configured before they ship: imaged to your build, joined to your domain or enrolled in your MDM, so they are ready on day one rather than a setup job on your floor.
        </p>
        <ul className="flex flex-wrap justify-center gap-2">
          {LOCAL_LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="filter-pill-light">{l.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default function RentalHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <RentalHubClient localSection={<LocalRentalSection />} />
      <Footer />
    </>
  )
}
