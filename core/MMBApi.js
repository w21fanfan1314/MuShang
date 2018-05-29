const api = require("../net/api.js");
export default class MMBApi{
  /**
   * 统一MMB接口请求
   * @params callback 接口回调函数 {
   *                  // 开始请求接口之前调用
   *                  onStart: function(){} ,
   *                  // 接口返回数据, res.data 接口返回的数据， res.msg 数据描述， res.code 操作代码
   *                  onResp: function(res){}
   *  }
   * @params prefix 请求前缀
   * @params action 接口请求地址
   * @params params 接口请求参数
   * @params method 接口请求方式， 默认为: POST
   * @params header 接口请求的头信息
   */
  doApi(callback, prefix, action, params, method, header) {
    if (this.checkRenderAndOnStart(callback)) {
      callback.onStart()
    }
    // 创建微信接口请求对象
    let mmb = new api.MMBApi(action, prefix);
    // 添加请求参数
    if (params && null != params) {
      for (let p in params) { mmb.addParameter(p, params[p]) }
    }
    // 设置请求方法
    if (method && null != method && '' != method) {
      mmb.setMethod(method);
    }
    // 添加请求的头信息
    if (header && null != header) {
      for (let h in header) { mmb.addParameter(h, header[h]) }
    }
    mmb.addCallback((res, statusCode) => {
      if (200 == statusCode && this.checkRenderAndOnResp(callback)) {
        callback.onResp(this.createRenderResult(res))
      }
    });
    mmb.start();
  }
  /**
   * 验证请求完成回调函数的正确性
   */
   checkRenderAndOnResp(_func) {
    return this.checkRender(_func) && _func.onResp && typeof _func.onResp == 'function';
  }

  /**
   * 验证开始回调函数的正确性
   */
  checkRenderAndOnStart(_func) {
    return this.checkRender(_func) && _func.onStart && typeof _func.onStart == 'function';
  }

  /**
   * 验证页面回调对象参数的正确性
   */
 checkRender(_func) {
    return (_func && null != _func && typeof _func == 'object')
  }

  /**
   * 统一生成提供页面使用的对象
   */
 createRenderResult(_data) {
    return { data: _data.ResultData, msg: _data.ResultMsg, code: _data.ResultCode }
  }
}