// pages/map/map.js
// Page({

//   data: {
//     markers: [{
//       iconPath: "../../../images/home.png",
//       id: 0,
//       latitude: 23.099994,
//       longitude: 113.324520,
//       width: 50,
//       height: 50
//     }],
//     polyline: [{
//       points: [{
//         longitude: 113.3245211,
//         latitude: 23.10229
//       }, {
//         longitude: 113.324520,
//         latitude: 23.21229
//       }],
//       color: "#FF0000DD",
//       width: 2,
//       dottedLine: true
//     }],
//     controls: [{
//       id: 1,
//       iconPath: '../../../images/home2.png',
//       position: {
//         left: 0,
//         top: 300 - 50,
//         width: 50,
//         height: 50
//       },
//       clickable: true
//     }]
//   },
//   regionchange(e) {
//     console.log(e.type)
//   },
//   markertap(e) {
//     console.log(e.markerId)
//   },
//   controltap(e) {
//     console.log(e.controlId)
//   }
// })

var order = ['red', 'yellow', 'blue', 'green', 'red']
Page({
  data: {
    toView: 'red',
    scrollTop: 100
  },
  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
  },
  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  }
})

