import * as Haptics from "expo-haptics";
import { useRecoilState, useRecoilValue } from "recoil";
import { webSocketState } from "./Atoms";
import { useRemoveStore } from "./useStorage";
export let webSockets = new WebSocket("ws://192.168.1.174:9999");
type messageContentType = {
  event: number;
  data: Array<any>;
};

type Message = string | ArrayBuffer;



export const useWebSocket = () => {
  const [socketState, setSocketState] = useRecoilState(webSocketState);

  const connect = (url: string) => {
    const socket = new WebSocket(url);
    socket.onopen = () => {
      console.log('链接成功');

      setSocketState({ socket, messages: [], isReady: true });
    };

    socket.onmessage = (event) => {
      setSocketState((prev) => ({
        ...prev,
        messages: [...prev.messages, event.data],
      }));
    };

    socket.onclose = (event) => {
      setSocketState({ socket: null, messages: [], isReady: false });
    };
  };

  const send = (message: Message) => {
    if (socketState.socket && socketState.socket.readyState === WebSocket.OPEN) {
      socketState.socket.send(message);
    } else {
      console.warn("WebSocket未连接");
    }
  };

  return { socketState, connect, send };
};

//获取消息
export const useWebSocketMessages = () => {
  return useRecoilValue(webSocketState).messages;
};

//获取socket状态
export const useWebSocketIsReady = () => {
  return useRecoilValue(webSocketState).isReady;
};






const sendMsg = (token: string) => {
  const msg = {
    event: "101",
    data: {
      token,
    },
  };
  webSockets.send(JSON.stringify(msg));
};






//首次连接webSocket
export const MonitorWebSocket = (token: string) => {
  // return new Promise((resolve, reject) => {
  let polling: NodeJS.Timer;
  webSockets.onopen = () => {
    //连接成功，保持心跳
    sendMsg(token);
    console.log("onopen");

    polling = setInterval(() => {
      webSockets.send("PING");
    }, 14 * 1000);
  };

  // MessageCope(resolve, reject);
  webSockets.onerror = event => {
    console.log(event, "websocket链接错误");
    // reject(false);
    clearInterval(polling);
  };

  webSockets.onclose = () => {
    console.log("onerror");
    // reject(false);
    clearInterval(polling);
  };
  // });
};

// 首次链接
const MessageCope = (resolve: (value: boolean) => void, reject: (value: boolean) => void) => {
  webSockets.addEventListener("message", e => {
    const { data } = e;
    if (data) {
      if (data === "PONG") return;
      const messageContent = JSON.parse(data) as messageContentType;
      if (messageContent.event === 102) {
        reject(false);
        useRemoveStore("userInfo");
        webSockets.close();
        return;
      }
      resolve(true);
    }
  });
};

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


