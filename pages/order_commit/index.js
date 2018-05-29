// pages/order_commit/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopInfo: { shopName: '龙华威图店', shopAddr: '东华南路10号', id: 1, shopImage: '/assets/user-header.jpg' },
    products: [],
    order: {orderNo: "000 000", createTime: "2018-01-01 23:59", siteNo: 'boss', total:0, sum:0, presentMoney: 0}
  },
  onCommitClick: function(e){
    wx.navigateTo({
      url: '/pages/pay/index',
    })
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
    var products = [];
    for (var i = 0; i < 5; i++) {
      products[i] = { productName: "轩诗尼", count: i + 1, price: 210.00 };
    }
    this.setData({ "products": products })
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