import variants from './image-variants.json'

// Builds a srcset for an <img> so the browser picks a file close to the size it
// actually renders, instead of phones downloading the desktop original.
//
// - Local /public images: uses the -480w / -960w .webp siblings listed in
//   lib/image-variants.json (made by scripts/gen-responsive-images.mjs).
// - Unsplash URLs: uses Unsplash's own ?w= resizing.
// Returns undefined when there is nothing smaller to offer, so it is always
// safe to spread onto an <img> — the plain src keeps working either way.
const UNSPLASH_WIDTHS = [480, 960, 1600]

export function srcSetFor(src) {
  if (!src || typeof src !== 'string') return undefined
  if (src.startsWith('https://images.unsplash.com/')) {
    const base = src.split('?')[0]
    return UNSPLASH_WIDTHS.map((w) => `${base}?w=${w}&fm=webp&q=80 ${w}w`).join(', ')
  }
  const entry = variants[src]
  if (!entry) return undefined
  const stem = src.replace(/\.[^.]+$/, '')
  return [...entry.v.map((w) => `${encodeURI(`${stem}-${w}w.webp`)} ${w}w`), `${encodeURI(src)} ${entry.w}w`].join(', ')
}

// Common `sizes` values. They describe how wide the image is drawn on screen.
export const SIZES = {
  full: '100vw',
  half: '(min-width: 1024px) 50vw, 100vw',
  third: '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw',
  card: '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 90vw',
}

// Convenience: {...responsive(src, SIZES.full)} → { srcSet, sizes } or {}.
export function responsive(src, sizes = SIZES.full) {
  const srcSet = srcSetFor(src)
  return srcSet ? { srcSet, sizes } : {}
}
