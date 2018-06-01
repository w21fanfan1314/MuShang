import MMBApiList from "MMBApiList.js";

/**
 * 会员卡操作
 */
export default class MSMember {
  // API接口请求
  _api = new MMBApiList("MMB2BLL/MiniProgram/")

  constructor() {

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
            if (res.data && res.data.cardList && res.data.cardList.length > 0) {
              callView.success(res.data.cardList[0])
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