const sharp = require('sharp')
const path = require('path')

const dir = path.join(__dirname, '..', 'public', 'images', 'services')

async function run() {
  const jobs = [
    { file: 'ai-solutions-dubai-hero.webp', width: 1600 },
    { file: 'ai-solutions-dubai-section.webp', width: 1200 },
  ]

  for (const job of jobs) {
    const filePath = path.join(dir, job.file)
    const buf = await sharp(filePath).resize({ width: job.width, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer()
    await sharp(buf).toFile(filePath)
    const meta = await sharp(filePath).metadata()
    console.log(`${job.file}: ${meta.width}x${meta.height}, ${(buf.length / 1024).toFixed(1)}KB`)
  }
}

run()
