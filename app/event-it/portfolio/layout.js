// Metadata wrapper for /event-it/portfolio.
// The page itself is a client component; this layout provides server-side metadata.

export const metadata = {
  title: 'Event IT Portfolio — FIFA, UFC, NBA Abu Dhabi, FINA, IIFA, Coldplay, Saadiyat Nights | IP Care',
  description: 'IP Care event IT portfolio. FIFA Club World Cup, UFC Events in UAE (2020–2025), NBA Abu Dhabi Games (2022–2025), FINA World Swimming, WBA World Championship, World Tennis League, Mubadala Abu Dhabi Open, Abu Dhabi Padel Master, UAE National Day, Ya Salam After Race Concert, IIFA Awards, Eid Al Fitr Concert, Saadiyat Nights and Coldplay.',
  alternates: { canonical: '/event-it/portfolio' },
  openGraph: {
    title: 'Event IT Portfolio — IP Care Technologies',
    description: 'Major events powered by IP Care: FIFA, UFC, NBA Abu Dhabi, FINA, IIFA, Coldplay, Saadiyat Nights and UAE National Day.',
    url: '/event-it/portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Event IT Portfolio — IP Care Technologies',
    description: 'FIFA, UFC, NBA Abu Dhabi, FINA, IIFA, Coldplay, Saadiyat Nights, UAE National Day and more major events powered by IP Care.',
  },
}

export default function EventPortfolioLayout({ children }) {
  return children
}
