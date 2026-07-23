// Single source of truth for IP Care's official social profile URLs.
//
// These previously lived in three places — components/site/Header.jsx,
// components/site/Footer.jsx and the three JSON-LD blocks in app/layout.js — and had
// drifted apart: the schema declared facebook.com/ipcaretech and instagram.com/ipcaretech
// while the visible site linked facebook.com/ipcareuae and instagram.com/ipcaretechnologies,
// and every copy of the YouTube URL pointed at a handle that 404s.
//
// That matters beyond tidiness: `sameAs` is how Google confirms entity identity, so
// conflicting or dead profile URLs weaken the consolidation needed to rank for the
// company's own name. Import from here rather than re-typing a URL.
export const SOCIAL_LINKS = {
  facebook:  'https://www.facebook.com/ipcareuae',
  linkedin:  'https://www.linkedin.com/company/ip-care-technologies',
  instagram: 'https://www.instagram.com/ipcaretechnologies/',
  youtube:   'https://www.youtube.com/@IPCARETechnologies',
}

// Verified business-directory listings. These carry more entity weight than social
// profiles — especially the Google Business Profile, which is what ties the website to
// the knowledge panel and Local Pack. The GBP is expressed as its canonical `?cid=` URL
// (decimal of the hex CID in the Maps place URL) rather than a maps.app.goo.gl short
// link, which is a redirect and can rotate.
export const DIRECTORY_LISTINGS = {
  googleBusinessProfile: 'https://maps.google.com/?cid=17683447171767251174',
  twoGis: 'https://2gis.ae/dubai/firm/70000001038132447',
  yango: 'https://maps.yango.com/org/159739572558/',
}

// Ordered array for schema.org `sameAs`. Google treats these as identity evidence,
// so every entry must resolve — a 404 here is worse than an omission.
export const SAME_AS = [
  SOCIAL_LINKS.facebook,
  SOCIAL_LINKS.linkedin,
  SOCIAL_LINKS.instagram,
  SOCIAL_LINKS.youtube,
  DIRECTORY_LISTINGS.googleBusinessProfile,
  DIRECTORY_LISTINGS.twoGis,
  DIRECTORY_LISTINGS.yango,
]

// The Toronto LocalBusiness must NOT claim the Abu Dhabi GBP or the UAE-only
// directory listings — those are Abu Dhabi entity evidence. It keeps social profiles
// only until a Canadian GBP exists.
export const SAME_AS_SOCIAL_ONLY = [
  SOCIAL_LINKS.facebook,
  SOCIAL_LINKS.linkedin,
  SOCIAL_LINKS.youtube,
]
