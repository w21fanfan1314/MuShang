// pages/member_card/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberCardInfo: {infos: [], cardType:'', cardNo:''},
    showCardQRCode: false
  },

  onCardClick: function(e){
    this.setData({ "showCardQRCode": !this.data.showCardQRCode})
  },
  onCardQRCodeInfoClosed: function(){
    console.log("fads")
    this.setData({ "showCardQRCode": false })
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
    var infos = [];

    infos[0] = {"title":"姓名", "text": "猪猪大人"}
    infos[1] = { "title": "手机号", "text": "183****1742" }
    infos[2] = { "title": "性别", "text": "女" }
    infos[3] = { "title": "生日", "text": "1992-10-01" }
    infos[4] = { "title": "邮箱", "text": "980***294@qq.com" }

    this.setData({ "memberCardInfo": { infos: infos}});
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