App({
  onLaunch() {
    const winInfo = wx.getWindowInfo()
    this.globalData.statusBarHeight = winInfo.statusBarHeight
    this.globalData.screenHeight = winInfo.screenHeight
    this.globalData.screenWidth = winInfo.screenWidth
  },
  globalData: {
    statusBarHeight: 44,
    screenHeight: 812,
    screenWidth: 375
  }
})
