import { NavigatorScreenParams } from "@react-navigation/native";
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
  NotFound: undefined;
  FriendsList:undefined
  Dialogue: {
    friendInfo: FriendsItemProps;
  };
};

/**
 * vite HTML引入图片方法
 * @param type 1、文本 2、图片 3、语音  4、视频
 * @param isSender 1、本人发送 2、别人发送
 */
export interface SingleChatType {
  avatar?:string,
  isSender: number;
  userId: string;
  senderId: string;
  recipient: string;
  type: 1 | 2 | 3 | 4;
  content: string;
  timeStamp: number;
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
  accountId: number;
  avatar: string;
  crtTime: number;
  id: string;
  label: string;
  nickname: string;
  p: number;
  sex: number;
  star: number;
};
