import { Shield, ShieldCheck } from 'lucide-react'

export default function Logo({ size = 30 }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative" style={{ width: size, height: size }}>
        <Shield className="text-[#E87722]" style={{ width: size, height: size }} strokeWidth={2} />
        <ShieldCheck className="absolute inset-0 text-white" style={{ width: size, height: size, padding: size * 0.22 }} strokeWidth={2.4} />
      </div>
      <div className="leading-none">
        <div className="text-white font-bold tracking-tight text-[15px]">IP Care</div>
        <div className="text-[10px] tracking-[0.18em] text-white/60 uppercase">Technologies</div>
      </div>
    </div>
  )
}

export const UAEFlag = () => (
  <svg width="18" height="12" viewBox="0 0 18 12" aria-label="UAE flag"><rect width="4" height="12" fill="#FF0000"/><rect x="4" width="14" height="4" fill="#00732F"/><rect x="4" y="4" width="14" height="4" fill="#FFFFFF"/><rect x="4" y="8" width="14" height="4" fill="#000000"/></svg>
)
export const CanadaFlag = () => (
  <svg width="18" height="12" viewBox="0 0 18 12" aria-label="Canada flag"><rect width="4" height="12" fill="#FF0000"/><rect x="4" width="10" height="12" fill="#FFFFFF"/><rect x="14" width="4" height="12" fill="#FF0000"/><path d="M9 3 L9.5 4.5 L11 4 L10 5.5 L11.5 6.5 L10 6.5 L10 8 L9 7.3 L8 8 L8 6.5 L6.5 6.5 L8 5.5 L7 4 L8.5 4.5 Z" fill="#FF0000"/></svg>
)
