import { StyleSheet, TextInput, useWindowDimensions, View, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FriendsItemProps, MAIL_CODE, ProviderProps } from "../../types";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useColorScheme,
  useSetStatusBarBackgroundColor,
  useThemeColor,
  useWindow,
} from "../../hooks/useHooks";
import { setStatusBarBackgroundColor, setStatusBarStyle, StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import { styleAll } from "../../style";
import { useNavigation } from "@react-navigation/native";
import { TabView, SceneMap } from "react-native-tab-view";

import FriendsAll from "./FriendsAll";
import GroupChat from "./GroupChat";
import NewFriends from "./NewFriends";
import StarTarget from "./StarTarget";
import { messageContentType } from "../../hooks/WebSocketStore";
import { useToast } from "react-native-toast-notifications";

import TabBar from "../../components/TabBar";

const Width = useWindow("Width");
const FriendsList = ({ webSocketStore, store, Sqlite }: ProviderProps) => {
  const [routes] = React.useState([
    { key: "all", title: "好友列表" },
    { key: "groupChat", title: "群聊" },
    { key: "starTarget", title: "星标好友" },
    { key: "newFriends", title: "新的朋友" },
  ]);
  const navigation = useNavigation();
  const backgroundColor = useThemeColor("background");
  const secondaryBack = useThemeColor("secondaryBack");
  const threeLevelBack = useThemeColor("threeLevelBack");
  const layout = useWindowDimensions();
  const useColorSchemes = useColorScheme();
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      setStatusBarStyle('auto');
      useSetStatusBarBackgroundColor('#fff');
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (!store?.userInfo?.id) {
      // navigation.navigate("Login");
      Toast.show("验证失效，请重新登陆");
      return;
    }
    const { id } = store.userInfo;
    console.log(webSocketStore.socketState.isReady, id);

    if (webSocketStore.socketState.isReady) {
      getFriendsAll();

      webSocketStore.socketState.socket?.send(
        JSON.stringify({ event: 199, data: { id, type: MAIL_CODE } })
      );
    }
  }, []);

  const Toast = useToast();
  const [userList, setUserList] = useState<FriendsItemProps[]>([]);

  const getFriendsAll = () => {
    webSocketStore.socketState.socket?.addEventListener("message", e => {
      const { data } = e;
      console.log(data);

      if (data === "PONG") return;

      const messageContent = JSON.parse(data) as messageContentType;

      if (messageContent.event === MAIL_CODE) {
        setUserList(messageContent.data.dataList);
      }
    });
  };

  const [value, setValue] = useState<string>();

  const handleSendChatContent = () => {
    console.log("触发搜索");
  };

  const all = () => <FriendsAll Sqlite={Sqlite.SqliteState.Sqlite} userList={userList} />;
  const groupChat = () => <GroupChat />;
  const starTarget = () => <StarTarget />;
  const newFriends = () => <NewFriends />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }} edges={["top", "right", "left"]}>
      {/* <StatusBar style={'auto'}  animated={true} /> */}

      <View style={[styles.header, styleAll.center, { backgroundColor: threeLevelBack }]}>
        <AntDesign name='search1' size={24} color={"#ccc"} />
        <TextInput
          style={styles.toolbarTextInput}
          onChangeText={text => setValue(text)}
          value={value}
          cursorColor={backgroundColor}
          returnKeyType={"send"}
          clearButtonMode={"while-editing"}
          selectTextOnFocus={true}
          enablesReturnKeyAutomatically={true}
          onSubmitEditing={handleSendChatContent}
          placeholderTextColor={"#ccc"}
          placeholder='搜索好友'
          textAlignVertical='auto'
          maxLength={300}
        />
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          all,
          groupChat,
          starTarget,
          newFriends,
        })}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={prop => <TabBar {...{ ...prop, setIndex }} />}
        lazy
      />
    </SafeAreaView>
  );
};

export default FriendsList;

const styles = StyleSheet.create({
  header: {
    width: "90%",
    height: 50,
    marginLeft: "5%",
    marginTop: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  toolbarTextInput: {
    width: "90%",
    height: 50,
    paddingHorizontal: 10,
    fontSize: 17,
  },
  addFriends: {
    width: "90%",
    height: 50,
    marginLeft: "5%",
    marginTop: 20,
  },
  addFriendsIcon: {
    width: 50,
    height: 50,
    borderRadius: 99,
    backgroundColor: "#edf3fc",
    justifyContent: "center",
  },
});
