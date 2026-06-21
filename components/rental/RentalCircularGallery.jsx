'use client'

import { useEffect, useRef } from 'react'
import {
  Laptop, Tablet, Printer, Wifi, Network, Cctv, Wrench, Server, Package,
  ChevronLeft, ChevronRight,
} from 'lucide-react'

/* ------------------------------------------------------------------ *
 * All 10 rental categories (mirrors lib/rental-data.js). Images reuse
 * existing assets — 8 local category shots, plus the two Unsplash URLs
 * already referenced in rental-data.js for Bundles & MacBook. No new
 * content is invented.
 * ------------------------------------------------------------------ */
const CATEGORIES = [
  { name: 'Laptops & Desktops',    spec: 'Intel i7 / 16GB / SSD',        icon: Laptop,  img: '/images/home/rental-laptops.webp',                              href: '/rental/laptops-desktops' },
  { name: 'MacBook & Mac',         spec: 'MacBook Pro, Air, Mac mini',   icon: Laptop,  img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',  href: '/rental/macbooks' },
  { name: 'iPads & Tablets',       spec: 'iPad Pro, Samsung Tab',        icon: Tablet,  img: '/images/home/rental-tablets.webp',                              href: '/rental/tablets-ipads' },
  { name: 'Printers & Peripherals',spec: 'Mono / Colour / MFP',          icon: Printer, img: '/Rental/rental-printers.jpg',                                   href: '/rental/printers' },
  { name: 'Event WiFi & Routers',  spec: 'High-density access points',   icon: Wifi,    img: '/Rental/rental-event-wifi.webp',                                href: '/rental/event-wifi' },
  { name: 'Networking Equipment',  spec: 'Switches, firewalls, routers', icon: Network, img: '/Rental/category-networking-equipment.webp',                     href: '/rental/networking' },
  { name: 'CCTV & Security',       spec: 'Cameras, NVR, screening',      icon: Cctv,    img: '/Rental/category-cctv-security.webp',                           href: '/rental/cctv' },
  { name: 'Testing Equipment',     spec: 'Fluke DSX 5000, OTDR, Splicer',icon: Wrench,  img: '/Rental/category-testing-equipment.webp',                       href: '/rental/testing-equipment' },
  { name: 'Servers & Data',        spec: 'Dell, HPE, Supermicro',        icon: Server,  img: '/Rental/servers-data.webp',                                     href: '/rental/servers' },
  { name: 'Bundle Packages',       spec: 'Pre-configured event kits',    icon: Package, img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',  href: '/rental/bundles' },
]

const N = CATEGORIES.length
const ANGLE = 360 / N           // degrees between cards
const RADIUS = 540              // ring radius (px)
const AUTO_SPEED = 0.12         // deg per frame (~7°/s) — gentle
const DRAG_SENS = 0.25          // deg per px dragged

/* Shared card face (same visual language as the rest of the homepage). */
function Card({ cat, onClick }) {
  const Icon = cat.icon
  return (
    <a
      href={cat.href}
      onClick={onClick}
      className="group relative block w-full h-full rounded-2xl overflow-hidden bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E87722] focus-visible:ring-offset-2"
      style={{ boxShadow: '0 8px 32px rgba(10,26,70,0.18)' }}
      aria-label={`${cat.name} rental`}
    >
      {/* Image */}
      <div className="relative" style={{ aspectRatio: '4/3' }}>
        <img
          src={cat.img}
          alt={`${cat.name} rental UAE, IP Care Technologies`}
          loading="lazy"
          draggable="false"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* Orange icon badge — top left */}
        <div className="rental-card__badge p-2 rounded-xl">
          <Icon size={17} className="text-white" />
        </div>
      </div>
      {/* Content */}
      <div className="p-5 flex flex-col">
        <h4 className="font-bold text-base leading-tight mb-2" style={{ color: '#0B1A46' }}>{cat.name}</h4>
        <p className="text-xs mb-4 leading-snug" style={{ color: '#58595B' }}>{cat.spec}</p>
        <span
          className="w-full text-center text-xs font-semibold py-2 px-3 transition-all duration-300 group-hover:brightness-110"
          style={{ background: '#E87722', color: '#fff', boxShadow: '0 2px 10px rgba(232,119,34,0.35)', borderRadius: '10px' }}
        >
          Add to Quote
        </span>
      </div>
    </a>
  )
}

export default function RentalCircularGallery() {
  const stageRef = useRef(null)     // perspective container (drag surface)
  const ringRef = useRef(null)      // the rotating ring
  const cardRefs = useRef([])       // each card slot

  const rotation = useRef(0)        // current ring angle
  const target = useRef(null)       // when set, ease toward this angle (arrows)
  const hover = useRef(false)
  const dragging = useRef(false)
  const lastX = useRef(0)
  const moved = useRef(0)           // px moved during a drag (click vs drag)
  const reduced = useRef(false)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduced.current = motion.matches
    const onMotion = (e) => { reduced.current = e.matches }
    motion.addEventListener('change', onMotion)

    let raf
    const apply = () => {
      const ring = ringRef.current
      if (ring) ring.style.transform = `translateZ(-${RADIUS}px) rotateY(${rotation.current}deg)`
      // Per-card depth styling (front card is the only mouse-interactive one).
      for (let i = 0; i < cardRefs.current.length; i++) {
        const el = cardRefs.current[i]
        if (!el) continue
        const world = i * ANGLE + rotation.current
        let a = ((world % 360) + 360) % 360
        const norm = a > 180 ? 360 - a : a          // 0 = facing viewer
        const isFront = norm < ANGLE / 2
        el.style.opacity = String(Math.max(0.18, 1 - norm / 130))
        el.style.zIndex = String(Math.round(360 - norm))
        el.style.pointerEvents = isFront ? 'auto' : 'none'
        el.style.filter = isFront ? 'none' : 'saturate(0.85) brightness(0.85)'
      }
    }

    const tick = () => {
      if (dragging.current) {
        // rotation is updated by the pointer-move handler
      } else if (target.current != null) {
        const diff = target.current - rotation.current
        if (Math.abs(diff) < 0.15) { rotation.current = target.current; target.current = null }
        else rotation.current += diff * 0.12
      } else if (!hover.current && !reduced.current) {
        rotation.current += AUTO_SPEED
      }
      apply()
      raf = requestAnimationFrame(tick)
    }
    apply()
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      motion.removeEventListener('change', onMotion)
    }
  }, [])

  // Snap the nearest card to the front (called after a drag).
  const snap = () => {
    const step = Math.round(rotation.current / ANGLE)
    target.current = step * ANGLE
  }

  // Arrow navigation: bring the previous/next card to the front.
  const nudge = (dir) => {
    const base = target.current != null ? target.current : Math.round(rotation.current / ANGLE) * ANGLE
    const next = base + dir * ANGLE
    if (reduced.current) rotation.current = next   // no easing under reduced-motion
    else target.current = next
  }

  /* Pointer drag (mouse + touch via Pointer Events). Handlers sit on the
     stage so they fire even when the drag starts on the front card. */
  const onPointerDown = (e) => {
    dragging.current = true
    target.current = null
    lastX.current = e.clientX
    moved.current = 0
    try { e.currentTarget.setPointerCapture(e.pointerId) } catch {}
  }
  const onPointerMove = (e) => {
    if (!dragging.current) return
    const dx = e.clientX - lastX.current
    lastX.current = e.clientX
    moved.current += Math.abs(dx)
    rotation.current -= dx * DRAG_SENS
  }
  const onPointerUp = (e) => {
    if (!dragging.current) return
    dragging.current = false
    try { e.currentTarget.releasePointerCapture(e.pointerId) } catch {}
    snap()
  }
  // Suppress the click that follows a drag (so dragging doesn't navigate).
  const onCardClick = (e) => { if (moved.current > 6) { e.preventDefault() } }

  return (
    <div>
      {/* ── Desktop / tablet: 3D coverflow ring ───────────────────────── */}
      <div className="hidden md:block">
        <div
          ref={stageRef}
          className="relative mx-auto select-none cursor-grab active:cursor-grabbing rental-ring-stage"
          style={{ perspective: '1700px', touchAction: 'pan-y' }}
          onMouseEnter={() => { hover.current = true }}
          onMouseLeave={() => { hover.current = false }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          role="group"
          aria-roledescription="carousel"
          aria-label="Rental categories — drag or use arrows to rotate"
        >
          <div
            ref={ringRef}
            className="absolute left-1/2 top-1/2"
            style={{ width: 0, height: 0, transformStyle: 'preserve-3d' }}
          >
            {CATEGORIES.map((cat, i) => (
              <div
                key={cat.href}
                ref={(el) => { cardRefs.current[i] = el }}
                className="absolute rental-ring-card"
                style={{
                  width: 240,
                  height: 332,
                  left: -120,
                  top: -166,
                  transform: `rotateY(${i * ANGLE}deg) translateZ(${RADIUS}px)`,
                }}
              >
                <Card cat={cat} onClick={onCardClick} />
              </div>
            ))}
          </div>

          {/* Prev / Next arrows */}
          <button
            type="button"
            aria-label="Previous category"
            onClick={() => nudge(-1)}
            className="rental-ring-arrow rental-ring-arrow--prev"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            aria-label="Next category"
            onClick={() => nudge(1)}
            className="rental-ring-arrow rental-ring-arrow--next"
          >
            <ChevronRight size={22} />
          </button>
        </div>
        <p className="text-center mt-4 text-xs" style={{ color: '#7A8195' }}>
          Drag to explore · hover to pause
        </p>
      </div>

      {/* ── Mobile: swipe carousel (same cards, no overflow/jank) ──────── */}
      <div className="md:hidden -mx-6 px-6">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-3" style={{ scrollPaddingLeft: '1.5rem' }}>
          {CATEGORIES.map((cat) => (
            <div key={cat.href} className="snap-center flex-shrink-0" style={{ width: '78%', maxWidth: 300 }}>
              <Card cat={cat} />
            </div>
          ))}
        </div>
        <p className="text-center mt-1 text-xs" style={{ color: '#7A8195' }}>Swipe to browse all 10 categories</p>
      </div>
    </div>
  )
}
