import MSUser from "../../core/MSUser.js"
import user from "../../net/user.js";

// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    isLogin: true,
    userImage: "",
    userName: ""
  },

  /**
   * 获取用户授权信息
   */
  onGetUserInfo:function(res){
    console.log(res)
    callLogin();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this;

    this.data.user = new MSUser();
    callLogin();
  },

  /**
   * 调用用户登录授权流程
   */
  callLogin: function(){
    this.data.user.login({
      userInfoCall: function (userInfo) {
        self.setData({ userName: userInfo.nickName, userImage: userInfo.avatarUrl })
      },
      success: function () {
        // 可进入系统
      }
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