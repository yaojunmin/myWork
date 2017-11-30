const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const isNull = v => {
  if (v == '' || v == null || v == undefined) {
    return true;
  }
  return false;
}

/**
 * 组装接口完整的路径名称
 * @param {接口名称 /app/index/recommend} urlName 
 */
var apiName = function (urlName = '') {
  return config.service.apiUrl + urlName || '';
}

/**
 * 接口调用
 * 两个参数时
 * @param {接口路径} url
 * @param {成功的回调方法} success callBack
 * 
  * 三个参数时
 * @param {接口路径} url
 * @param {接口的参数} data
 * @param {成功的回调方法} successcallBack
 */
var api = {
  get: function () {
    if (arguments.length == 2) {
      let func = arguments[1];
      wx.request({
        url: apiName(arguments[0]),
        method: 'GET',
        success: function (e) {
          func(e.data)
        }
      })
      return;
    }

    if (arguments.length == 3) {
      let func = arguments[2];
      wx.request({
        url: apiName(arguments[0]),
        method: 'GET',
        data: arguments[1],
        success: function (e) {
          func(e.data);
        }
      })
      return;
    }
    console.error("api.get 参数异常 ===>")
    console.error(arguments)
  },
  post: function () {
    if (arguments.length == 2) {
      let func = arguments[1];
      wx.request({
        url: apiName(arguments[0]),
        method: 'POST',
        success: function (e) {
          func(e.data)
        }
      })
      return;
    }

    if (arguments.length == 3) {
      let func = arguments[2];
      wx.request({
        url: apiName(arguments[0]),
        method: 'POST',
        data: arguments[1],
        success: function (e) {
          func(e.data);
        }
      })
      return;
    }
    console.error("api.post 参数异常 ===>")
    console.error(arguments)
  },
}


module.exports = {
  formatTime: formatTime,
  isNull: isNull,
  api: api 
}
