// Server-side builder for the "Delivered in <city>" block on Dubai and Abu Dhabi
// service pages (see lib/uae-locations.js for why). Imports the portfolio and event
// data modules, so call it only from server components (app/services/[category]/
// [slug]/page.js) and pass the plain result down to ServicePageTemplate.
//
// Every project listed comes from lib/portfolio-data.js or lib/event-it-data.js with
// its recorded location. Nothing is relabelled: at the time of writing the only Dubai
// delivery on record is World Tennis League (Coca-Cola Arena, 2022), so the Dubai
// block says "Dubai and across the UAE" and shows each project's real location.

import { portfolioProjects } from '@/lib/portfolio-data'
import { events, getEventSubpage } from '@/lib/event-it-data'
import { UAE_CITIES, CITY_SERVICE_LABELS, cityServiceHref, ABU_DHABI_OFFICE } from '@/lib/uae-locations'

// Services whose buyers care most about physical installations; they see the
// enterprise/ELV portfolio before the event work. Everyone else sees events first.
const FACILITIES_FIRST = new Set(['elv', 'infrastructure', 'managed-it'])
const MAX_PROJECTS = 6

const projectCard = (p) => ({
  key: `portfolio/${p.slug}`,
  name: p.name,
  location: p.location,
  tag: p.industry,
  detail: (p.services || []).map((s) => s.label).join(' · '),
  href: p.caseStudy ? `/portfolio/${p.slug}` : null,
})

const eventCard = (e) => ({
  key: `event/${e.slug}`,
  name: `${e.name} ${e.year}`,
  location: e.location,
  tag: 'Event IT',
  detail: (e.tech || '').split(',').slice(0, 2).map((s) => s.trim()).join(' · '),
  href: getEventSubpage(e.slug) ? `/event-it/${e.slug}` : null,
})

// Linked items first (they carry the internal-link value), otherwise keep data order.
const linkedFirst = (list) => [...list.filter((x) => x.href), ...list.filter((x) => !x.href)]

export function getLocalProof(category, city) {
  const cityName = UAE_CITIES[city]
  if (!cityName) return null

  const inCity = (loc) => (loc || '').includes(cityName)
  const cityEvents = linkedFirst(events.filter((e) => inCity(e.location)).map(eventCard))
  const cityProjects = linkedFirst(portfolioProjects.filter((p) => inCity(p.location)).map(projectCard))

  let projects
  if (city === 'abu-dhabi') {
    projects = FACILITIES_FIRST.has(category)
      ? [...cityProjects.slice(0, 4), ...cityEvents.slice(0, 2)]
      : [...cityEvents.slice(0, 3), ...cityProjects.slice(0, 3)]
  } else {
    // Dubai: the Dubai delivery on record, then the strongest UAE work, each shown
    // with its actual location.
    const uaeEvents = linkedFirst(events.filter((e) => !inCity(e.location)).map(eventCard))
    const uaeProjects = linkedFirst(portfolioProjects.filter((p) => !inCity(p.location)).map(projectCard))
    projects = FACILITIES_FIRST.has(category)
      ? [...cityEvents, ...uaeProjects.slice(0, 3), ...uaeEvents.slice(0, 2)]
      : [...cityEvents, ...uaeEvents.slice(0, 3), ...uaeProjects.slice(0, 2)]
  }
  projects = projects.slice(0, MAX_PROJECTS)

  const otherCity = Object.keys(UAE_CITIES).find((c) => c !== city)
  const service = CITY_SERVICE_LABELS[category]

  return {
    cityName,
    heading: city === 'abu-dhabi' ? 'Delivered in Abu Dhabi' : 'Delivered in Dubai and Across the UAE',
    intro: city === 'abu-dhabi'
      ? 'Our head office is in Abu Dhabi. These are projects our engineers have delivered in the emirate.'
      : 'Dubai engagements are run by the same Abu Dhabi-based team behind the projects below, each shown with where it was delivered.',
    projects,
    office: ABU_DHABI_OFFICE,
    // Same city, other services: turns every city page into a hub for its siblings.
    siblings: Object.keys(CITY_SERVICE_LABELS)
      .filter((c) => c !== category)
      .map((c) => ({ label: `${CITY_SERVICE_LABELS[c]} in ${cityName}`, href: cityServiceHref(c, city) })),
    otherCity: service && otherCity
      ? { label: `${service} in ${UAE_CITIES[otherCity]}`, href: cityServiceHref(category, otherCity) }
      : null,
  }
}
