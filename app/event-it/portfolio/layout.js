// Metadata wrapper for /event-it/portfolio.
// The page itself is a client component; this layout provides server-side metadata.

export const metadata = {
  title: 'Event IT Portfolio: FIFA, UFC, NBA & EuroLeague | IP Care',
  description: 'Event IT delivered by IP Care: FIFA Club World Cup, UFC, NBA Abu Dhabi, EuroLeague Final Four, IIFA Awards, Coldplay and UAE National Day.',
  alternates: { canonical: '/event-it/portfolio' },
  openGraph: {
    title: 'Event IT Portfolio: IP Care Technologies',
    description: 'Major events powered by IP Care: FIFA, UFC, NBA Abu Dhabi, EuroLeague Final Four 2025, FINA, IIFA, Coldplay, Saadiyat Nights and UAE National Day.',
    url: '/event-it/portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Event IT Portfolio: IP Care Technologies',
    description: 'FIFA, UFC, NBA Abu Dhabi, EuroLeague Final Four 2025, FINA, IIFA, Coldplay, Saadiyat Nights, UAE National Day and more major events powered by IP Care.',
  },
}

export default function EventPortfolioLayout({ children }) {
  return children
}
