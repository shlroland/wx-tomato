// pages/binding/binding.js
const { http } = require('../../utils/http')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account:"",
    password:"",
  },
  watchAccount(e){
    this.setData({account:e.detail.value})
  },
  watchPassword(e){
    this.setData({password:e.detail.value})
  },
  submit(){
    http.post('/bindings',{
      account: this.data.account, password_digest: this.data.password
    }).then(res=>{
      wx.setStorageSync('me', res.data.resource)
      wx.reLaunch({ url: '/pages/home/home' })
    })
  }
})