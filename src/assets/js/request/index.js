"use strict";
import axios from "axios";
import QS from "qs";
import Interface from "./interface";
import config from "../config";
import router from "router/index";
const redirectToNeterror = router => {
  router.replace({
    path: "/neterror?redirectUrl=" + router.currentRoute.fullPath
  });
};
const request = option => {
  if (typeof Interface.Model[option.url] === undefined) return;
  const baseConfig = {
    method: option.method || "GET",
    url: Interface.Model[option.url],
    baseURL: option.baseUrl || config.baseUrl,
    timeout: 10000,
    //请求发送前序列化数据 该选项只针对 'put/post/patch'生效
    transformRequest: [
      function(data) {
        return QS.stringify(data);
      }
    ],
    //在传递给 then/catch前，修改响应数据
    transformResponse: [
      function(data) {
        return typeof data === "string" ? JSON.parse(data) : data;
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

  //接口增加随机数 防止读取缓存数据
  option.data = Object.assign({}, option.data, { _: Date.now() });
  //统一格式: axios.get()方法和axios.post()在提交数据时参数的书写方式不同
  baseConfig.method.toUpperCase() === "POST"
    ? Object.assign({}, baseConfig, { data: option.data })
    : Object.assign({}, baseConfig, { params: option.data });

  //默认开启请求拦截
  if (!baseConfig.closeIntercept) {
    axios.interceptors.request.use(
      config => {
        //loading
        return config;
      },
      error => {
        option.callback && option.callback();
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      response => {
        const { code } = response.data;
        if (code === 200) {
          return response;
        }
      },
      error => {
        if (error && error.response) {
          switch (error.response.status) {
            case 400:
              error.message = "请求错误";
              break;
            case 401:
              error.message = "未授权，请登录";
              break;
            case 403:
              error.message = "拒绝访问";
              break;
            case 404:
              error.message = `请求地址出错: ${error.response.config.url}`;
              break;
            case 408:
              error.message = "请求超时";
              break;
            case 500:
              error.message = "服务器内部错误";
              break;
            case 501:
              error.message = "服务未实现";
              break;
            case 502:
              error.message = "网关错误";
              break;
            case 503:
              error.message = "服务不可用";
              break;
            case 504:
              error.message = "网关超时";
              break;
            case 505:
              error.message = "HTTP版本不受支持";
              break;
            default:
              error.message = error;
          }
        }
        return Promise.reject(error);
      }
    );
  }

  return new Promise((resolve, reject) => {
    return axios(baseConfig)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        alert(error);
        reject(error);
      });
  });
};

export default request;
