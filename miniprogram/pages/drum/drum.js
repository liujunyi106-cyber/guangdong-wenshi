const app = getApp()
const unlock = require('../../utils/unlock')

const BEAT_SEQUENCE = [
  'center-left', 'center-right',
  'center-left', 'rim-left',
  'center-right', 'rim-right',
  'center-both', 'rim-both',
  'center-left', 'rim-right',
  'center-right', 'rim-left',
  'center-both', 'center-right',
  'rim-both', 'center-left'
]

const HINTS = {
  'center-left': '👈 敲左边！',
  'center-right': '敲右边！ 👉',
  'center-both': '👈 一起敲中间！ 👉',
  'rim-left': '👈 敲左边鼓边！',
  'rim-right': '敲右边鼓边！ 👉',
  'rim-both': '👈 两边一起敲！ 👉'
}

// 缩圈参数：scale 从 MAX → MIN，持续 DURATION ms
const RING_MAX = 2.5
const RING_MIN = 0.4
const RING_DURATION = 1500
const RING_MISS_THRESHOLD = 0.4 // 缩到这个值以下→自动 miss

Page({
  data: {
    statusBarHeight: 44,
    state: 'songlist',
    songs: [
      { id: 1, name: '鼓点入门', desc: '节奏简单 · 适合新手', starsFilled: 1, starsEmpty: 2, best: '最佳: S' },
      { id: 2, name: '狮王争霸', desc: '节奏明快 · 挑战升级', starsFilled: 2, starsEmpty: 1, best: '未挑战' }
    ],
    // countdown
    cdText: '3',
    cdPulse: false,
    cdTextStyle: '',
    // game
    progress: 0,
    currentIpImg: '/images/ip-actions/活力满满.png',
    hzState: { left: false, right: false, center: false, rimLeft: false, rimRight: false },
    judgeText: '',
    judgeType: '',
    judgeShow: false,
    beatHint: '',
    beatHintShow: false,
    drumstickLeft: false,
    drumstickRight: false,
    drumstickType: 'center',
    drumstickHit: false,
    drumstickJudge: '',
    // ring
    ringShow: false,
    ringScale: RING_MAX,
    ringZone: '',
    // result
    resultIpImage: '',
    resultStars: '',
    resultTitle: '',
    perfectCnt: 0,
    goodCnt: 0,
    maxComboCnt: 0,
    totalScore: 0,
    scoreColor: '#E31E15',
    comboColor: '#D9A441',
    // toast
    toastShow: false,
    toastMsg: '',
    // unlock modal
    unlockShow: false,
    unlockIcon: '🎉',
    unlockTitle: '',
    unlockSub: '',
    // guide overlay
    guideShow: false,
  },

  /* ===== 内部状态 ===== */
  gameState: 'idle',
  totalBeats: 16,
  currentBeat: 0,
  perfectCount: 0,   // 太棒啦
  goodCount: 0,       // 不错哦
  earlyCount: 0,      // 太快啦
  missCount: 0,       // 漏掉了
  comboCount: 0,
  maxCombo: 0,
  beatPlaying: false,
  currentBeatType: '',
  countdownTimer: null,
  ringTimer: null,
  ringStartTime: 0,
  drumstickTimer: null,

  onLoad(options) {
    const winInfo = wx.getWindowInfo()
    this.setData({ statusBarHeight: winInfo.statusBarHeight || 44 })
  },

  goHome() {
    this.clearAllTimers()
    this.clearUnlockTimers()
    this.gameState = 'idle'
    wx.navigateBack()
  },

  onSelectSong(e) {
    this.startCountdown()
  },

  startCountdown() {
    this.gameState = 'countdown'
    let count = 3
    this.setData({ state: 'countdown', cdText: String(count), cdPulse: true, cdTextStyle: '' })
    this.countdownTimer = setInterval(() => {
      count--
      if (count > 0) {
        this.setData({ cdText: String(count), cdPulse: !this.data.cdPulse })
      } else if (count === 0) {
        this.setData({ cdText: '开始！', cdPulse: true, cdTextStyle: 'font-size:140rpx;margin-left:20rpx;' })
      } else {
        clearInterval(this.countdownTimer)
        this.beginPlaying()
      }
    }, 600)
  },

  beginPlaying() {
    this.gameState = 'playing'
    this.currentBeat = 0
    this.perfectCount = 0
    this.goodCount = 0
    this.earlyCount = 0
    this.missCount = 0
    this.comboCount = 0
    this.maxCombo = 0
    this.beatPlaying = false
    this.setData({
      state: 'playing', progress: 0,
      currentIpImg: '/images/ip-actions/活力满满.png',
      hzState: { left: false, right: false, center: false, rimLeft: false, rimRight: false },
      beatHintShow: false, judgeShow: false,
      ringShow: false, ringScale: RING_MAX,
      drumstickLeft: false, drumstickRight: false, drumstickHit: false
    })

    if (!unlock.isGuideDone()) {
      this.setData({ guideShow: true })
      this._guidePendingStart = true
      return
    }
    this.scheduleNextBeat()
  },

  dismissGuide() {
    this.setData({ guideShow: false })
    unlock.saveGuideDone()
    if (this._guidePendingStart) {
      this._guidePendingStart = false
      this.scheduleNextBeat()
    }
  },

  /* ========== 缩圈系统 ========== */

  scheduleNextBeat() {
    if (this.gameState !== 'playing') return
    if (this.currentBeat >= this.totalBeats) { this.endGame(); return }

    // IP 动作图
    if (this.comboCount >= 5) this.setData({ currentIpImg: '/images/ip-actions/威风凛凛.png' })
    else if (this.comboCount >= 2) this.setData({ currentIpImg: '/images/ip-actions/自信就位.png' })
    else this.setData({ currentIpImg: '/images/ip-actions/活力满满.png' })

    this.currentBeatType = BEAT_SEQUENCE[this.currentBeat] || 'center-left'
    this.currentBeat++
    this.beatPlaying = true

    // 命中区（内圈）亮起
    this.clearHitZones()
    this.showHitZone(this.currentBeatType)

    // 启动缩圈
    this.startRing(this.currentBeatType)

    const pct = Math.min(100, Math.round((this.currentBeat / this.totalBeats) * 100))
    this.setData({ progress: pct })
  },

  /* 启动缩圈动画 */
  startRing(type) {
    this.clearRingTimer()
    this.ringStartTime = Date.now()
    this.setData({
      ringShow: true, ringScale: RING_MAX, ringZone: type,
      hzState: { left: false, right: false, center: false, rimLeft: false, rimRight: false },
      drumstickHit: false
    })
    this.showHitZone(type)

    this.ringTimer = setInterval(() => {
      const elapsed = Date.now() - this.ringStartTime
      const progress = Math.min(1, elapsed / RING_DURATION)
      const scale = RING_MAX - (RING_MAX - RING_MIN) * progress

      if (scale <= RING_MIN) {
        // 缩到底 → 自动 miss
        this.clearRingTimer()
        if (this.beatPlaying && this.gameState === 'playing') {
          this.beatPlaying = false
          this.missCount++
          this.comboCount = 0
          this.hideSticks()
          this.setData({
            ringShow: false, ringScale: RING_MIN,
            currentIpImg: '/images/ip-actions/眼睛发亮.png',
            beatHintShow: false, drumstickLeft: false, drumstickRight: false
          })
          this.showJudge('miss', '😅 漏掉了')
          setTimeout(() => { if (this.gameState === 'playing') this.scheduleNextBeat() }, 800)
        }
        return
      }

      this.setData({ ringScale: Math.round(scale * 100) / 100 })

      // 鼓棒出现：外圈与内圈重合时出现
      if (scale <= 1.0 && !this.data.drumstickLeft && !this.data.drumstickRight) {
        this.updateSticksForBeat(false)
      }
    }, 20) // 50fps
  },

  clearRingTimer() {
    if (this.ringTimer) { clearInterval(this.ringTimer); this.ringTimer = null }
  },

  /* 鼓棒显隐 */
  updateSticksForBeat(hit, judge) {
    const type = this.currentBeatType
    const isRim = type.includes('rim')
    const stickType = isRim ? 'rim' : 'center'
    let left = false, right = false
    if (type === 'center-left' || type === 'rim-left') left = true
    else if (type === 'center-right' || type === 'rim-right') right = true
    else if (type === 'center-both' || type === 'rim-both') { left = true; right = true }
    this.setData({ drumstickLeft: left, drumstickRight: right, drumstickType: stickType, drumstickHit: hit, drumstickJudge: judge || '' })
  },

  hideSticks() {
    this.setData({ drumstickLeft: false, drumstickRight: false, drumstickHit: false })
  },

  /* ========== 点击判定 ========== */

  hitDrum(e) {
    if (this.gameState !== 'playing' || !this.beatPlaying) return

    this.beatPlaying = false
    this.clearRingTimer()

    const scale = this.data.ringScale
    let judgeType, symbol, score, keepCombo

    if (scale < 0.9) {
      // 外圈已缩过内圈 → 漏掉了
      judgeType = 'miss'; symbol = '😅 漏掉了'
      score = 0; keepCombo = false
      this.missCount++
    } else if (scale <= 1.1) {
      // 外圈 ≈ 内圈 (±10%) → 太棒啦
      judgeType = 'perfect'; symbol = '✨ 太棒啦!'
      score = 200; keepCombo = true
      this.perfectCount++
    } else if (scale <= 1.4) {
      // 外圈接近内圈 → 不错哦
      judgeType = 'good'; symbol = '👍 不错哦!'
      score = 100; keepCombo = true
      this.goodCount++
    } else {
      // 外圈 > 内圈很多 → 太快啦
      judgeType = 'early'; symbol = '⚡ 太快啦!'
      score = 50; keepCombo = false
      this.earlyCount++
    }

    if (keepCombo) {
      this.comboCount++
      if (this.comboCount >= 5) this.setData({ currentIpImg: '/images/ip-actions/威风凛凛.png' })
      else if (this.comboCount >= 2) this.setData({ currentIpImg: '/images/ip-actions/自信就位.png' })
      else this.setData({ currentIpImg: '/images/ip-actions/活力满满.png' })
    } else {
      this.comboCount = 0
      this.setData({ currentIpImg: '/images/ip-actions/眼睛发亮.png' })
    }
    if (this.comboCount > this.maxCombo) this.maxCombo = this.comboCount

    // 鼓棒敲击
    this.updateSticksForBeat(true, judgeType)
    clearTimeout(this.drumstickTimer)
    this.drumstickTimer = setTimeout(() => this.hideSticks(), 400)

    // 判定文字
    this.showJudge(judgeType, symbol)

    // 隐藏圈
    this.setData({ ringShow: false, beatHintShow: false, hzState: { left: false, right: false, center: false, rimLeft: false, rimRight: false } })

    setTimeout(() => {
      if (this.gameState === 'playing') this.scheduleNextBeat()
    }, 800)
  },

  /* ========== 命中区 ========== */

  clearHitZones() {
    this.setData({ hzState: { left: false, right: false, center: false, rimLeft: false, rimRight: false } })
  },

  showHitZone(type) {
    const hz = { left: false, right: false, center: false, rimLeft: false, rimRight: false }
    if (type === 'center-left') hz.left = true
    else if (type === 'center-right') hz.right = true
    else if (type === 'center-both') hz.center = true
    else if (type === 'rim-left') hz.rimLeft = true
    else if (type === 'rim-right') hz.rimRight = true
    else if (type === 'rim-both') { hz.rimLeft = true; hz.rimRight = true }
    this.setData({ hzState: hz })
  },

  showJudge(type, text) {
    this.setData({ judgeType: type, judgeText: text, judgeShow: true })
    setTimeout(() => this.setData({ judgeShow: false }), 800)
  },

  /* ========== 暂停 ========== */

  pauseGame() {
    if (this.gameState === 'playing') {
      this.clearRingTimer()
      wx.showModal({
        title: '退出当前挑战？',
        success: (res) => {
          if (res.confirm) {
            this.clearAllTimers()
            this.gameState = 'idle'
            wx.navigateBack()
          } else {
            // 继续 → 重启缩圈
            if (this.beatPlaying) this.startRing(this.currentBeatType)
          }
        }
      })
    }
  },

  /* ========== 结算 ========== */

  endGame() {
    this.gameState = 'result'
    this.clearRingTimer()
    clearTimeout(this.drumstickTimer)

    const totalTaps = this.perfectCount + this.goodCount + this.earlyCount
    const total = totalTaps + this.missCount
    const perfectRate = total > 0 ? this.perfectCount / total : 0
    const missRate = total > 0 ? this.missCount / total : 0

    let stars, title, ipImage, scoreColor, comboColor
    if (perfectRate >= 0.5 && missRate < 0.15) {
      stars = '⭐⭐⭐⭐⭐'; title = '太厉害了！舞狮大师！'
      ipImage = '/images/ip-actions/威风凛凛.png'
      scoreColor = '#E31E15'; comboColor = '#D9A441'
    } else if (perfectRate >= 0.25 && missRate < 0.3) {
      stars = '⭐⭐⭐⭐'; title = '好棒呀！舞狮小能手！'
      ipImage = '/images/ip-actions/活力满满.png'
      scoreColor = '#D9A441'; comboColor = '#E31E15'
    } else if (missRate < 0.5) {
      stars = '⭐⭐⭐'; title = '不错哦！再练练就更好了！'
      ipImage = '/images/ip-actions/自信就位.png'
      scoreColor = '#65B96A'; comboColor = '#65B96A'
    } else {
      stars = '⭐⭐'; title = '加油加油！你可以的！'
      ipImage = '/images/ip-actions/眼睛发亮.png'
      scoreColor = '#AAAAAA'; comboColor = '#AAAAAA'
    }

    const score = this.perfectCount * 200 + this.goodCount * 100 + this.earlyCount * 50

    const isUnlock = stars.includes('⭐⭐⭐') || stars.includes('⭐⭐⭐⭐') || stars.includes('⭐⭐⭐⭐⭐')
    const isHighScore = stars.includes('⭐⭐⭐⭐') || stars.includes('⭐⭐⭐⭐⭐')

    this.setData({
      state: 'result', resultStars: stars, resultTitle: title,
      resultIpImage: ipImage,
      perfectCnt: this.perfectCount, goodCnt: this.goodCount,
      maxComboCnt: this.maxCombo, totalScore: score,
      scoreColor: scoreColor, comboColor: comboColor,
      ringShow: false, drumstickLeft: false, drumstickRight: false
    })

    unlock.saveRecord('drum', {
      stars, rating: title, score,
      perfect: this.perfectCount, good: this.goodCount, early: this.earlyCount, miss: this.missCount
    })

    this._unlockTimers = []

    let fireAlsoEarth = false

    if (isUnlock) {
      const fireResult = unlock.unlockLion('fire')
      if (fireResult) {
        const modal = unlock.getUnlockModal('fire')
        this.setData({
          unlockShow: true, unlockIcon: modal.icon, unlockTitle: modal.title, unlockSub: modal.sub
        })
        fireAlsoEarth = fireResult.alsoEarth
        if (fireResult.alsoEarth) {
          const m2 = unlock.getUnlockModal('earth')
          this._unlockTimers.push(setTimeout(() => this.setData({
            unlockShow: true, unlockIcon: m2.icon, unlockTitle: m2.title, unlockSub: m2.sub
          }), 3000))
        }
      }
    }

    if (isHighScore) {
      const woodResult = unlock.unlockLion('wood')
      if (woodResult) {
        // fireAlsoEarth 时等土土狮弹完(3s+3s缓冲)再弹木木狮
        const delay = fireAlsoEarth ? 6500 : (isUnlock ? 3500 : 500)
        this._unlockTimers.push(setTimeout(() => {
          const m2 = unlock.getUnlockModal('wood')
          this.setData({
            unlockShow: true, unlockIcon: m2.icon, unlockTitle: m2.title, unlockSub: m2.sub
          })
          if (woodResult.alsoEarth) {
            const m3 = unlock.getUnlockModal('earth')
            this._unlockTimers.push(setTimeout(() => this.setData({
              unlockShow: true, unlockIcon: m3.icon, unlockTitle: m3.title, unlockSub: m3.sub
            }), 3000))
          }
        }, delay))
      }
    }
  },

  retryGame() {
    this.setData({ state: 'songlist', unlockShow: false })
    this.clearUnlockTimers()
    this.gameState = 'idle'
  },

  dismissUnlock() {
    this.setData({ unlockShow: false })
  },

  clearUnlockTimers() {
    if (this._unlockTimers) {
      this._unlockTimers.forEach(t => clearTimeout(t))
      this._unlockTimers = []
    }
  },

  clearAllTimers() {
    clearInterval(this.countdownTimer)
    this.clearRingTimer()
    clearTimeout(this.drumstickTimer)
    this.clearUnlockTimers()
  }
})
