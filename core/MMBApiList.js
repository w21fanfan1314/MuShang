
import MMBApi from "MMBApi.js";

/**
 * 接口API请求的列表， 所有的请求接口将会自动传入的_oid 参数
 */
export default class MMBApiList extends MMBApi {

  constructor(__prefix = 'MMBLibrary/BLL/WechatPage/') {
    super();
    this.prefix = __prefix;
  }

  /**
   * 获取会员卡列表
   */
  fetchMemberCards(pageSize, pageOn, render)
  {
    super.doApi(render, this.prefix, "GetMemberCardList", { _pagesize: pageSize, _pageno: pageOn})
  }

  /**
   * 根据门店的标识，拉去服务器门店数据
   * @params shopCode 门店标识
   */
  fetchShopInfoByCode(shopCode, render){
    super.doApi(render, this.prefix, "GetUserDepartment", { _shopCode: shopCode })
  }

  /**
   * 获取的凭证信息
   * @params code 通过小程序获得必要参数code
   * @return {openID:"",  session_key: ""} 
   */
  fetchOpenID(code, render)
  {
    super.doApi(render, this.prefix, "WxLogin", {code: code})
  }

  /**
   * 同步用户信息
   * @params user 用户具体的信息
   * @params sessionKey 用户登录后密匙
   * @params encryptedData 加密的密匙、
   * @params iv 解密的向量
   */
  syncUserInfo(user, sessionKey, encryptedData, iv, render)
  {
    super.doApi(render, this.prefix, "WxGetUserInfo",
      { _user: user, session_key: sessionKey, encryptedData: encryptedData, iv: iv});
  }

  /**
   *  获取会员卡信息
   * @params render 
   * @return  CardList 会员卡列表
   *          CouponCount 优惠券的数量
   */
  initMemberCenterIndexPage(render) {
    super.doApi(render, this.prefix, "MemberCenterPage/InitMemberCenterIndexPage")
  } 

  /**
   * 会员充值初始化接口
   */
  initStoreValuePage(cardId, render) {
    super.doApi(render, this.prefix, "MemberCenterPage/InitStoreValuePage", { "_cardid": cardId, "_absoluteUrl": "" })
  }
}

