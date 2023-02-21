import { get, post } from "./request";
//Work环境
const local_baseURL = "http://192.168.10.7:7653";

const only_baseURL = "https://m.only.cn";

const requestHeader = {
  brand: "ONLY",
  token:
    "eyJqdGkiOiJ1RWVkUUtRU1lzIiwiaWF0IjoxNjY5OTk3MzM2LCJjaGFubmVsIjoiMSJ9.Upp6L2qfojIOkZx-ZxiaUWyooKlWPEeohrbfpFS4VJU",
};

export const Https = {
  // 获取首页配置
  userLogin: (body: Object) => post("http://43.136.103.251:8081/n/login", body),
  userText: (body: Object) => get("http://43.136.103.251:8081/test", body),
  getHomeConfiguration: (params: Object) =>
    get(only_baseURL + "/rest/V2/home/query", params, requestHeader),
};
