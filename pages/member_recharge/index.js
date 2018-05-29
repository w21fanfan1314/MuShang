// pages/member_recharge/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rechargeItems: [],
    selectPosition: 0,
    selectRechargeItem: undefined,
    temp_success_id: "9S4FDvX_FyYokdwCzh6AiBu2F7NFFHyPPZM6KKV_VK4"
  },
  onSelectRechargeItem: function (e) {
    console.log(e)
    var rid = parseInt(e.currentTarget.id)
    var items = []
    var selectItem;
    for (var itemIndex in this.data.rechargeItems) {
      var item = this.data.rechargeItems[itemIndex]
      item.isSelected = item.id === rid;
      items[itemIndex] = item;
      if (item.isSelected) {
        selectItem = item;
      }
    }
    this.setData({ "rechargeItems": items, "selectPosition": rid, "selectRechargeItem": selectItem })
  },

  onDoRechargeClick: function(e){

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
    var items = [];
    var selectPosition = 0;
    for (var i = 0; i < 5; i++) {
      items[i] = { money: (i + 1) * 100, condition: '赠送的物品', id: i, isSelected: i == selectPosition }
    }
    this.setData({ "rechargeItems": items, "selectPosition": 0, "selectRechargeItem": items[selectPosition]});
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