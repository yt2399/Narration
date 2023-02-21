import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme, useThemeColor } from "./hooks/useHooks";
import Navigation from "./navigation";
import { useFonts } from "expo-font";
import React, { useEffect } from "react";
import { RecoilRoot } from "recoil";
import { ToastProvider } from "react-native-toast-notifications";

export default function App() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor("background");
  useEffect(() => {
    
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
    <RecoilRoot>
      <SafeAreaProvider style={{ flex: 1, backgroundColor }}>
        {/* 黑夜模式 */}
        <StatusBar style={"auto"} backgroundColor={backgroundColor} animated={true} />
        <ToastProvider>
          <Navigation colorScheme={colorScheme} />
        </ToastProvider>
        {/* {state.isActivityIndicator && <Loading />} */}
      </SafeAreaProvider>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
