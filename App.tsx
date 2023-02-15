import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  useAddSingleChatContent,
  useColorScheme,
  useCreateSingleChatContent,
  useQueryDemand,
} from "./hooks/useHooks";
import Navigation from "./navigation";
import { useFonts } from "expo-font";
import React, { useEffect } from "react";

export default function App() {
  const colorScheme = useColorScheme();
  useEffect(() => {
    useCreateSingleChatContent()
      .catch(err => {
        console.log(err);
      })
      .then(() => {
        // useAddSingleChatContent({
        //   senderId: "string",
        //   recipient: "string",
        //   type: "string",
        //   content: "string",
        //   timeStamp: 12334111,
        // })
        //   .then(res => {
        //     console.log(res);
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });

        useQueryDemand({
          surface: "u_chat_content",
          where: "time_stamp",
          whereParameter: 12334111,
        })
          .then((res: any) => {
            const { rows } = res[0];
            console.log(rows);
          })
          .catch(err => {
            console.log(err);
          });
      });
  }, []);

  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/fonts/Alimama_ShuHeiTi_Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* 黑夜模式 */}
      <Navigation colorScheme={colorScheme} />
      {/* {state.isActivityIndicator && <Loading />} */}
      <StatusBar style='auto' />
    </SafeAreaProvider>
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
