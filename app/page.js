export const revalidate = 3600

import HomeClient from './HomeClient'

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
      <HomeClient />
    </>
  )
}
