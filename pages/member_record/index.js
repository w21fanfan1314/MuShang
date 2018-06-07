// pages/member_record/index.js
import MSMember from "../../core/MSMember.js";
import User from "../../net/user.js";

let member = new MSMember();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    records: [],
    isMore: true
  },

  vars: {
    // 页数
    page: 1,
    // 用户信息
    userInfo: User.info()
  },

  /**
   * 加载会员消费充值记录
   */
  loadData: function(){
    let self = this;
    member.rechargeRecod(this.vars.userInfo.member.cardNo, this.vars.page, (dataList) => {
      let datas = []
      let len = dataList.length
      self.setData({ "isMore": len == member.max})
      for (let i = 0; i < len; i++) {
        let data = dataList[i]
        datas[i] = {
          id: i,
          text: data.ItemTagStr,
          time: data.BillDateTime,
          money: data.CardValueCost
        }
      }
      self.setData({
        "records": datas
      })
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!this.vars.userInfo || !this.vars.userInfo.member) {
      wx.showModal({
        title: '提示',
        content: '无法获取用户会员信息',
        showCancel: false,
        confirmText: '关闭'
      });
      return;
    }
    wx.showLoading({
      title: '加载中...'
    });
    this.loadData()
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
    this.vars.page = 1;
    this.loadData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.isMore){
      this.vars.page++;
      this.loadData()
    } else{
     
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})