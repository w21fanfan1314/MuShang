// pages/member_recharge/index.js
import MSMember from "../../core/MSMember.js";
import MSPayment from "../../core/MSPayment.js";

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
  vars: {
    payment : new MSPayment(),
    member: new MSMember()
  },
  onSelectRechargeItem: function (e) {
    console.log(e)
    let rid = e.currentTarget.id
    let items = []
    let selectItem;
    for (let itemIndex in this.data.rechargeItems) {
      let item = this.data.rechargeItems[itemIndex]
      item.isSelected = item.id === rid;
      items[itemIndex] = item;
      if (item.isSelected) {
        selectItem = item;
      }
    }
    this.setData({ "rechargeItems": items, "selectPosition": rid, "selectRechargeItem": selectItem })
  },

  /**
   * 支付
   */
  onDoRechargeClick: function(e){
    this.vars.payment.memberPay(this.data.selectRechargeItem);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.vars.member.memberChargeData((datas)=>{
      let items = [];
      let selectPosition = 0;
      let count = datas.length
      for (let i = 0; i < count; i++) {
        let data = datas[i];
        items[i] = { money: data.money, condition: data.present, id: data.id, isSelected: i == selectPosition }
      }
      this.setData({ "rechargeItems": items, "selectPosition": 0, "selectRechargeItem": items[selectPosition] });
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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