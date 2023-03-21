import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { styleAll } from "../../style";
import {
  useColorScheme,
  userAvatar,
  useSetStatusBarBackgroundColor,
  useThemeColor,
} from "../../hooks/useHooks";
import FriendsItem from "./FriendsItem";
import { RowMap, SwipeListView } from "react-native-swipe-list-view";
import { useToast } from "react-native-toast-notifications";
import { FriendInfoListType, HOME_ENTRANCE, INFO_CODE, ProviderProps } from "../../types";
import { messageContentType } from "../../hooks/WebSocketStore";
import { SafeAreaView } from "react-native-safe-area-context";

import { setStatusBarStyle } from "expo-status-bar";
import { Avatar, Badge, Div as Box } from "react-native-magnus";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { useCreateFriendsInfoList, useDeleteSQL, useQueryFriendList } from "../../hooks/useSQLite";

const Homes = ({ webSocketStore, store, Sqlite }: ProviderProps) => {
  const backgroundColor = useThemeColor("background");
  const secondaryBack = useThemeColor("secondaryBack");
  const threeLevelBack = useThemeColor("threeLevelBack");
  const useColorSchemes = useColorScheme();
  const [userList, setUserList] = useState<FriendInfoListType[]>([]);

  const ActionSheets = useRef<ActionSheetRef>(null);

  const color = useThemeColor("text");

  const navigation = useNavigation();
  const toast = useToast();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      store.setCurrentEntrance(HOME_ENTRANCE);
      store.setIsActivityIndicator(true);

      setStatusBarStyle("inverted");
      useSetStatusBarBackgroundColor(color);
      if (!store?.userInfo?.id) {
        // navigation.navigate("Login");
        toast.show("验证失效，请重新登陆");
        return;
      }

      // Sqlite.SqliteState?.Sqlite && useDeleteSQL(Sqlite.SqliteState?.Sqlite)
      //获取到Info
      if (!store.isConnect) {
        //判断是否连接
        if (webSocketStore.socketState.isReady && Sqlite.SqliteState.Sqlite) {
          //执行用户信息连接绑定
          webSocketStore.socketState.socket?.send(
            JSON.stringify({ event: 101, data: { token: store.userInfo.token } })
          );

          //创建好友基础列表库

          useCreateFriendsInfoList(Sqlite.SqliteState.Sqlite);

          webSocketStore.socketState.socket?.addEventListener("message", e => {
            const { data } = e;

            if (data === "PONG") return;

            const messageContent = JSON.parse(data) as messageContentType;

            if (messageContent.event === INFO_CODE) {
              store.setIsConnect(true);
            }
          });
        }
      }

      if (Sqlite.SqliteState.Sqlite) {
        try {
          const result = await useQueryFriendList(Sqlite.SqliteState.Sqlite);

          setUserList(result[0].rows as unknown as FriendInfoListType[]);
        } catch (error) {
          console.log(error, "获取好友消息列表失败");
        }
      }
    });
    return unsubscribe;
  }, [navigation]);

  const closeRow = (rowMap: RowMap<FriendInfoListType>, rowKey: string) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap: RowMap<FriendInfoListType>, rowKey: string) => {
    closeRow(rowMap, rowKey);
    const newData = [...userList];
    const prevIndex = userList.findIndex(item => item.friendsId === rowKey);
    newData.splice(prevIndex, 1);
    setUserList(newData);
  };

  const handleOpenExpression = () => {
    ActionSheets.current?.show();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color }} edges={["top", "right", "left"]}>
      <View style={[styles.head, styleAll.center, { shadowColor: backgroundColor }]}>
        <Box alignItems={"center"} flexDir='row' rounded={1}>
          <Badge bg='#1bc12e' right={0} top={37} h={10} w={10}>
            <Avatar source={{ uri: userAvatar }} />
          </Badge>
          <Text style={[{ color: backgroundColor }, styles.headName]}>测试名称</Text>
        </Box>

        <TouchableOpacity activeOpacity={0.7} onPress={handleOpenExpression}>
          <FontAwesome5 name='stream' size={24} color={backgroundColor} />
        </TouchableOpacity>
      </View>

      <SwipeListView
        style={[{ backgroundColor }, styles.DialogueList, styleAll.androidTop]}
        disableRightSwipe
        data={userList}
        renderItem={({ item }: { item: FriendInfoListType }) => (
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
              onPress={() => closeRow(rowMap, item.friendsId)}
            >
              <Text style={{ color: backgroundColor, fontFamily: "Inter-Black" }}>标记已读</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={() => deleteRow(rowMap, item.friendsId)}
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

      <ActionSheet
        ref={ActionSheets}
        useBottomSafeAreaPadding
        containerStyle={{
          height: "40%",
          backgroundColor: secondaryBack,
        }}
        statusBarTranslucent
      >
        <View style={styleAll.MoreHead} />
      </ActionSheet>
    </SafeAreaView>
  );
};

export default Homes;

const styles = StyleSheet.create({
  HomeMain: {
    width: "100%",
    height: "100%",
  },
  headName: {
    marginLeft: 15,
    fontSize: 18,
    fontFamily: "Inter-Black",
  },
  head: {
    width: "100%",
    height: 60,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
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
    height: "100%",
    // marginTop: "5%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
});
