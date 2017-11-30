// pages/category/category.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classList: [],
    type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = options.type;
    this.data.type = type;
    switch (type) {
      case '0'://行业
        this.getClass();
        break;
      case '1'://区域
        this.getArea();
        break;
      case '2'://级别
        this.getLevel();
        break;
      case '3'://性别
        this.getSex();
        break;
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let type = this.data.type;
    let title = ""
    switch (type) {
      case '0'://行业
        title = "行业";
        break;
      case '1'://区域
        title = "区域";
        break;
      case '2'://级别
        title = "级别";
        break;
      case '3'://性别
        title = "性别";
        break;
    }
    wx.setNavigationBarTitle({
      title: title
    })
  },
  getSex(){
    this.setData({
      classList: app.globalData.list.sex
    })
  },
  getLevel() {//级别
    this.setData({
      classList: app.globalData.category.level
    })
  },
  getArea() {//区域
    this.setData({
      classList: app.globalData.category.area
    })
  },
  getClass() {//行业
    this.setData({
      classList: app.globalData.category.class
    })
  },
  getElect(e) {//选中项
    let obj = e.detail.selectObj;
    let name = obj.name || '',
      id = obj.id || '',
      rank = obj.rank || '',
      gender = obj.gender || '',
      type = this.data.type || '';
    wx.reLaunch({
      url: '/pages/products/products?type=' + type + '&name=' + name + "&id=" + id + "&rank=" + rank + "&gender=" + gender,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})