import { NavigatorScreenParams } from "@react-navigation/native";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootTabParamList = {
  Home: undefined;
};

export type RootStackParamList = {
  Home: NavigatorScreenParams<RootTabParamList> | undefined;
  Mine: undefined;
  NotFound: undefined;
  Dialogue: undefined;
};

export interface SingleChatType {
  senderId: string;
  recipient: string;
  type: string;
  content: string;
  timeStamp: number;
}

export type QueryDemandType = {
  surface: string;
  where: string;
  whereParameter: string | number;
};
