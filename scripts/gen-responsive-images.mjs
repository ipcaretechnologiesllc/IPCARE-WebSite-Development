// Generates smaller width variants of large /public images so phones don't
// download desktop-sized files, and writes lib/image-variants.json, which
// srcSetFor() in lib/responsive-image.js reads to build srcset attributes.
//
// next.config.js has images.unoptimized: true, so nothing resizes images at
// request time — the variants have to exist on disk and be committed.
//
//   node scripts/gen-responsive-images.mjs
//
// Re-run after adding or replacing a large image, then commit the new
// *-480w.webp / *-960w.webp files together with lib/image-variants.json.
// Only git-tracked files are processed: a variant of an uncommitted image
// would put a srcset in production pointing at a file that isn't deployed.

import { execSync } from 'node:child_process'
import { existsSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const WIDTHS = [480, 960]
const MIN_BYTES = 60 * 1024 // smaller files aren't worth a variant
const HEADROOM = 1.2        // only make a variant if the source is 20%+ wider
const QUALITY = 78
const SKIP = [/\/_originals\//, /^public\/images\/hero-(mobile|desktop)\//, /^public\/(icons|favicon)/, /-\d+w\.webp$/]

const files = execSync('git ls-files public', { encoding: 'utf8' })
  .split('\n')
  .filter((f) => /\.(webp|jpe?g|png)$/i.test(f) && !SKIP.some((re) => re.test(f)))

const variantPath = (file, w) => file.replace(/\.[^.]+$/, `-${w}w.webp`)

const manifest = {}
let made = 0
for (const file of files) {
  if (statSync(file).size < MIN_BYTES) continue
  const { width } = await sharp(file).metadata()
  const widths = WIDTHS.filter((w) => width >= w * HEADROOM)
  if (!widths.length) continue
  for (const w of widths) {
    const out = variantPath(file, w)
    if (existsSync(out) && statSync(out).mtimeMs >= statSync(file).mtimeMs) continue
    await sharp(file).resize({ width: w }).webp({ quality: QUALITY }).toFile(out)
    made++
  }
  manifest['/' + path.posix.relative('public', file)] = { w: width, v: widths }
}

const sorted = Object.fromEntries(Object.keys(manifest).sort().map((k) => [k, manifest[k]]))
writeFileSync('lib/image-variants.json', JSON.stringify(sorted, null, 1) + '\n')
console.log(`${Object.keys(sorted).length} images have variants (${made} files written)`)
