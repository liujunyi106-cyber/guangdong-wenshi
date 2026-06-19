const app = getApp()
const unlock = require('../../utils/unlock')

Page({
  data: {
    statusBarHeight: 44,
    statusBarPadding: 7,
    scrollTop: 0,
    avatarUrl: '',
    nickname: '',
    userId: '',
    unlockedCount: 0,
    lions: [],
    achievements: [
      { id: 1, icon: '/images/achi-star1.png', name: '初次敲鼓', desc: '完成1次敲鼓', rule: 'plays>=1' },
      { id: 2, icon: '/images/achi-plays.png', name: '鼓手常客', desc: '累计敲鼓10次', rule: 'plays>=10' },
      { id: 3, icon: '/images/achi-star2.png', name: '百鼓争鸣', desc: '累计敲鼓100次', rule: 'plays>=100' },
      { id: 4, icon: '/images/achi-highscore.png', name: '高分达人', desc: '单局得分≥500分', rule: 'score>=500' },
      { id: 5, icon: '/images/achi-combo.png', name: '连击能手', desc: '单局Combo≥20', rule: 'combo>=20' },
      { id: 6, icon: '/images/achi-star1.png', name: '完美节拍', desc: '单局Perfect≥30', rule: 'perfect>=30' },
      { id: 7, icon: '/images/achi-star2.png', name: '零失误', desc: '单局Miss=0', rule: 'miss===0' },
      { id: 8, icon: '/images/achi-highscore.png', name: '鼓王降临', desc: '获得S级评价', rule: 'ratingS' }
    ],
    works: [],
    title: '',
    drumRecords: [],
    photoRecords: [],
    artworkRecords: [],
    expanded: {
      drum: false,
      photo: false,
      orders: false
    }
  },

  onLoad() {
    const wi = wx.getWindowInfo()
    this.setData({
      statusBarHeight: wi.statusBarHeight || 44,
      statusBarPadding: (wi.statusBarHeight || 44) > 30 ? 14 : 7
    })
    this.loadUserData()
  },

  onShow() {
    this.loadUserData()
    this.setData({ scrollTop: 0.01 }, () => {
      this.setData({ scrollTop: 0 })
    })
  },

  loadUserData() {
    const nickname = wx.getStorageSync('nickname') || ''
    const avatarUrl = wx.getStorageSync('avatarUrl') || ''
    let userId = wx.getStorageSync('userId')
    if (!userId) {
      userId = 'LION000' + Math.floor(Math.random() * 1000)
      wx.setStorageSync('userId', userId)
    }

    const lions = unlock.getLions()
    const unlockedCount = unlock.getUnlockedCount()
    const title = unlock.getTitle()

    const records = unlock.getRecords()
    const drumRecords = (records.drum || []).slice(0, 5)
    const photoRecords = (records.photo || []).slice(0, 6)
    const artworkRecords = (records.artwork || []).slice(0, 3)

    // 计算成就解锁状态
    const achievements = this.data.achievements.map(a => {
      const locked = !this.checkAchievement(a, drumRecords)
      return { ...a, locked }
    })

    this.setData({
      nickname, avatarUrl, userId,
      lions, unlockedCount, title,
      drumRecords, photoRecords, artworkRecords,
      works: artworkRecords,
      achievements
    })
  },

  /* 成就解锁检查 */
  checkAchievement(ach, records) {
    const totalPlays = records.length
    let bestScore = 0, bestCombo = 0, bestPerfect = 0, bestMiss = Infinity, hasS = false
    records.forEach(r => {
      if (r.score > bestScore) bestScore = r.score
      if (r.combo > bestCombo) bestCombo = r.combo
      if (r.perfect > bestPerfect) bestPerfect = r.perfect
      if (r.miss < bestMiss) bestMiss = r.miss
      if (r.rating === 'S') hasS = true
    })

    switch (ach.id) {
      case 1: return totalPlays >= 1
      case 2: return totalPlays >= 10
      case 3: return totalPlays >= 100
      case 4: return bestScore >= 500
      case 5: return bestCombo >= 20
      case 6: return bestPerfect >= 30
      case 7: return bestMiss === 0 && totalPlays > 0
      case 8: return hasS
      default: return false
    }
  },

  onToggleAccordion(e) {
    const key = e.currentTarget.dataset.key
    const current = this.data.expanded[key]
    const next = {}
    for (const k in this.data.expanded) {
      next[k] = (k === key) ? !current : false
    }
    this.setData({ expanded: next })
  },

  formatTime(ts) {
    const d = new Date(ts)
    const pad = n => String(n).padStart(2, '0')
    return `${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
  }
})
