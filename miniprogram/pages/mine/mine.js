const app = getApp()
const unlock = require('../../utils/unlock')

Page({
  data: {
    statusBarHeight: 44,
    scrollTop: 0,
    avatarUrl: '',
    nickname: '',
    userId: '',
    unlockedCount: 0,
    lions: [],
    achievements: [
      { id: 1, icon: '/images/icon-combo.png', name: '鼓点入门', desc: '首次通关' },
      { id: 2, icon: '/images/icon-camera.png', name: '首张照片', desc: '第一次拍照' },
      { id: 3, icon: '/images/icon-paint.png', name: '小画家', desc: '完成涂色' }
    ],
    works: [],
    title: '',
    menuState: 'main',
    drumRecords: [],
    photoRecords: [],
    artworkRecords: [],
    showDrumDetail: false,
    showPhotoDetail: false
  },

  onLoad() {
    const wi = wx.getWindowInfo()
    this.setData({ statusBarHeight: wi.statusBarHeight || 44 })
    this.loadUserData()
  },

  onShow() {
    this.loadUserData()
    this.setData({ scrollTop: 0.01 }, () => {
      this.setData({ scrollTop: 0 })
    })
  },

  loadUserData() {
    const nickname = wx.getStorageSync('nickname') || ''
    const avatarUrl = wx.getStorageSync('avatarUrl') || ''
    const userId = wx.getStorageSync('userId') || 'LION000' + Math.floor(Math.random() * 1000)

    const lions = unlock.getLions()
    const unlockedCount = unlock.getUnlockedCount()
    const title = unlock.getTitle()

    const records = unlock.getRecords()
    const drumRecords = (records.drum || []).slice(0, 5)
    const photoRecords = (records.photo || []).slice(0, 6)
    const artworkRecords = (records.artwork || []).slice(0, 3)

    this.setData({
      nickname, avatarUrl, userId,
      lions, unlockedCount, title,
      drumRecords, photoRecords, artworkRecords,
      works: artworkRecords
    })
  },

  onTapDrum() {
    this.setData({ showDrumDetail: true, menuState: 'drum' })
  },

  onTapPhotos() {
    this.setData({ showPhotoDetail: true, menuState: 'photo' })
  },

  onTapOrders() {
    wx.showToast({ title: '订单功能开发中', icon: 'none' })
  },

  onBackToMain() {
    this.setData({ menuState: 'main', showDrumDetail: false, showPhotoDetail: false })
  },

  formatTime(ts) {
    const d = new Date(ts)
    const pad = n => String(n).padStart(2, '0')
    return `${pad(d.getMonth() + 1)}/${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
  }
})
