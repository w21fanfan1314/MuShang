// pages/shop/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 所有城市
    cityList: [],
    // 所有门店
    shops:[],
    // 已选择的城市
    selectCity: null,
    // 当前所在的城市
    currentCity: null
  },

  stopTouch: function(){
    
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
    var list = [];
    for (var i = 0; i < 60; i+=6){
      var now = new Date().getTime();
      list = list.concat([
        { id: i + 1, name: '广州', longitude: 0, latitude: 0 },
        { id: i + 2, name: '深圳', longitude: 0, latitude: 0 },
        { id: i + 3, name: '东莞', longitude: 0, latitude: 0 },
        { id: i + 4, name: '江门', longitude: 0, latitude: 0 },
        { id: i + 5, name: '中山', longitude: 0, latitude: 0 },
        { id: i + 6, name: '佛山', longitude: 0, latitude: 0 }
      ]);
    }
    this.setData({ "cityList": list, "selectCity": list[0]});
    this.loadShops();

   var self = this;
    wx.getLocation({
      altitude:true, 
      type:'gcj02',
      success: function(res) {
        var currentCity = {name:'广州', latitude: res.latitude, longitude: res.longitude};
        self.setData({ "currentCity": currentCity})
      },
      fail: function(msg){
        wx.showModal({
          title: '警告',
          content: '获取定位信息失败'
        })
      }
    });
  },

/**
 * 点击城市
 */
  onCityClick: function(e){
    this.setData({ "selectCity": this.data.cityList[parseInt(e.currentTarget.id)]});
    this.loadShops()
  },

  loadShops: function(city){
    var datas = [];
    for (var i = 0; i< 30 ;i ++){
      datas[i] = {id:i, shopName: '龙华威图店', addr:'东华南路19号'};
    }

    this.setData({"shops": datas})
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