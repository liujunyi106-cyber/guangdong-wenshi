const app = getApp()

function isOnline() {
  if (app && app.globalData) {
    return app.globalData.isOnline !== false
  }
  return true
}

function showTimeoutRetry(onRetry, onHome) {
  wx.showModal({
    title: '加载太久了',
    content: '检查一下网络吧？',
    confirmText: '重试',
    cancelText: '返回首页',
    success(res) {
      if (res.confirm && onRetry) onRetry()
      else if (!res.confirm && onHome) onHome()
    }
  })
}

function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('timeout')), ms)
  )
  return Promise.race([promise, timeout])
}

module.exports = {
  isOnline,
  showTimeoutRetry,
  withTimeout
}
