// Lightweight middleware — SOLE purpose is to expose the current request pathname
// to server components / generateMetadata via the `x-pathname` request header.
// This is required so the root layout can render path-aware hreflang link tags.
//
// We do NOT mutate the response, redirect, or change any business logic here.
// (Host-based redirects for ipcares.com → ipcare.ae are handled in next.config.js
// `redirects()` for better edge performance.)

import { NextResponse } from 'next/server'

export function middleware(request) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', request.nextUrl.pathname)
  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}

// Skip middleware for API routes, Next.js internals, and static files —
// they don't need pathname injection and we want zero overhead on the API.
export const config = {
  matcher: ['/((?!api/|_next/static/|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|webp|svg|ico|gif|css|js|woff2?|ttf|eot|xml|txt|json|map)$).*)'],
}
