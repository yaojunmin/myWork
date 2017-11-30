//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    /**轮播数据 */
    imgUrls: [
      'http://3.img.dianjiangla.com/uploads/1d6a35a4a970560b71127986c78b1653391418.jpg',
      'http://3.img.dianjiangla.com/uploads/a3b1049aa3bc00c35228071a108a723a506219.jpg',
      'http://3.img.dianjiangla.com/uploads/58263799205c1262e129c77dd9e04280494424.jpg'
    ],
    indicatorDots: true,      //是否显示面板指示点
    indicatorActiveColor: "#f54203", //当前选中的指示点颜色
    autoplay: true,           //是否自动切换
    interval: 3000,           //自动切换时间间隔
    duration: 1000,           //滑动动画时长
    circular: true,           //是否采用衔接滑动
    moduleRoasting: false,

    /**设计师数据 */
    designer: [],
    moduleDesigner: false,

    /**平台规则 */
    rules: [
      {
        imgUrl: 'http://2.img.dianjiangla.com/assets/app/design.png',
        title: '专业设计',
        path: '/pages/index/index'
      },
      {
        imgUrl: 'http://2.img.dianjiangla.com/assets/app/matching.png',
        title: '极速匹配',
        path: '/pages/index/index'
      },
      {
        imgUrl: 'http://2.img.dianjiangla.com/assets/app/tryout.png',
        title: '三天试用',
        path: '/pages/index/index'
      },
      {
        imgUrl: 'http://2.img.dianjiangla.com/assets/app/guarantee.png',
        title: '平台担保',
        path: '/pages/index/index'
      }
    ],
    moduleRules: false,

    /**登录/注册 */
    imgCode: 'http://www.dianjiangla.com/api/auth/verifycode?time=' + new Date().getTime(),
    user: [
      {
        name: '店铺名称',
        formName: 'store',
        placeholder: '填写您的店铺名称',
        type: 'text',
        validation: ''
      },
      {
        name: '薪资预算',
        formName: 'salary',
        placeholder: '填写您的预算',
        type: 'number',
        validation: ''
      },
      {
        name: '联系方式',
        formName: 'phone',
        placeholder: '手机号码/QQ/微信/信息安全仅工作人员可见',
        type: 'text',
        validation: ''
      },
      {
        name: '验证码',
        formName: 'code',
        placeholder: '输入图片验证码',
        type: 'code',
        validation: ''
      }
    ],
    moduleUser: false,

    custom: {
      a: {
        b: '点我'
      }
    }
  },
  onLoad() {
    //一个页面只会调用一次，可以在 onLoad 中获取打开当前页面所调用的 query 参数。
    console.log("页面加载")
    this.getInfo()
    // wx.redirectTo({
    //   url: '/pages/category/category'
    // })
    console.log(app.globalData)
  },
  onReady() {
    console.log("页面初次渲染完成")
  },
  onShow() {//在 onReady 页面初次渲染完成 之前执行
    console.log("页面显示")
  },
  onHide() {
    //当navigateTo或底部tab切换时调用。
    console.log("页面隐藏")
  },
  onUnload() {
    //当redirectTo或navigateBack的时候调用。
    console.log("页面卸载")
  },
  onPullDownRefresh() {
    console.log("监听用户下拉动作")
  },
  onReachBottom() {
    console.log("页面上拉触底事件的处理函数")
  },
  onShareAppMessage() {
    console.log("用户点击右上角转发")
  },
  onPageScroll() {
    console.log("页面滚动触发事件的处理函数")
  },
  alter() {
    this.setData({
      'custom.a.b': "改变了"
    })
  },
  queryMore(){
    wx.navigateTo({
      url: '/pages/logs/logs'
    });
  },
  login(){//登录
    wx.switchTab({
      url: '/pages/personalCenter/personalCenter'
    })
  },
  formSubmit(e) {//提交表单
    console.log(e);
    let data = e.detail.value;
    //校验
    // 店铺
    if (util.isNull(data.store)) {
      this.setData({
        'user[0].validation': "0"
      })
      return;
    }
    this.setData({
      'user[0].validation': "1"
    });
    // 薪资
    if (util.isNull(data.salary)) {
      this.setData({
        'user[1].validation': "0"
      })
      return;
    }
    if (!/^[0-9]+$/.test(data.salary)) {
      this.setData({
        'user[1].validation': "0"
      })
      return;
    }
    this.setData({
      'user[1].validation': "1"
    })
    // 联系方式
    if (util.isNull(data.phone)) {
      this.setData({
        'user[2].validation': "0"
      })
      return;
    }
    this.setData({
      'user[2].validation': "1"
    })
    // 验证码
    if (util.isNull(data.code)) {
      this.setData({
        'user[3].validation': "0"
      })
      return;
    }
    this.setData({
      'user[3].validation': "1"
    })

    // 提交
    wx.request({
      url: 'http://m.dianjiangla.com/api/app/index/collection',
      method: "POST",
      data: {
        title: data.store,
        budget: this.salary,
        contact: this.phone,
        verifycode: this.code
      },
      success(e) {
        if (e.status == 200) {
          
        } else {

        }
      }
    })
  },
  getImgCode() {//图片二维码
    this.setData({
      imgCode: 'http://www.dianjiangla.com/api/auth/verifycode?time=' + new Date().getTime(),
    })
  },
  getInfo() {//请求数据
    let that = this;
    wx.request({
      url: 'http://m.dianjiangla.com/api/app/index/recommend',
      success(e) {
        let designer = e.data.data.filter(function (item, i) {
          if (i < 6) {
            return true;
          }
        })
        that.setData({
          designer: designer,
          moduleRoasting: true,
          moduleDesigner: true,
          moduleRules: true,
          moduleUser: true
        })
      }
    });
  }
})
