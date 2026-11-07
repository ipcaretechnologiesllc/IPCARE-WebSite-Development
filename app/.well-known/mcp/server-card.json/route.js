// MCP Server Card (SEP-1649) — lets agents discover the /mcp endpoint without prior config.
export const dynamic = 'force-static'

const BASE = 'https://www.ipcare.ae'

export async function GET() {
  const card = {
    name: 'ipcare-ae',
    title: 'IP Care Technologies',
    description:
      'Read-only public information about IP Care Technologies: contact details, IT services and how to request an equipment rental quote.',
    version: '1.0.0',
    protocolVersion: '2025-06-18',
    serverInfo: { name: 'ipcare-ae', title: 'IP Care Technologies', version: '1.0.0' },
    endpoint: `${BASE}/mcp`,
    transport: { type: 'streamable-http', endpoint: `${BASE}/mcp` },
    capabilities: { tools: { listChanged: false } },
    authentication: { required: false },
    documentationUrl: `${BASE}/llms.txt`,
    websiteUrl: BASE,
  }
  return new Response(JSON.stringify(card, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
