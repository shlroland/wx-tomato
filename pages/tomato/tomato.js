// pages/tomato/tomato.js
const { http } = require('../../utils/http')
Page({
  timer: null,
  /**
   * 页面的初始数据
   */
  data: {
    defaultSecond: 5,
    time: "",
    timerStatus: 'stop',
    confirmVisible: false,
    againButtonVisible: false,
    finishConfirmVisible: false,
    tomato: {}
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.startTimer()
    http.post('/tomatoes').then(res => {
      this.setData({ tomato: res.data.resource })
    })
  },
  startTimer() {
    this.setData({ timerStatus: 'start' })
    this.initTime()
    this.timer = setInterval(() => {
      this.data.defaultSecond = this.data.defaultSecond - 1
      this.initTime()
      if (this.data.defaultSecond <= 0) {
        this.setData({ againButtonVisible: true })
        this.setData({ finishConfirmVisible: true })
        return this.clearTimer()
      }
    }, 1000)
  },
  initTime() {
    let m = Math.floor(this.data.defaultSecond / 60)
    let s = Math.floor(this.data.defaultSecond % 60)
    if (s === 0) {
      s = '00'
    }
    if ((s + '').length === 1) {
      s = "0" + s
    }
    if ((m + '').length === 1) {
      m = '0' + m
    }
    this.setData({ time: `${m}:${s}` })
  },
  clearTimer() {
    clearInterval(this.timer)
    this.timer = null
    this.setData({ timerStatus: 'stop' })
  },
  againTimer() {
    this.data.defaultSecond = 1500
    this.setData({ againButtonVisible: false })
    this.setData({ finishConfirmVisible: false })
    this.startTimer()
  },
  confirmFinish(e) {
    this.clearTimer()
    let content = e.detail
    this.setData({ finishConfirmVisible: false })
    if (content) {
      http.put(`/tomatoes/${this.data.tomato.id}`, {
        description: content, aborted: false
      })
    } else {
      http.put(`/tomatoes/${this.data.tomato.id}`, {
        description: content, aborted: true
      }).then(res => {
        wx.reLaunch({ url : '/pages/home/home'})
      })
    }
  },
  confirmCancel(e) {
    this.setData({ finishConfirmVisible: false })
    let content = e.detail
    http.put(`/tomatoes/${this.toamto.id}`, {
      description: content,
      aborted: true
    })
  },
  confirmAbandon(event) {
    let content = event.detail
    http.put(`/tomatoes/${this.data.tomato.id}`, {
      description: content, aborted: true
    }).then(res => {
      wx.reLaunch({ url : '/pages/home/home'})
    })
  },
  hideAbandon() {
    this.setData({ confirmVisible: false })
    this.startTimer()
  },
  showConfirm() {
    this.setData({ confirmVisible: true })
    this.clearTimer()
  },
  hideConfirm() {
    this.setData({ confirmVisible: false })
    this.startTimer()
  },
  onHide() {
    this.clearTimer()
    http.put(`/tomatoes/${this.tomato.id}`, {
      description: "退出放弃",
      aborted: true
    })
  },
  onUnload(){
    this.clearTimer()
    http.put(`/tomatoes/${this.tomato.id}`, {
      description: "退出放弃",
      aborted: true
    })
  }
})