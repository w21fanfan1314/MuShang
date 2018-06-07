
import MSCoupon from "../../core/MSCoupon.js";

// pages/coupon/index.js
const Toast = require('../../zanui-weapp/dist/toast/toast');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupons: [],
    isMore: true
  },

  vars: {
    coupon: new MSCoupon(),
    page: 1
  },

  /**
   * 加载优惠券
   */
  loadCoupons: function(){
    let self = this;
    let list = [];
    this.vars.coupon.list(this.vars.page, (coupons) => {
      let len = coupons.length;
      self.setData({ "isMore": len == self.vars.coupon.MAX_SIZE })
      for (let i = 0; i < len; i++) {
        let coupon = coupons[i]
        list[i] = {
          id: coupon.CouponID,
          type: coupon.CouponType,
          indate: '有效期' + coupon.StartTime + '到' + coupon.EndTime,
          money: coupon.CouponMoney,
          condition: coupon.CouponName,
          isExpire: coupon.CouponStatus == 'Enable'
        }
      }
      self.setData({
        "coupons": list
      })
    });
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
    wx.startPullDownRefresh();
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
    this.loadCoupons();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.isMore)
    {
      this.vars.page++;
      this.loadCoupons();
    }
    else
    {
      // Toast({
      //   message:'没有更多优惠券',
      //   selector: '#tip',
      //   timeout: 2000
      // })
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})