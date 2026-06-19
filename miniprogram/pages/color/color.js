const app = getApp()

Page({
  data: {
    statusBarHeight: 44,
    state: 'outline',
    mode: 'color',
    selectedIp: null,
    currentIpUrl: '',
    colors: [
      '#E31E15', '#F36F59', '#FF5722', '#E91E63',
      '#F5A623', '#FFC107', '#FF9800', '#FFEB3B',
      '#65B96A', '#4CAF50', '#8BC34A', '#5AB8E8',
      '#2196F3', '#9C27B0', '#000000', '#FFFFFF'
    ],
    colorIdx: 0,
    ipList: [
      { id: 0, name: '火火狮', desc: '烈火雄心', thumb: '/images/ip/火火狮.png', url: '/images/ip/火火狮.png' },
      { id: 1, name: '火火狮·威', desc: '威风凛凛', thumb: '/images/ip/火火师.png', url: '/images/ip/火火师.png' },
      { id: 2, name: '水水狮', desc: '碧波灵动', thumb: '/images/ip/水水狮.png', url: '/images/ip/水水狮.png' },
      { id: 3, name: '金金狮', desc: '璀璨华章', thumb: '/images/ip/金金狮.png', url: '/images/ip/金金狮.png' },
      { id: 4, name: '木木狮', desc: '绿野仙踪', thumb: '/images/ip/木木狮.png', url: '/images/ip/木木狮.png' },
      { id: 5, name: '土土狮', desc: '稳重如山', thumb: '/images/ip/土土狮.png', url: '/images/ip/土土狮.png' }
    ],
    decorations: [
      '/images/deco/祥云/祥云1.png','/images/deco/祥云/祥云2.png','/images/deco/祥云/祥云3.png','/images/deco/祥云/祥云4.png','/images/deco/祥云/祥云5.png',
      '/images/deco/火焰/火焰1.png','/images/deco/火焰/火焰2.png','/images/deco/火焰/火焰3.png','/images/deco/火焰/火焰4.png','/images/deco/火焰/火焰5.png',
      '/images/deco/蝴蝶结/蝴蝶结1.png','/images/deco/蝴蝶结/蝴蝶结2.png','/images/deco/蝴蝶结/蝴蝶结3.png','/images/deco/蝴蝶结/蝴蝶结4.png','/images/deco/蝴蝶结/蝴蝶结5.png',
      '/images/deco/花朵/花朵1.png','/images/deco/花朵/花朵2.png','/images/deco/花朵/花朵3.png','/images/deco/花朵/花朵4.png','/images/deco/花朵/花朵5.png',
      '/images/deco/星星/星星1.png','/images/deco/星星/星星2.png','/images/deco/星星/星星3.png','/images/deco/星星/星星4.png','/images/deco/星星/星星5.png'
    ],
    brushIdx: 4,
    brushSize: 6,
    savedImage: '',
    eraserMode: false,
    decoGhostShow: false,
    decoGhostX: 0,
    decoGhostY: 0,
    selectedDeco: '',
    selectedDecoIdx: -1,
    ipScale: 1,
    ipBaseX: 0,
    ipBaseY: 0,
    ipBaseW: 80,
    ipBaseH: 80,
    eraserThumbTop: 57,
    eraserBarTop: 0,
  },

  onLoad() {
    const winInfo = wx.getWindowInfo()
    const r2p = (r) => r * winInfo.windowWidth / 750
    this.setData({
      statusBarHeight: winInfo.statusBarHeight || 44,
      ipBaseX: r2p(16), ipBaseY: r2p(16), ipBaseW: r2p(160), ipBaseH: r2p(160)
    })
  },

  _replayAll() {
    const ctx = this._ctx
    ctx.clearRect(0, 0, this._W, this._H)
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, this._W, this._H)
    const actions = this._actions
    const cache = this._decoImgCache || {}
    const pending = []
    for (let i = 0; i < actions.length; i++) {
      const a = actions[i]
      if (a.type === 'stroke') {
        const pts = a.points
        if (!pts.length) continue
        ctx.fillStyle = a.color
        ctx.beginPath()
        ctx.arc(pts[0].x, pts[0].y, a.size * 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.strokeStyle = a.color
        ctx.lineWidth = a.size * 2
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.beginPath()
        ctx.moveTo(pts[0].x, pts[0].y)
        for (let j = 1; j < pts.length; j++) {
          ctx.lineTo(pts[j].x, pts[j].y)
        }
        ctx.stroke()
      } else if (a.type === 'deco') {
        const sc = a.scale || 1
        const rt = a.rotation || 0
        if (cache[a.url]) {
          ctx.save()
          ctx.translate(a.x, a.y)
          ctx.rotate(rt)
          ctx.drawImage(cache[a.url], -40 * sc, -40 * sc, 80 * sc, 80 * sc)
          ctx.restore()
        } else {
          pending.push(a)
        }
      }
    }
    // 回退：未缓存的图片异步加载后补绘
    for (let k = 0; k < pending.length; k++) {
      const a = pending[k]
      this._cacheDecoImg(a.url, (img) => {
        if (!img) return
        const sc = a.scale || 1; const rt = a.rotation || 0
        ctx.save(); ctx.translate(a.x, a.y); ctx.rotate(rt)
        ctx.drawImage(img, -40 * sc, -40 * sc, 80 * sc, 80 * sc)
        ctx.restore()
      })
    }
    // 选中框
    const selIdx = this.data.selectedDecoIdx
    if (selIdx >= 0) {
      const sa = this._actions[selIdx]
      if (sa && sa.type === 'deco') {
        const s = sa.scale || 1; const r = sa.rotation || 0
        ctx.save(); ctx.translate(sa.x, sa.y); ctx.rotate(r)
        ctx.strokeStyle = '#E31E15'; ctx.lineWidth = 2
        ctx.setLineDash([5, 4])
        ctx.strokeRect(-40 * s, -40 * s, 80 * s, 80 * s)
        ctx.setLineDash([])
        ctx.restore()
      }
    }
  },

  _preloadAllDecos() {
    const urls = this.data.decorations
    if (!urls || !urls.length) return
    this._decoImgCache = this._decoImgCache || {}
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i]
      if (this._decoImgCache[url]) continue
      const img = this._cv.createImage()
      img.src = url
      img.onload = () => { this._decoImgCache[url] = img }
    }
  },

  _cacheDecoImg(url, cb) {
    if (!this._decoImgCache) this._decoImgCache = {}
    if (this._decoImgCache[url]) return cb(this._decoImgCache[url])
    const img = this._cv.createImage()
    img.src = url
    img.onload = () => { this._decoImgCache[url] = img; cb(img) }
    img.onerror = () => cb(null)
  },

  _initCanvas() {
    const q = this.createSelectorQuery()
    q.select('#colorCanvas')
      .fields({ node: true, size: true })
      .exec((fieldsRes) => {
        const info = fieldsRes && fieldsRes[0]
        if (!info || !info.node) {
          wx.showToast({ title: '画布加载失败', icon: 'none' })
          return
        }
        const cv = info.node
        const ctx = cv.getContext('2d')
        const W = info.width || 300
        const H = info.height || 400
        const dpr = wx.getWindowInfo().pixelRatio
        cv.width = W * dpr
        cv.height = H * dpr
        ctx.scale(dpr, dpr)
        this._cv = cv
        this._ctx = ctx
        this._W = W
        this._H = H
        this._offsetX = null
        this._offsetY = null
        this._actions = []
        this._decoImgCache = {}
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(0, 0, W, H)
        // 预加载全部装饰图片
        this._preloadAllDecos()
        const q2 = this.createSelectorQuery()
        q2.select('#colorCanvas').boundingClientRect().exec((rectRes) => {
          const r = rectRes && rectRes[0]
          if (r) {
            this._offsetX = r.left
            this._offsetY = r.top
          }
        })
        // 兜底：500ms 后无论如何取一次值
        setTimeout(() => {
          if (this._offsetX == null) {
            this.createSelectorQuery().select('#colorCanvas').boundingClientRect().exec((res) => {
              const r = res && res[0]
              if (r) { this._offsetX = r.left; this._offsetY = r.top }
            })
          }
        }, 500)
      })
  },

  onSelectIp(e) {
    this.setData({ selectedIp: e.currentTarget.dataset.index })
  },

  onStartPaint() {
    const ip = this.data.ipList[this.data.selectedIp]
    const winInfo = wx.getWindowInfo()
    const r2p = (r) => r * winInfo.windowWidth / 750
    const barH = 440 * winInfo.windowWidth / 750
    const barTop = Math.round((winInfo.windowHeight - barH) / 2)
    this.setData({
      state: 'coloring', mode: 'color', currentIpUrl: ip.url,
      ipScale: 1,
      ipBaseX: r2p(16), ipBaseY: r2p(16), ipBaseW: r2p(160), ipBaseH: r2p(160),
      eraserBarTop: barTop
    })
    wx.nextTick(() => { setTimeout(() => this._initCanvas(), 500) })
  },

  goBack() {
    if (this.data.state === 'outline') wx.navigateBack()
    else this.setData({ state: 'outline' })
  },

  onBackToOutline() {
    // 保存完成页返回 → 不弹确认，直回
    if (this.data.state === 'done') {
      this.setData({ state: 'outline', selectedIp: null, currentIpUrl: '', selectedDecoIdx: -1, eraserMode: false })
      return
    }
    if (this._actions && this._actions.length > 0) {
      wx.showModal({
        title: '要退出吗？',
        content: '退出后未保存的内容会丢失哦~',
        success: (res) => {
          if (res.confirm) {
            this.setData({ state: 'outline', selectedIp: null, currentIpUrl: '', selectedDecoIdx: -1, eraserMode: false })
          }
        }
      })
      return
    }
    this.setData({ state: 'outline', selectedIp: null, currentIpUrl: '', selectedDecoIdx: -1, eraserMode: false })
  },

  onSwitchMode(e) {
    this._eraserTrack = null
    this.setData({ mode: e.currentTarget.dataset.mode, eraserMode: false, selectedDecoIdx: -1 })
    this._curStroke = null
    this._lastX = null; this._lastY = null
    this._dragDeco = null
    this._pinchBase = null
    this.setData({ decoGhostShow: false })
  },

  onPickColor(e) {
    this.setData({ colorIdx: e.currentTarget.dataset.index, eraserMode: false })
  },

  onBrushChange(e) {
    const sizes = [2, 3, 4, 6, 8, 10, 14, 20]
    const idx = Math.round(e.detail.value)
    this.setData({ brushIdx: idx, brushSize: sizes[idx - 1] || 6 })
  },

  onEraserBarStart(e) {
    const t = e.touches[0]
    const py = t.pageY || t.y
    if (py == null) return
    const q = this.createSelectorQuery()
    q.select('.eraser-track').boundingClientRect().exec((res) => {
      const r = res && res[0]
      if (r) {
        this._eraserTrack = { top: r.top, height: r.height }
        this._updateEraserThumb(py)
      } else {
        // 兜底：用 eraserBarTop + 40rpx(标签高度) 推算
        const wi = wx.getWindowInfo()
        const labelH = 40 * wi.windowWidth / 750
        const trackH = 344 * wi.windowWidth / 750
        this._eraserTrack = { top: this.data.eraserBarTop + labelH, height: trackH }
        this._updateEraserThumb(py)
      }
    })
  },
  onEraserBarMove(e) {
    const t = e.touches[0]
    const py = t.pageY || t.y
    if (py == null || !this._eraserTrack) return
    this._updateEraserThumb(py)
  },
  _updateEraserThumb(pageY) {
    const t = this._eraserTrack
    if (!t) return
    const ratio = 1 - Math.max(0, Math.min(1, (pageY - t.top) / Math.max(t.height, 1)))
    const idx = Math.max(1, Math.min(8, Math.round(ratio * 7 + 1)))
    const sizes = [2, 3, 4, 6, 8, 10, 14, 20]
    this.setData({
      brushIdx: idx,
      brushSize: sizes[idx - 1],
      eraserThumbTop: Math.round((1 - (idx - 1) / 7) * 100)
    })
  },

  // 统一触摸入口
  onTouchCanvas(e) {
    if (this.data.eraserMode) return this._onDraw(e)
    return this.data.mode === 'color' ? this._onDraw(e) : this._onDeco(e)
  },

  // IP参考图手势：拖拽右下角红圈缩放（1x~3x，左上角固定）
  onIpRefTouch(e) {
    const type = e.type
    const t = type === 'touchend' ? (e.changedTouches[0] || e.touches[0]) : (e.touches[0] || e.changedTouches[0])
    if (!t) return
    const px = t.pageX || t.x
    const py = t.pageY || t.y
    if (px == null || py == null) return
    const dist = Math.hypot(px - this.data.ipBaseX, py - this.data.ipBaseY)
    if (type === 'touchstart') {
      this._ipPinchBase = { dist, scale: this.data.ipScale }
      return
    }
    if (type === 'touchmove' && this._ipPinchBase) {
      const base = this._ipPinchBase
      const s = base.scale * (dist / Math.max(base.dist, 50))
      this.setData({ ipScale: Math.round(Math.max(1, Math.min(3, s)) * 100) / 100 })
      return
    }
    if (type === 'touchend') {
      this._ipPinchBase = null
    }
  },

  onToggleEraser() {
    this._eraserTrack = null
    const thumbTop = Math.round((1 - (this.data.brushIdx - 1) / 7) * 100)
    let barTop = this.data.eraserBarTop
    if (!this.data.eraserMode) {
      const wi = wx.getWindowInfo()
      const barH = 440 * wi.windowWidth / 750
      barTop = Math.round((wi.windowHeight - barH) / 2)
    }
    if (this.data.mode === 'deco') {
      this.setData({ selectedDeco: '', decoGhostShow: false, selectedDecoIdx: -1 })
    }
    this.setData({ eraserMode: !this.data.eraserMode, eraserThumbTop: thumbTop, eraserBarTop: barTop })
  },

  _onDraw(e) {
    if (!this._ctx || this._offsetX == null) return
    const type = e.type
    const touch = type === 'touchend' ? (e.changedTouches[0] || e.touches[0]) : (e.touches[0] || e.changedTouches[0])
    if (!touch) return
    const x = (touch.x || touch.pageX || touch.clientX) - (this._offsetX || 0)
    const y = (touch.y || touch.pageY || touch.clientY) - (this._offsetY || 0)
    if (isNaN(x) || isNaN(y)) return
    const ctx = this._ctx
    const color = this.data.eraserMode ? '#FFFFFF' : this.data.colors[this.data.colorIdx]
    const size = this.data.brushSize

    if (type === 'touchstart') {
      this._curStroke = { color, size, points: [{ x, y }] }
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(x, y, size * 2, 0, Math.PI * 2)
      ctx.fill()
      this._lastX = x; this._lastY = y
      return
    }
    if (type === 'touchmove') {
      if (!this._curStroke) return
      ctx.strokeStyle = this._curStroke.color
      ctx.lineWidth = this._curStroke.size * 2
      ctx.lineCap = 'round'; ctx.lineJoin = 'round'
      ctx.beginPath()
      ctx.moveTo(this._lastX || x, this._lastY || y)
      ctx.lineTo(x, y)
      ctx.stroke()
      this._lastX = x; this._lastY = y
      this._curStroke.points.push({ x, y })
      return
    }
    if (type === 'touchend' && this._curStroke) {
      this._actions.push({ type: 'stroke', color: this._curStroke.color, size: this._curStroke.size, points: this._curStroke.points })
      this._curStroke = null
    }
  },

  onPickDeco(e) {
    const url = e.currentTarget.dataset.url
    this.setData({ selectedDeco: url, eraserMode: false, selectedDecoIdx: -1 })
    if (!this._ctx) return
    const cx = (this._W || 300) / 2
    const cy = (this._H || 400) / 2
    this._actions.push({ type: 'deco', url, x: cx, y: cy, scale: 1, rotation: 0 })
    this._replayAll()
  },

  _hitTestDeco(x, y) {
    const actions = this._actions
    for (let i = actions.length - 1; i >= 0; i--) {
      const a = actions[i]
      if (a.type !== 'deco') continue
      const s = a.scale || 1
      if (x >= a.x - 40 * s && x <= a.x + 40 * s && y >= a.y - 40 * s && y <= a.y + 40 * s) return i
    }
    return -1
  },

  _onDeco(e) {
    if (!this._ctx || this._offsetX == null) return

    // 双指手势：已有装饰被选中 → 缩放/旋转
    if (e.touches && e.touches.length >= 2 && this.data.selectedDecoIdx >= 0) {
      return this._onDecoMultiTouch(e)
    }

    const type = e.type
    const touch = type === 'touchend'
      ? (e.changedTouches[0] || e.touches[0])
      : (e.touches[0] || e.changedTouches[0])
    if (!touch) return
    const rx = touch.x || touch.pageX || touch.clientX
    const ry = touch.y || touch.pageY || touch.clientY
    if (rx == null || ry == null) return
    const x = rx - (this._offsetX || 0)
    const y = ry - (this._offsetY || 0)
    if (isNaN(x) || isNaN(y)) return

    if (type === 'touchstart') {
      // 触摸开始：命中检测
      const hitIdx = this._hitTestDeco(x, y)
      if (hitIdx >= 0) {
        // 命中装饰 → 选中 + 开始拖拽
        const a = this._actions[hitIdx]
        this.setData({ selectedDecoIdx: hitIdx, decoGhostShow: true, decoGhostX: rx, decoGhostY: ry })
        this._dragDeco = { idx: hitIdx, url: a.url, scale: a.scale || 1, rotation: a.rotation || 0,
          startX: x, startY: y, origX: a.x, origY: a.y }
        this._replayAll()
        return
      }
      // 未命中 → 取消选中
      this.setData({ selectedDecoIdx: -1 })
      this._replayAll()
      return
    }

    if (type === 'touchmove') {
      if (this._dragDeco) {
        this.setData({ decoGhostX: rx, decoGhostY: ry })
      }
      return
    }

    if (type === 'touchend') {
      this._pinchBase = null
      this.setData({ decoGhostShow: false })
      if (this._dragDeco) {
        const d = this._dragDeco
        const nx = d.origX + (x - d.startX)
        const ny = d.origY + (y - d.startY)
        this._actions[d.idx] = { type: 'deco', url: d.url, x: nx, y: ny, scale: d.scale, rotation: d.rotation }
        this.setData({ selectedDecoIdx: d.idx })
        this._dragDeco = null
        this._replayAll()
      }
    }
  },

  _onDecoMultiTouch(e) {
    const a = this._actions[this.data.selectedDecoIdx]
    if (!a || a.type !== 'deco') return
    const t0 = e.touches[0], t1 = e.touches[1]
    const x0 = (t0.x || t0.pageX || 0) - (this._offsetX || 0)
    const y0 = (t0.y || t0.pageY || 0) - (this._offsetY || 0)
    const x1 = (t1.x || t1.pageX || 0) - (this._offsetX || 0)
    const y1 = (t1.y || t1.pageY || 0) - (this._offsetY || 0)

    const dist = Math.hypot(x1 - x0, y1 - y0)
    const angle = Math.atan2(y1 - y0, x1 - x0)

    if (e.type === 'touchstart') {
      if (e.touches && e.touches.length >= 2) {
        this._dragDeco = null
        this.setData({ decoGhostShow: false })
        this._pinchBase = { dist, angle, scale: a.scale || 1, rotation: a.rotation || 0 }
      }
      return
    }

    if (e.type === 'touchmove' && this._pinchBase) {
      const base = this._pinchBase
      a.scale = Math.max(0.3, Math.min(3, base.scale * (dist / Math.max(base.dist, 1))))
      a.rotation = base.rotation + (angle - base.angle)
      this._replayAll()
      return
    }

    if (e.type === 'touchend' || e.touches.length < 2) {
      this._pinchBase = null
    }
  },

  onUndo() {
    if (!this._ctx || !this._actions.length) return
    this._actions.pop()
    if (this.data.selectedDecoIdx >= this._actions.length) this.setData({ selectedDecoIdx: -1 })
    this._replayAll()
  },

  onSaveColor() {
    if (!this._ctx) {
      wx.showToast({ title: '画布未就绪', icon: 'none' })
      return
    }
    wx.canvasToTempFilePath({
      canvas: this._cv,
      success: (res) => this.setData({ state: 'done', savedImage: res.tempFilePath }),
      fail: () => wx.showToast({ title: '保存失败', icon: 'none' })
    })
  },

  onRedraw() {
    this.setData({ state: 'outline', selectedIp: null, currentIpUrl: '', selectedDecoIdx: -1, eraserMode: false })
  },

  onShareWork() {
    wx.showToast({ title: '分享功能开发中', icon: 'none' })
  }
})

