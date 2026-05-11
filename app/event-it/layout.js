// Metadata wrapper for /event-it landing page.
// app/event-it/page.js is a client component and cannot export metadata directly,
// so we provide it here. Nested routes (portfolio, [slug]) have their own
// metadata which overrides this default per Next.js metadata merging rules.

export const metadata = {
  title: 'Event IT Infrastructure UAE & Canada — WiFi, Networks, Broadcast | IP Care',
  description: 'Event IT infrastructure across UAE and Canada. High-density WiFi, temporary networks, broadcast connectivity and on-site engineers. Trusted on FIFA Club World Cup, UFC, NBA and Coldplay events.',
  alternates: { canonical: '/event-it' },
  openGraph: {
    title: 'Event IT Infrastructure UAE & Canada — IP Care Technologies',
    description: 'High-density event WiFi, temporary networks, broadcast connectivity and on-site engineering for major events across UAE and Canada.',
    url: '/event-it',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Event IT Infrastructure UAE & Canada — IP Care',
    description: 'High-density event WiFi, temporary networks and on-site engineering. FIFA, UFC, NBA, Coldplay credentials.',
  },
}

export default function EventITLayout({ children }) {
  return children
}
