const LOGO_URL = 'https://customer-assets.emergentagent.com/job_ipcare-enterprise/artifacts/4c6j1azv_ipcare%20logo.png.png'

/**
 * Logo component
 *  - variant: 'color'  -> original artwork (default)
 *             'white'  -> forced-white via CSS filter (for tight dark surfaces only)
 *  - tile: boolean     -> wrap in a white rounded tile so original-color logo reads
 *                         cleanly on any background (recommended for header/footer)
 */
export default function Logo({ size = 36, variant = 'color', tile = false, className = '' }) {
  const filterStyle = variant === 'white' ? { filter: 'brightness(0) invert(1)' } : {}

  const img = (
    <img
      src={LOGO_URL}
      alt="IP Care Technologies"
      style={{ height: size, width: 'auto', ...filterStyle }}
      className="object-contain block"
    />
  )

  if (!tile) return <span className={className}>{img}</span>

  // White rounded tile — gives original-color logo clean contrast on any bg
  return (
    <span
      className={`inline-flex items-center justify-center ${className}`}
      style={{
        background: '#ffffff',
        padding: '6px 14px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px -2px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.6) inset',
        lineHeight: 0,
      }}
    >
      {img}
    </span>
  )
}

export const UAEFlag = () => (
  <svg width="18" height="12" viewBox="0 0 18 12" aria-label="UAE flag"><rect width="4" height="12" fill="#FF0000"/><rect x="4" width="14" height="4" fill="#00732F"/><rect x="4" y="4" width="14" height="4" fill="#FFFFFF"/><rect x="4" y="8" width="14" height="4" fill="#000000"/></svg>
)
export const CanadaFlag = () => (
  <svg width="18" height="12" viewBox="0 0 18 12" aria-label="Canada flag"><rect width="4" height="12" fill="#FF0000"/><rect x="4" width="10" height="12" fill="#FFFFFF"/><rect x="14" width="4" height="12" fill="#FF0000"/><path d="M9 3 L9.5 4.5 L11 4 L10 5.5 L11.5 6.5 L10 6.5 L10 8 L9 7.3 L8 8 L8 6.5 L6.5 6.5 L8 5.5 L7 4 L8.5 4.5 Z" fill="#FF0000"/></svg>
)
