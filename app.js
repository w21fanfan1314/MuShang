//app.js
App({
  onLaunch: function (opts) {
    switch (parseInt(opts.scene)) {
      case 1011:
      case 1012:
      case 1013:
      case 1047:
      case 1048:
      case 1049:
        // 通过二维码进入小程序
       
        break;
      default:
        // 控制必须从扫码的场景中进入
        wx.reLaunch({
          url: '/pages/notfound/index?msg=请使用扫码的方式进入程序&sub=请扫描台面的二维码',
          fail: res => {
            console.log(res)
          }
        })
    }
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {

  }
})