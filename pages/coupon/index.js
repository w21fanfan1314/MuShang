// pages/coupon/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupons: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.startPullDownRefresh();
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
    var self = this;
    var list = [];
    
    setTimeout(function () {
      for (var i = 0; i < 30; i++) {
        list[i] = {
          id: i,
          type: '代金券',
          indate: '有效期2018.5.5 到 2018.6.6',
          money: (i + 1) * 10,
          condition: '满100可用',
          isExpire: i < 15
        }
      }
      self.setData({
        "coupons": list
      })

      wx.stopPullDownRefresh();
    }, 1000);
    
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