import { NavigatorScreenParams } from "@react-navigation/native";
import { ImagePickerAsset } from "expo-image-picker";
import { Store, StoreType } from "../hooks/store";
import { useSqlite, useSqliteStateType } from "../hooks/useSQLite";
import { WebSocketStore } from "../hooks/WebSocketStore";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type UserInfo = {
  avatar: string;
  id: string;
  nickname: string;
  token: string;
};

export type RootTabParamList = {
  Home: undefined;
};

export type RootStackParamList = {
  Start: undefined;
  Login: undefined;
  Home: undefined;
  Mine: undefined;
  Camera: undefined;
  FriendsDetails: { friendInfo: FriendInfoListType };
  NotFound: undefined;
  FriendsList: undefined;
  Dialogue: { friendInfo: FriendInfoListType };
};

/**
 * @param nickname      发送人名称
 * @param avatar        发送人头像
 * @param isSingleChat  是否为单聊模式   0为群聊  1为单聊
 * @param type          1、文本 2、图片 3、语音  4、视频
 * @param isSender      1、本人发送 2、别人发送
 * @param isSuccess     消息状态 1、成功 0等待中 -1失败
 *
 */
export interface SingleChatType {
  nickname: string;
  avatar: string;
  isSingleChat: number;
  isSender: number;
  userId: string;
  senderId: string;
  recipient: string;
  type: 1 | 2 | 3 | 4;
  isSuccess: typeof CODE_SUCCESS | typeof CODE_AWAIT | typeof CODE_FAIL;
  content: string;
  timeStamp: number;
}

/**
 * @param isSingleChat  是否为单聊模式   0为群聊  1为单聊
 * @param lastMessage   最后一条留言
 * @param star          0、未标星 2、星标好友
 * @param updTime       上次资料修改时间
 */

export interface FriendInfoListType {
  isSingleChat:number
  friendsId: string;
  avatar: string;
  friendsName: string;
  lastMessage: string;
  lastMessageCount: number;
  // msgType: typeof TYPE_TEXT | typeof TYPE_IMG | typeof TYPE_AUDIO | typeof TYPE_VIDEO
  finalTime: number;
  star: number;
  updTime: number;
}

export type SingleChatContentType = {
  sender_id: string;
  recipient: string;
  type: 1 | 2 | 3 | 4;
  content: string;
  time_stamp: number;
};

export type QueryDemandType = {
  surface: string;
  recipient: string | number;
  senderId: string | number;
};

//传输消息Type
export const TYPE_TEXT = 1;
export const TYPE_IMG = 2;
export const TYPE_AUDIO = 3;
export const TYPE_VIDEO = 4;

//消息状态
export const CODE_SUCCESS = 1;
export const CODE_AWAIT = 0;
export const CODE_FAIL = -1;

//页面入口
export const HOME_ENTRANCE = 101;

//聊天入口
export const DIALOGUE_ENTRANCE = 101;

//登陆入口
export const LOGIN_ENTRANCE = 103;

//socket协议
export const ERROR_CODE = 102; //返回错误
export const INFO_CODE = 101; //返回校验成功
export const MAIL_CODE = 127; //通讯录返回

export interface userDataInfoType {
  token: string;
  nickname: string;
  avatar: string;
  id: string;
}

export type ProviderProps = {
  webSocketStore: WebSocketStore;
  store: Store;
  Sqlite: useSqlite;
};

export type FriendsItemProps = {
  isSingleChat:number
  accountId: number;
  avatar: string;
  crtTime: number;
  id: string;
  label: string;
  nickname: string;
  p: number;
  sex: number;
  star: number;
  updTime: number;
};
