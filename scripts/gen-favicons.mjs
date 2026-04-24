// Generate favicon set + OG default image from the IP Care logo.
// Run: node scripts/gen-favicons.mjs
import sharp from 'sharp'
import { mkdir, writeFile } from 'fs/promises'
import path from 'path'

const ROOT = path.resolve(process.cwd())
const SRC = path.join(ROOT, 'public/ipcare-logo.png')
const APP = path.join(ROOT, 'app')

async function resizePad(src, size, pad = 0.15) {
  // Resize logo keeping aspect ratio and pad with transparent bg.
  const padded = Math.round(size * (1 - pad * 2))
  const buf = await sharp(src)
    .resize(padded, padded, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer()
  return await sharp({
    create: { width: size, height: size, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: buf, gravity: 'center' }])
    .png()
    .toBuffer()
}

async function resizePadBg(src, size, pad = 0.12, bg = '#0F245F') {
  // Same as above but with brand navy background (for apple-touch-icon).
  const hex = bg.replace('#', '')
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  const padded = Math.round(size * (1 - pad * 2))
  const buf = await sharp(src)
    .resize(padded, padded, { fit: 'contain', background: { r, g, b, alpha: 1 } })
    .toBuffer()
  return await sharp({
    create: { width: size, height: size, channels: 4, background: { r, g, b, alpha: 1 } },
  })
    .composite([{ input: buf, gravity: 'center' }])
    .png()
    .toBuffer()
}

async function run() {
  console.log('Generating favicons…')
  await mkdir(path.join(ROOT, 'public/icons'), { recursive: true })

  // favicon.ico — 32x32 transparent
  const ico32 = await resizePad(SRC, 32, 0.08)
  await writeFile(path.join(APP, 'icon.png'), ico32)
  // Additional sizes under /public/icons for manifests / Android
  const sizes = [16, 32, 48, 96, 144, 192, 512]
  for (const s of sizes) {
    const b = await resizePad(SRC, s, 0.08)
    await writeFile(path.join(ROOT, `public/icons/icon-${s}.png`), b)
  }

  // Apple touch icon — 180x180, brand bg
  const apple = await resizePadBg(SRC, 180, 0.16, '#0F245F')
  await writeFile(path.join(APP, 'apple-icon.png'), apple)

  // OG default image — 1200x630, brand navy with logo + subtle accent
  const logoOG = await sharp(SRC)
    .resize(520, 520, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer()
  // Build OG: navy gradient bg with orange accent bar at bottom + centered logo
  const svg = `
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0B1A46"/>
        <stop offset="60%" stop-color="#0F245F"/>
        <stop offset="100%" stop-color="#13306E"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <rect x="0" y="610" width="1200" height="20" fill="#E87722"/>
    <text x="600" y="560" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#ffffffCC" font-weight="600" letter-spacing="6">ENTERPRISE IT  ·  UAE  ·  CANADA</text>
  </svg>`
  const ogBuf = await sharp(Buffer.from(svg))
    .composite([{ input: logoOG, top: 60, left: (1200 - 520) / 2 }])
    .png()
    .toBuffer()
  await writeFile(path.join(APP, 'opengraph-image.png'), ogBuf)
  await writeFile(path.join(APP, 'twitter-image.png'), ogBuf)
  await writeFile(path.join(ROOT, 'public/og-default.png'), ogBuf)

  console.log('✓ Done. Wrote:')
  console.log('  app/icon.png, app/apple-icon.png')
  console.log('  app/opengraph-image.png, app/twitter-image.png')
  console.log('  public/og-default.png')
  console.log('  public/icons/icon-{16,32,48,96,144,192,512}.png')
}

run().catch(e => { console.error(e); process.exit(1) })
