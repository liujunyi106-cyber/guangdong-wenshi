const app = getApp()

Page({
  data: {
    statusBarHeight: 44,
    categories: ['全部', '小狮公仔', '周边'],
    catIdx: 0,
    products: [
      { id: 1, name: '火火狮公仔', price: '38', desc: '活泼好动的小狮，敲鼓他最在行！', image: '/images/fire-lion.png', cat: '小狮公仔' },
      { id: 2, name: '水水狮公仔', price: '38', desc: '温和又稳重的小狮，最喜欢拍照。', image: '/images/water-lion.png', cat: '小狮公仔' },
      { id: 3, name: '金金狮公仔', price: '42', desc: '闪闪发光的小明星，涂色冠军！', image: '/images/gold-lion.png', cat: '小狮公仔' },
      { id: 4, name: '木木狮公仔', price: '36', desc: '沉稳坚毅的森林伙伴，高分达人。', image: '/images/wood-lion.png', cat: '小狮公仔' },
      { id: 5, name: '土土狮公仔', price: '45', desc: '憨厚可靠的大个子，收集齐才能找到他！', image: '/images/earth-lion.png', cat: '小狮公仔' },
      { id: 6, name: '火火狮钥匙扣', price: '29', desc: '随身携带的火火狮，挂在书包超可爱！', image: '', cat: '周边' },
      { id: 7, name: '五行小狮贴纸包', price: '19', desc: '五只小狮全套贴纸，贴满你的小世界！', image: '', cat: '周边' },
      { id: 8, name: '火火狮徽章', price: '39', desc: '精美的火火狮珐琅徽章，别在衣服上吧！', image: '', cat: '周边' }
    ],
    filteredProducts: []
  },

  onLoad() {
    const wi = wx.getWindowInfo()
    this.setData({ statusBarHeight: wi.statusBarHeight || 44 })
    this.filterProducts()
  },

  /* 分类切换 */
  onSwitchCat(e) {
    this.setData({ catIdx: e.currentTarget.dataset.index })
    this.filterProducts()
  },

  filterProducts() {
    const { products, catIdx, categories } = this.data
    const cat = categories[catIdx]
    let list = products.filter(p => {
      if (cat !== '全部' && p.cat !== cat) return false
      return true
    })
    this.setData({ filteredProducts: list })
  },

  /* 商品点击 */
  onProductTap(e) {
    const id = e.currentTarget.dataset.id
    wx.showToast({ title: '商品详情开发中', icon: 'none' })
  }
})
