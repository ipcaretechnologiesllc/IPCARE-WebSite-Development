import { SITE_URL, isCaSite } from './seo-region'

// Shared JSON-LD building blocks for page schema.

// The Organization node is declared once, in app/layout.js, with an @id pinned to the
// .ae brand URL on every build. Pages reference it through ORG_REF instead of declaring
// a fresh anonymous Organization, so search engines and AI tools see one company entity.
// name/url are kept alongside the @id so Article author/publisher still validate on
// their own if a parser doesn't resolve the reference.
export const BRAND_URL = 'https://www.ipcare.ae'
export const ORG_ID = `${BRAND_URL}#org`
export const ORG_REF = { '@type': 'Organization', '@id': ORG_ID, name: 'IP Care Technologies L.L.C.', url: BRAND_URL }

// Schema image URLs must be absolute: unlike <meta og:image>, which metadataBase resolves,
// a JSON-LD "/images/x.webp" is published as-is and Google can't fetch it. Unsplash
// images get the 1200px resize; local /public files are served at their natural size.
export function schemaImage(src) {
  if (src.startsWith('https://images.unsplash.com/')) return `${src}?w=1200&q=85`
  return src.startsWith('http') ? src : `${SITE_URL}${src}`
}

// Service areaServed at country level. The .ae build targets UAE search only; Canada is
// listed only on a .ca build (see lib/seo-region.js). The Organization node in the root
// layout still lists the Toronto office on both, because it is real.
export const UAE_COUNTRY = { '@type': 'Country', name: 'United Arab Emirates' }
export const CANADA_COUNTRY = { '@type': 'Country', name: 'Canada' }
export function serviceCountries() {
  return isCaSite() ? [UAE_COUNTRY, CANADA_COUNTRY] : [UAE_COUNTRY]
}
