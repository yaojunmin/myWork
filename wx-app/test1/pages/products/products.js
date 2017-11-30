// pages/products/products.js
const app = getApp()
const util = require("../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**产品列表 */
    productList: [],

    /**类目类型 */
    category: [
      {
        type: 0,
        name: '按行业',
        array: [],
        number: '',
      },
      {
        type: 1,
        name: '按区域',
        array: [],
        number: '',
      },
      {
        type: 2,
        name: '按级别',
        array: [],
        number: '',
      }
    ],

    params: {//数据
      pageSize: 10,
      pageNum: 1,
      classIds: '',
      name: '',
      typeId: '',
      rank: ''
    },

    isHideLoadMore: false,
    loadMoreing: false,//默认 未加载
    loadFreshing: false,//默认 未刷新
    scrollTop: '43',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.category[0].array = [{ name: '全部' }, ...app.globalData.category.class]
    this.data.category[1].array = [{ name: '全部' }, ...app.globalData.category.area]
    this.data.category[2].array = [{ name: '全部' }, ...app.globalData.category.level]
    this.setData({
      category: this.data.category
    })
    this.getInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {

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
    console.log("下拉刷新")
    //仅刷新列表
    // wx.showNavigationBarLoading()


    // wx.stopPullDownRefresh()
    // wx.hideNavigationBarLoading()
    // this.getInfo();
  },
  upper(e) {//滚到顶部
    // if (!this.data.loadFreshing) {
    //   this.data.loadFreshing = true;
    //   this.data.params.pageNum = '1';
    //   this.getInfo();
    // }
  },
  press(e) {//松手
    console.log('press')
    if(this.data.top > 43) {return;}
    if (!this.data.loadFreshing) {
      this.data.loadFreshing = true;
      this.data.params.pageNum = '1';
      this.getInfo();
    }
  },
  scroll(e) {//滚动触发
    
    this.data.top = e.detail.scrollTop;
  },
  lower(e) {//滚到底部
    if (!this.data.loadMoreing) {
      this.data.loadMoreing = true;
      this.data.params.pageNum++;
      this.getInfo(true);
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("上拉加载")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindPickerChange(e) {
    let index = e.currentTarget.dataset.index;
    this.data.category[index].number = e.detail.value;
    this.setData({
      category: this.data.category
    })

    if (index == 0) {
      this.data.params.classIds = this.data.category[index].array[e.detail.value].id || '';
    } else if (index == 1) {
      this.data.params.typeId = this.data.category[index].array[e.detail.value].id || '';
    } else if (index == 2) {
      this.data.params.rank = this.data.category[index].array[e.detail.value].rank || '';
    }
    this.getInfo();
  },
  productInfo(e) {//作品详情页
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/products/info/info?id=' + id
    })
  },
  search(e) {//搜索
    this.data.params.name = e.detail.input;
    this.getInfo();
  },
  openCategory(e) {//定向到类目页面
    let type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '/pages/category/category?type=' + type
    })
  },
  /**
   * 获取信息
   */
  getInfo(isMore) {
    wx.showLoading("数据加载中")
    let that = this;
    wx.request({
      url: "http://m.dianjiangla.com/api/app/product/list",
      data: this.data.params,
      success(e) {
        setTimeout(function () { wx.hideToast() }, 0);
        if (isMore) {
          that.data.loadMoreing = false;
          let cache = {}
          that.data.productList.push(...e.data.data.list);
          if (e.data.data.list.length < that.data.params.pageSize) {
            cache.isHideLoadMore = true
            that.data.loadMoreing = true;
          }
          cache.productList = that.data.productList
          that.setData(cache);

          return;
        }
        that.data.loadFreshing = false;
        that.data.loadMoreing = false;
        that.setData({
          productList: e.data.data.list,
          isHideLoadMore: false,
          scrollTop: '43',
        })
      }
    })
    // util.api.get(
    //   "http://m.dianjiangla.com/api/app/product/list",
    //   this.data.params,
    //   (e) => {
    //     this.setData({
    //       productList: e.data.list
    //     })
    //   }
    // )
  }
})