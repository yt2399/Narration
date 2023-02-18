import * as Haptics from "expo-haptics";
const webSocket = new WebSocket("ws://192.168.1.174:9999");
// import { useToast } from "react-native-toast-notifications";
export function MonitorWebSocket() {
  // const toast = useToast();
  let polling: NodeJS.Timer;
  webSocket.onopen = () => {
    //连接成功，保持心跳
    // toast.show("连接成功");
    webSocket.send("PING");
    polling = setInterval(() => {
      webSocket.send("PING");
    }, 14 * 1000);

    webSocket.addEventListener("message", e => {
      const { data } = e;

      // let count = 0;
      // let impactAsync = setInterval(() => {
      //   count++;
      //   if (count >= 10) {
      //     clearInterval(impactAsync);
      //     return;
      //   }
      //   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      // }, 100);

      if (data) {
        try {
          const messageContent = JSON.parse(data);
          console.log(messageContent);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  webSocket.onerror = () => {
    clearInterval(polling);
  };

  webSocket.onclose = () => {
    clearInterval(polling);
  };
}
