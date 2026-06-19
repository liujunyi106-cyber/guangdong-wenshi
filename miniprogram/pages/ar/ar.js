const app = getApp()

Page({
  data: {
    statusBarHeight: 44,
    state: 'camera',
    stickers: [
      { id: 1, name: '火火狮', emoji: '🔥', unlocked: true, image: '/images/ip-3d-fire.png', unlockHint: '敲鼓通关即可解锁' },
      { id: 2, name: '水水狮', emoji: '💧', unlocked: true, image: '/images/ip-3d-water.png', unlockHint: 'AR拍照使用即可解锁' },
      { id: 3, name: '金金狮', emoji: '✨', unlocked: false, image: '/images/ip-3d-gold.png', unlockHint: '涂色完成1幅作品即可解锁' },
      { id: 4, name: '木木狮', emoji: '🌿', unlocked: false, image: '/images/ip-3d-wood.png', unlockHint: '敲鼓获得S/A评级即可解锁' },
      { id: 5, name: '土土狮', emoji: '🪨', unlocked: false, image: '/images/ip-3d-earth.png', unlockHint: '集齐4只小狮即可解锁' }
    ],
    selectedSticker: null,
    editStickerImage: '',
    editStickerEmoji: '',
    stickerScale: 1,
    stickerRotation: 0,
    stickerX: 0,
    stickerY: 0,
    showLockModal: false,
    lockModalLion: '',
    lockModalHint: ''
  },

  onLoad() {
    const winInfo = wx.getWindowInfo()
    this.setData({ statusBarHeight: winInfo.statusBarHeight || 44 })
  },

  goBack() {
    const s = this.data.state
    if (s === 'sticker') this.setData({ state: 'camera' })
    else if (s === 'edit') this.setData({ state: 'sticker' })
    else wx.navigateBack()
  },

  /* 快门 */
  onShutter() {
    this.setData({ state: 'sticker' })
  },

  /* 相册 */
  onAlbum() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album'],
      success: (res) => {
        this.setData({ state: 'sticker' })
      }
    })
  },

  /* 翻转摄像头 */
  onFlip() {
    wx.showToast({ title: '切换摄像头', icon: 'none', duration: 1000 })
  },

  /* 点击未解锁贴纸 → 弹出提示 */
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

  /* 进入编辑 */
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

  /* 返回贴纸选择 */
  onBackToSticker() {
    this.setData({ state: 'sticker' })
  },

  /* 贴纸手势：单指拖拽 / 双指缩放+旋转 */
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

  /* 保存编辑 */
  onSaveEdit() {
    this.setData({ state: 'done' })
  },

  /* 再做一张 */
  onRetake() {
    this.setData({ state: 'camera', selectedSticker: null })
  },

  /* 分享 */
  onShare() {
    wx.showToast({ title: '分享功能开发中', icon: 'none' })
  }
})
