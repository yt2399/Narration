import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  RefreshControl,
  Keyboard,
  KeyboardEvent,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import React, { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { styleAll } from "../../style";
import DialogueContents from "./DialogueContent";
import { useThemeColor, useWindow, useColorScheme, Haptic } from "../../hooks/useHooks";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import {
  DIALOGUE_ENTRANCE,
  FriendInfoListType,
  FriendsItemProps,
  ProviderProps,
  SingleChatType,
  TYPE_TEXT,
} from "../../types";
import Colors from "../../constants/Colors";
import DialogueHead from "./DialogueHead";
import EmojiPicker from "rn-emoji-keyboard";
import { EmojiType } from "rn-emoji-keyboard/lib/typescript/src/types";
import More from "./More";
import { useNavigation, useRoute } from "@react-navigation/native";
import { messageContentType } from "../../hooks/WebSocketStore";
import {
  useAddFriendMsg,
  useAddSingleChatContent,
  useCreateSingleChatContent,
  useQueryDemand,
} from "../../hooks/useSQLite";
import { useToast } from "react-native-toast-notifications";
import { setStatusBarStyle, StatusBar } from "expo-status-bar";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    reverse: true,
    body: {
      type: "img",
      content: "https://scpic.chinaz.net/files/default/imgs/2023-02-08/2f4904ef99101e4f.jpg",
    },
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    reverse: true,
    body: {
      type: "img",
      content: "https://scpic.chinaz.net/files/default/imgs/2023-01-15/3fbe8addb1afedde.jpg",
    },
  },
  {
    id: "58694a0f-3da1-471f-b",
    reverse: false,
    body: {
      type: "img",
      content: "https://scpic.chinaz.net/files/default/imgs/2023-02-09/ccd3d575ea69fb79.jpg",
    },
  },
  {
    id: "bd7acbea-c1b1-46c",
    reverse: true,
    body: {
      type: "img",
      content: "https://scpic.chinaz.net/files/default/imgs/2023-02-08/c9ae548bb7a27ac1.jpg",
    },
  },
  {
    id: "3ac68afc-c605-48d",
    reverse: false,
    body: {
      type: "audio",
      content:
        "https://tts.baidu.com/text2audio?time=1676129273&lan=ZH&vol=9&cuid=baike&ctp=1&rate=32&per=4100&tex=%E6%95%85%E9%87%8C%E5%9C%A8%E9%99%95%E8%A5%BF%E7%9C%81%E6%B1%89%E4%B8%AD%E5%B8%82%E5%9F%8E%E5%9B%BA%E5%8E%BF%E5%9F%8E%E5%8D%972%E5%8D%83%E7%B1%B3%E5%A4%84%E6%B1%89%E6%B1%9F%E4%B9%8B%E6%BB%A8%E7%9A%84%E5%8D%9A%E6%9C%9B%E6%9D%91%E3%80%82&pdt=32&auth=f6bef8f7b19a4063f4a07c0e4a0a49abc3a94fb57a048504a2765f39fc579b98",
    },
  },
  {
    id: "58694a0f-3da1-471f",
    reverse: true,
    body: {
      type: "audio",
      content:
        "https://tts.baidu.com/text2audio?time=1676129273&lan=ZH&vol=9&cuid=baike&ctp=1&rate=32&per=4100&tex=%E6%95%85%E9%87%8C%E5%9C%A8%E9%99%95%E8%A5%BF%E7%9C%81%E6%B1%89%E4%B8%AD%E5%B8%82%E5%9F%8E%E5%9B%BA%E5%8E%BF%E5%9F%8E%E5%8D%972%E5%8D%83%E7%B1%B3%E5%A4%84%E6%B1%89%E6%B1%9F%E4%B9%8B%E6%BB%A8%E7%9A%84%E5%8D%9A%E6%9C%9B%E6%9D%91%E3%80%82&pdt=32&auth=f6bef8f7b19a4063f4a07c0e4a0a49abc3a94fb57a048504a2765f39fc579b98",
    },
  },
  {
    id: "bd7acbea-c1b1-46c2-a",
    reverse: false,
    body: {
      type: "audio",
      content:
        "https://tts.baidu.com/text2audio?time=1676129273&lan=ZH&vol=9&cuid=baike&ctp=1&rate=32&per=4100&tex=%E6%95%85%E9%87%8C%E5%9C%A8%E9%99%95%E8%A5%BF%E7%9C%81%E6%B1%89%E4%B8%AD%E5%B8%82%E5%9F%8E%E5%9B%BA%E5%8E%BF%E5%9F%8E%E5%8D%972%E5%8D%83%E7%B1%B3%E5%A4%84%E6%B1%89%E6%B1%9F%E4%B9%8B%E6%BB%A8%E7%9A%84%E5%8D%9A%E6%9C%9B%E6%9D%91%E3%80%82&pdt=32&auth=f6bef8f7b19a4063f4a07c0e4a0a49abc3a94fb57a048504a2765f39fc579b98",
    },
  },
  {
    id: "3ac68afc-c605-48d3-a4",
    reverse: false,
    body: {
      type: "text",
      content: "生而为人，死而后已",
    },
  },
  {
    id: "58694a0f-3da1-471f-bd9",
    reverse: true,
    body: {
      type: "video",
      content:
        "https://cdn.bestseller.com.cn/assets/db_common/ONLY/image/ONLYDA00534097-1672904482020.mp4",
    },
  },
  {
    id: "bd7acbea-c1b1-46c2-aed",
    reverse: false,
    body: {
      type: "text",
      content: "生而为人，死而后已",
    },
  },
  {
    id: "3ac68afc-c605-48d3-a4f8",
    reverse: true,
    body: {
      type: "img",
      content: "https://scpic.chinaz.net/files/default/imgs/2023-02-08/c9ae548bb7a27ac1.jpg",
    },
  },
];

type paramsType = {
  friendInfo: FriendInfoListType;
};

const Height = useWindow("Height");
const Dialogue = ({ webSocketStore, store, Sqlite }: ProviderProps) => {

  let limit = 0;

  const [value, setValue] = useState("");

  const [chatData, setChatData] = useState<SingleChatType[] | []>([]);

  const [refreshing, setRefreshing] = useState(false);

  const [isRefreshControl, setIsRefreshControl] = useState(true);

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const [openMore, setOpenMore] = useState(false);

  const FlashLists = useRef<FlashList<SingleChatType>>(null);

  const navigation = useNavigation();

  const colorSchemes = useColorScheme()

  //true:文本输入模式
  //false:语音输入
  const [mode, setMode] = useState(true);

  const ColorScheme = useColorScheme();

  const router = useRoute();

  const ActionSheets = useRef<ActionSheetRef>(null);

  const backgroundColor = useThemeColor("background");

  const secondaryBack = useThemeColor("secondaryBack");

  const threeLevelBack = useThemeColor("threeLevelBack");

  const color = useThemeColor("text");

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [emojiList, setEmojiList] = useState<Array<string>>([]);

  const { friendInfo } = router.params as paramsType;

  const toast = useToast();

  const onChangeText = (text: string) => {
    setValue(text);
  };

  useLayoutEffect(() => {
    store.setCurrentEntrance(DIALOGUE_ENTRANCE);
    //监听键盘拉起
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", onKeyboardDidShow);
    //监听键盘隐藏
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", onKeyboardDidHide);

    //创建单聊对话表
    if (Sqlite.SqliteState.Sqlite) {
      useCreateSingleChatContent(Sqlite.SqliteState.Sqlite, friendInfo.friendsId);

      useQueryDemand(Sqlite.SqliteState.Sqlite, friendInfo.friendsId, 10).then(async () => {
        try {
          await wait();
        } catch (error) {
          console.log(error);
        }
      });
    }

    webSocketStore.socketState.socket?.addEventListener("message", watchMsg);
    //进入聊天窗口获取12条最新数据

    return () => {
      webSocketStore.socketState.socket?.removeEventListener("message", watchMsg);
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      setStatusBarStyle("auto");
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    emojiList[0] && setValue(value + emojiList[0]);
  }, [emojiList]);

  const watchMsg = async (e: MessageEvent<any>) => {
    const { data } = e;

    if (data === "PONG") return;

    const messageContent = JSON.parse(data) as messageContentType;

    if (messageContent.event === 201) {
      const content: SingleChatType = {
        isSender: 0,
        userId: store.userInfo?.id || "",
        ...messageContent.data,
      };
      Haptic()
      setChatData(chatData => [...chatData, content]);

      Sqlite.SqliteState.Sqlite &&
        useAddSingleChatContent(Sqlite.SqliteState.Sqlite, content, friendInfo.friendsId);

      // await wait();
    }
  };

  const wait = () => {
    const friendsId = friendInfo.friendsId;
    return new Promise(resolve => {
      if (Sqlite.SqliteState.Sqlite) {
        limit += 12;
        useQueryDemand(Sqlite.SqliteState.Sqlite, friendsId, limit).then((result: any) => {
          const { rows } = result[0] as { rows: SingleChatType[] };
          console.log(rows, "查询的符合条件数据");
          setChatData(rows.reverse());
          resolve(limit);
          if (limit > rows.length) {
            setIsRefreshControl(false);
            return;
          }
        });
      }

      scrollToBottom(true);
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // setProductList([]);
    wait().then(() => setRefreshing(false));
  }, []);

  function scrollToBottom(animated?: boolean) {
    setTimeout(() => {
      chatData.length && FlashLists.current?.scrollToEnd({ animated });
    }, 200);
  }

  const handleSendChatContent = async () => {
    const friendsId = friendInfo.friendsId;

    const now = Math.floor(new Date().getTime() / 1000);
    const content: SingleChatType = {
      isSender: 1,
      userId: store.userInfo?.id || "",
      senderId: store.userInfo?.id || "",
      recipient: friendsId,
      type: TYPE_TEXT,
      content: value,
      timeStamp: now,
    };
    console.log(content);

    try {
      if (Sqlite.SqliteState.Sqlite && webSocketStore.socketState.socket) {
        setChatData([...chatData, content]);
        setValue("");
        scrollToBottom(true);

        useAddSingleChatContent(Sqlite.SqliteState.Sqlite, content, friendInfo.friendsId);
        const sendContent = {
          event: 201,
          data: content,
        };
        webSocketStore.socketState.socket.send(JSON.stringify(sendContent));
        
        handleSelect({...friendInfo,lastMessage:value});
        return;
      }
      toast.show("发送失败  连接服务器错误");
    } catch (error) {
      console.log(error);

      toast.show("未知错误");
    }
  };

  /**
   * 更新好友最后一条留言
   */
  const handleSelect = async ({
    friendsId,
    avatar,
    friendsName,
    star,
    updTime,
    lastMessage
  }: FriendInfoListType & { lastMessage: string }) => {
    const finalTime = Math.floor(new Date().getTime() / 1000);
    const parameter = {
      friendsId,
      avatar,
      friendsName,
      lastMessage,
      finalTime,
      star,
      updTime,
    };

    if (Sqlite.SqliteState.Sqlite) {
      try {
        await useAddFriendMsg(Sqlite.SqliteState.Sqlite, parameter, friendsId);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onKeyboardDidShow = (event: KeyboardEvent) => {
    setKeyboardHeight(event.endCoordinates.height);
    setOpenMore(false);
    // scrollViewRef.current.scrollTo({ x: 0, y: -keyboardHeight, animated: true });
  };

  const onKeyboardDidHide = () => {
    setKeyboardHeight(0);
  };

  const handleOpenExpression = () => {
    ActionSheets.current?.show();
  };

  const handlePick = ({ emoji }: EmojiType) => {
    setEmojiList([emoji]);
  };

  return (
    
      <View style={[{ flex: 1, backgroundColor }, styleAll.iosBottom]}>
      <StatusBar style='auto' backgroundColor={backgroundColor} animated={true} />
      <MaterialCommunityIcons
        name='keyboard-settings'
        size={15}
        color='black'
        style={{ display: "none" }}
      />

      <DialogueHead {...friendInfo} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? (chatData.length > 7 ? "position" : "height") : undefined}
        style={{ flex: 1 }}
      >
        <View
          style={{
            width: "100%",
            height: Height - 150,
            backgroundColor: secondaryBack,
            position: "relative",
            bottom:
              Platform.OS === "ios"
                ? 0
                : chatData.length > 6
                ? keyboardHeight
                  ? keyboardHeight
                  : 0
                : 0,
            paddingBottom: Platform.OS === "ios" ? 70 : 0,
          }}
        >
          <FlashList
            data={chatData}
            renderItem={({ item }) => {
              return <DialogueContents avatar={friendInfo.avatar} {...item} />;
            }}
            keyExtractor={(item, index) => String(item.timeStamp) + index}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={119}
            keyboardDismissMode={"on-drag"}
            initialScrollIndex={chatData.length > 11 ? 11 : 0}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={isRefreshControl ? onRefresh : undefined}
                title={isRefreshControl ? "加载聊天内容" : "已全部加载完毕"}
              />
            }
            onLayout={e => scrollToBottom()}
            ref={FlashLists}
          />
          
          {/* {
            chatData && chatData.map((item)=>{
              return <DialogueContents avatar={friendInfo.avatar} {...item} />
            })
          } */}
        </View>

        <View
          style={{
            ...styles.toolbar,
            height: 70,
            backgroundColor,
          }}
        >
          <View style={[{ height: 70, width: "100%" }, styleAll.center]}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => setMode(!mode)}>
              <View style={{ ...styles.toolbarAudio, borderColor: color }}>
                {mode ? (
                  <AntDesign name='wifi' size={19} color={color} />
                ) : (
                  <MaterialCommunityIcons name='keyboard-settings' size={19} color={color} />
                )}
              </View>
            </TouchableOpacity>

            <TextInput
              style={{
                ...styles.toolbarTextInput,
                backgroundColor: threeLevelBack,
                color,
              }}
              onChangeText={text => onChangeText(text)}
              value={value}
              cursorColor={backgroundColor}
              returnKeyType={"send"}
              clearButtonMode={"while-editing"}
              selectTextOnFocus={true}
              enablesReturnKeyAutomatically={true}
              onSubmitEditing={handleSendChatContent}
              placeholderTextColor={"#fff"}
              // multiline={true}
              textAlignVertical='auto'
              maxLength={300}
            />
            <AntDesign
              name='smileo'
              onPress={() => setIsOpen(true)}
              style={{ marginHorizontal: 10 }}
              size={29}
              color={color}
            />
            <AntDesign onPress={handleOpenExpression} name='pluscircleo' size={29} color={color} />
          </View>
        </View>

        <ActionSheet
          ref={ActionSheets}
          useBottomSafeAreaPadding
          containerStyle={{
            height: "40%",
            backgroundColor: secondaryBack,
          }}
          statusBarTranslucent
        >
          <More />
        </ActionSheet>

        <EmojiPicker
          onEmojiSelected={handlePick}
          open={isOpen}
          onClose={() => setIsOpen(false)}
          theme={ColorScheme === "dark" ? Colors.emojiDark : undefined}
          allowMultipleSelections
          enableCategoryChangeAnimation={false}
        />
      </KeyboardAvoidingView>
      {/* </KeyboardAvoidingView> */}
    </View>
    
  );
};

export default memo(Dialogue);

const styles = StyleSheet.create({
  DialogueShowMain: {
    flex: 1,
    marginBottom: 70,
  },
  toolbar: {
    position: "absolute",
    bottom: -1,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 10,
  },
  toolbarTextInput: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 17,
  },
  toolbarAudio: {
    borderRadius: 999,
    borderWidth: 2,
    padding: 3,
    marginRight: 10,
  },
  hitm: {
    fontFamily: "Inter-Black",
    padding: 5,
    opacity: 0.5,
    borderRadius: 5,
  },
});

