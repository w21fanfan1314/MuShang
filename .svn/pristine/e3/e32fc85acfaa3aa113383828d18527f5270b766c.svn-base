// pages/member_record/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    records: []
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
  setTimeout(function(){
    var datas = [];
    for (var i = 0; i < 30; i ++){
      datas[i] = {
        id:i, 
        text:'消费记录',
        time:'2018-05-04 12：44：12',
        money:(i % 3 == 0 ? "+" : "-") + "￥" + ((i + 1) * 10)
      }
    }
    self.setData({
      "records": datas
    })
    wx.stopPullDownRefresh();
  }, 500)
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