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
    me:{},
    tabIndex:0
  },
  currentChange(e) {
    let current = e.detail.current
    console.log(current)
    this.setData({ tabIndex: current })
  },
  changeTomato(e){
    // let current = parseFloat(e.currentTarget.dataset.current)
    // if(this.data.tabIndex == current){
    //   return false
    // }else{
      this.setData({tabIndex:0})
    // }
  },
  changeTask(e) {
    // let current = parseFloat(e.currentTarget.dataset.current)
    // if (this.data.tabIndex == current) {
    //   return false
    // } else {
      this.setData({tabIndex:1})
    // }
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
      this.setData({todos:res.data.resources})
    })
  },
})