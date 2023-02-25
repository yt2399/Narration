import { ColorSchemeName, Dimensions, useColorScheme as _useColorScheme } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as VideoThumbnails from "expo-video-thumbnails";
import Colors from "../constants/Colors";
import * as SQLite from "expo-sqlite";
import { QueryDemandType, SingleChatType, userDataInfoType } from "../types";
import { useGetStoreObject } from "./useStorage";
import * as Haptics from "expo-haptics";
let SQLiteDb: SQLite.WebSQLDatabase;

useGetStoreObject("userInfo").then(({ id }: userDataInfoType | any) => {
  SQLiteDb = SQLite.openDatabase(`${id}.db`, "1.0.1");
});

// 配色方案
// useColorScheme值总是浅色或深色的，但是内置的
// type表示它可以为空。这在实践中是不会发生的，所以
// 使它更容易使用。
export function useColorScheme(): NonNullable<ColorSchemeName> {
  return _useColorScheme() as NonNullable<ColorSchemeName>;
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
    allowsEditing: true,
    aspect: [4, 3],
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
 * 初始化一个sql库，如果没有就会创建
 */

/**
 * 创建单聊对话表
 */
export async function useCreateSingleChatContent(friendsId:string) {

  return new Promise((resolve, reject) => {
    SQLiteDb.transaction(
      Db => {
        Db.executeSql(
          `CREATE TABLE IF NOT EXISTS u_chat_${friendsId} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        senderId TEXT NOT NULL,
        recipient TEXT NOT NULL,
        type TEXT NOT NULL,
        content TEXT NOT NULL,
        timeStamp BIGINT NOT NULL)`
        );
      },
      error => reject(error),
      () => {
        resolve(true);
      }
    );
  });
}

/**
 * 创建好友信息列表
 */
export async function useCreateFriendsInfoList() {
  // const { id } = (await useGetStoreObject("userInfo")) as unknown as userDataInfoType;

  // const SQLiteDb: SQLite.WebSQLDatabase = SQLite.openDatabase(`${id}.db`, "1.0.1");
  return new Promise((resolve, reject) => {
    SQLiteDb.transaction(
      Db => {
        Db.executeSql(
          `CREATE TABLE IF NOT EXISTS u_friends_info (
        friendsId TEXT PRIMARY KEY ,
        avatar TEXT NOT NULL,
        friendsName TEXT NOT NULL,
        finalStatement TEXT NOT NULL,
        finalTime TEXT NOT NULL)`
        );
      },
      error => reject(error),
      () => {
        resolve(true);
      }
    );
  });
}

/**
 * 新增单聊好友聊天记录
 */
export function useAddSingleChatContent(parameter: SingleChatType) {
  const { senderId, recipient, type, content, timeStamp } = parameter;

  return new Promise((resolve, reject) => {
    SQLiteDb.transaction(
      Db => {
        Db.executeSql(
          `INSERT INTO u_chat_${recipient} (senderId,recipient,type,content,timeStamp) VALUES (?,?,?,?,?)`,
          [senderId, recipient, type, content, timeStamp]
        );
      },
      error => reject(error),
      () => {
        resolve(true);
      }
    );
  });
}

/**
 * 查询单聊记录
 */
export function useQueryDemand(parameter: QueryDemandType, limit: number) {
  const { surface, senderId, recipient } = parameter;
  // const SQLiteDb: SQLite.WebSQLDatabase = SQLite.openDatabase(`${recipient}.db`, "1.0.1");

  return new Promise((resolve, reject) => {
    SQLiteDb.exec(
      [
        {
          sql: `SELECT * FROM  u_chat_${recipient}
          WHERE (senderId = ? AND recipient= ?) OR (senderId= ? AND recipient=?)
          ORDER BY timeStamp DESC
          LIMIT ${limit} `,
          args: [senderId, recipient, recipient, senderId],
        },
      ],
      false,
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
}

/**
 * 删除单个好友数据库
 */
export async function useDeleteSQL() {
  // const SQLiteDb: SQLite.WebSQLDatabase = SQLite.openDatabase(`${friendsId}.db`, "1.0.1");
  SQLiteDb.closeAsync();
  return await SQLiteDb.deleteAsync();
}




//手机振动提示
export const Tips = () => {
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
