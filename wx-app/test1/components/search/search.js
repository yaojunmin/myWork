// components/search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    input: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setValue(e){
      this.data.input = e.detail.value
    },
    emitSearch(){
      this.triggerEvent('search', { input: this.data.input }, {})
    }
  }
})
