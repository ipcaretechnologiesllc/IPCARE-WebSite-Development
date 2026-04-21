import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import EventITClient from './EventITClient'

export const metadata = {
  title: 'Event IT Infrastructure UAE — WiFi, Data Centres, CCTV for Events | IP Care',
  description: 'Mission-critical event IT infrastructure in UAE and Canada. High-density event WiFi, temporary data centres, CCTV and NOC for stadiums, concerts and summits.',
  alternates: { canonical: '/event-it' },
  openGraph: {
    title: 'Event IT Infrastructure — IP Care Technologies',
    description: 'Trusted by FIFA, UFC, NBA and Coldplay. Mission-critical IT for the world\'s biggest events.',
    url: '/event-it',
    type: 'website',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Event IT Infrastructure',
  description: 'High-density event WiFi, temporary data centres, event CCTV and 24/7 NOC for major events across UAE and Canada.',
  provider: { '@type': 'Organization', name: 'IP Care Technologies L.L.C.', url: process.env.NEXT_PUBLIC_BASE_URL },
  areaServed: [
    { '@type': 'Country', name: 'United Arab Emirates' },
    { '@type': 'Country', name: 'Canada' },
  ],
  serviceType: ['Event WiFi', 'Temporary Data Centre', 'Event CCTV', 'Event Network Operations Centre'],
}

export default function EventITPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />
      <EventITClient />
      <Footer />
    </>
  )
}
