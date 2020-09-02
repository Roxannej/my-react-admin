/*
 * @Author Roxanne
 * @Date: 2020-08-08
 */
import axios from "axios"; // 引入axios
import Qs from "qs"; //引入qs模块，用来序列化post类型的数据
import { message } from "antd";

let inError = false;

// 创建axios实例
const instance = axios.create({
  baseURL: "http://localhost:9000/",
  timeout: 15000,
  transformRequest: [
    function (data, headers) {
      // 对 data 进行任意转换处理
      return data;
    },
  ],
  transformResponse: [
    function (data) {
      // 查看
      console.log(data);
      // 对 data 进行任意转换处理
      return JSON.parse(data);
    },
  ],
  headers: { "Cache-Control": "no-cache" },
});

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    config.headers = Object.assign(
      config.method === "get"
        ? {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8",
          }
        : {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
      config.headers
    );
    // 最后总结的时候看看关于HTTP请求的东西
    if (config.method === "post") {
      const contentType = config.headers["Content-Type"];
      if (contentType) {
        if (contentType.includes("multipart")) {
        } else if (contentType.includes("json")) {
          config.data = JSON.stringify(config.data);
        } else {
          config.data = Qs.stringify(config.data);
        }
      }
    }
    return Promise.resolve(config);
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做处理，后面可能需要进行改动
    const { code } = response.data || {};
    if (code === 109 || code === 108) {
      if (!inError) {
        message.warning("登录超时，即将跳转到登录页...");
        inError = true;
        setTimeout(() => {
          message.destroy();
          window.location.href = "/login";
          inError = false;
        }, 2000);
      }
      return Promise.resolve({});
    } else if (response) {
      return Promise.resolve(checkStatus(response));
    }
  },
  function (error) {
    // 对响应错误做点什么
    if (error.response) {
      return Promise.reject(checkStatus(error.response));
    } else if (
      error.code === "ECONNABORTED" &&
      error.message.indexOf("timeout") !== -1
    ) {
      return Promise.reject({ msg: "请求超时" });
    } else {
      return Promise.reject({});
    }
  }
);

// 请求的封装
// 最好能对所有的请求都进行封装
const request = async function (opt) {
  const options = {
    method: "get",
    ifHandleError: true, // 是否统一处理接口失败（提示）
    ...opt,
  };

  // 匹配接口前缀，开发环境则通过proxy配置转发请求，生产环境根据实际配置
  // options.baseURL = autoMatch(options.prefix);
  try {
    const res = await instance(options);
    if (!res.success && options.ifHandleError) {
      // 自定义参数，是否允许全局提示错误信息
      message.error(res.message || "请求处理失败！");
    }
    return res;
  } catch (err) {
    if (options.ifHandleError) {
      // 自定义参数，是否允许全局提示错误信息
      message.error(err.message || err.msg || "请求处理失败");
    }
    return err;
  }
};

export default request;
