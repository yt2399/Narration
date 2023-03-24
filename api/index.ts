import { UploadFile } from "./apiType";
import { get, post, put } from "./request";

export const Https = {
  // 获取首页配置
  userLogin: (body: Object) => post("/n/login", body),

  getUploadFileUrl: (body: Object) => post("/oss/generateUri", body),

  UploadFile: ({ UploadUrl, Files, ContentType }: UploadFile) =>
    put(UploadUrl, Files, {
      headers: {
        "Content-Type": ContentType,
        Accept: "*/*",
      },
    }),
};
