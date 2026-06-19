const app = getApp()

Page({
  data: {
    statusBarHeight: 44,
    avatarUrl: '',
    nickname: '',
    userId: '',
    unlockedCount: 0,
    lions: [
      { id: 1, name: '火火狮', emoji: '🔥', unlocked: true, image: '/images/mine-fire.png' },
      { id: 2, name: '水水狮', emoji: '💧', unlocked: false, image: '/images/mine-water.png' },
      { id: 3, name: '金金狮', emoji: '✨', unlocked: false, image: '/images/mine-gold.png' },
      { id: 4, name: '木木狮', emoji: '🌿', unlocked: false, image: '/images/mine-wood.png' },
      { id: 5, name: '土土狮', emoji: '🪨', unlocked: false, image: '/images/mine-earth.png' }
    ],
    achievements: [
      { id: 1, icon: '🥇', name: '鼓点入门', desc: '首次通关' },
      { id: 2, icon: '📸', name: '首张照片', desc: '第一次拍照' },
      { id: 3, icon: '🎨', name: '小画家', desc: '完成涂色' }
    ],
    works: []
  },

  onLoad() {
    const wi = wx.getWindowInfo()
    this.setData({ statusBarHeight: wi.statusBarHeight || 44 })
    this.loadUserData()
  },

  onShow() {
    this.loadUserData()
  },

  loadUserData() {
    const nickname = wx.getStorageSync('nickname') || ''
    const avatarUrl = wx.getStorageSync('avatarUrl') || ''
    const lions = wx.getStorageSync('lions') || this.data.lions
    const unlockedCount = lions.filter(l => l.unlocked).length
    const userId = wx.getStorageSync('userId') || 'LION000' + Math.floor(Math.random() * 1000)
    this.setData({ nickname, avatarUrl, lions, unlockedCount, userId })
  },

  onTapDrum() {
    wx.showToast({ title: '记录功能开发中', icon: 'none' })
  },

  onTapPhotos() {
    wx.showToast({ title: '照片列表开发中', icon: 'none' })
  },

  onTapOrders() {
    wx.showToast({ title: '订单功能开发中', icon: 'none' })
  }
})
