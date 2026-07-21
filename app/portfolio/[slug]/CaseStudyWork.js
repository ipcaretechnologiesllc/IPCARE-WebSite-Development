'use client'

import { useCallback, useEffect, useState } from 'react'
import { Cctv, Cable, Fingerprint, CheckCircle2, X, ChevronLeft, ChevronRight } from 'lucide-react'

// Explicit map keeps the client bundle tree-shaken (a barrel `import * as`
// pulls the whole icon set in). Add new scope icons here as needed.
const SCOPE_ICONS = { Cctv, Cable, Fingerprint }

export default function CaseStudyWork({ blocks = [] }) {
  // Flatten every photo across scope blocks so the lightbox can page through
  // all of them in reading order. Each block records the global start index.
  let running = 0
  const decorated = blocks.map((block) => {
    const start = running
    const photos = block.photos || []
    running += photos.length
    return { ...block, photos, start }
  })
  const flat = decorated.flatMap((block) => block.photos)

  const [active, setActive] = useState(null)
  const isOpen = active !== null

  const close = useCallback(() => setActive(null), [])
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % flat.length)),
    [flat.length],
  )
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + flat.length) % flat.length)),
    [flat.length],
  )

  useEffect(() => {
    if (!isOpen) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, close, next, prev])

  if (!decorated.length) return null

  return (
    <div className="space-y-12 md:space-y-16">
      {decorated.map((block, blockIndex) => {
        const Icon = SCOPE_ICONS[block.icon] || CheckCircle2
        const reverse = blockIndex % 2 === 1
        const single = block.photos.length <= 1
        return (
          <div key={block.scope} className="grid items-center gap-6 md:grid-cols-2 md:gap-10">
            {/* Photos */}
            <div className={reverse ? 'md:order-last' : ''}>
              <div className={`grid gap-4 ${single ? 'mx-auto max-w-[260px] grid-cols-1 sm:mx-0' : 'grid-cols-2'}`}>
                {block.photos.map((photo, photoIndex) => {
                  const idx = block.start + photoIndex
                  return (
                    <button
                      key={photo.src}
                      type="button"
                      onClick={() => setActive(idx)}
                      aria-label={`Enlarge photo: ${photo.alt}`}
                      className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-[#0B1A46] ring-1 ring-[#E5EAF3] transition hover:ring-[#E87722] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E87722]"
                    >
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-[#0B1A46]/40 to-transparent opacity-0 transition group-hover:opacity-100" />
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Copy */}
            <div>
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#E87722]/10 text-[#E87722]">
                <Icon size={20} />
              </div>
              <div className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-[#E87722]">Scope of work</div>
              <h3 className="mt-1 text-xl font-extrabold leading-tight text-[#0B1A46] sm:text-2xl">{block.scope}</h3>
              <p className="mt-3 text-[15px] leading-7 text-[#475467]">{block.blurb}</p>
            </div>
          </div>
        )
      })}

      {/* Lightbox */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Project photo viewer"
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close photo viewer"
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X size={22} />
          </button>

          {flat.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  prev()
                }}
                aria-label="Previous photo"
                className="absolute left-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-6"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  next()
                }}
                aria-label="Next photo"
                className="absolute right-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <figure className="max-h-[85vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={flat[active].src}
              alt={flat[active].alt}
              className="max-h-[80vh] w-auto rounded-lg object-contain"
            />
            <figcaption className="mt-3 text-center text-sm text-white/80">{flat[active].alt}</figcaption>
          </figure>
        </div>
      )}
    </div>
  )
}
