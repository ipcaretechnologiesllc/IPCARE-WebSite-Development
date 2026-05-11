// Metadata wrapper for /event-it/portfolio.
// The page itself is a client component; this layout provides server-side metadata.

export const metadata = {
  title: 'Event IT Portfolio — FIFA, UFC, NBA, Coldplay & More | IP Care Technologies',
  description: 'IP Care event IT portfolio. FIFA Club World Cup, UFC Fight Night, NBA Global Games, Coldplay World Tour and 100+ other major events powered by our infrastructure team.',
  alternates: { canonical: '/event-it/portfolio' },
  openGraph: {
    title: 'Event IT Portfolio — FIFA, UFC, NBA, Coldplay | IP Care',
    description: 'Major events powered by IP Care: FIFA Club World Cup, UFC Fight Night, NBA Global Games, Coldplay World Tour and more.',
    url: '/event-it/portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Event IT Portfolio — IP Care Technologies',
    description: 'FIFA, UFC, NBA, Coldplay and 100+ other major events powered by IP Care.',
  },
}

export default function EventPortfolioLayout({ children }) {
  return children
}
