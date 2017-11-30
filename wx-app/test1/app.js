//app.js
const CONSTANTS = require('/utils/constants.js')
App({
  onLaunch: function () {//小程序启动后触发
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    //存储数据
    this.setStoreData();
    console.log("初始化")
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow() {
    console.log("显示")
  },
  onHide() {
    console.log("隐藏")
  },
  globalData: {
    userInfo: null,
    category: {}
  },
  setStoreData() {
    let that = this;
    wx.request({
      url: 'http://m.dianjiangla.com/api/class/child?pid=4',
      success(e) {
        that.globalData.category.class = e.data.data;
      }
    })
    wx.request({
      url: 'http://m.dianjiangla.com/api/type/list',
      success(e) {
        that.globalData.category.area = e.data.data;
      }
    })
    that.globalData.category.sex = CONSTANTS.category.sex;
    that.globalData.category.level = CONSTANTS.category.level;
  }
})