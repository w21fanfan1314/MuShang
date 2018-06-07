import MMBApiList from "MMBApiList.js";
import User from "../net/user.js";
import MSShop from "MSShop.js";

/**
 * 优惠券
 */
export default class MSCoupon {
  // 分页，每一页显示优惠券的数量
  MAX_SIZE = 30;
  constructor() {
    this.userInfo = User.info();
    this.api = new MMBApiList("MMB2BLL/MiniProgram/");
    this.shop = new MSShop();
  }

  /**
   * 查询优惠券
   * @params page
   */
  list(page, call) {
    let shopInfo = this.shop.shop
    this.api.fetchCoupons("all", "[]", shopInfo.shopCode, page, this.MAX_SIZE, {
      onResp: function (res) {
        if (res.code === 1) {
          if (call) {
            call(res.data);
          }
        } else {
          wx.showModal({
            title: '提示',
            content: res.msg,
            showCancel: false,
            confirmText: "关闭"
          })
        }

        wx.stopPullDownRefresh();
      }
    });
  }
}