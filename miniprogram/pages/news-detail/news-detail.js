const app = getApp()

const NEWS_DATA = {
  secret: {
    title: '狮头颜色小秘密',
    image: '/images/card-news-secret.png',
    content: '舞狮的狮头颜色可不是随便涂的！\n\n每种颜色都有特别的含义。红色代表关公 — 忠诚勇敢、正直可靠；黑色是张飞 — 勇猛果敢、刚正不阿；黄色是刘备 — 仁厚温和、稳重沉着。\n\n红脸的关公狮最常见，寓意驱邪纳福；黑脸的张飞狮气势最足，用来压阵；黄脸的刘备狮则显得温和亲切，适合在喜庆场合暖场。\n\n下次看到舞狮，认认狮头的颜色，你就知道它在扮演什么角色啦！'
  },
  caiqing: {
    title: '小狮怎么采青',
    image: '/images/card-news-caiqing.jpg',
    content: '「采青」是舞狮表演中最精彩也最考验功夫的环节！\n\n表演者要在高处悬挂生菜（寓意「生财」），狮子要踩着鼓点，做出试探、跳跃、最终一口叼住生菜的连贯动作。整个过程既要敏捷又要稳重 — 踩错了节奏，生菜可就飞走啦！\n\n采青里藏着广东人对生活的美好祝愿：步步高升、年年有余、财源广进。跳一跳，摘下好运带回家！'
  },
  liubei: {
    title: '刘备狮是谁',
    image: '/images/card-news-liubei.jpg',
    content: '刘备狮，也叫「文狮」，是广东醒狮里最有文化气息的一位。\n\n刘备是三国里的仁厚君主，所以刘备狮走的是「文」路 — 动作温文尔雅，不像关公狮那样刚猛，也不像张飞狮那样暴烈。它步伐稳健，摇头晃脑间透着一股书生气。\n\n在醒狮表演中，刘备狮常出现在庙会、开业、婚礼等喜庆场合，用温和稳重的姿态为人们送上祝福。正所谓「温和又稳重的小狮」，说的就是它！'
  }
}

Page({
  data: {
    statusBarHeight: 44,
    statusBarPadding: 7,
    newsData: { title: '', image: '', content: '' }
  },

  onLoad(options) {
    const winInfo = wx.getWindowInfo()
    const id = options.id || 'secret'
    const newsData = NEWS_DATA[id] || NEWS_DATA.secret
    this.setData({
      statusBarHeight: winInfo.statusBarHeight || 44,
      statusBarPadding: (winInfo.statusBarHeight || 44) > 30 ? 14 : 7,
      newsData
    })
  },

  onBack() {
    wx.navigateBack({ delta: 1 })
  }
})
