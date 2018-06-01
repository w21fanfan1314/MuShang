const SHOP_INFO_KEY = "shop.info";
const SELECT_TABLE_KEY = "shop.table.no"

import MMBApiList from "MMBApiList.js";

/**
 * 门店管理， 包含当前选择台号等信息
 */
export default class MSShop {
  // 门店信息
  shop = undefined;
  // 已选台号
  tableNo = "";

  _api = undefined;

  constructor() {
    let self = this;
    wx.getStorage({
      key: SHOP_INFO_KEY,
      success: function (res) {
        if (res.data && null != res.data)
          self.shop = JSON.parse(res.data);
      },
    });
    wx.getStorage({
      key: SELECT_TABLE_KEY,
      success: function (res) {
        self.tableNo = res.data;
      },
    });

    this._api = new MMBApiList("MMB2BLL/MiniProgram/")
  }

  /**
   * 根据门店的标识，获取门店的详情
   */
  getShopInfoByCode(shopCode) {
    let self = this;
    this._api.fetchShopInfoByCode(shopCode, {
      onResp: res => {
        console.log(res);
        if (res && res.code == 1) {

        } else {
          wx.reLaunch({
            url: '/pages/notfound/index?msg=发生错误, 请关闭重新进入!&sub=' + res.msg
          })
        }
      }
    });
  }

  set shop(shopValue) {
    if (shopValue && null != shopValue) {
      let self = this;
      wx.setStorage({
        key: SHOP_INFO_KEY,
        data: JSON.stringify(shopValue),
        success: res => {
          wx.getStorage({
            key: SHOP_INFO_KEY,
            success: function (res) {
              console.log(res)
              if (res.data && res.data != undefined && "undefined" != res.data)
                self.shop = JSON.parse(res.data);
            },
          });
        }
      });
    }
  }

  get shop() {
    return this.shop;
  }

  set tableNo(tableNo) {
    let self = this;
    wx.setStorage({
      key: SELECT_TABLE_KEY,
      data: tableNo,
      success: function (res) {
        wx.getStorage({
          key: SELECT_TABLE_KEY,
          success: function (res) {
            self.tableNo = res.data;
          },
        });
      }
    });
  }

  get tableNo() {
    return this.tableNo;
  }
}