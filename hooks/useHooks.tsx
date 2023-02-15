import {
  ColorSchemeName,
  Dimensions,
  useColorScheme as _useColorScheme,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as VideoThumbnails from "expo-video-thumbnails";
import Colors from "../constants/Colors";
// 配色方案
// useColorScheme值总是浅色或深色的，但是内置的
// type表示它可以为空。这在实践中是不会发生的，所以
//使它更容易使用。
export function useColorScheme(): NonNullable<ColorSchemeName> {
  return _useColorScheme() as NonNullable<ColorSchemeName>;
}

export function useThemeColor(
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();

  return Colors[theme][colorName];
}

export function useWindow(type: "Width" | "Height") {
  const WINDOW = Dimensions.get("window");
  return type === "Width" ? WINDOW.width : WINDOW.height;
}

export const usePickImage = async () => {
  // const [status, requestPermission] = ImagePicker.useCameraPermissions();
  // //获取读取权限
  // const isImagePicker = await ImagePicker.getMediaLibraryPermissionsAsync(true)
  // if (!isImagePicker) return

  // 启动图片库不需要权限请求
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) {
    return result;
  }
};

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
