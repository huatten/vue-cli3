import axios from "axios";
//创建实例
const service = axios.create({
  baseURL: "", //api的前缀
  timeout: 10000 //请求超时
});
//request拦截器
service.interceptors.request.use(
  config => {
    //自定义配置
    return config;
  },
  error => {
    // 这里处理一些请求出错的情况
    console.log(error);
    Promise.reject(error);
  }
);
// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    // 这里处理一些response 正常放回时的逻辑

    return res;
  },
  error => {
    // 这里处理一些response 出错时的逻辑

    return Promise.reject(error);
  }
);

export default service;
