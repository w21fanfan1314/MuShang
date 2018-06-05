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
    this.mmbApi = new MMBApiList();
  }

  set respCount(val) {
    this.reapCount = val;
  }
  get respCount() {
    return this.reapCount;
  }

  /**
   * 发送手机验证码
   */
  sendCode(phone) {
    let phoneTest = /^1\d{10}$/;
    if (phone && phone !== '' && phoneTest.test(phone)) {
      this.mmbApi.sendPhoneCode(phone, {
        onResp: (res) => {
          if (res.code === 1) {

          }
        }
      });
      return true;
    } else {
      wx.showModal({
        title: '提示',
        content: '手机号码错误',
        showCancel: false,
        cancelText: '',
        cancelColor: '',
        confirmText: '关闭',
        confirmColor: '',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
    return false;
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
        if (User.hasTimeout()) {
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
        User.clear();
      }
    });
  }

  /**
   * 保存用户信息
   * @params userInfo 需要保存的用户信息
   */
  save(userInfo, suc) {
    let self = this;
    let local = User.info();
    if (local) {
      this.apiList.syncUserInfo(JSON.stringify(userInfo),
        local.session_key,
        local.encryptedData,
        local.iv, {
          onResp: (res) => {
            if (1 === res.code) {
              Object.assign(local, res.data)
              // 与本地数据同步
              self._saveUserInfo(local)
              // 获取会员信息
              self._fetchMemberCardInfo();
              if (suc)
                suc();
            } else {
              wx.showModal({
                title: '提示',
                content: res.msg,
                showCancel: false,
                confirmText: '关闭'
              })
            }
            wx.hideLoading();
          }
        });
    }
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
              self._saveUserInfo(res.data, true)
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
              Object.assign(userInfo, res)
              if (userInfo.GUID){
                // 与本地数据同步
                self._saveUserInfo(userInfo)
                // 获取会员信息
                self._fetchMemberCardInfo();
                // 调用成功
                if (this.call && this.call.success) {
                  this.call.success();
                }
              } else {
                // 与服务器同步
                this.apiList.syncUserInfo(JSON.stringify(res.userInfo), userInfo.session_key, res.encryptedData, res.iv, {
                  onResp: res => {
                    if (res.code !== 1) {
                      // 获取用户信息失败
                      self._showReLoginDialog(res.msg)
                    } else {
                      // 获取用户信息成功
                      Object.assign(userInfo, res.data)
                      self._saveUserInfo(userInfo)
                      // 获取会员信息
                      self._fetchMemberCardInfo();
                      // 调用成功
                      if (this.call && this.call.success) {
                        this.call.success();
                      }
                    }
                    // console.log(res)
                  }
                });
              }
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
    });
  }


  /**
   * 获取会员卡信息
   */
  _fetchMemberCardInfo() {
    let self = this;
    this.apiList.fetchMemberCards(1, 30, {
      onResp: res => {
        if (res && res.code === 1 && res.data && res.data.cardList && res.data.cardList.length > 0) {
          let userInfo = User.info();
          Object.assign(userInfo, { member: res.data.cardList[0] });
          console.log("获取会员卡:", userInfo)
          self._saveUserInfo(userInfo);
        }
      }
    });
  }

  /**
   * 保存用户到本地
   */
  _saveUserInfo(userInfo, updateUserInfo) {
    let self = this;
    // console.log(userInfo)
    User.add(userInfo, function (res) {
      console.log("更新用户信息:" + JSON.stringify(res))
      if (updateUserInfo)
        self._syncUserInfo();
    }, function (res) {
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
    }
    )
  }
}