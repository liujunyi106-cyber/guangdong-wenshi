App({
  onLaunch() {
    const winInfo = wx.getWindowInfo()
    this.globalData.statusBarHeight = winInfo.statusBarHeight
    this.globalData.screenHeight = winInfo.screenHeight
    this.globalData.screenWidth = winInfo.screenWidth
    this.globalData.isOnline = true

    wx.onNetworkStatusChange((res) => {
      this.globalData.isOnline = res.isConnected
      if (!res.isConnected) {
        wx.showToast({ title: '网络已断开', icon: 'none', duration: 2000 })
      }
    })
  },
  globalData: {
    statusBarHeight: 44,
    screenHeight: 812,
    screenWidth: 375,
    isOnline: true,
    utils: null
  },
  onReady() {
    // 延迟加载 utils/error.js，确保 wx 全局可用
    const error = require('./utils/error.js')
    this.globalData.utils = error
  }
})
