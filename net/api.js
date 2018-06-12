var util = require("../utils/util.js");
var user = require("user.js");

function server()
{
  return wx.getStorageSync("shop.server")
}
/**
   * 执行网络请求
   * @params action 请求的MMB API名称
   * @params params 请求参数
   * @params externalParams 外部请求的参数， 不通过封装直接放在参数中的
   */
const MMBApi = function (action, prefix) {
  console.log("门店服务器地址:", server())
  // 接口加密方式
  const TYPE_TOKEN = "xor";
  // 接口基础的地址
  const BASE_URL = "https://" +server()+ "/MMB/Api/RRRAPI.ashx";

  // 当前对象
  let self = this;
  // 请求接口的Key
  this.apiKey = "";
  // 请求方式
  this.method = 'POST';
  // 请求头信息
  this.header = {
    'content-type': 'application/x-www-form-urlencoded'
  }
  // 数据相应结果
  this.resposneType = "text";
  // 数据装换结果
  this.dataType = "json";
  // 请求地址参数, "prefix": prefix ? prefix : "MMB2BLL/"
  this.params = { "exec": prefix + action }
  // 请求的POST参数
  this.data = { "_oid": user.info() ? user.info().openId : "" }
  // 接口请求完成回调函数
  this.callback = (resp, statusCode, header) => { }
  // 查询回调
  this.queryCallback = (data) => { }

  /**
   * 添加回调函数
   */
  this.addCallback = (_callback) => {
    self.callback = _callback;
    return self;
  }

  this.setQueryCallback = (_callback) => {
    self.queryCallback = _callback;
    return self;
  }

  this.setPrefix = (_prefix) => {
    self.param["prefix"] = _prefix;
    return self;
  }
  /**
   * 添加请求的头信息
   */
  this.addHeader = (key, value, header) => {
    self.header[key] = value;
    return self;
  }

  this.addParameter = (name, value) => {
    self.data[name] = value;
    return self;
  }

  /**
   * 设置请求的方式， 默认为： POST
   */
  this.setMethod = _method => {
    self.method = _method;
    return self;
  }

  /**
   * 接口响应的数据， 默认:text , 一般不需要更改
   */
  this.setResponseType = (_responseType) => {
    self.resposneType = _responseType;
    return self;
  }

  /**
   * 转换的数据结构
   */
  this.setDataType = (_dataType) => {
    self.dataType = _dataType;
    return self;
  }

  /**
   * 开始执行请求
   */
  this.start = () => {
    // 请求的地址
    let url = showUrl();
    // POST中提交的参数
    let parameter = makeFormParameter(self.data)
    console.log("请求地址:", url);
    console.log("POST 参数:", parameter)
    wx.request({
      url: url,
      method: self.method,
      header: self.header,
      dataType: self.dataType,
      responseType: self.resposneType,
      data: parameter,
      success: (res) => {
        console.log("请求返回:", res.data);
        // 执行回到业务函数
        self.callback(res.data, res.statusCode, res.header);
        // 如果查询接口中有值， 则回调查询的函数
        if (res.data.ResultData && null != res.data.ResultData) {
          self.queryCallback(res.data.ResultData);
        }
      },
      fail: function () {
        self.callback(-1, "接口请求错误");
      }
    });
  }

  /**
   * 生成参数字符串
   */
  let makeFormParameter = (_params) => {
    let str = "";
    let index = 0;
    for (let p in _params) {
      // str += ((index == 0) ? "" : "&") + encodeURIComponent(p) + "=" + encodeURIComponent(_params[p]);
      str += ((index == 0) ? "" : "&") + p  + "=" + _params[p];
      index ++;
    }
    return str;
  }

  /**
  * 显示完整的请求地址
  */
  let showUrl = function () {
    let url = BASE_URL + "?";
    let index = 0;
    for (let x in self.params) {
      let val = self.params[x];
      // encodeURIComponent(x) + "=" + encodeURIComponent(JSON.stringify(val))
      url += ((index == 0) ? "" : "&") + x + "=" + self.params[x];
    }
    return url;
  }

  /**
   * 生成接口请求的token
   */
  let makeToken = function () {

    let now = util.dateformat(new Date(), "yyyy-MM-dd hh:mm:ss S");
    console.log(now, self.apiKey)

    let nowBytes = util.stringToBytes(now);
    let keyBytes = util.stringToBytes(self.apiKey);

    let result = "";
    let j = 0;
    for (let i = 0; i < nowBytes.length; i++) {
      let val = "" + (nowBytes[i] ^ keyBytes[j]);
      // 如果不够2位， 就用0来补位
      if (val.length > 2) {
        val = "0" + val;
      }
      result += val;
      j = (j + 1) % 8;
    }
    return result;
  }
}

// 导出
module.exports = {
  "MMBApi": MMBApi
}