import { Button, StyleSheet, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Https } from "../../api";
import * as Crypto from "expo-crypto";
import * as Device from "expo-device";

import { useToast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/native";
import { useStoreObject } from "../../hooks/useStorage";
import { LOGIN_ENTRANCE, ProviderProps } from "../../types";

const Login = ({ webSocketStore, store, Sqlite }: ProviderProps) => {
  const [account, setAccount] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigation().navigate;

  const toast = useToast();

  //引入websocket状态

  const onChangeAccount = (value: string) => {
    setAccount(value);
  };
  const onChangePwd = (value: string) => {
    setPwd(value);
  };

  useEffect(() => {
    store.setCurrentEntrance(LOGIN_ENTRANCE);
    // useRemoveStore('userInfo')
  }, []);

  const handleLogin = async () => {
    const digest = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.MD5, pwd);
    const deviceNo = Device.osInternalBuildId;
    try {
      const { code, data } = await Https.userLogin({
        account,
        pwd: digest,
        deviceNo,
      });
      if (code === 200) {
        await useStoreObject("userInfo", data);

        webSocketStore.connect();
        Sqlite.connect(data.id);
        store.setUser(data);

        // webSocketStore.socketState.socket?.send(
        //   JSON.stringify({ event: 101, data: { token: data.token } })
        // );
        toast.show("登录成功");
        setTimeout(() => {
          navigate("Home");
        }, 200);
      }
    } catch (error: any) {
      console.log(error);

      toast.show("登录错误，参考报错");
    }
  };
  return (
    <View style={styles.LoginMain}>
      <View style={styles.LoginBlock}>
        <TextInput
          style={{ width: "80%", height: 40, borderColor: "#000", borderWidth: 1 }}
          onChangeText={text => onChangeAccount(text)}
          value={account}
        />
        <TextInput
          style={{ width: "80%", height: 40, borderColor: "#000", borderWidth: 1 }}
          onChangeText={text => onChangePwd(text)}
          value={pwd}
        />

        <Button
          onPress={handleLogin}
          title='登录-------'
          color='#000'
          accessibilityLabel='Learn more about this purple button'
        />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  LoginMain: {
    flex: 1,

    backgroundColor: "#fff",
  },
  LoginBlock: {
    width: "100%",
    height: 500,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
