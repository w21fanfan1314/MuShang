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
    page: 1,
    userInfo: User.info()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.userInfo)
    if (!this.data.userInfo || !this.data.userInfo.member) {
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
    member.rechargeRecod(this.data.userInfo.member.cardNo, this.data.page, (dataList) => {
      for (let i = 0; i < 30; i++) {
        let data = dataList[i]
        datas[i] = {
          id: i,
          text: '消费记录',
          time: '2018-05-04 12：44：12',
          money: (i % 3 == 0 ? "+" : "-") + "￥" + ((i + 1) * 10)
        }
      }
      self.setData({
        "records": datas
      })
    });
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