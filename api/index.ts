import { get, post } from "./request";
//接口地址 ‘/api/test’

//Home环境
// const local_baseURL = "http://192.168.1.63:7653";

//Work环境
const local_baseURL = "http://192.168.10.7:7653";

const only_baseURL = "https://m.only.cn";

const requestHeader = {
  brand: "ONLY",
  token:
    "eyJqdGkiOiJ1RWVkUUtRU1lzIiwiaWF0IjoxNjY5OTk3MzM2LCJjaGFubmVsIjoiMSJ9.Upp6L2qfojIOkZx-ZxiaUWyooKlWPEeohrbfpFS4VJU",
};

export const imgPath = "https://cdn.bestseller.com.cn/";

export const Https = {
  // 获取首页配置
  getHomeConfiguration: (params: Object) =>
    get(only_baseURL + "/rest/V2/home/query", params, requestHeader),

  // 获取推荐
  getRecommend: (params: Object) =>
    get(only_baseURL + "/rest/retail/retailRec", params, requestHeader),

  //获取推荐配置json
  getListJson: () => get(only_baseURL + "/classify/h5/ONLY/h5_list.json"),

  //获取商品展示列表
  getFindGoodsList: (params: Object) =>
    get(only_baseURL + "/rest/h5Goods/findGoodsList", params, requestHeader),

  //获取单独商品详细信息
  goodsDetail: (params: Object) =>
    get(only_baseURL + "/rest/h5Goods/goodsDetail", params, requestHeader),

  //获取商品尺码编号
  goodsStock: (params: Object) =>
    get(only_baseURL + "/rest/h5Stock/goodsStock", params, requestHeader),

  //获取个人信息页面banner
  getMineBanner: () =>
    get(only_baseURL + "/rest/memberCenterFile/list", {}, requestHeader),

  //登录/注册
  userLogin: (body: Object) =>
    post(local_baseURL + "/only/user/login", body, {}, {}),

  //购物车添加
  shoppingCarAdd: (body: object) =>
    post(local_baseURL + "/only/user/shoppingCar/add", body, {}, {}),

  //查询购物车列表
  findShoppingCar: () =>
    get(local_baseURL + "/only/user/shoppingCar/user_car_find"),
};
