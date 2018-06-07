
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
   * 获取会员卡充值支付数据
   * @params rechargeId 充值数据的ID
   * @params money 充值金额
   */
  payOrder_StoreValue(rechargeId, money, render)
  {
    super.doApi(render, this.prefix, "PayOrder_StoreValue", 
      { 
        "_rechargeId": rechargeId,
        "_money": money
      });
  }

  /**
   * 执行会员充值
   * @params rechargeId 充值数据ID
   * @params billGUID 微信支付生成的guid
   */
  orderQuery_StoreValue(rechargeId, billGUID, render)
  {
    super.doApi(render, this.prefix, "OrderQuery_StoreValue",
      {
        "_rechargeId": rechargeId,
        "_billGUID": billGUID
      });
  }


  /**
   * 发送手机验证码
   * @params phone 手机号码
   */
  sendPhoneCode(phone, render)
  {
    super.doApi(render, this.prefix, "MemberCenterPage/GetVerificationCode", { "_phoneno": phone })
  }


  /**
   * 查询门店下的所有优惠券
   * @params status 优惠券状态
   * @params products 根据物品获取可用的优惠券
   * @params shopcode 门店标识
   */
  fetchCoupons(status, products, shopCode,page, pageCount, render)
  {
    super.doApi(render, this.prefix, "GetPlatformCoupon", 
      { "_pagesize": pageCount, "_pageno": page, "_status": status , "_products": products, "_shopCode": shopCode })
  }

  /**
   * 获取会员卡列表
   * @params pageSize 每一页显示数据的数量
   * @params pageOn 页数
   * @params render 回调， 只返回第一张会员卡
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
   * 查询用户信息
   * @params sessionKey 用户登录后密匙
   * @params encryptedData 加密的密匙、
   * @params iv 解密的向量
   */
  findUserInfo(sessionKey, encryptedData, iv, call)
  {
    super.doApi(call, this.prefix, "WxGetUserInfo",
      { _user: null, session_key: sessionKey, encryptedData: encryptedData, iv: iv });
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
   * 获取会员卡充值记录
   * @params cardNo 会员卡号
   * @params page 分页，页数
   * @params max 分页，每页显示的数量
   */
  getMemberItemListPage(cardNo, page , max, render)
  {
    super.doApi(render, this.prefix, "MemberCenterPage/GetMemberItemListPage",
      { _cardno: cardNo, _pageno: page, _pagesize: max})
  }

  /**
   * 获取会员充值数据
   */
  memberChargeData(render)
  {
    super.doApi(render, this.prefix, "GetMemberChargeData")
  }

  /**
   * 会员充值初始化接口
   */
  initStoreValuePage(cardId, render) {
    super.doApi(render, this.prefix, "MemberCenterPage/InitStoreValuePage", { "_cardid": cardId, "_absoluteUrl": "" })
  }
}

