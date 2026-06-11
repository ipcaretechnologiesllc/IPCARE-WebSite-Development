const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const dir = path.join(__dirname, '..', 'public', 'images', 'hero-mobile')
const rawDir = path.join(dir, 'raw')

const files = [
  'hero-m-overall.webp',
  'hero-m-managed-it.webp',
  'hero-m-cyber.webp',
  'hero-m-elv.webp',
  'hero-m-rental.webp',
  'hero-m-cloud.webp',
  'hero-m-eventit.webp',
]

async function run() {
  const results = []
  for (const f of files) {
    const src = path.join(rawDir, f)
    const dest = path.join(dir, f)
    let quality = 80
    let buf = await sharp(src).resize(1080, 1920, { fit: 'inside', withoutEnlargement: true }).webp({ quality }).toBuffer()
    while (buf.length >= 180 * 1024 && quality > 40) {
      quality -= 10
      buf = await sharp(src).resize(1080, 1920, { fit: 'inside', withoutEnlargement: true }).webp({ quality }).toBuffer()
    }
    fs.writeFileSync(dest, buf)
    const meta = await sharp(buf).metadata()
    results.push({ f, w: meta.width, h: meta.height, kb: (buf.length / 1024).toFixed(1), quality })
  }
  console.table(results)
}

run()
