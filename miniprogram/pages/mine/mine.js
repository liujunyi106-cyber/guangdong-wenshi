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
      { id: 1, icon: '/images/icon-combo.png', name: '鼓点入门', desc: '首次通关' },
      { id: 2, icon: '/images/icon-camera.png', name: '首张照片', desc: '第一次拍照' },
      { id: 3, icon: '/images/icon-paint.png', name: '小画家', desc: '完成涂色' }
    ],
    scrollTop: 0,
    works: []
  },

  onLoad() {
    const wi = wx.getWindowInfo()
    this.setData({ statusBarHeight: wi.statusBarHeight || 44 })
    this.loadUserData()
  },

  onShow() {
    this.loadUserData()
    // 重置滚动位置到顶部（toggle 触发 scroll-view 响应）
    this.setData({ scrollTop: 0.01 }, () => {
      this.setData({ scrollTop: 0 })
    })
  },

  loadUserData() {
    const nickname = wx.getStorageSync('nickname') || ''
    const avatarUrl = wx.getStorageSync('avatarUrl') || ''
    const storedLions = wx.getStorageSync('lions')
    const lions = storedLions && storedLions.length ? storedLions : this.data.lions
    // 确保所有小狮使用3D IP形象图
    const imageMap = ['/images/mine-fire.png', '/images/mine-water.png', '/images/mine-gold.png', '/images/mine-wood.png', '/images/mine-earth.png']
    const mergedLions = lions.map((l, i) => ({ ...l, image: l.image || imageMap[i] }))
    const unlockedCount = mergedLions.filter(l => l.unlocked).length
    const userId = wx.getStorageSync('userId') || 'LION000' + Math.floor(Math.random() * 1000)
    this.setData({ nickname, avatarUrl, lions: mergedLions, unlockedCount, userId })
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
