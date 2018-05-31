import MMBApiList from "MMBApiList.js";
import User from "../net/user.js";
/**
 * 慕尚用户逻辑处理类
 */
export default class MSUser {
  MAX_REAP_COUNT = 5;
  // 登录完成回调函数
  call = undefined;
  // 重试次数
  reapCount = 1;

  constructor() {
    this.apiList = new MMBApiList("MMB2BLL/MiniProgram/")
  }

  set respCount(val) {
    this.reapCount = val;
  }
  get respCount() {
    return this.reapCount;
  }

  /**
   * 执行登录
   */
  login(call) {
    this.call = call;
    let self = this;
    // 首先检查登录是否过期
    wx.checkSession({
      success: (res) => {
        let userInfo = User.info();
        if (!userInfo) {
          console.log("本地未发现用户信息， 重新登录中...")
          // 如果本地没有保存信息则重新登录
          self._wxLogin();
        } else {
          self._syncUserInfo();
        }
      },
      fail: res => {
        // 登录已经过期
        console.log("登录已过期， 重新登录中...");
        self._wxLogin();
      }
    });
  }

  /**
   * 私有方法， 执行微信的登录获取code 进行服务器登录
   */
  _wxLogin() {
    this.reapCount++;
    let self = this;
    wx.login({
      success: (res) => {
        // 微信登录成功
        self.apiList.fetchOpenID(res.code, {
          onResp: (res) => {
            console.log(res);
            if (res && res.code === 1) {
              // 将用户信息保存到本地
              self._saveUserInfo(res.data)
              self._syncUserInfo();
            } else {
              // 获取openID失败
              self._showReLoginDialog('用户登录失败，' + res.msg);
            }
          }
        });
      },
      fail: msg => {
        // 本地调用登录失败后， 提示用户重试再次登录
        self._showReLoginDialog("用户登录失败")
      }
    });
  }

  /**
   * 显示重试对话框
   */
  _showReLoginDialog(msg) {
    let self = this;
    let isRestart = this.MAX_REAP_COUNT >= this.reapCount
    wx.showModal({
      title: '警告',
      content: msg,
      showCancel: true,
      cancelText: "取消",
      confirmText: isRestart ? "重试" : "关闭",
      success: res => {
        if (res.cancel) {
          if (this.call && this.call.fail) {
            this.call.fail();
          }
        } else {
          if (isRestart) {
            self._wxLogin();
          } else {
            if (this.call && this.call.fail) {
              this.call.fail();
            }
          }
        }
      },
      fail: () => {
        if (this.call && this.call.fail) {
          this.call.fail();
        }
      }
    })
  }

  /**
   * 与服务器同步用户的信息
   */
  _syncUserInfo() {
    let self = this;
    let userInfo = User.info();
    // console.log("本地用户信息:" + JSON.stringify(userInfo))
    // 验证用户是否已经授权了应用程序可以访问用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting["scope.userInfo"]) {
          wx.getUserInfo({
            withCredentials: true,
            success: res => {
              // 通知更新界面的用户信息
              if (this.call && this.call.userInfoCall) {
                this.call.userInfoCall(res.userInfo);
              }
              // console.log(res);
              this.apiList.syncUserInfo(JSON.stringify(res.userInfo), userInfo.session_key, res.encryptedData, res.iv, {
                onResp: res => {
                  if (res.code !== 1) {
                    // 获取用户信息失败
                    self._showReLoginDialog(res.msg)
                  } else {
                    // 获取用户信息成功
                    userInfo.__proto__ = res.data;
                    self._saveUserInfo(userInfo)
                    // 调用成功
                    if (this.call) {
                      if (this.call && this.call.success) {
                        this.call.success();
                      }
                    }
                  }
                  console.log(res)
                }
              });
            }
          });
        } else {
          // 没有授权小程序获取用户信息
          wx.showModal({
            title: '提示',
            content: '请授权您的用户信息！',
            showCancel: false,
            confirmText: '继续',
            success: res => {
              if (this.call && this.call.fail) {
                this.call.fail();
              }
            }
          })
        }
      }
    })
  }

  /**
   * 保存用户到本地
   */
  _saveUserInfo(userInfo) {
    let self = this;
    wx.setStorage({
      key: 'user.info',
      data: userInfo,
      success: function (res) {
        console.log("更新用户信息:" + res)
      },
      fail: function (res) {
        // 必须保证所有的信息保存完整
        wx.showModal({
          title: '警告',
          content: '保存用户信息失败',
          showCancel: false,
          confirmText: "重试",
          success: res => {
            self.login();
          }
        })
        self.login = false;
        this.call(false)
      },
      complete: function (res) { },
    })
  }
}