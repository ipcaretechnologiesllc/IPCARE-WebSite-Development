'use client'

import { useCallback, useEffect, useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function CaseStudyGallery({ images = [] }) {
  const [active, setActive] = useState(null)
  const isOpen = active !== null

  const close = useCallback(() => setActive(null), [])
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  )
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length],
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

  if (!images.length) return null

  return (
    <>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActive(index)}
            className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-[#0B1A46] ring-1 ring-[#E5EAF3] transition hover:ring-[#E87722] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E87722]"
            aria-label={`Enlarge photo: ${image.alt}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-[#0B1A46]/40 to-transparent opacity-0 transition group-hover:opacity-100" />
          </button>
        ))}
      </div>

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

          {images.length > 1 && (
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
              src={images[active].src}
              alt={images[active].alt}
              className="max-h-[80vh] w-auto rounded-lg object-contain"
            />
            <figcaption className="mt-3 text-center text-sm text-white/80">{images[active].alt}</figcaption>
          </figure>
        </div>
      )}
    </>
  )
}
