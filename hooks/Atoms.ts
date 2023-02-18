import { atom } from "recoil";
// 创建 WebSocketSubject 实例
const webSocket = new WebSocket('ws://192.168.1.174:9999');

export const userId = atom({
  key: "userId",
  default: "JDVO7z94uUDeVsLctotJu11",
});

//用于保存 WebSocket
export const webSockets = atom({
  key: "webSockets",
  default: webSocket,
});

//用于保存 WebSocket 的连接状态
export const webSocketState = atom({
  key: "webSocketState",
  default: 3,
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
