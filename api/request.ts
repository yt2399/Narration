import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useGetStoreString } from "../hooks/useStorage";

const serverConfig = {
  baseURL: "http://43.136.103.251:8081",
  useTokenAuthorization: false, //是否开启 token 验证
};
const serviceAxios = axios.create({
  baseURL: serverConfig.baseURL,
  timeout: 25000,
});

// Interceptors 拦截器
// 添加一个请求发送之前的拦截器
serviceAxios.interceptors.request.use(
  async config => {
    const token = await useGetStoreString("userInfo");
    token && (config.headers["tokens"] = JSON.parse(token).token);

    return config;
  },
  function (error) {
    // 请求发送失败
    return Promise.reject(error);
  }
);

// 添加一个响应完成之前的拦截器
serviceAxios.interceptors.response.use(
  function (response: AxiosResponse) {
    console.log(response, "response");

    return response;
  },
  function (error) {
    // 响应失败
    return Promise.reject(error);
  }
);

export function get(url: string, headers?: object) {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const result = await serviceAxios.get(url, headers);
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
}

export function post(url: string, data: any, headers?: object) {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const result = await serviceAxios.post(url, data, headers);
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
}

export function put(url: string, data: any, headers?: object) {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const result = await serviceAxios.put(url, data, headers);
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
}

export { axios };
