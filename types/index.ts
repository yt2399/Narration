import { NavigatorScreenParams } from "@react-navigation/native";
import { StoreType } from "../hooks/store";
import { WebSocketStore } from "../hooks/WebSocketStore";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type UserInfo = {
  avatar: string
  id: string
  nickname: string
  token: string
};


export type RootTabParamList = {
  Home: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Mine: undefined;
  Camera: undefined;
  NotFound: undefined;
  Dialogue: undefined;
};

export interface SingleChatType {
  senderId: string;
  recipient: string;
  type: "text" | "img" | "video" | "audio";
  content: string;
  timeStamp: number;
}

export type SingleChatContentType = {
  sender_id: string;
  recipient: string;
  type: "text" | "img" | "video" | "audio";
  content: string;
  time_stamp: number;
};

export type QueryDemandType = {
  surface: string;
  recipient: string | number;
  senderId: string | number;
};

//WebSocket所需Type
export const WEBSOCKET_CONNECT = "WEBSOCKET_CONNECT";
export const WEBSOCKET_DISCONNECT = "WEBSOCKET_DISCONNECT";
export const WEBSOCKET_SEND = "WEBSOCKET_SEND";
export const WEBSOCKET_RECEIVE = "WEBSOCKET_RECEIVE";

export interface userDataInfoType {
  token: string;
  nickname: string;
  avatar: string;
  id: string;
}

export type ProviderProps = {
  webSocketStore: WebSocketStore;
  store: {
    setUser: (Info: StoreType | null) => void;
    setCurrentEntrance: (Entrance: number) => void;
    setCurrentFriends: (Friends: string) => void;
    userInfo: StoreType;
    currentEntrance: number;
    currentFriends: string;
  };
};
