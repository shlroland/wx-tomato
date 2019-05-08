// pages/me/me.js
const { http } = require('../../utils/http')
Page({
  onShow(){
    this.fetchTomatoes()
    this.fetchTodos()
    this.setData({me: wx.getStorageSync('me')})
  },
  data: {
    tab: "tomato",
    tomatoes:{},
    todos:{},
    me:{}
  },
  changeTab(e){
    let name = e.currentTarget.dataset.name
    this.setData({tab:name})
  },
  fetchTomatoes(){
    http.get('/tomatoes',{is_group:'yes'})
    .then(res=>{
      
      this.setData({tomatoes:res.data.resources})
    })
  },
  fetchTodos(){
    http.get('/todos',{is_group:'yes'})
    .then(res=>{
      console.log(res.data.resources)
      this.setData({todos:res.data.resources})
    })
  }
})