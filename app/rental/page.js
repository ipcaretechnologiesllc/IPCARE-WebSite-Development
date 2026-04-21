import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import RentalHubClient from './RentalHubClient'

export const metadata = {
  title: 'IT Equipment Rental UAE & Canada — Laptops, WiFi, Servers | IP Care',
  description: 'IT equipment rental in UAE and Canada. Laptop rental, event WiFi rental, IT infrastructure rental. Short-term and long-term. Delivery, setup, support included.',
  alternates: { canonical: '/rental' },
  openGraph: {
    title: 'IT Equipment Rental Hub — IP Care Technologies',
    description: 'Laptop rental UAE, event WiFi rental UAE, IT infrastructure rental UAE. Pre-built bundles and 70+ products.',
    url: '/rental',
  },
}

export default function RentalHubPage() {
  return (
    <>
      <Header />
      <RentalHubClient />
      <Footer />
    </>
  )
}
