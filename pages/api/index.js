// pages/api/index.js
import MMBApiList from "../../core/MMBApiList.js";
const MEMBER_CENTER_PAGE = "MemberCenterPage/";
Page({
  objs: {
    api: new MMBApiList(),
    mmb2Api: new MMBApiList("MMB2BLL/")
  },
  /**
   * 页面的初始数据
   */
  data: {
    apis: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let apis = [];

    apis[0] = {
      title: '获取会员信息',
      actionName: MEMBER_CENTER_PAGE + 'InitMemberCenterIndexPage',
      parameter: '默认'
    }
    apis[1] = {
      title: '注册页面初始化接口',
      actionName: MEMBER_CENTER_PAGE + 'InitRegisterMemberPage',
      parameter: '默认'
    }

    apis[2] = {
      title: ' 注册页面获取验证码接口',
      actionName: MEMBER_CENTER_PAGE + 'GetVerificationCode',
      parameter: JSON.stringify({ _phoneno: "15818166091" })
    }

    apis[3] = {
      title: ' 注册页面注册接口',
      actionName: MEMBER_CENTER_PAGE + 'RegisterMember',
      parameter: JSON.stringify({
        _phoneno: "15818166091", "_validcode": "123", "_nickname": "灰太狼"
      })
    }

    apis[4] = {
      title: ' 检查注册',
      actionName: 'CheckRegister',
      parameter: '默认'
    }

    apis[5] = {
      title: ' 充值页面 初始化接口',
      actionName: MEMBER_CENTER_PAGE + 'InitStoreValuePage',
      parameter: JSON.stringify({
        "_cardid": "123", "_absoluteUrl": ""
      })
    }

    apis[6] = {
      title: ' 充值消费记录页面  分页接口',
      actionName: MEMBER_CENTER_PAGE + 'GetMemberItemListPage',
      parameter: JSON.stringify({
        "_cardno": "123", "_pageno": 1, "_pagesize": 20
      })
    }

/**{
            "Name": "未使用",
            "Value": "Enable"
        },
         {
             "Name": "已过期",
             "Value": "TimeOut"
         },
          {
              "Name": "已使用",
              "Value": "Used"
          }
 */
    apis[7] = {
      title: '根据类型获取优惠券',
      actionName: MEMBER_CENTER_PAGE + 'GetCouponsByID',
      parameter: JSON.stringify({
        "_status": "Enable", "_pageno": 1, "_pagesize": 20
      })
    }

    apis[8] = {
      title: '优惠券详情初始化接口',
      actionName: MEMBER_CENTER_PAGE + 'InitCouponDetailPage',
      parameter: JSON.stringify({
        "_couponid": "123"
      })
    }

    apis[9] = {
      title: '会员档案页面初始化接口',
      actionName: MEMBER_CENTER_PAGE + 'InitMemberDetailPage',
      parameter: '默认'
    }

    apis[10] = {
      title: '会员档案页面修改资料接口',
      actionName: MEMBER_CENTER_PAGE + 'UpdateMemberDetailPage',
      parameter: JSON.stringify({
        "_name": "灰太狼",
        "_sex": "男",
        "_birthday": "1987-05-02",
        "_tel": "15818166091"
      })
    }

    apis[11] = {
      title: '获取物品',
      actionName: 'MenuBoard/InitBillDetail',
      parameter: JSON.stringify({
        "_billGUID": "",
        "_shopCode": "8888",
        "_datamd5": ""
      }),
      mmb2: true
    }


    apis[12] = {
      title: '创建订单',
      actionName: 'MBBillHis/CreateBill',
      parameter: JSON.stringify({
        "_billHis": { "GUID": "", "BillNo": "", "BillTyp": "WaiMai", "BillStatus": 0, "BillItemCount": 1, "BillItemReCount": 0 }
      }),
      mmb2: true
    }

    apis[13] = {
      title: '更新订单',
      actionName: 'MBBillHis/UpdateBill',
      parameter: JSON.stringify({
        "_billHis": { "GUID": "", "BillNo": "", "BillTyp": "WaiMai", "BillStatus": 0, "BillItemCount": 1, "BillItemReCount": 0 }
      }),
      mmb2: true
    }
    this.setData({ "apis": apis })
  },

  onRequestEvent: function (e) {
    let position = parseInt(e.currentTarget.id);
    let api = this.data.apis[position];

    console.log(api);

    let render = {
      onStart: () => {
        wx.showLoading({
          title: '请求中',
        })
      },
      onResp: (data) => {
        wx.hideLoading();
        wx.showModal({
          title: api.title + '请求返回',
          content: JSON.stringify(data),
          showCancel: false,
          cancelText: '',
          cancelColor: '',
          confirmText: '关闭',
          confirmColor: 'black',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    };
    switch (api.actionName) {
      case "InitMemberCenterIndexPage":
        // 推荐调用方式， 可以根据业务逻辑选择方法调用， 所有的API 已经在MMBApiList 文件列出来了
        this.objs.api.initMemberCenterIndexPage(render);
        break;
      default:
        // 强烈不推荐这种方式调用，这个只是方便演示方法调用的基本操作
        let obj;
        if (api.mmb2) {
          obj = this.objs.mmb2Api;
        } else {
          obj = this.objs.api;
        }
        obj.doApi(render, obj.prefix, api.actionName, api.parameter == "默认" ? undefined : JSON.parse(api.parameter))
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})