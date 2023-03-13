import { useColorScheme, useThemeColor } from "./hooks/useHooks";
import { useFonts } from "expo-font";
import React from "react";

import { Provider } from "mobx-react";
import webSocketStore from "./hooks/WebSocketStore";
import store from "./hooks/store";
import useSqliteState from "./hooks/useSQLite";
import { StatusBar } from "expo-status-bar";
import { ToastProvider } from "react-native-toast-notifications";
import Navigation from "./navigation";
import Loading from "./components/Loading";
import { ThemeProvider } from "react-native-magnus";

export default function App() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor("background");

  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/fonts/Alimama_ShuHeiTi_Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider {...{ webSocketStore, store, Sqlite: useSqliteState }}>
      {/* 黑夜模式 */}
      <StatusBar style={"auto"} {...{ backgroundColor }} animated={true} />
      <ThemeProvider>
        <ToastProvider>
          <Navigation {...{ colorScheme }} />
        </ToastProvider>
      </ThemeProvider>

      {/* {store.isActivityIndicator && <Loading />} */}
    </Provider>
  );
}
