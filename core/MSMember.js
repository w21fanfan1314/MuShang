import MMBApiList from "MMBApiList.js";

/**
 * 会员卡操作
 */
export default class MSMember {
  // API接口请求
  _api = new MMBApiList("MMB2BLL/MiniProgram/")
  _mmbApi = new MMBApiList()

  constructor() {

  }

  /**
   * 获取会员卡充值数据
   */
  memberChargeData(suc) {
    this._api.memberChargeData({
      onResp: (res) => {
        if (res.code === 1) {
          if (suc)
          {
            suc(res.data)
          }
        } else {
          wx.showModal({
            title: '获取会员充值数据错误',
            content: res.msg,
            showCancel: false,
            confirmText: '关闭'
          })
        }
        wx.hideLoading()
      }
    });
  }

  /**
   * 获取会员充值记录
   * @params cardNo 会员卡号
   * @params page 分页， 页数
   */
  rechargeRecod(cardNo, page, suc) {
    this._mmbApi.getMemberItemListPage(cardNo, page, 30, {
      onResp: (res) => {
        if (res.code === 1) {
          if (suc) {
            suc(res.data.DataList)
          }
        }
        else {
          wx.showModal({
            title: '提示',
            content: res.msg,
            showCancel: false,
            confirmText: '关闭'
          })
        }

        wx.hideLoading()
      }
    })
  }

  /**
   * 获取用户下的所有会员卡
   */
  cardList(callView) {
    this._api.fetchMemberCards(30, 1, {
      onResp: (res) => {
        console.log(res)

        if (res && res.code == 1) {
          if (callView) {
            if (res.data && res.data && res.data.length > 0) {
              callView.success(res.data[0])
            } else {
              wx.showModal({
                title: '提示',
                content: '没有查询到会员信息',
                showCancel: false,
                confirmText: '关闭',
                success: res => wx.navigateBack({

                })
              })
            }
          }
        } else if (res) {
          wx.showModal({
            title: '提示',
            content: res.msg,
            showCancel: false,
            confirmText: '关闭',
            success: function (res) {
              wx.navigateBack({

              })
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        }

        if (callView && callView.done)
          callView.done()
      }
    });
  }
}