import { GET as llmsTxt } from '../llms.txt/route'

// Markdown representation of the homepage for agents. next.config.js rewrites `/` here
// when the request says `Accept: text/markdown`; it is also reachable directly at /index.md
// and advertised through the homepage `Link: rel="alternate"` header.
//
// The body is the llms.txt content (a curated, link-rich site summary), which is a far
// better agent entry point than the homepage's marketing HTML.
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  const res = await llmsTxt()
  const body = await res.text()
  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      // Same URL serves HTML to browsers; never let a shared cache hand this to a person.
      'Vary': 'Accept',
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
