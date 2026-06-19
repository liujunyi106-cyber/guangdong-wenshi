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

    // ========== 开发模式：每次编译重置教程，但保留战绩/解锁/作品数据 ==========
    // 原理：用一个编译标记 __COMPILE_ID__ 与本地存储的 __last_compile_id__ 比对。
    // 每次编译前手动修改 __COMPILE_ID__（如 +1），启动时检测到不一致
    // 则仅清除教程标记（drumTutorialDone），其余数据原封不动。
    // 不编译时（普通启动）标记一致，跳过重置，保留"已学过教程"状态。
    this._devResetTutorial()
  },

  /* 开发模式：编译重置教程（仅删教程标记，不删战绩/解锁/作品） */
  _devResetTutorial() {
    const COMPILE_ID = 1 // ← 每次编译前手动 +1
    try {
      const lastId = wx.getStorageSync('__last_compile_id__') || 0
      if (COMPILE_ID !== lastId) {
        wx.removeStorageSync('drumTutorialDone')
        wx.setStorageSync('__last_compile_id__', COMPILE_ID)
        console.log('[dev] 检测到新编译，已重置教程标记（战绩/解锁/作品数据保留）')
      }
    } catch (e) {
      // 静默失败：存储异常不影响正常启动
    }
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
