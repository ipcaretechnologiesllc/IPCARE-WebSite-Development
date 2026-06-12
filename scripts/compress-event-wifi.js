const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const srcDir = path.join(__dirname, '..', 'public', 'images', 'rental', 'event-wifi', 'raw')
const outDir = path.join(__dirname, '..', 'public', 'images', 'rental', 'event-wifi')

const jobs = [
  ['aruba-ap-635.jpg', 'aruba-ap-635.webp'],
  ['Fortigate-200E.jpg', 'fortigate-200e.webp'],
  ['ruckus-r770.png', 'ruckus-r770.webp'],
  ['ubiquiti-udm-pro-max.png', 'ubiquiti-udm-pro-max.webp'],
  ['Unifi-Access-point-U6-Pro.jpg', 'unifi-u6-pro.webp'],
  ['Unifi-E7.png', 'unifi-e7.webp'],
]

;(async () => {
  for (const [src, out] of jobs) {
    const srcPath = path.join(srcDir, src)
    const outPath = path.join(outDir, out)
    let quality = 80
    let buf = await sharp(srcPath).resize({ width: 1200, withoutEnlargement: true }).webp({ quality }).toBuffer()
    if (buf.length > 180 * 1024) {
      quality = 70
      buf = await sharp(srcPath).resize({ width: 1200, withoutEnlargement: true }).webp({ quality }).toBuffer()
    }
    fs.writeFileSync(outPath, buf)
    const meta = await sharp(buf).metadata()
    console.log(`${out} | ${meta.width}x${meta.height} | ${(buf.length/1024).toFixed(1)}KB`)
  }
})()
