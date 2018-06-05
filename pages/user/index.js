// pages/user/index.js
import user from "../../net/user.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
  },
  onUserImageBindError: function (e) {
    this.setData({ "userInfo.userImage": '/assets/user-header.jpg' })
  },
  onUserHeaderClick: function (e) {
    var self = this;
    wx.showActionSheet({
      itemList: ["相机", "相册"],
      success: function (ret) {
        wx.chooseImage({
          count: 1,
          sourceType: ret.tapIndex == 0 ? "camera" : "album",
          success: function (res) {
            if (res.tempFilePaths && res.tempFilePaths.length > 0) {
              var path = res.tempFilePaths[0];
              console.log("path = ", path);
              self.setData({"userInfo.userImage": path})
            }
          },
          fail: function (msg) {
            wx.showModal({
              title: '警告',
              content: '打开失败:' + msg
            })
          }
        })
      }
    })
  },
  /**
   * 点击我的余额
   */
  onUserBalanceClick: function (e) {
    wx.navigateTo({
      url: '/pages/member_recharge/index',
    })
  },
  /**
   * 点击个人信息进入会员信息
   */
  onUserClick: function (e) {
    wx.navigateTo({
      url: '/pages/member/index',
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({ "userInfo": user.info()})
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