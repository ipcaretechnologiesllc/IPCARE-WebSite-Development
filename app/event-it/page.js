import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import EventITClient from './EventITClient'

export const metadata = {
  title: 'Event IT Services UAE: WiFi, Networks & On-Site Support',
  description:
    'Temporary networks, event WiFi, broadcast connectivity and on-site IT for major events in UAE. Deployed at FIFA, NBA, EuroLeague, Coldplay and more.',
  alternates: { canonical: '/event-it' },
  openGraph: {
    title: 'Event IT Services UAE: WiFi, Networks & On-Site Support',
    description:
      'Temporary networks, event WiFi, broadcast connectivity and on-site IT for major events in UAE. Deployed at FIFA, NBA, EuroLeague, Coldplay and more.',
    url: '/event-it',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Event IT services, IP Care Technologies UAE' }],
  },
}

export default function EventITPage() {
  return (
    <>
      <Header />
      <EventITClient />
      <Footer />
    </>
  )
}
