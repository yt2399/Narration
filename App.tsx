import { useColorScheme, useThemeColor } from "./hooks/useHooks";
import { useFonts } from "expo-font";
import React, { useContext, useEffect } from "react";
import * as TaskManager from "expo-task-manager";
import AppWrapper from "./AppWrapper";
import { Provider } from "mobx-react";
import webSocketStore from "./hooks/WebSocketStore";
import store from "./hooks/store";
import useSqliteState from "./hooks/useSQLite";
import { AppState } from "react-native";

export default function App() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor("background");

  useEffect(() => {
    webSocketStore.connect();

    // AppState.addEventListener('change', (type)=>{
      
     
    //   console.log('断开连接');
      
    // });

    return () => {
      console.log('断开');
       webSocketStore.disconnect()

    };

    // setUserData({

    //     token: "111222",
    //     nickname: "33311",
    //     avatar: "222211",
    //     id: "333311",

    // })
    //创建数据库
    // useDeleteSQL().then(()=>{
    //   console.log(111);

    // }).catch((err)=>{
    //   console.log(err);

    // })
  }, []);



  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/fonts/Alimama_ShuHeiTi_Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider webSocketStore={webSocketStore} store={store} Sqlite={useSqliteState}>
      <AppWrapper />
    </Provider>
  );
}
