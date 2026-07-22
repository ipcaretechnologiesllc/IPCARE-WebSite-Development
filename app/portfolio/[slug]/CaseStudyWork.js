'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  Cctv,
  Cable,
  Fingerprint,
  Network,
  BatteryCharging,
  CheckCircle2,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

// Explicit map keeps the client bundle tree-shaken (a barrel `import * as`
// pulls the whole icon set in). Add new scope icons here as needed.
const SCOPE_ICONS = { Cctv, Cable, Fingerprint, Network, BatteryCharging }

const pad = (n) => String(n).padStart(2, '0')

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
        const specs = block.specs || []
        const count = block.photos.length
        const hasPhotos = count > 0
        const single = count === 1
        // Every site photo is portrait, so no layout here may force a landscape
        // crop. A trio goes 3-across from sm up: stacking it any wider leaves the
        // media column roughly 1,150px tall against much shorter copy.
        const trio = count >= 3
        let gridCols = 'grid-cols-2'
        if (single) gridCols = 'grid-cols-1'
        else if (trio) gridCols = 'grid-cols-1 sm:grid-cols-3'
        // Splits into two columns at lg, not md: at tablet widths a half-width
        // media column leaves a photo trio at ~87px per thumbnail.
        return (
          <div key={block.scope} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Media — on-site photos, or an equipment panel where no photo exists */}
            <div className={reverse ? 'lg:order-last' : ''}>
              {hasPhotos ? (
                <div className={`grid gap-4 ${gridCols}`}>
                  {block.photos.map((photo, photoIndex) => {
                    const idx = block.start + photoIndex
                    const shape = single ? 'aspect-[4/3] sm:aspect-[4/5]' : 'aspect-[3/4]'
                    return (
                      <button
                        key={photo.src}
                        type="button"
                        onClick={() => setActive(idx)}
                        aria-label={`Enlarge photo: ${photo.alt}`}
                        className={`group relative overflow-hidden rounded-2xl bg-[#0B1A46] shadow-sm ring-1 ring-[#E5EAF3] transition hover:shadow-lg hover:ring-[#E87722] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E87722] ${shape}`}
                      >
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                        />
                        <span className="absolute inset-0 bg-gradient-to-t from-[#0B1A46]/50 to-transparent opacity-0 transition group-hover:opacity-100" />
                      </button>
                    )
                  })}
                </div>
              ) : (
                <div className="relative overflow-hidden rounded-2xl bg-[#0B1A46] p-7 shadow-lg ring-1 ring-white/10 sm:p-8">
                  {/* Faint blueprint grid keeps the panel from reading as an empty box */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.07]"
                    style={{
                      backgroundImage:
                        'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                      backgroundSize: '28px 28px',
                    }}
                  />
                  <div className="relative">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#E87722] text-white">
                      <Icon size={20} />
                    </div>
                    <div className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-[#F5A96A]">
                      Equipment &amp; configuration
                    </div>
                    <ul className="mt-4 space-y-3">
                      {specs.map((spec) => (
                        <li key={spec} className="flex gap-3 text-[14px] leading-6 text-white/85">
                          <Check size={16} className="mt-1 shrink-0 text-[#E87722]" aria-hidden="true" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Copy */}
            <div>
              <div className="flex items-center gap-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#E87722]/10 text-[#B95812]">
                  <Icon size={20} />
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#667085] tabular-nums">
                  Scope {pad(blockIndex + 1)} / {pad(decorated.length)}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-extrabold leading-tight text-[#0B1A46] sm:text-2xl">{block.scope}</h3>
              <p className="mt-3 text-[15px] leading-7 text-[#475467]">{block.blurb}</p>
              {hasPhotos && specs.length > 0 && (
                <ul className="mt-5 space-y-2.5 border-t border-[#E5EAF3] pt-5">
                  {specs.map((spec) => (
                    <li key={spec} className="flex gap-2.5 text-[14px] leading-6 text-[#344054]">
                      <Check size={16} className="mt-1 shrink-0 text-[#B95812]" aria-hidden="true" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              )}
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
