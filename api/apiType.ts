import { ImagePickerAsset } from "expo-image-picker";
import * as FileSystem from "expo-file-system";

/**
 * @intro 上传文件接口参数类型
 */
export interface UploadFileType {
  fileName: string;
  fileType: "image" | "video" | "audio";
}

/**
 * @intro 上传文件接口参数类型
 */
export interface UploadFile {
  UploadUrl: string;
  Files: Uint8Array;
  ContentType?: string;
}

/**
 * @intro 上传文件地址返回
 */
export interface uploadUrl {
  msg: string;
  dataUrl: string;
  code: number;
  putUrl: string;
}
