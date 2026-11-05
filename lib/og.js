// Default Open Graph image for page templates.
//
// Next.js does not merge a page's `openGraph` with the root layout's: a page that sets
// its own `openGraph` replaces the layout's wholesale, dropping `images` and `type`.
// Any template that defines `openGraph` must therefore spread these in itself, or its
// pages ship without og:image (flagged by Ahrefs as "Open Graph tags incomplete").
export const OG_IMAGES = [
  { url: '/opengraph-image.png', width: 1200, height: 630, alt: 'IP Care Technologies: enterprise IT, cybersecurity and event IT in the UAE' },
]
