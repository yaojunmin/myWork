// components/classList/classList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    classList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getName(e){//获取name值
    let selectObj = e.currentTarget.dataset.selectObj;
      this.triggerEvent('selected', { selectObj: selectObj }, {})
    }
  }
})
