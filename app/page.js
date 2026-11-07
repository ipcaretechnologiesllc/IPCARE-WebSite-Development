export const revalidate = 3600

import HomeClient from './HomeClient'
import { articles } from '@/lib/blog-data'
import { featuredPortfolioProjects } from '@/lib/portfolio-data'
import { rentalCategories } from '@/lib/rental-data'
import { ORG_REF } from '@/lib/schema'

// Resolved here on the server and passed down as props, so HomeClient ships only
// these few fields instead of the whole blog-data (~90 KB gzipped of article
// bodies) and portfolio-data modules.
const latestPosts = [...articles]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3)
  .map(({ slug, title, date, category, img, imageFit }) => ({ slug, title, date, category, img, imageFit: imageFit || null }))

const featuredProjects = featuredPortfolioProjects
  .map(({ slug, name, location, type }) => ({ slug, name, location, type }))

// Machine-readable pricing for agents: the lowest published daily rental rate across the fleet,
// computed at build time from the same data the rental pages render. Server-only import.
const dayRates = Object.values(rentalCategories)
  .flatMap((c) => c.products || [])
  .map((p) => p.rates?.daily)
  .filter((n) => typeof n === 'number' && n > 0)

const rentalOfferSchema = dayRates.length ? {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'IT Equipment Rental in the UAE',
  url: 'https://www.ipcare.ae/rental',
  provider: ORG_REF,
  areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
  offers: {
    '@type': 'AggregateOffer',
    businessFunction: 'https://schema.org/LeaseOut',
    priceCurrency: 'AED',
    lowPrice: Math.min(...dayRates),
    offerCount: dayRates.length,
    url: 'https://www.ipcare.ae/rental',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: Math.min(...dayRates),
      priceCurrency: 'AED',
      referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'DAY' },
      valueAddedTaxIncluded: false,
    },
  },
} : null

export default function Home() {
  return (
    <>
      {rentalOfferSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(rentalOfferSchema) }} />}
      {/* Preload the LCP hero background for each breakpoint. Rendered from this
          Server Component so the hints land in the initial HTML <head> that the
          CDN caches (React hoists <link> automatically). The media guards ensure
          only the matching asset is fetched — mobile image on phones, video
          poster on desktop. */}
      <link rel="preload" as="image" href="/images/hero-mobile/hero-m-overall.webp" media="(max-width: 768px)" fetchPriority="high" />
      <link rel="preload" as="image" href="/images/hero-poster.webp" media="(min-width: 769px)" fetchPriority="high" />
      <HomeClient latestPosts={latestPosts} featuredProjects={featuredProjects} />
    </>
  )
}
