import MMBApiList from "MMBApiList.js";
import MSUser from "./MSUser.js";



/**
 * 支付操作
 */
export default class MSPayment {
  api = new MMBApiList("MMBLibrary/BLL/StoreValueBLL/");
  constructor() {
    this._user = new MSUser();
  }
  /**
   * 回去会员充值数据
   * @params recharge 充值数据
   */
  memberPay(recharge, payCall) {
    this.api.payOrder_StoreValue(recharge.id, recharge.money, {
      onResp: res => {
        if (res.code === 1) {
          if (payCall) {
            payCall(res.data.jsonPayPackage, res.data.BillGUID);
          }
        }
        else {
          wx.showModal({
            title: "会员充值错误",
            content: res.msg,
            showCancel: false,
            confirmText: '关闭'
          })

          wx.hideLoading()
        }
      }
    });
  }

  /**
   * 执行会员充值
   */
  recharge(recharge, guid) {
    let self = this;
    this.api.orderQuery_StoreValue(recharge.id, guid, {
      onResp: (res) => {
        if (res.code === 1) {
          self._user.login({
            fail: () => {
              wx.showModal({
                title: "提示",
                content: "充值成功，可能余额未改变。请重新进入",
                showCancel: false,
                confirmText: '关闭'
              });
              wx.hideLoading();
            },
            success: () => {
              wx.showModal({
                title: "恭喜",
                content: "充值成功",
                showCancel: true,
                confirmText: '立即离开',
                success: (res) => {
                  if (res.confirm) {
                    wx.navigateBack({})
                  }
                }
              });
              wx.hideLoading();
            }
          });

        } else {
          wx.showModal({
            title: "会员充值错误",
            content: res.msg,
            showCancel: false,
            confirmText: '关闭'
          })
          wx.hideLoading();
        }
      }
    });
  }
}