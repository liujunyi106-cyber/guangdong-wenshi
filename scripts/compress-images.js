const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const IMAGES_DIR = path.join(__dirname, '..', 'miniprogram', 'images')

const RULES = [
  { match: /ip-actions\//, maxWidth: 500, quality: 85 },
  { match: /ip\//, maxWidth: 300, quality: 85 },
  { match: /deco\//, maxWidth: 150, quality: 85 },
  { match: /tab-(home|shop|mine)/, maxWidth: 81, quality: 90 },
  { match: /(hero-lion|drum-face)/, maxWidth: 750, quality: 80 },
  { match: /(fire-lion|water-lion|gold-lion|wood-lion|earth-lion)/, maxWidth: 300, quality: 85 },
  { match: /(icon-|parent-child|sticker|lock|unlock|star-|flip-camera|play|retry|combo|palette|decoration|cart)/, maxWidth: 200, quality: 85 },
]

function getRule(filePath) {
  const relative = path.relative(IMAGES_DIR, filePath).replace(/\\/g, '/')
  for (const rule of RULES) {
    if (rule.match.test(relative)) return rule
  }
  // default: moderate compression
  return { maxWidth: 400, quality: 85 }
}

async function compressFile(filePath) {
  const rule = getRule(filePath)
  const ext = path.extname(filePath).toLowerCase()

  if (ext === '.svg') return { file: filePath, action: 'skip-svg' }

  const originalSize = fs.statSync(filePath).size
  const tmpPath = filePath + '.tmp'

  try {
    let pipeline = sharp(filePath)
    const meta = await pipeline.metadata()

    if (meta.width > rule.maxWidth) {
      pipeline = pipeline.resize(rule.maxWidth, undefined, { withoutEnlargement: true })
    }

    if (ext === '.png') {
      pipeline = pipeline.png({ quality: rule.quality, compressionLevel: 9, palette: true })
    }

    await pipeline.toFile(tmpPath)

    const newSize = fs.statSync(tmpPath).size
    const reduction = originalSize > 0 ? ((1 - newSize / originalSize) * 100).toFixed(1) : 0

    if (newSize < originalSize) {
      fs.unlinkSync(filePath)
      fs.renameSync(tmpPath, filePath)
      return { file: path.relative(IMAGES_DIR, filePath), action: 'compressed', before: (originalSize / 1024).toFixed(1) + 'KB', after: (newSize / 1024).toFixed(1) + 'KB', reduction: reduction + '%' }
    } else {
      fs.unlinkSync(tmpPath)
      return { file: path.relative(IMAGES_DIR, filePath), action: 'keep', before: (originalSize / 1024).toFixed(1) + 'KB' }
    }
  } catch (err) {
    try { fs.unlinkSync(tmpPath) } catch {}
    return { file: path.relative(IMAGES_DIR, filePath), action: 'error', error: err.message }
  }
}

async function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const results = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...(await walk(full)))
    } else {
      results.push(await compressFile(full))
    }
  }
  return results
}

async function main() {
  console.log('开始压缩图片...\n')
  const results = await walk(IMAGES_DIR)

  let totalBefore = 0
  let totalAfter = 0

  for (const r of results) {
    if (r.action === 'compressed') {
      console.log(`  ✓ ${r.file}: ${r.before} → ${r.after} (${r.reduction})`)
      totalBefore += parseFloat(r.before)
      totalAfter += parseFloat(r.after)
    } else if (r.action === 'keep') {
      console.log(`  - ${r.file}: 已是最优`)
    } else if (r.action === 'error') {
      console.log(`  ✗ ${r.file}: ${r.error}`)
    }
  }

  console.log(`\n总计: ${totalBefore.toFixed(0)} KB → ${totalAfter.toFixed(0)} KB (${totalBefore > 0 ? ((1 - totalAfter/totalBefore)*100).toFixed(1) : 0}%)`)
}

main().catch(console.error)
