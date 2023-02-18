import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  RefreshControl,
  Keyboard,
  KeyboardEvent,
  LayoutChangeEvent,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { styleAll } from "../../style";
import DialogueContents from "./DialogueContent";
import {
  useAddSingleChatContent,
  useCreateSingleChatContent,
  useQueryDemand,
  useThemeColor,
  useWindow,
  usePickImage,
} from "../../hooks/useHooks";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { SingleChatType } from "../../types";
import { useRecoilState } from "recoil";
import { userId } from "../../hooks/Atoms";

import DialogueHead from "./DialogueHead";
// import { webSocket } from "../../hooks/webSocket";

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

const friendsId = "kYSIrafylwHX8iV11";
const Height = useWindow("Height");
const Dialogue = () => {
  let limit = 0;
  const [value, setValue] = useState("");
  const [chatData, setChatData] = useState<SingleChatType[] | []>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isRefreshControl, setIsRefreshControl] = useState(true);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [openMore, setOpenMore] = useState(false);
  const FlashLists = useRef<FlashList<SingleChatType>>(null);
  //true:文本输入模式
  //false:语音输入
  const [mode, setMode] = useState(true);
  const ActionSheets = useRef<ActionSheetRef>(null);
  const backgroundColor = useThemeColor("background");
  const secondaryBack = useThemeColor("secondaryBack");
  const threeLevelBack = useThemeColor("threeLevelBack");
  const color = useThemeColor("text");

  // const [message, setMessage] = useRecoilState(messageState);
  const [userIds] = useRecoilState(userId);
  const onChangeText = (text: string) => {
    setValue(text);
  };

  useEffect(() => {
    //监听键盘拉起
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", onKeyboardDidShow);
    //监听键盘隐藏
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", onKeyboardDidHide);

    //监听webSocket连接成功

    // webSocket.addEventListener('message', function (e) {

    //   console.log(e.data,'页面二');

    // });


    //进入聊天窗口获取12条最新数据
    useCreateSingleChatContent()
      .catch(err => {
        console.log(err);
      })
      .then(async () => {
        try {
          await wait();
        } catch (error) {
          console.log(error);
        }
      });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const wait = () => {
    return new Promise(resolve => {
      limit += 12;
      useQueryDemand(
        {
          surface: "u_chat_content",
          senderId: userIds,
          recipient: friendsId,
        },
        limit
      ).then((result: any) => {
        const { rows } = result[0] as { rows: SingleChatType[] };
        console.log(rows, "查询的符合条件数据");
        setChatData(rows.reverse());
        resolve(limit);
        if (limit > rows.length) {
          setIsRefreshControl(false);
          return;
        }
      });
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // setProductList([]);
    wait().then(() => setRefreshing(false));
  }, []);

  function scrollToBottom( animated?: boolean) {
    // if (e.stopPropagation && FlashLists.current) {

    // }

    setTimeout(() => {
      FlashLists.current?.scrollToEnd({ animated });
    },200);
  }

  // const useWatchWs = () => {
  //   // 监听 WebSocket 事件
  //   webSocket.onopen = () => {
  //     console.log("WebSocket 连接已建立");
  //   };
  //   webSockets.onmessage = event => {
  //     console.log("收到消息：", event.data);
  //   };
  //   webSockets.onerror = error => {
  //     console.log("WebSocket 错误：", error);
  //   };
  //   // socket.onclose = () => {
  //   //   console.log('WebSocket 连接已关闭');
  //   // };
  // };

  const handleSendChatContent = async () => {
    const now = Math.floor(new Date().getTime() / 1000);
    const content: SingleChatType = {
      senderId: userIds,
      recipient: friendsId,
      type: "text",
      content: value,
      timeStamp: now,
    };

    const dd = {
      type:'',
      msg:content
    }

    try {
      await useAddSingleChatContent(content);
      setChatData([...chatData, content]);
      setValue("");
      scrollToBottom(true);
    } catch (error) {
      console.log(error);
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
    setOpenMore(!openMore);
    Keyboard.dismiss();
  };

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <MaterialCommunityIcons
        name='keyboard-settings'
        size={15}
        color='black'
        style={{ display: "none" }}
      />

      <DialogueHead />
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
            renderItem={({ item }) => <DialogueContents {...item} />}
            keyExtractor={item => String(item.timeStamp)}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={119}
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
        </View>

        <View
          style={{
            ...styles.toolbar,
            height: openMore ? 300 : 75,
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
              style={{ ...styles.toolbarTextInput, backgroundColor: threeLevelBack }}
              onChangeText={text => onChangeText(text)}
              value={value}
              multiline={false}
              cursorColor={backgroundColor}
              returnKeyType={"send"}
              clearButtonMode={"while-editing"}
              selectTextOnFocus={true}
              enablesReturnKeyAutomatically={true}
              onSubmitEditing={handleSendChatContent}
            />
            <AntDesign
              name='smileo'
              onPress={handleOpenExpression}
              style={{ marginHorizontal: 10 }}
              size={29}
              color={color}
            />
            <AntDesign onPress={usePickImage} name='pluscircleo' size={29} color={color} />
          </View>
        </View>

        <ActionSheet
          ref={ActionSheets}
          useBottomSafeAreaPadding
          containerStyle={{
            height: "50%",
            backgroundColor: threeLevelBack,
          }}
        >
          <Text>111111111</Text>
        </ActionSheet>
      </KeyboardAvoidingView>
      {/* </KeyboardAvoidingView> */}
    </View>
  );
};

export default Dialogue;

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
