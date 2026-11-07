'use client'

import { useEffect } from 'react'
import { TOOLS } from '@/lib/agent-tools'

// Registers read-only WebMCP tools (https://webmachinelearning.github.io/webmcp/) so an
// in-browser agent can ask about IP Care without scraping. No-op where the API is absent.
export default function WebMcp() {
  useEffect(() => {
    const mc = typeof navigator !== 'undefined' ? navigator.modelContext : null
    if (!mc || typeof mc.registerTool !== 'function') return
    const names = []
    for (const t of TOOLS) {
      try {
        mc.registerTool({
          name: t.name,
          description: t.description,
          inputSchema: t.inputSchema,
          annotations: { readOnlyHint: true },
          execute: async (args) => t.run(args || {}),
        })
        names.push(t.name)
      } catch (e) {
        // Already registered (e.g. React strict-mode double mount) or unsupported shape.
      }
    }
    return () => {
      if (typeof mc.unregisterTool !== 'function') return
      for (const n of names) {
        try { mc.unregisterTool(n) } catch (e) {}
      }
    }
  }, [])
  return null
}
