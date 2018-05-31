const USER_KEY = "user.info";

// {
//   // 测试的openId
//   wx.setStorage({
//     key: 'user.info',
//     data: { "openId":"oigi0wD2mClkETiBun8VRk3N3wrE"},
//     success: function(res) {},
//     fail: function(res) {},
//     complete: function(res) {},
//   })
// }

const info = () => {
  let infoValue = wx.getStorageSync(USER_KEY);
  if (!infoValue || null == infoValue || "" == infoValue) {
    //TODO 执行用户信息获取
  }
  return infoValue;
}

/**
 * 清楚用户的信息
 */
const clearInfo = () => {
  wx.removeStorage({
    key: USER_KEY,
    success: function (res) { },
    fail: function (res) { },
    complete: function (res) { },
  })
}

module.exports = {
  "info": info
}