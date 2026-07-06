const app = getApp()
const unlock = require('../utils/unlock')

const STICKER_HINTS = {
  fire: '敲鼓通关即可解锁',
  water: 'AR拍照使用即可解锁',
  gold: '涂色完成1幅作品即可解锁',
  wood: '敲鼓获得S/A评级即可解锁',
  earth: '集齐4只小狮即可解锁'
}

const STICKER_IMAGES = [
  '/images/ip-3d-fire.png',
  '/images/ip-3d-water.png',
  '/images/ip-3d-gold.png',
  '/images/ip-3d-wood.png',
  '/images/ip-3d-earth.png'
]

Page({
  data: {
    statusBarHeight: 44,
    state: 'camera',
    stickers: [],
    selectedSticker: null,
    editStickerImage: '',
    editStickerEmoji: '',
    stickerScale: 1,
    stickerRotation: 0,
    stickerX: 0,
    stickerY: 0,
    showLockModal: false,
    lockModalLion: '',
    lockModalHint: '',
    unlockShow: false,
    unlockIcon: '',
    unlockTitle: '',
    unlockSub: ''
  },

  onLoad() {
    const winInfo = wx.getWindowInfo()
    this.setData({ statusBarHeight: winInfo.statusBarHeight || 44 })
    this.loadStickers()
  },

  onShow() {
    this.loadStickers()
  },

  loadStickers() {
    const lions = unlock.getLions()
    const stickers = lions.map((l, i) => ({
      id: i + 1,
      name: l.name,
      emoji: l.emoji,
      unlocked: l.unlocked,
      image: STICKER_IMAGES[i] || '',
      unlockHint: STICKER_HINTS[l.id] || '完成更多玩法即可解锁'
    }))
    this.setData({ stickers })
  },

  goBack() {
    this._clearUnlockTimers()
    const s = this.data.state
    if (s === 'sticker') this.setData({ state: 'camera' })
    else if (s === 'edit') this.setData({ state: 'sticker' })
    else wx.navigateBack()
  },

  onShutter() {
    this.setData({ state: 'sticker' })
  },

  onAlbum() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album'],
      success: () => this.setData({ state: 'sticker' })
    })
  },

  onFlip() {
    wx.showToast({ title: '切换摄像头', icon: 'none', duration: 1000 })
  },

  onTapLocked(e) {
    const id = e.currentTarget.dataset.id
    const sticker = this.data.stickers.find(s => s.id === id)
    if (!sticker) return
    this.setData({
      showLockModal: true,
      lockModalLion: sticker.name,
      lockModalHint: sticker.unlockHint || '完成更多玩法即可解锁'
    })
  },

  hideLockModal() {
    this.setData({ showLockModal: false })
  },

  onSelectSticker(e) {
    const id = e.currentTarget.dataset.id
    const sticker = this.data.stickers.find(s => s.id === id)
    if (!sticker || !sticker.unlocked) return
    this.setData({
      selectedSticker: id,
      editStickerImage: sticker.image || '',
      editStickerEmoji: sticker.image ? '' : sticker.emoji
    })
  },

  onNextEdit() {
    if (!this.data.selectedSticker) return
    this.setData({
      state: 'edit',
      stickerScale: 2.5,
      stickerRotation: 0,
      stickerX: 0,
      stickerY: 0
    })
  },

  onBackToSticker() {
    this.setData({ state: 'sticker' })
  },

  onStickerTouchStart(e) {
    const touches = e.touches
    if (touches.length === 2) {
      const dx = touches[1].pageX - touches[0].pageX
      const dy = touches[1].pageY - touches[0].pageY
      this._pinchStartDist = Math.sqrt(dx * dx + dy * dy)
      this._pinchStartAngle = Math.atan2(dy, dx) * 180 / Math.PI
      this._pinchStartScale = this.data.stickerScale
      this._pinchStartRotation = this.data.stickerRotation
      return
    }
    this._touchStartX = touches[0].pageX
    this._touchStartY = touches[0].pageY
    this._stickerStartX = this.data.stickerX
    this._stickerStartY = this.data.stickerY
    this._isPinching = false
  },

  onStickerTouchMove(e) {
    const touches = e.touches
    if (touches.length === 2) {
      this._isPinching = true
      const dx = touches[1].pageX - touches[0].pageX
      const dy = touches[1].pageY - touches[0].pageY
      const dist = Math.sqrt(dx * dx + dy * dy)
      const angle = Math.atan2(dy, dx) * 180 / Math.PI
      const scale = this._pinchStartScale * (dist / this._pinchStartDist)
      const rotation = this._pinchStartRotation + (angle - this._pinchStartAngle)
      this.setData({ stickerScale: scale, stickerRotation: rotation })
      return
    }
    if (this._isPinching) return
    const dx = touches[0].pageX - this._touchStartX
    const dy = touches[0].pageY - this._touchStartY
    this.setData({
      stickerX: this._stickerStartX + dx,
      stickerY: this._stickerStartY + dy
    })
  },

  onStickerTouchEnd() {
    this._isPinching = false
  },

  onSaveEdit() {
    const sticker = this.data.stickers.find(s => s.id === this.data.selectedSticker)
    this.setData({ state: 'done' })

    unlock.saveRecord('photo', {
      stickerName: sticker ? sticker.name : ''
    })

    this._clearUnlockTimers()
    this._unlockTimers = []

    const result = unlock.unlockLion('water')
    if (result) {
      const modal = unlock.getUnlockModal('water')
      this.setData({
        unlockShow: true, unlockIcon: modal.icon, unlockTitle: modal.title, unlockSub: modal.sub
      })
      if (result.alsoEarth) {
        this._unlockTimers.push(setTimeout(() => {
          const m2 = unlock.getUnlockModal('earth')
          this.setData({
            unlockShow: true, unlockIcon: m2.icon, unlockTitle: m2.title, unlockSub: m2.sub
          })
        }, 3000))
      }
    }
  },

  dismissUnlock() {
    this.setData({ unlockShow: false })
  },

  onRetake() {
    this._clearUnlockTimers()
    this.setData({ state: 'camera', selectedSticker: null })
  },

  _clearUnlockTimers() {
    if (this._unlockTimers) {
      this._unlockTimers.forEach(t => clearTimeout(t))
      this._unlockTimers = []
    }
  },

  onShare() {
    wx.showToast({ title: '分享功能开发中', icon: 'none' })
  }
})
