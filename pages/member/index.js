// pages/member/index.js
import User from "../../net/user.js";
import MSUser from "../../core/MSUser.js";

// 获取验证码倒计时的时间
const MAX_TIME = 5;
let userObj = new MSUser();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: undefined,
    // 历史手机号码
    userPhone: "",
    // 页面输入的验证码
    phoneCode: undefined,
    // 是否已获取了验证码
    isGetCode: false,
    phoneCodeText: "获取验证码",
    // 性别
    sex: 1
  },

  onPhoneInput: function (e) {
    this.setData({
      "user.mobile": e.detail.value
    })
  },

  onCodeInput: function (e) {
    this.setData({
      "phoneCode": e.detail.value
    })
  },

  onEMailInput: function (e) {
    this.setData({
      "user.email": e.detail.value
    })
  },

  onBirthdayInput: function (e) {
    this.setData({
      "user.birthday": e.detail.value
    })
  },

  onNameInput: function (e) {
    this.setData({
      "user.nickName": e.detail.value
    })
  },

  onGenderInput: function (e) {
    this.setData({
      "sex": e.detail.value
    })

    this.data.user.gender = this.data.sex
  },

  /**
   * 获取手机验证码
   */
  onGetPhoneCode: function () {
    if (userObj.sendCode(this.data.user.mobile)) {
      // 开始倒计时
      this.setData({ isGetCode: true, phoneCodeText: MAX_TIME + "秒" })
      let count = MAX_TIME;
      let time = setInterval(() => {
        if (count == 1) {
          this.setData({ isGetCode: false, phoneCodeText: "获取验证码" })
          clearInterval(time)
        } else {
          count--;
          this.setData({ phoneCodeText: count + "秒" })
        }
      }, 1000)
    }

  },

  /**
   * 提交用户信息
   */
  onCommitUserInfo: function () {
    let user = this.data.user;
    let phone = this.data.user.mobile
    let self = this;
    if (!phone || "" === phone) {
      this.dialog("手机号码不能为空")
      return;
    }

    if (user.mobile !== this.data.userPhone) {
      // 手机发生改变， 判断验证码是否为空
      let code = this.data.phoneCode;
      if (!code || "" === code) {
        this.dialog("请输入短信验证码")
        return;
      }
    }

    if (userObj.successCode != this.data.phoneCode) {
      this.dialog("输入的验证码错误")
      return;
    }
    wx.showLoading({
      title: '更新中...'
    });

    userObj.save(this.data.user, () => {
      wx.showModal({
        title: '提示',
        content: '信息保存成功',
        showCancel: false,
        confirmText: ' 关闭'
      });
      self.setData({ "phoneCode": '' })
    });
  },

  dialog: function (msg) {
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel: false,
      confirmText: '关闭'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = User.info();
    this.setData({ "userPhone": user.mobile, "user": user, "sex": user.gender == '男' ? 1 : 0 });
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