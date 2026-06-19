const STORAGE_KEY = 'lions'
const RECORDS_KEY = 'gameRecords'

const LION_DEFS = [
  { id: 'fire', name: '火火狮', emoji: '🔥', image: '/images/mine-fire.png', unlockBy: '敲鼓通关' },
  { id: 'water', name: '水水狮', emoji: '💧', image: '/images/mine-water.png', unlockBy: 'AR拍照1次' },
  { id: 'gold', name: '金金狮', emoji: '✨', image: '/images/mine-gold.png', unlockBy: '涂色完成1幅' },
  { id: 'wood', name: '木木狮', emoji: '🌿', image: '/images/mine-wood.png', unlockBy: '敲鼓S/A评级' },
  { id: 'earth', name: '土土狮', emoji: '🪨', image: '/images/mine-earth.png', unlockBy: '集齐4只小狮' }
]

const UNLOCK_MODAL_TEXT = {
  fire: { icon: '🎉', title: '恭喜通关！', sub: '火火狮解锁条件达成', btn: '太棒了' },
  water: { icon: '📸', title: '恭喜获得 水水狮！', sub: 'AR 拍照 1 次达成', btn: '太棒了' },
  gold: { icon: '🎨', title: '恭喜获得 金金狮！', sub: '涂色完成 1 幅作品', btn: '太棒了' },
  wood: { icon: '⭐', title: '高分达人！', sub: '敲鼓 S/A 评级达成，木木狮登场', btn: '太棒了' },
  earth: { icon: '🏆', title: '终极收集！', sub: '集齐 4 只小狮，土土狮登场', btn: '太棒了' }
}

function getLions() {
  const stored = wx.getStorageSync(STORAGE_KEY)
  if (stored && stored.length) return stored
  const defaults = LION_DEFS.map(d => ({
    ...d,
    unlocked: false
  }))
  wx.setStorageSync(STORAGE_KEY, defaults)
  return defaults
}

function unlockLion(id) {
  const lions = getLions()
  const idx = lions.findIndex(l => l.id === id)
  if (idx === -1) return null
  if (lions[idx].unlocked) return null

  lions[idx].unlocked = true
  wx.setStorageSync(STORAGE_KEY, lions)

  const unlockedCount = lions.filter(l => l.unlocked).length
  if (unlockedCount === 4) {
    const earthIdx = lions.findIndex(l => l.id === 'earth')
    if (earthIdx !== -1 && !lions[earthIdx].unlocked) {
      lions[earthIdx].unlocked = true
      wx.setStorageSync(STORAGE_KEY, lions)
      return { lion: lions[idx], alsoEarth: true }
    }
  }

  return { lion: lions[idx], alsoEarth: false }
}

function getUnlockedCount() {
  return getLions().filter(l => l.unlocked).length
}

function getTitle() {
  return getUnlockedCount() >= 3 ? '🏅 舞狮小传人' : null
}

function getUnlockModal(id) {
  return UNLOCK_MODAL_TEXT[id] || null
}

function getRecords() {
  const stored = wx.getStorageSync(RECORDS_KEY)
  return stored || { drum: [], photo: [], artwork: [] }
}

function saveRecord(type, data) {
  const records = getRecords()
  const now = Date.now()
  const entry = { ...data, time: now }
  if (!records[type]) records[type] = []
  records[type].unshift(entry)
  if (records[type].length > 20) records[type].pop()
  wx.setStorageSync(RECORDS_KEY, records)
}

function saveGuideDone() {
  wx.setStorageSync('drumTutorialDone', true)
}

function isGuideDone() {
  return !!wx.getStorageSync('drumTutorialDone')
}

module.exports = {
  getLions,
  unlockLion,
  getUnlockedCount,
  getTitle,
  getUnlockModal,
  getRecords,
  saveRecord,
  saveGuideDone,
  isGuideDone
}
