import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import PortfolioClient from './PortfolioClient'

export const metadata = {
  title: 'Event IT Portfolio — FIFA, UFC, NBA, Coldplay & More | IP Care Technologies',
  description: 'Detailed case studies of IP Care event IT infrastructure deployments: FIFA Club World Cup, UFC, NBA Global Games, Coldplay and enterprise summits in UAE and Canada.',
  alternates: { canonical: '/event-it/portfolio' },
  openGraph: {
    title: 'Event IT Portfolio — IP Care Technologies',
    description: 'Case studies from the world\'s biggest events — FIFA, UFC, NBA, Coldplay and more.',
    url: '/event-it/portfolio',
  },
}

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <PortfolioClient />
      <Footer />
    </>
  )
}
