// Add a request interceptor
import axios from "axios";
import { OpenAPI } from "../../generated";

axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  function (config) {
    // 生成随机值
    // const userID = localStorage.getItem("Authorization");
    // config.headers.none = "" + Math.random();
    // config.headers.Authorization = userID;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

// 携带凭证
OpenAPI.WITH_CREDENTIALS = true;
const baseUrl ="http://localhost:9001";
//const baseUrl ="https://gincode.icu";

OpenAPI.BASE = baseUrl;
// console.log("当前环境：", process.env.NODE_ENV, "请求地址", baseUrl);
