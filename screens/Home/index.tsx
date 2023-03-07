import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Shadow, version } from "react-native-shadow-2";
import { AntDesign } from "@expo/vector-icons";
import { styleAll } from "../../style";
import { useThemeColor } from "../../hooks/useHooks";
import FriendsItem from "./FriendsItem";
import { RowMap, SwipeListView } from "react-native-swipe-list-view";
import { useToast } from "react-native-toast-notifications";
import { FriendsItemProps, HOME_ENTRANCE, INFO_CODE, MAIL_CODE, ProviderProps } from "../../types";
import { messageContentType } from "../../hooks/WebSocketStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRemoveStore } from "../../hooks/useStorage";
import { StatusBar } from "expo-status-bar";

const Homes = ({ webSocketStore, store, Sqlite }: ProviderProps) => {
  const backgroundColor = useThemeColor("background");
  const secondaryBack = useThemeColor("secondaryBack");
  const threeLevelBack = useThemeColor("threeLevelBack");

  const [userList, setUserList] = useState<FriendsItemProps[]>([]);

  const color = useThemeColor("text");

  const navigation = useNavigation();
  const toast = useToast();

  useEffect(() => {
    // useRemoveStore('userInfo')
    const unsubscribe = navigation.addListener("focus", async () => {
      store.setCurrentEntrance(HOME_ENTRANCE);

      store.setIsActivityIndicator(true);

      console.log(store?.userInfo?.id);

      if (!store?.userInfo?.id) {
        navigation.navigate("Login");
        toast.show("验证失效，请重新登陆");
        return;
      }
      const { id } = store.userInfo;

      // useDeleteSQL(Sqlite.SqliteState.Sqlite)
      //获取到Info
      if (!store.isConnect) {
        //判断是否连接
        if (webSocketStore.socketState.isReady) {
          //执行用户信息连接绑定
          webSocketStore.socketState.socket?.send(
            JSON.stringify({ event: 101, data: { token: store.userInfo.token } })
          );

          //创建好友基础列表库
          // Sqlite.SqliteState.Sqlite && useCreateFriendsInfoList(Sqlite.SqliteState.Sqlite);

          webSocketStore.socketState.socket?.addEventListener("message", e => {
            const { data } = e;

            if (data === "PONG") return;

            const messageContent = JSON.parse(data) as messageContentType;

            if (messageContent.event === INFO_CODE) {
              store.setIsConnect(true);
            }

            if (messageContent.event === MAIL_CODE) {
              console.log(messageContent, "home");
              setUserList(messageContent.data.dataList);
            }
          });
        }
      }

      if (webSocketStore.socketState.isReady) {
        webSocketStore.socketState.socket?.send(
          JSON.stringify({ event: 199, data: { id, type: MAIL_CODE } })
        );
        console.log("发送获取通讯录");
      }
    });
    return unsubscribe;
  }, [navigation]);

  const closeRow = (rowMap: RowMap<FriendsItemProps>, rowKey: string) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap: RowMap<FriendsItemProps>, rowKey: string) => {
    closeRow(rowMap, rowKey);
    const newData = [...userList];
    const prevIndex = userList.findIndex(item => item.id === rowKey);
    newData.splice(prevIndex, 1);
    setUserList(newData);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: secondaryBack }}
      edges={["top", "right", "left"]}
    >
      <StatusBar backgroundColor={secondaryBack} animated={true} />
      <View style={[styles.head, styleAll.center]}>
        <AntDesign name='search1' size={24} color={color} />
        <AntDesign name='pluscircle' size={24} color={color} />
      </View>

      <SwipeListView
        style={[{ backgroundColor }, styles.DialogueList]}
        disableRightSwipe
        data={userList}
        renderItem={({ item }: { item: FriendsItemProps }) => (
          <TouchableHighlight
            onPress={() => navigation.navigate("Dialogue", { friendInfo: item })}
            style={styles.rowFront}
          >
            <FriendsItem {...item} />
          </TouchableHighlight>
        )}
        renderHiddenItem={({ item }, rowMap) => (
          <View style={[styles.rowBack, { backgroundColor: secondaryBack }]}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.backRightBtn, styles.backRightBtnLeft, { backgroundColor: color }]}
              onPress={() => closeRow(rowMap, item.id)}
            >
              <Text style={{ color: backgroundColor, fontFamily: "Inter-Black" }}>标记已读</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={() => deleteRow(rowMap, item.id)}
            >
              <Text style={{ color: backgroundColor, fontFamily: "Inter-Black" }}>删除</Text>
            </TouchableOpacity>
          </View>
        )}
        leftOpenValue={0}
        rightOpenValue={-150}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={2000}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Homes;

const styles = StyleSheet.create({
  HomeMain: {
    width: "100%",
    height: "100%",
  },
  head: {
    width: "100%",
    height: 50,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 50,
  },
  headTitle: {
    fontFamily: "Inter-Black",
    fontSize: 30,
    color: "#212529",
  },

  rowFront: {
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    overflow: "hidden",
  },
  rowBack: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    height: 70,
  },
  backRightBtnLeft: {
    backgroundColor: "#000",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "#e75d58",
    right: 0,
  },
  DialogueList: {
    width: "100%",
    height: "70%",
    marginTop: "5%",
    marginBottom: "4%",
    borderRadius: 20,
    overflow: "hidden",
  },
});
