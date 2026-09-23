// Desktop nav link with a 3D flip + radial gradient glow on hover.
//
// Pure-CSS replacement for AnimatedNavItem in components/ui/hover-gradient-nav-bar.jsx
// (same angles, origins, opacities and ~0.5s timing — see .nav-flip in globals.css).
// That version used framer-motion, which put ~40 KB gzipped of JS on every page
// just for this hover effect. No 'use client' needed: it has no state or handlers.
//
// Props:
//   gradient     — CSS radial-gradient string for the hover glow
//   frontContent — JSX for the resting (front) face
//   backContent  — JSX for the hover (back) face
//   className    — optional extra classes on the wrapper
export default function NavFlipItem({ gradient, frontContent, backContent, className }) {
  return (
    <div className={`nav-flip${className ? ` ${className}` : ''}`}>
      <div className="nav-flip__glow" style={{ background: gradient }} />
      <div className="nav-flip__front">{frontContent}</div>
      <div className="nav-flip__back">{backContent}</div>
    </div>
  )
}
