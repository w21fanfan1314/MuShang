// pages/order/index.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: []
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
    var orders = [];
    for (var i = 0; i < 30; i ++){
      orders[i] = {
        id : i, 
        shopImage: '',
        shopName: '龙华威图店',
        shopAddr:'清泉路19号TTMALL一楼',
        status: '订单已完成',
        products: [{ productName: '轩尼诗3只套餐', count: 1 }, { productName: '澳洲原瓶进口红酒', count: 1 }],
        site : 'BOSS1',
        total: 3800
      }
    }
    this.setData({ "orderList": orders});
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