import {
  ColorSchemeName,
  Dimensions,
  Platform,
  useColorScheme as _useColorScheme,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as VideoThumbnails from "expo-video-thumbnails";
import Colors from "../constants/Colors";
import * as Haptics from "expo-haptics";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import dayjs from "dayjs";
import { Https } from "../api";
import { UploadFileType, uploadUrl } from "../api/apiType";
import * as FileSystem from "expo-file-system";
import { ActionSheetRef } from "react-native-actions-sheet";
import { ToastType } from "react-native-toast-notifications";

export const userAvatar =
  "https://img2.baidu.com/it/u=260211041,3935441240&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800";

export const avatar2 =
  "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F28%2F20210628204020_17863.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1678716425&t=f557d5986b25451a91c201fb8988107c";

// 配色方案
// useColorScheme值总是浅色或深色的，但是内置的
// type表示它可以为空。这在实践中是不会发生的，所以
// 使它更容易使用。
export function useColorScheme(): NonNullable<ColorSchemeName> {
  return _useColorScheme() as NonNullable<ColorSchemeName>;
}

export function useSetStatusBarBackgroundColor(color: string) {
  Platform.OS === "android" && setStatusBarBackgroundColor(color, true);
}

/**
 * 返回当前手机系统主题
 */
export function useThemeColor(colorName: keyof typeof Colors.light & keyof typeof Colors.dark) {
  const theme = useColorScheme();

  return Colors[theme][colorName];
}

/**
 * 获取手机一屏高宽
 */
export function useWindow(type: "Width" | "Height") {
  const WINDOW = Dimensions.get("window");
  return type === "Width" ? WINDOW.width : WINDOW.height;
}

/**
 * 调用系统相册
 */
export const usePickImage = async () => {
  // const [status, requestPermission] = ImagePicker.useCameraPermissions();
  // //获取读取权限
  // const isImagePicker = await ImagePicker.getMediaLibraryPermissionsAsync(true)
  // if (!isImagePicker) return

  // 启动图片库不需要权限请求
  const { assets } = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    base64: true,
    quality: 1,
  });

  return assets;
};

export const useCamera = async () => {
  return await Promise.all([]);
};

/**
 * 获取视频缩略图
 * @param url 视频地址
 */
export const useThumbnail = async (url: string) => {
  try {
    const videoThumbnailsResult = await VideoThumbnails.getThumbnailAsync(url, {
      time: 3000,
      quality: 1,
    });

    return videoThumbnailsResult;
  } catch (e) {
    console.error(e);
  }
};

/**
 * 消息提示振动
 */
export const Haptic = () => {
  let count = 0;
  let impactAsync = setInterval(() => {
    count++;
    if (count >= 10) {
      clearInterval(impactAsync);
      return;
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }, 100);
};

const fileTypes = {
  image: 2,
  audio: 3,
  video: 4,
};

export const getUploadFileUrl = async (body: UploadFileType) => {
  const { fileName, fileType } = body;

  const result = await Https.getUploadFileUrl({
    fileName,
    fileType: fileTypes[fileType],
  });

  return result;
};

/**
 * 获取当前时间戳 (秒)
 */
export const useCurrentTimeStamp = () => {
  return dayjs(dayjs()).unix();
};

/**
 * 根据当前时间戳(秒) 转换为可视时间
 * @param timeStamp 转换的时间戳
 */
export const useTimeStampToVisualTime = (timeStamp: number) => {
  //获取当前时间day对象
  const currentTime = dayjs(dayjs());

  //获取记录时间day对象
  const logTimeStamp = dayjs(dayjs.unix(timeStamp));

  //对比 当前时间 / 记录时间 的差异(分钟)
  const differenceS = currentTime.diff(logTimeStamp, "s");

  //对比 当前时间 / 记录时间 的差异(分钟)
  const differenceM = currentTime.diff(logTimeStamp, "m");

  //获取当前时间日期
  const currentDate = currentTime.format("YYYY/MM/DD");

  //获取记录时间日期
  const logDate = logTimeStamp.format("YYYY/MM/DD");

  //当前日期和记录日期不匹配
  if (currentDate !== logDate) {
    const newLogTimeStamp = dayjs(logTimeStamp).add(1, "day");
    const newLogDate = newLogTimeStamp.format("YYYY/MM/DD");

    console.log(newLogDate);

    if (currentDate === newLogDate) {
      return "昨天" + logTimeStamp.format("HH:MM");
    }

    return logTimeStamp.format("MM月DD日");
  }

  if (differenceS < 60) {
    return differenceS + "秒前";
  }

  if (differenceM < 30) {
    return differenceM + "分钟前";
  }

  return logTimeStamp.format("HH:MM");
};

export const useUploadImg = async (
  hidden: ActionSheetRef,
  ImagePickerAsset: ImagePicker.ImagePickerAsset[],
  toast: ToastType
) => {
  const one = 0;
  const maxM = 50 * 1024 * 1024;
  hidden && hidden.hide();
  const { type, uri, fileSize, base64 } = ImagePickerAsset[one];
  //限制文件大小
  if (fileSize && fileSize > maxM && !type) {
    toast.show(fileSize > maxM ? "上传视频超过50M 已取消" : "上传视频大小未知 已取消", {
      placement: "top",
    });
    return;
  }
  //校验文件类型
  if (type) {
    let newBase64: string = "";
    const fileName = uri.split("/").pop() as string;

    if (!base64) {
      //获取文件base64 存储
      newBase64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
    }
    //转为二进制
    const bytes = new Uint8Array(
      atob(base64 || newBase64)
        .split("")
        .map(char => char.charCodeAt(0))
    );

    const response = await fetch(uri);
    const Blob = await response.blob();

    try {
      const { code, dataUrl, putUrl }: uploadUrl = await getUploadFileUrl({
        fileName,
        fileType: type,
      });

      if (code === 200) {
        await Https.UploadFile({ UploadUrl: putUrl, Files: bytes, ContentType: Blob.type });
        return dataUrl;
      }
    } catch (error) {
      return undefined;
    }
  }
};
