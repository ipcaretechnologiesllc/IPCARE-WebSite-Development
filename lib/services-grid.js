import { serviceCategories } from './services-data'

// Slim [slug, category] entries for the /services and /services/digital-solutions
// grids. Called from the server page and passed to the client component as a
// prop, so the browser gets only the fields the grid renders instead of the
// whole services-data module (~780 KB of source: page copy, FAQs, schema).
export function getServiceGridEntries({ digitalSolutions }) {
  return Object.entries(serviceCategories)
    .filter(([, c]) => (c.menuGroup === 'digital-solutions') === digitalSolutions)
    .map(([slug, c]) => [slug, {
      name: c.name,
      short: c.short,
      icon: c.icon,
      subpages: c.subpages
        ? Object.fromEntries(Object.entries(c.subpages).map(([k, s]) => [k, { h1: s.h1 }]))
        : null,
    }])
}
