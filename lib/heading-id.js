// Stable, readable ids for section headings, so any section can be deep-linked
// (/services/managed-it#what-is-included) and cited by AI answer engines.
// Server-rendered: the id is in the HTML, not added by client JS.

export function headingId(text) {
  return String(text ?? '')
    .toLowerCase()
    .replace(/&amp;/g, ' and ')
    .replace(/&/g, ' and ')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    // Cap at 60 chars, cutting at a word boundary rather than mid-word
    .replace(/^(.{1,60})(-.*)?$/, '$1')
}

// Plain text of a React children value: strings, numbers, arrays and elements.
export function nodeText(node) {
  if (node == null || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(nodeText).join('')
  if (node.props) return nodeText(node.props.children)
  return ''
}
