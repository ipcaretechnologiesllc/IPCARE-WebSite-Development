import { events, getAllEventSubSlugs } from '@/lib/event-it-data'

const EVENT_SUBPAGE_SLUGS = new Set(getAllEventSubSlugs())
const eventCanonicalPath = (event) => {
  if (event.link) return event.link
  if (EVENT_SUBPAGE_SLUGS.has(event.slug)) return `/event-it/${event.slug}`
  return '/event-it/portfolio'
}

// Portfolio ItemList of Event nodes. Render this on the /event-it hub only:
// putting it in the shared layout repeated all events on every sub-page and
// made Search Console report ~19 Event warnings on each one.
export const eventsItemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': 'https://www.ipcare.ae/event-it#events',
  name: 'Major Events Powered by IP Care Technologies',
  description: 'Event IT infrastructure delivered across UAE and global events since 2003.',
  itemListElement: events.map((ev, idx) => {
    // IP Care delivers event IT infrastructure for these events as a vendor,
    // not as organizer - only attribute organizer/performer to the real
    // rights holder (ev.rightsHolder) when it's known, never to IP Care itself.
    const rightsHolderField = ev.rightsHolder
      ? ev.rightsHolder.type === 'Organization'
        ? { organizer: { '@type': 'Organization', name: ev.rightsHolder.name } }
        : { performer: { '@type': ev.rightsHolder.type, name: ev.rightsHolder.name } }
      : {}
    return {
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Event',
        name: ev.name,
        startDate: ev.startDate,
        endDate: ev.endDate,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: ev.location,
          address: {
            '@type': 'PostalAddress',
            addressLocality: ev.location.split(',')[0].trim(),
            addressCountry: 'AE',
          },
        },
        description: ev.tech,
        image: ev.img
          ? ev.img.startsWith('/')
            ? `https://www.ipcare.ae${ev.img}`
            : ev.img
          : `https://www.ipcare.ae/ipcare-logo.png`,
        ...rightsHolderField,
        url: `https://www.ipcare.ae${eventCanonicalPath(ev)}`,
      },
    }
  }),
}
