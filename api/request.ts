import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useGetStoreString } from "../hooks/useStorage";
// axios.defaults.baseURL = "http://192.168.1.174:8081"; // 基路径

axios.create({
  timeout: 10000, //超时配置
  // withCredentials: true,  //跨域携带cookie
});
function showLoading(msg = "加载中...") {
  // Stores._mutations.changeLoaded[0]([{ loadedState: true, content: msg }])
  // console.log(Stores);
}

function showSuccess(msg = "成功") {
  // Stores._mutations.changeLoaded[0]([{ loadedState: false, content: msg }])
  // Notification.success(msg)
}

function showFail(msg = "失败") {
  // Stores._mutations.changeLoaded[0]([{ loadedState: false, content: msg }])
  // Notification.error(msg)
}

// Interceptors 拦截器
// 添加一个请求发送之前的拦截器
axios.interceptors.request.use(
  async config => {
    const token = await useGetStoreString("userInfo");
    token && (axios.defaults.headers.common["tokens"] = JSON.parse(token).token);

    showLoading();
    return config;
  },
  function (error) {
    // 请求发送失败
    showFail("请求失败");
    return Promise.reject(error);
  }
);

// 添加一个响应完成之前的拦截器
axios.interceptors.response.use(
  function (response: AxiosResponse) {
    // 根据状态 code 实现对应的业务逻辑
    // Toast.clear();
    // showSuccess() 手机端不会出现成功提示

    return response;
  },
  function (error) {
    // 响应失败

    showFail("服务器异常");
    return Promise.reject(error);
  }
);

// 增删改查  Promise
// get
export function get(url: string , params?: object, headers?: object) {
  return new Promise<any>((resolve, reject) => {
    axios({
      url,
      method: "GET",
      params,
      headers,
    })
      .then(result => {
        resolve(result.data); // axios 里面的 data 数据解析
      })
      .catch(err => {
        reject(err);
      });
  });
}
// post
export function post(url: string, data: any, params?: object, headers?: object) {
  return new Promise<any>(function (resolve, reject) {
    axios({
      url,
      method: "post",
      params, // POST 也可以拼接 url?id=1
      // headers: headers || { "Content-Type": "application/json" },
      data, // POST 请求提交的数据
    })
      .then(result => {
        resolve(result.data); // axios 里面的 data 数据解析
      })
      .catch(err => {
        reject(err);
      });
  });
}

export { axios };
