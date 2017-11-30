// pages/products/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: '',
    show: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;

    wx.showLoading({
      title: '数据加载中',
    });
    this.getInfo(id);
  },
  getInfo(id) {//获取信息
    var that = this;
    wx.request({
      url: 'http://m.dianjiangla.com/api/app/product/get',
      data: {
        id: id
      },
      success(e) {
        e.data.data.details = that.GET_SRC_BY_IMG(e.data.data.details)[0];
        that.setData({
          info: e.data.data
        })
      }
    })
  },
  imgLoadComplete(e){//图片加载完成
    wx.hideToast()
    this.setData({
      show: false
    })
  },
  GET_SRC_BY_IMG(imageStr) {
    try {
      let reg_img = /src=['"]([^'"]*)[\'"]/gi;
      let imgArr = [];
      let a = "";
      while ((a = reg_img.exec(imageStr)) != null) {
        let str = a[1];
        let star = str.lastIndexOf("!")
        let end = str.length
        imgArr.push(str.replace(str.slice(star, end), ''));
      }
      return imgArr;
    } catch (e) {
      return [];
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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