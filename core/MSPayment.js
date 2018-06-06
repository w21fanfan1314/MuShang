import MMBApiList from "MMBApiList.js";

/**
 * 支付操作
 */
export default class MSPayment
{
  api = new MMBApiList("MMBLibrary/BLL/StoreValueBLL/");
  constructor()
  {

  }
  /**
   * 执行会员充值
   * @params recharge 充值数据
   */
  memberPay(recharge)
  {
    this.api.payOrder_StoreValue(recharge.id, recharge.money, {
      onResp: res=>
      {
        if (res.code === 1)
        {

        }
        else
        {
          wx.showModal({
            title: "会员充值错误",
            content: res.msg,
            showCancel: false, 
            confirmText:'关闭'
          })
        }
        wx.hideLoading()
      }
    });
  }
}