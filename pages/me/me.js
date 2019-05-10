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
    tabIndex:'0'
  },
  changeTab(e){
    let name = e.currentTarget.dataset.name
    if(name === 'tomato'){
      this.data.tabIndex = '0'
    }else if(name === 'task'){
      this.data.tabIndex = '1'
    }
    this.setData({tab:name})
    this.setData({tabIndex : this.data.tabIndex })
  },
  currentChange(e){
    this.setData({tabIndex : e.detail.current })
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
      console.log(res)
      this.setData({todos:res.data.resources})
    })
  },
})