import MSUser from "../../core/MSUser.js"
import user from "../../net/user.js";
import MSShop from "../../core/MSShop.js";

// 台号
const SITE_NO = "site";
// 门店标识
const LID = "lid";
// 门店域名
const SERVER = "server";

// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    isLogin: true,
    userImage: "",
    userName: "",
    btnText: "登录中..."
  },

  /**
   * 获取用户授权信息
   */
  onGetUserInfo:function(res){
    console.log(res)
    this.data.user.reapCount = 1
    this.callLogin();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let shop = new MSShop();
    let site = options[SITE_NO];
    let lid = options[LID];
    let server = options[SERVER];

    shop.tableNo = site;
    shop.getShopInfoByCode(lid)
    
    let self = this;
    // 在获取完成门店数据后， 在请求用户信息接口
    shop.apiCall = ()=>{
      self.data.user = new MSUser();
      self.callLogin();
    }
  },

  /**
   * 调用用户登录授权流程
   */
  callLogin: function(){
    let self = this;
    self.setData({ btnText: '登录中', isLogin: true })
    this.data.user.login({
      userInfoCall: function (userInfo) {
        self.setData({ userName: userInfo.nickName, userImage: userInfo.avatarUrl })
      },
      success: function () {
        // 可进入系统
        setTimeout(()=>{
          wx.switchTab({
            url: '/pages/shop/index',
            success: res => {
              console.log(res)
            },
            fail: res => {
              console.log(res)
            }
          });
          self.setData({ btnText: '授权进入', isLogin: false })
        }, 1000)
        
      },
      fail: function(){
        wx.showToast({
          title: '请点击 授权进入',
          icon: "none",
          duration: 2000
        })
        self.setData({btnText:'授权进入', isLogin: false})
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