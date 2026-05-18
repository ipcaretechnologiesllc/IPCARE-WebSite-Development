// Metadata wrapper for /event-it landing page.
// app/event-it/page.js is a client component and cannot export metadata directly,
// so we provide it here. Nested routes (portfolio, [slug]) have their own
// metadata which overrides this default per Next.js metadata merging rules.

export const metadata = {
  title: 'Event IT Infrastructure UAE — FIFA, UFC, NBA, EuroLeague Final Four, FINA, IIFA, Coldplay | IP Care',
  description: 'Event IT infrastructure across the UAE. High-density WiFi, temporary networks, broadcast connectivity. Trusted on FIFA Club World Cup, UFC (2020–25), NBA Abu Dhabi Games (2022–25), EuroLeague Final Four 2025 (first outside Europe), FINA World Swimming, IIFA Awards, Coldplay, Saadiyat Nights and UAE National Day.',
  alternates: { canonical: '/event-it' },
  openGraph: {
    title: 'Event IT Infrastructure UAE — IP Care Technologies',
    description: 'High-density event WiFi, temporary networks, broadcast connectivity for FIFA, UFC, NBA Abu Dhabi, EuroLeague Final Four 2025, FINA, IIFA, Coldplay, Saadiyat Nights and UAE National Day events.',
    url: '/event-it',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Event IT Infrastructure UAE — IP Care',
    description: 'FIFA, UFC UAE, NBA Abu Dhabi, EuroLeague Final Four 2025, FINA, IIFA, Coldplay, Saadiyat Nights, UAE National Day. High-density WiFi, broadcast LAN, on-site engineering.',
  },
}

export default function EventITLayout({ children }) {
  return children
}
