// pages/login/login.js
const { http } = require('../../utils/http')
const { app_id, app_secret } = getApp().globalData

Page({
  data: {

  },
  login(event) {
    let encrypted_data = event.detail.encryptedData
    let iv = event.detail.iv
    this.wxLogin(encrypted_data, iv)
  },
  wxLogin(encrypted_data, iv) {
    wx.login({
      success: res => {
        this.loginMe(res.code, iv, encrypted_data)
      }
    })
  },
  loginMe(code, iv, encrypted_data) {
    http.post('/sign_in/mini_program_user', {
      code,
      iv,
      encrypted_data,
      app_id,
      app_secret
    }).then(res => {
      this.savaMessage(res)
      wx.reLauch({ url: '/pages/home/home' })
    })
  },
  saveMessage(response) {
    wx.setStorageSync('me', response.data.resource)
    wx.setStorageSync('X-token', response.header["X-token"])
  }
})