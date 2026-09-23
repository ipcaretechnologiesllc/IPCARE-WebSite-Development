'use client'

import { usePathname } from 'next/navigation'
import { isUaeOnlyPath, CA_SITE_LIVE } from '@/lib/seo-region'

// Path-aware hreflang alternates, rendered in the root layout's <head>.
//
// This is a Client Component so the root layout never has to read request headers:
// usePathname() resolves during static prerendering, so the tags are still in the
// server HTML crawlers see, while every page stays statically generated (the old
// `x-pathname` header + headers() approach forced all routes to render per request).
//
// Rendered as raw <link> tags rather than metadata.alternates.languages because
// Next.js shallow-merges `metadata.alternates`, so any child page that sets its own
// `alternates.canonical` would otherwise wipe out the languages map.
//
// The en-CA entry is dropped while ipcare.ca is not hosted (CA_SITE_LIVE in
// lib/seo-region.js): an alternate pointing at a domain that serves nothing can never
// return the reciprocal tag. en-AE + x-default still self-reference, which is valid.
const HREFLANG_TARGETS = [
  { lang: 'en-AE',     domain: 'https://www.ipcare.ae' },
  ...(CA_SITE_LIVE ? [{ lang: 'en-CA', domain: 'https://www.ipcare.ca' }] : []),
  { lang: 'x-default', domain: 'https://www.ipcare.ae' },
]

// Google requires every hreflang target to be canonical and self-referencing. UAE-only
// routes break that: on ipcare.ca they canonicalize back to ipcare.ae (lib/seo-region.js),
// so emitting an `en-CA` alternate for them pointed hreflang at a URL that declares itself
// non-canonical. Google discards clusters with that contradiction, which left the .ca copy
// free to compete with .ae for UAE queries — visible in GSC as ipcare.ca ranking for
// "event wifi rental uae", "event wifi rental dubai" and "elv security systems uae".
//
// For those routes we emit no alternates at all: there is only one canonical version, so
// there is no pair to declare, and canonical alone is the correct and sufficient signal.
//
// Trailing slash: the home path must not produce "https://www.ipcare.ae//". Everywhere
// else the href has to match the canonical and sitemap forms exactly — a hreflang target
// that differs from the canonical by a trailing slash is a different URL to Google.
function buildHreflangs(pathname) {
  if (isUaeOnlyPath(pathname)) return []
  const suffix = pathname === '/' ? '/' : pathname.replace(/\/+$/, '')
  return HREFLANG_TARGETS.map(({ lang, domain }) => ({ lang, href: `${domain}${suffix}` }))
}

export default function HreflangLinks() {
  const pathname = usePathname() || '/'
  return buildHreflangs(pathname).map(({ lang, href }) => (
    <link key={lang} rel="alternate" hrefLang={lang} href={href} />
  ))
}
