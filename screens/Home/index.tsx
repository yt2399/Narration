import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
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
import {
  FriendInfoListType,
  FriendsItemProps,
  HOME_ENTRANCE,
  INFO_CODE,
  MAIL_CODE,
  ProviderProps,
} from "../../types";
import { messageContentType } from "../../hooks/WebSocketStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRemoveStore } from "../../hooks/useStorage";
import { setStatusBarBackgroundColor, setStatusBarStyle, StatusBar } from "expo-status-bar";
import { Avatar, Badge, Div as Box } from "react-native-magnus";
import ActionSheet, { ActionSheetRef, SheetProvider } from "react-native-actions-sheet";
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
      setStatusBarStyle('inverted');
      useSetStatusBarBackgroundColor(color);
      store.setCurrentEntrance(HOME_ENTRANCE);

      store.setIsActivityIndicator(true);

      if (!store?.userInfo?.id) {
        // navigation.navigate("Login");
        toast.show("??????????????????????????????");
        return;
      }

      // Sqlite.SqliteState?.Sqlite && useDeleteSQL(Sqlite.SqliteState?.Sqlite)
      //?????????Info
      if (!store.isConnect) {
        //??????????????????
        if (webSocketStore.socketState.isReady && Sqlite.SqliteState.Sqlite) {
          //??????????????????????????????
          webSocketStore.socketState.socket?.send(
            JSON.stringify({ event: 101, data: { token: store.userInfo.token } })
          );

          //???????????????????????????

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
          console.log(error, "??????????????????????????????");
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
            <Avatar
              source={{
                uri: userAvatar,
              }}
            />
          </Badge>
          <Text
            style={{
              color: backgroundColor,
              marginLeft: 15,
              fontSize: 18,
              fontFamily: "Inter-Black",
            }}
          >
            ????????????
          </Text>
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
              <Text style={{ color: backgroundColor, fontFamily: "Inter-Black" }}>????????????</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={() => deleteRow(rowMap, item.friendsId)}
            >
              <Text style={{ color: backgroundColor, fontFamily: "Inter-Black" }}>??????</Text>
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
