import { TOOLS } from '@/lib/agent-tools'
import { rateLimit, getClientIp } from '@/lib/server/ratelimit'

// Minimal stateless MCP server (Streamable HTTP, JSON responses only) exposing the same
// read-only public tools as the WebMCP registration. Advertised by
// /.well-known/mcp/server-card.json. No auth, no writes, no secrets, no sessions.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const SUPPORTED = ['2025-06-18', '2025-03-26', '2024-11-05']
const SERVER_INFO = { name: 'ipcare-ae', title: 'IP Care Technologies', version: '1.0.0' }

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, Mcp-Protocol-Version, Mcp-Session-Id',
  'Access-Control-Max-Age': '86400',
}

const json = (body, status = 200, extra = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...CORS, ...extra },
  })

const rpcError = (id, code, message) => ({ jsonrpc: '2.0', id: id ?? null, error: { code, message } })

function handle(msg) {
  if (!msg || msg.jsonrpc !== '2.0' || typeof msg.method !== 'string') {
    return rpcError(msg && msg.id, -32600, 'Invalid Request')
  }
  const isNotification = msg.id === undefined || msg.id === null
  if (isNotification) return null // notifications/initialized etc.: nothing to return

  const { id, method, params } = msg
  switch (method) {
    case 'initialize': {
      const asked = params && params.protocolVersion
      return {
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: SUPPORTED.includes(asked) ? asked : SUPPORTED[0],
          capabilities: { tools: { listChanged: false } },
          serverInfo: SERVER_INFO,
          instructions:
            'Read-only public information about IP Care Technologies (managed IT, cybersecurity, cloud, ELV, event IT, equipment rental in the UAE). Forms and quotes must be completed by a person on the website.',
        },
      }
    }
    case 'ping':
      return { jsonrpc: '2.0', id, result: {} }
    case 'tools/list':
      return {
        jsonrpc: '2.0',
        id,
        result: {
          tools: TOOLS.map((t) => ({
            name: t.name,
            title: t.title,
            description: t.description,
            inputSchema: t.inputSchema,
            annotations: { readOnlyHint: true, openWorldHint: false },
          })),
        },
      }
    case 'tools/call': {
      const tool = TOOLS.find((t) => t.name === (params && params.name))
      if (!tool) return rpcError(id, -32602, 'Unknown tool')
      try {
        return { jsonrpc: '2.0', id, result: tool.run((params && params.arguments) || {}) }
      } catch (e) {
        console.error('[mcp] tool error', tool.name, e)
        return { jsonrpc: '2.0', id, result: { isError: true, content: [{ type: 'text', text: 'Tool failed.' }] } }
      }
    }
    default:
      return rpcError(id, -32601, 'Method not found')
  }
}

export async function POST(request) {
  const rl = rateLimit('mcp', getClientIp(request), { max: 60, windowMs: 60_000 })
  if (!rl.ok) return json(rpcError(null, -32000, 'Rate limit exceeded'), 429, { 'Retry-After': String(rl.retryAfterSec) })

  let payload
  try {
    payload = await request.json()
  } catch {
    return json(rpcError(null, -32700, 'Parse error'), 400)
  }

  if (Array.isArray(payload)) {
    if (payload.length === 0 || payload.length > 20) return json(rpcError(null, -32600, 'Invalid Request'), 400)
    const out = payload.map(handle).filter(Boolean)
    return out.length ? json(out) : new Response(null, { status: 202, headers: CORS })
  }
  const out = handle(payload)
  return out ? json(out) : new Response(null, { status: 202, headers: CORS })
}

export async function GET() {
  // No server-initiated SSE stream; the spec lets a server answer 405.
  return new Response('This MCP endpoint accepts POST (Streamable HTTP, JSON).', {
    status: 405,
    headers: { Allow: 'POST, OPTIONS', ...CORS },
  })
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS })
}
