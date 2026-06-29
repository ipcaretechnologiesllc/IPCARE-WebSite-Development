const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const servicesDir = path.join(__dirname, '..', 'public', 'images', 'services')

const jobs = [
  { src: 'software-development-dubai-hero.webp',    out: 'software-development-dubai-hero.webp',    width: 1600 },
  { src: 'software-development-dubai-section.webp', out: 'software-development-dubai-section.webp', width: 1200 },
]

;(async () => {
  for (const job of jobs) {
    const srcPath = path.join(servicesDir, job.src)
    const outPath = path.join(servicesDir, job.out)

    let quality = 80
    let buf = await sharp(srcPath).resize({ width: job.width, withoutEnlargement: true }).webp({ quality }).toBuffer()

    if (buf.length > 180 * 1024) {
      quality = 70
      buf = await sharp(srcPath).resize({ width: job.width, withoutEnlargement: true }).webp({ quality }).toBuffer()
    }

    if (buf.length > 180 * 1024) {
      quality = 60
      buf = await sharp(srcPath).resize({ width: job.width, withoutEnlargement: true }).webp({ quality }).toBuffer()
    }

    fs.writeFileSync(outPath, buf)
    const meta = await sharp(buf).metadata()
    console.log(`${job.out} | ${meta.width}x${meta.height} | ${(buf.length / 1024).toFixed(1)}KB | quality ${quality}`)
  }
})()
