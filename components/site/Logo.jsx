const LOGO_URL = 'https://customer-assets.emergentagent.com/job_ipcare-enterprise/artifacts/4c6j1azv_ipcare%20logo.png.png'

export default function Logo({ size = 36, variant = 'white' }) {
  // variant 'white' = forced white on dark bg via CSS filter; 'color' = original artwork
  const filterStyle = variant === 'white'
    ? { filter: 'brightness(0) invert(1)' }
    : {}
  return (
    <img
      src={LOGO_URL}
      alt="IP Care Technologies"
      style={{ height: size, width: 'auto', ...filterStyle }}
      className="object-contain"
    />
  )
}

export const UAEFlag = () => (
  <svg width="18" height="12" viewBox="0 0 18 12" aria-label="UAE flag"><rect width="4" height="12" fill="#FF0000"/><rect x="4" width="14" height="4" fill="#00732F"/><rect x="4" y="4" width="14" height="4" fill="#FFFFFF"/><rect x="4" y="8" width="14" height="4" fill="#000000"/></svg>
)
export const CanadaFlag = () => (
  <svg width="18" height="12" viewBox="0 0 18 12" aria-label="Canada flag"><rect width="4" height="12" fill="#FF0000"/><rect x="4" width="10" height="12" fill="#FFFFFF"/><rect x="14" width="4" height="12" fill="#FF0000"/><path d="M9 3 L9.5 4.5 L11 4 L10 5.5 L11.5 6.5 L10 6.5 L10 8 L9 7.3 L8 8 L8 6.5 L6.5 6.5 L8 5.5 L7 4 L8.5 4.5 Z" fill="#FF0000"/></svg>
)
