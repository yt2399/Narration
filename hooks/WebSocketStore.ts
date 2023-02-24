import { makeAutoObservable } from "mobx";
import store, { StoreType } from "./store";
import { useRemoveStore } from "./useStorage";

export interface SocketState {
  socket: WebSocket | null;
  isReady: boolean;
}

export class WebSocketStore {
  socketState: SocketState = {
    socket: null,
    isReady: false,
  };

  constructor() {
    makeAutoObservable(this);
  }

  connect() {
    let polling: NodeJS.Timer;
    this.socketState.socket = new WebSocket("ws://43.136.103.251:9999");
    this.socketState.socket.addEventListener("open", () => {
      //改变isReady状态
      this.socketState.isReady = true;

      //连接成功后先发送一条保持连接
      this.socketState.socket?.send("PING");

      //计时器循环保持长连接
      polling = setInterval(() => {
        this.socketState.socket?.send("PING");
      }, 14 * 1000);

      this.socketState.socket && MonitorWebSocket(this.socketState.socket);
    });
    this.socketState.socket.addEventListener("close", () => {
      console.log("WebSocket disconnected");

      //断开改变isReady状态
      this.socketState.isReady = false;

      //断开关闭计时器
      clearInterval(polling);
    });
  }

  disconnect() {
    if (this.socketState.socket) {
      this.socketState.socket.close();
      this.socketState.socket = null;
      this.socketState.isReady = false;
    }
  }
}

type messageContentType = {
  event: number;
  data: any;
};

const MonitorWebSocket = (webSockets: WebSocket) => {
  //连接成功，保持心跳

  webSockets.addEventListener("message", e => {
    const { data } = e;
    if (data) {
      console.log(data);

      if (data === "PONG") return;
      try {
        console.log(data);
        const messageContent = JSON.parse(data) as messageContentType;
        if (messageContent.event === 102) {
          //清空store
          useRemoveStore("userInfo");

          //清空UserInfo
          store.setUser({ nickname: "", avatar: "", id: "", token: "" });

          //关闭链接
          webSockets.close();

          // toast.show(messageContent.data.server_msg);
          return;
        }

        //处理除了102的数据
      } catch (error) {
        console.log(error);
      }
    }
  });
};

const webSocketStore = new WebSocketStore();

export default webSocketStore;
