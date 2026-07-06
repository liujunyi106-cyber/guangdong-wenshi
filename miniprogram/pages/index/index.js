const app = getApp()

Page({
  data: {
    statusBarHeight: 44,
    statusBarPadding: 7
  },

  onLoad() {
    const winInfo = wx.getWindowInfo()
    this.setData({
      statusBarHeight: winInfo.statusBarHeight || 44,
      statusBarPadding: (winInfo.statusBarHeight || 44) > 30 ? 14 : 7
    })
  },

  /* Hero 点击 → 直接进敲鼓 */
  onHeroTap() {
    wx.navigateTo({ url: '/package-drum/drum' })
  },

  /* AR 拍照 */
  onARTap() {
    wx.navigateTo({ url: '/package-ar/ar' })
  },

  /* 涂色装饰 */
  onColorTap() {
    wx.navigateTo({ url: '/package-color/color' })
  },

  /* 舞狮故事卡片点击 */
  onNewsTap(e) {
    const { id } = e.currentTarget.dataset
    if (id) {
      wx.navigateTo({ url: '/package-news/news-detail?id=' + id })
    }
  }
})
