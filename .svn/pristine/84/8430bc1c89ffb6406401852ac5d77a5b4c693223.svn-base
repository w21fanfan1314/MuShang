
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

