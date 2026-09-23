export const revalidate = 3600

import HomeClient from './HomeClient'
import { articles } from '@/lib/blog-data'
import { featuredPortfolioProjects } from '@/lib/portfolio-data'

// Resolved here on the server and passed down as props, so HomeClient ships only
// these few fields instead of the whole blog-data (~90 KB gzipped of article
// bodies) and portfolio-data modules.
const latestPosts = [...articles]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3)
  .map(({ slug, title, date, category, img, imageFit }) => ({ slug, title, date, category, img, imageFit: imageFit || null }))

const featuredProjects = featuredPortfolioProjects
  .map(({ slug, name, location, type }) => ({ slug, name, location, type }))

export default function Home() {
  return (
    <>
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
