import { View, Text, StyleSheet, AppState, ImageBackground } from "react-native";
import React, { useEffect } from "react";
import { ProviderProps } from "../../types";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import { useGetStoreObject } from "../../hooks/useStorage";
import { styleAll } from "../../style";
import { useCreateFriendsInfoList } from "../../hooks/useSQLite";

const Start = ({ webSocketStore, store, Sqlite }: ProviderProps) => {
  const navigation = useNavigation();
  const toast = useToast();
  const img = require("../../assets/backgroundImg/startImg.png");
  useEffect(() => {
    AppState.addEventListener("change", nextAppState => {
      if (nextAppState === "background" || nextAppState === "inactive") {
        console.log("进入back");
        webSocketStore.disconnect();
      } else if (nextAppState === "active") {
        webSocketStore.connect();
        console.log("重新连接");
      }
    });
    useGetStoreObjects();
  }, []);

  const useGetStoreObjects = async () => {
    try {
      const result = (await useGetStoreObject("userInfo")) as any;
      console.log(result);

      if (result) {
        //连接webSocket
        webSocketStore.connect();

        //连接sql
        Sqlite.connect(result.id);

        //置入userInfo
        store.setUser(result);

        //创建好友用户表
        Sqlite.SqliteState.Sqlite && useCreateFriendsInfoList(Sqlite.SqliteState.Sqlite);

        setTimeout(() => {
          navigation.navigate("Home");
        }, 3000);
        return;
      }

      routerGo("Login", true);
    } catch (error) {
      console.log(error);

      routerGo("Login", true);
    }
  };

  const routerGo = (routerName: "Login" | "Home", isToast: boolean) => {
    setTimeout(() => {
      navigation.navigate(routerName);
      isToast && toast.show("验证失效，请重新登陆");
    }, 3000);
  };

  return (
    <View style={[styles.StartMain]}>
      <ImageBackground source={img} style={{ flex: 1 }}>
        <Text style={styles.Text}>连接彼此，探索世界</Text>
      </ImageBackground>
    </View>
  );
};

export default Start;

const styles = StyleSheet.create({
  StartMain: {
    flex: 1,
    backgroundColor: "#fff",
  },
  Text: {
    marginTop:"65%",
    marginLeft:50,
    fontFamily: "Inter-Black",
    fontSize: 28,
  },
});
