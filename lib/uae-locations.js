// Dubai and Abu Dhabi location pages: shared data for the local-proof block on each
// city page, the footer's city links and the blog's city links.
//
// Why this exists: in Search Console (2026-09-23) 7 of 9 sampled /services/<category>/
// {dubai,abu-dhabi} pages were "Crawled - currently not indexed" and
// /services/managed-it/dubai was unknown to Google. Their copy is reasonably unique, but
// each page had one internal link (from its parent) and no evidence of local delivery.
// Everything below links those pages from more places and backs them with real projects.
//
// Keep this module free of heavy imports: Footer.jsx pulls in UAE_FOOTER_LINKS and is
// rendered inside client components, so anything imported here ships to the browser.

export const UAE_CITIES = {
  'dubai': 'Dubai',
  'abu-dhabi': 'Abu Dhabi',
}

// Short link labels per service category. Only categories that have both city pages
// (all 11 UAE categories in lib/services-data.js do, as of 2026-09-23).
export const CITY_SERVICE_LABELS = {
  'managed-it': 'Managed IT',
  'cybersecurity': 'Cybersecurity',
  'elv': 'ELV & Security Systems',
  'infrastructure': 'IT Infrastructure',
  'cloud': 'Cloud Services',
  'it-consulting': 'IT Consulting',
  'email-solutions': 'Email Solutions',
  'web-development': 'Web Development',
  'software-development': 'Software Development',
  'ai-solutions': 'AI Solutions',
  'digital-marketing': 'Digital Marketing',
}

export const cityServiceHref = (category, city) => `/services/${category}/${city}`

// The four core B2B services, both cities: the footer column on every page.
const FOOTER_CATEGORIES = ['managed-it', 'cybersecurity', 'elv', 'infrastructure']
export const UAE_FOOTER_LINKS = FOOTER_CATEGORIES.flatMap((category) =>
  Object.entries(UAE_CITIES).map(([city, cityName]) => ({
    label: `${CITY_SERVICE_LABELS[category]} ${cityName}`,
    href: cityServiceHref(category, city),
  }))
)

// Abu Dhabi head office. Same facts as the ProfessionalService schema in app/layout.js;
// keep the two in step.
export const ABU_DHABI_OFFICE = {
  name: 'IP Care Technologies, Abu Dhabi',
  street: 'Salam Street',
  poBox: 'PO Box 53209',
  city: 'Abu Dhabi, UAE',
  phone: '+971 2 676 6935',
  phoneHref: 'tel:+97126766935',
  mapsHref: 'https://www.google.com/maps/search/?api=1&query=24.4947355%2C54.3732241',
}

// Blog category → the service whose city pages a reader of that post is most likely to
// need. Categories with no natural city service (Event IT, Rentals, News) are omitted.
export const BLOG_CATEGORY_TO_SERVICE = {
  'Cybersecurity': 'cybersecurity',
  'Government IT': 'cybersecurity',
  'Managed IT': 'managed-it',
  'Banking IT': 'managed-it',
  'Healthcare IT': 'managed-it',
  'Networking': 'infrastructure',
  'ELV & Security': 'elv',
}
