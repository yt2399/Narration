import React from 'react';

export type UserInfo = {
  avatar: string
  id: string
  nickname: string
  token: string
};

export type socketType = {
  socket: WebSocket | null
  isReady: boolean
}

type WebSocketContextValue = {
  socketState: socketType | null;
  setSocketState: (socketState: socketType | null) => void;
};

type UserContextValue = {
  userInfo: UserInfo | null;
  setUserInfo: (user: UserInfo | null) => void;
};

export const WebSocketContext = React.createContext<WebSocketContextValue>({
  socketState: { socket: null, isReady: false },
  setSocketState: () => { },
});

export const UserContext = React.createContext<UserContextValue>({
  userInfo: null,
  setUserInfo: () => { },
});
