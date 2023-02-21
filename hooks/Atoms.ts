import { useRef } from "react";
import { atom ,useRecoilState, useRecoilValue } from "recoil";
// 创建 WebSocketSubject 实例

export const userData = atom({
  key: "userData",
  default: {
    token: "",
    nickname: "",
    avatar: "",
    id: "",
  },
});

//判断当前用户界面入口
//根据入口转换不同收受消息类型场景
//101.首页 102.朋友列表 103.聊天框中
export const currentEntrance = atom({
  key: "currentEntrance",
  default: 101,
});

//
export const currentFriends = atom({
  key: "currentFriends",
  default: "1",
});



type Message = string | ArrayBuffer;

type WebSocketState = {
  socket: WebSocket | null;
  messages: Message[];
  isReady: boolean;
};

export const webSocketState = atom<WebSocketState>({
  key: "webSocketState",
  default: { socket: null, messages: [], isReady: false },
});

// export const useWebSocket = () => {
//   const [socketState, setSocketState] = useRecoilState(webSocketState);

//   const connect = (url: string) => {
//     const socket = new WebSocket(url);
//     socket.onopen = () => {
//       console.log('链接成功');

//       setSocketState({ socket, messages: [], isReady: true });
//     };

//     socket.onmessage = (event) => {
//       setSocketState((prev) => ({
//         ...prev,
//         messages: [...prev.messages, event.data],
//       }));
//     };

//     socket.onclose = (event) => {
//       setSocketState({ socket: null, messages: [], isReady: false });
//     };
//   };

//   const send = (message: Message) => {
//     if (socketState.socket && socketState.socket.readyState === WebSocket.OPEN) {
//       socketState.socket.send(message);
//     } else {
//       console.warn("WebSocket未连接");
//     }
//   };

//   return { socketState, connect, send };
// };

// export const useWebSocketMessages = () => {
//   return useRecoilValue(webSocketState).messages;
// };

// export const useWebSocketIsReady = () => {
//   return useRecoilValue(webSocketState).isReady;
// };
