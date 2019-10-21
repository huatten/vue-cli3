"use strict";
import axios from "axios";
import qs from "qs";
import Interface from "./interface";
import config from "../config";
import router from "router/index";

//错误跳转方法
const redirectToNeterror = router => {
  router.replace({
    path: "/neterror?redirectUrl=" + router.currentRoute.fullPath
  });
};
//错误消息处理
const showStatus = (status) => {
  let message = ''
  switch (status) {
    case 400:
      message = '请求错误(400)'
      break
    case 401:
      message = '未授权，请重新登录(401)'
      break
    case 403:
      message = '拒绝访问(403)'
      break
    case 404:
      message = '请求不存在(404)'
      break
    case 408:
      message = '请求超时(408)'
      break
    case 500:
      message = '服务器错误(500)'
      break
    case 501:
      message = '服务未实现(501)'
      break
    case 502:
      message = '网络错误(502)'
      break
    case 503:
      message = '服务不可用(503)'
      break
    case 504:
      message = '网络超时(504)'
      break
    case 505:
      message = 'HTTP版本不受支持(505)'
      break
    default:
      message = `网络连接错误(${status})`
  }
  return message;
};

const request = option => {
  if (typeof Interface.Model[option.url] === undefined) return;
  const baseConfig = {
    method: option.method || "GET",
    url: Interface.Model[option.url],
    baseURL: option.baseUrl || config.baseUrl,
    timeout: 10000,
    withCredentials: true,
    //请求发送前序列化数据 该选项只针对 'put/post/patch'生效
    transformRequest: [
      function (data) {
        data = qs.stringify(data);
        return data;
      }
    ],
    validateStatus() {
      // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
      return true;
    },
    //在传递给 then/catch前，修改响应数据
    transformResponse: [
      function (data) {
        if (typeof data === 'string' && data.startsWith('{')) {
          data = JSON.parse(data);
        }
        return data;
      }
    ],
    //是否关闭拦截器 默认开启false
    closeIntercept: option.closeIntercept || false,
    //请求失败的回调
    callback:
      option.callback &&
      typeof option.callback === "function" &&
      option.callback(option)
  };

  //默认开启请求拦截
  if (!baseConfig.closeIntercept) {
    axios.interceptors.request.use(
      config => {
        if (config.method.toUpperCase() === 'POST') {
          config.data = {
            ...config.data,
            _t: Date.now()
          }
        } else if (config.method.toUpperCase() === 'GET') {
          config.params = {
            ...config.params,
            _t: Date.now()
          }
        }
        return config;
      },
      error => {
        option.callback && option.callback();
        error.data = {};
        error.data.msg = "服务器异常，请联系管理员"
      }
    );
    axios.interceptors.response.use(
      response => {
        const status = response.status
        let msg = ''
        if (status < 200 || status >= 300) {
          // 处理http错误，抛到业务代码
          msg = showStatus(status)
          if (typeof response.data === 'string') {
            response.data = { msg }
          } else {
            response.data.msg = msg
          }
        }
        return response;
      },
      error => {
        // 错误抛到业务代码
        error.data = {};
        error.data.msg = '请求超时或服务器异常，请检查网络'
      }
    );
  }

  return new Promise((resolve, reject) => {
    return axios(baseConfig)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default request;
