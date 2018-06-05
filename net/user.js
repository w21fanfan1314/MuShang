const USER_KEY = "user.info";
// 用户数据缓存时间
const USER_CACHE_TIME_KEY = "user.cache.time"
// 默认用户数据缓存时长, 单位：分钟
const USER_DEFAULT_CACHE_TIME = 1

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
  return infoValue;
}

/**
 * 数据缓存是否过期
 */
const hasTimeOut = ()=>
{
  let cacheTime = wx.getStorageSync(USER_CACHE_TIME_KEY);
  console.log("用户信息缓存时间:", new Date(cacheTime))
  let now = new Date();
  // 判断缓存是否已经过期
  return !info() ||  (cacheTime + (USER_DEFAULT_CACHE_TIME * 60 * 1000) <= now.getTime())
}

/**
 * 清楚用户的信息
 */
const clearInfo = () => {
  wx.removeStorage({
    key: USER_KEY,
    success: function (res) {
      wx.removeStorageSync(USER_CACHE_TIME_KEY)
    },
    fail: function (res) { },
    complete: function (res) { },
  })
}

/**
 * 添加用户缓存信息
 */
const addInfo = (userInfo, suc, fail) => {
  wx.setStorage({
    key: USER_KEY,
    data: userInfo,
    success: res => {
      wx.setStorageSync(USER_CACHE_TIME_KEY, new Date().getTime())
      if (suc)
        suc(res);
    },
    fail: fail
  })
}

module.exports = {
  "info": info,
  "clear": clearInfo,
  "add": addInfo,
  "hasTimeout": hasTimeOut
}