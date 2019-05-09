const { http } = require('../../utils/http')
Page({
  updateId: '',
  updatIndex: '',
  data: {
    lists: [],
    visibleConfirm: false,
    visibleUpdateConfirm: false,
    updateContent: "",
    selectTab: '',
  },
  onShow() {
    http.get('/todos?completed=false').then(res => {
      this.setData({ lists: res.data.resources })
    })
    if (!this.data.lists.length) {
      this.setData({ selectTab: '' })
    }
  },
  confirmCreate(event) {
    let content = event.detail
    console.log(content)
    if (content) {
      http.post('/todos', {
        completed: false, description: content
      }).then(res => {
        let todo = [res.data.resource]
        this.data.lists = todo.concat(this.data.lists)
        this.setData({ lists: this.data.lists })
        this.hideConfirm()
      })
    }
  },
  changeText(event) {
    let { content, id, index } = event.currentTarget.dataset
    this.updataId = id
    this.updatIndex = index
    this.setData({ visibleUpdateConfirm: true, updateContent: content })
  },
  confirmUpdate(event) {
    let content = event.detail
    http.put(`/todos/${this.updataId}`, {
      description: content
    }).then(res => {
      let todo = res.data.resource
      this.data.lists[this.updatIndex] = todo
      this.setData({ lists: this.data.lists })
      this.hideConfirm()
    })
  },
  destroyTodo(event) {
    let index = event.currentTarget.dataset.index
    let id = event.currentTarget.dataset.id
    this.setData({selectTab:index})
    setTimeout(()=>{
      http.put(`/todos/${id}`, {
        completed: true
      }).then(res => {
        let todo = res.data.resource
        this.data.lists[index] = todo
        this.setData({ lists: this.data.lists })
        this.setData({selectTab:''})
        wx.showToast({
          title:'确认完成',
          icon:'success',
          duration:1000
        })
      })
    },1000)
  },
  hideConfirm() {
    this.setData({ visibleConfirm: false })
  },
  showConfirm() {
    this.setData({ visibleConfirm: true })
  },
  hideUpdateConfirm() {
    this.setData({ visibleUpdateConfirm: false })
  }
})
