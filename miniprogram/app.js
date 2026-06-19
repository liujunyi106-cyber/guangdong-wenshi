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

    // ========== 开发模式：每次编译清空全部数据，编译后正常游玩可保存，再次编译才丢失 ==========
    // 用途：在不同手机上做测试时，每次部署新版本都从零开始。
    // 原理：用 COMPILE_ID 与本地存储的 __last_compile_id__ 比对。
    // 编译前手动 +1 → 启动检测不一致 → 清空所有本地数据 → 写入新 ID。
    // 编译后正常游玩 → 保存的数据与 __last_compile_id__ 一致 → 不再清空，数据持久保留。
    // 再次编译 +1 → 检测不一致 → 再次清空，模拟首次体验。
    this._devResetTutorial()
  },

  /* 开发模式：编译清空全部本地数据（模拟全新安装），不编译则数据保留 */
  _devResetTutorial() {
    const COMPILE_ID = 1 // ← 每次编译前手动 +1
    try {
      const lastId = wx.getStorageSync('__last_compile_id__') || 0
      if (COMPILE_ID !== lastId) {
        wx.clearStorageSync()                          // 清空全部本地数据
        wx.setStorageSync('__last_compile_id__', COMPILE_ID) // 写入本次编译标记
        console.log('[dev] 检测到新编译，已清空全部数据（模拟首次安装）')
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
