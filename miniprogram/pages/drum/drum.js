const app = getApp()

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
    // result
    resultIpImage: '',
    resultStars: '',
    resultTitle: '',
    resultDetail: '',
    // toast
    toastShow: false,
    toastMsg: ''
  },

  /* ===== 内部状态 ===== */
  gameState: 'idle',
  totalBeats: 16,
  currentBeat: 0,
  perfectCount: 0,
  goodCount: 0,
  missCount: 0,
  comboCount: 0,
  maxCombo: 0,
  beatPlaying: false,
  currentBeatType: '',
  countdownTimer: null,
  autoBeatTimer: null,

  onLoad(options) {
    const winInfo = wx.getWindowInfo()
    this.setData({ statusBarHeight: winInfo.statusBarHeight || 44 })
  },

  /* ===== 导航 ===== */
  goHome() {
    this.clearAllTimers()
    this.gameState = 'idle'
    wx.navigateBack()
  },

  /* ===== 曲目选择 ===== */
  onSelectSong(e) {
    const id = e.currentTarget.dataset.id
    this.startCountdown()
  },

  /* ===== 倒计时 ===== */
  startCountdown() {
    this.gameState = 'countdown'
    let count = 3
    this.setData({ state: 'countdown', cdText: String(count), cdPulse: true })

    this.countdownTimer = setInterval(() => {
      count--
      if (count > 0) {
        this.setData({ cdText: String(count), cdPulse: !this.data.cdPulse })
      } else if (count === 0) {
        this.setData({ cdText: '开始！', cdPulse: true })
        this.setData({ 'cdTextStyle': 'font-size: 96rpx;' })
      } else {
        clearInterval(this.countdownTimer)
        this.beginPlaying()
      }
    }, 600)
  },

  /* ===== 开始游戏 ===== */
  beginPlaying() {
    this.gameState = 'playing'
    this.currentBeat = 0
    this.perfectCount = 0
    this.goodCount = 0
    this.missCount = 0
    this.comboCount = 0
    this.maxCombo = 0
    this.beatPlaying = false

    this.setData({
      state: 'playing',
      progress: 0,
      currentIpImg: '/images/ip-actions/活力满满.png',
      hzState: { left: false, right: false, center: false, rimLeft: false, rimRight: false },
      beatHintShow: false,
      judgeShow: false
    })

    this.scheduleNextBeat()
  },

  scheduleNextBeat() {
    if (this.gameState !== 'playing') return
    if (this.currentBeat >= this.totalBeats) {
      this.endGame()
      return
    }

    // 根据当前连击切换 IP 动作图
    if (this.comboCount >= 5) {
      this.setData({ currentIpImg: '/images/ip-actions/威风凛凛.png' })
    } else if (this.comboCount >= 2) {
      this.setData({ currentIpImg: '/images/ip-actions/自信就位.png' })
    } else {
      this.setData({ currentIpImg: '/images/ip-actions/活力满满.png' })
    }

    this.currentBeatType = BEAT_SEQUENCE[this.currentBeat] || 'center-left'
    this.currentBeat++
    this.beatPlaying = true

    this.clearHitZones()
    this.showHitZone(this.currentBeatType)
    this.showStickStrike(this.currentBeatType)

    const hint = HINTS[this.currentBeatType] || ''
    this.setData({ beatHint: hint, beatHintShow: true })

    const pct = Math.min(100, Math.round((this.currentBeat / this.totalBeats) * 100))
    this.setData({ progress: pct })

    this.autoBeatTimer = setTimeout(() => {
      if (this.beatPlaying && this.gameState === 'playing') {
        this.beatPlaying = false
        this.missCount++
        this.comboCount = 0
        this.setData({ currentIpImg: '/images/ip-actions/眼睛发亮.png' })
        this.showJudge('miss', '😅 漏掉啦')
        this.clearHitZones()
        this.setData({ beatHintShow: false, drumstickLeft: false, drumstickRight: false })
        this.scheduleNextBeat()
      }
    }, 2500)
  },

  /* 命中区显示 */
  clearHitZones() {
    this.setData({
      hzState: { left: false, right: false, center: false, rimLeft: false, rimRight: false }
    })
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

  /* 鼓棒击打指示 */
  showStickStrike(type) {
    const isRim = type.includes('rim')
    const stickType = isRim ? 'rim' : 'center'
    let left = false, right = false
    if (type === 'center-left' || type === 'rim-left') left = true
    else if (type === 'center-right' || type === 'rim-right') right = true
    else if (type === 'center-both' || type === 'rim-both') { left = true; right = true }
    this.setData({ drumstickLeft: left, drumstickRight: right, drumstickType: stickType })
    setTimeout(() => {
      this.setData({ drumstickLeft: false, drumstickRight: false })
    }, 450)
  },

  /* 点击鼓面 -- 带区域校验 */
  hitDrum(e) {
    if (this.gameState !== 'playing' || !this.beatPlaying) return

    clearTimeout(this.autoBeatTimer)
    this.beatPlaying = false
    this.clearHitZones()
    this.setData({ beatHintShow: false, drumstickLeft: false, drumstickRight: false })

    // 命中区域检测
    const touch = (e && e.detail) ? { x: e.detail.x, y: e.detail.y } : null
    const isMatch = touch ? this._zoneMatch(touch) : true // 无坐标时放宽为全命中

    if (!isMatch) {
      this.missCount++
      this.comboCount = 0
      this.setData({ currentIpImg: '/images/ip-actions/眼睛发亮.png' })
      this.showJudge('miss', '😅 漏掉啦')
      setTimeout(() => {
        if (this.gameState === 'playing') this.scheduleNextBeat()
      }, 1000)
      return
    }

    const roll = Math.random()
    let judge, symbol
    if (roll < 0.4) {
      judge = 'perfect'; symbol = '✨ 超棒!'
      this.perfectCount++
    } else {
      judge = 'good'; symbol = '👍 不错!'
      this.goodCount++
    }
    this.comboCount++
    if (this.comboCount >= 5) {
      this.setData({ currentIpImg: '/images/ip-actions/威风凛凛.png' })
    } else if (this.comboCount >= 2) {
      this.setData({ currentIpImg: '/images/ip-actions/自信就位.png' })
    } else {
      this.setData({ currentIpImg: '/images/ip-actions/活力满满.png' })
    }
    if (this.comboCount > this.maxCombo) this.maxCombo = this.comboCount

    this.showJudge(judge, symbol)

    setTimeout(() => {
      if (this.gameState === 'playing') this.scheduleNextBeat()
    }, 1000)
  },

  /* 区域匹配：判断点击位置是否对应当前节拍类型 */
  _zoneMatch(touch) {
    const type = this.currentBeatType
    const x = touch.x, y = touch.y
    if (x == null || y == null) return true

    // 鼓面 680rpx 换算为实际 px
    const winWidth = wx.getWindowInfo().windowWidth
    const containerW = 680 * winWidth / 750
    const cx = containerW / 2
    const cy = containerW / 2
    const distFromCenter = Math.hypot(x - cx, y - cy)
    const isCenter = distFromCenter < containerW * 0.18
    const isLeft = x < cx; const isRight = x >= cx

    if (type === 'center-left')   return isCenter && isLeft
    if (type === 'center-right')  return isCenter && isRight
    if (type === 'center-both')   return isCenter
    if (type === 'rim-left')      return !isCenter && isLeft
    if (type === 'rim-right')     return !isCenter && isRight
    if (type === 'rim-both')      return !isCenter
    return true
  },

  showJudge(type, text) {
    this.setData({ judgeType: type, judgeText: text, judgeShow: true })
    setTimeout(() => {
      this.setData({ judgeShow: false })
    }, 800)
  },

  /* ===== 暂停 ===== */
  pauseGame() {
    if (this.gameState === 'playing') {
      wx.showModal({
        title: '退出当前挑战？',
        success: (res) => {
          if (res.confirm) {
            this.clearAllTimers()
            this.gameState = 'idle'
            wx.navigateBack()
          }
        }
      })
    }
  },

  /* ===== 结算 ===== */
  endGame() {
    this.gameState = 'result'
    clearTimeout(this.autoBeatTimer)

    const totalTaps = this.perfectCount + this.goodCount
    const total = totalTaps + this.missCount
    const perfectRate = total > 0 ? this.perfectCount / total : 0
    const missRate = total > 0 ? this.missCount / total : 0

    let stars, title, ipImage
    if (perfectRate >= 0.6 && missRate < 0.1) {
      stars = '⭐⭐⭐⭐⭐'; title = '太厉害了！舞狮大师！'
      ipImage = '/images/ip-actions/威风凛凛.png'
    } else if (perfectRate >= 0.35 && missRate < 0.2) {
      stars = '⭐⭐⭐⭐'; title = '好棒呀！舞狮小能手！'
      ipImage = '/images/ip-actions/活力满满.png'
    } else if (missRate < 0.4) {
      stars = '⭐⭐⭐'; title = '不错哦！再练练就更好了！'
      ipImage = '/images/ip-actions/自信就位.png'
    } else {
      stars = '⭐⭐'; title = '加油加油！你可以的！'
      ipImage = '/images/ip-actions/眼睛发亮.png'
    }

    const detail = '✨ 超棒 ' + this.perfectCount + ' 次  👍 不错 ' + this.goodCount +
      ' 次  💪 漏掉 ' + this.missCount + ' 次\n最长连击 ' + this.maxCombo +
      ' 次  得分 ' + (this.perfectCount * 2000 + this.goodCount * 1000) + ' 分'

    const isUnlock = stars.includes('⭐⭐⭐') || stars.includes('⭐⭐⭐⭐') || stars.includes('⭐⭐⭐⭐⭐')

    this.setData({
      state: 'result',
      resultStars: stars,
      resultTitle: title,
      resultDetail: detail,
      resultIpImage: ipImage
    })

    if (isUnlock) {
      setTimeout(() => {
        this.setData({ toastShow: true, toastMsg: '🎉 恭喜通关！火火狮解锁条件达成' })
        setTimeout(() => this.setData({ toastShow: false }), 2000)
      }, 500)
    }
  },

  retryGame() {
    this.setData({ state: 'songlist' })
    this.gameState = 'idle'
  },

  clearAllTimers() {
    clearInterval(this.countdownTimer)
    clearTimeout(this.autoBeatTimer)
  }
})
