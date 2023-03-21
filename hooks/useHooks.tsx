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
    // allowsEditing: true,
    // aspect: [4, 3],
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
    const res = await VideoThumbnails.getThumbnailAsync(url, {
      time: 3000,
      quality: 1,
    });

    return res;
  } catch (e) {
    console.error(e);
  }
};

/**
 * 将string转为二进制字节
 * @param str string
 */
export function useStringToBytes(str: string) {
  var ch,
    st,
    re: any[] = [];
  for (var i = 0; i < str.length; i++) {
    ch = str.charCodeAt(i);
    st = [];
    do {
      st.push(ch & 0xff);
      ch = ch >> 8;
    } while (ch);
    re = re.concat(st.reverse());
  }
  return re;
}

/**
 * 将二进制字节转为可读的数组
 * @param Byte 二进制数组
 */
export function useByteToString(Byte: Iterable<number>) {
  try {
    let binaryArray = new Uint8Array(Byte);
    let decoder = new TextDecoder();
    let text = decoder.decode(binaryArray);

    text = decodeURI(text);
    console.log(text, "text");
    return JSON.parse(text);
  } catch (error) {
    console.error(error, "转string错误");
  }
}

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
