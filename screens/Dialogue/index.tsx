import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { styleAll } from "../../style";
import DialogueContents from "./DialogueContent";
import { useThemeColor } from "../../hooks/useHooks";
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    reverse: true,
    body: {
      type: "img",
      content:
        "https://scpic.chinaz.net/files/default/imgs/2023-02-08/2f4904ef99101e4f.jpg",
    },
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    reverse: true,
    body: {
      type: "img",
      content:
        "https://scpic.chinaz.net/files/default/imgs/2023-01-15/3fbe8addb1afedde.jpg",
    },
  },
  {
    id: "58694a0f-3da1-471f-b",
    reverse: false,
    body: {
      type: "img",
      content:
        "https://scpic.chinaz.net/files/default/imgs/2023-02-09/ccd3d575ea69fb79.jpg",
    },
  },
  {
    id: "bd7acbea-c1b1-46c",
    reverse: true,
    body: {
      type: "img",
      content:
        "https://scpic.chinaz.net/files/default/imgs/2023-02-08/c9ae548bb7a27ac1.jpg",
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
      content:
        "https://scpic.chinaz.net/files/default/imgs/2023-02-08/c9ae548bb7a27ac1.jpg",
    },
  },
];

type DATA = {
  id: string;
  reverse: boolean;
  body: {
    type: string;
    content: string;
  };
};

const Dialogue = () => {
  const [value, setValue] = useState("");
  //true:文本输入模式
  //false:语音输入
  const [mode, setMode] = useState(true);
  const FlatLists = useRef<FlatList>(null);

  const backgroundColor = useThemeColor("background");
  const secondaryBack = useThemeColor("secondaryBack");
  const threeLevelBack = useThemeColor("threeLevelBack");
  const color = useThemeColor("text");
  const onChangeText = (text: string) => {
    setValue(text);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <MaterialCommunityIcons
        name="keyboard-settings"
        size={15}
        color="black"
        style={{ display: "none" }}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor }}>
        <View style={[styles.DialogueHead, styleAll.center]}>
          <AntDesign name="arrowleft" size={24} color={color} />
          <View style={styles.headTitle}>
            <Text style={{ ...styles.name, color }}>Yi Tao</Text>
            <Text style={styles.synopsis} numberOfLines={1}>
              生而为人，死而后已111111111111111111111111111111111111111111111
            </Text>
          </View>
          <View style={styleAll.center}>
            <FontAwesome
              style={styles.iconRight}
              name="phone"
              size={20}
              color={color}
            />
            <FontAwesome5 name="video" size={20} color={color} />
          </View>
        </View>

        <View
          style={{
            flex: 1,
            marginBottom: 70,
          }}
        >
          <FlatList
            data={DATA}
            renderItem={(item) => {
              return <DialogueContents {...item} />;
            }}
            style={{ backgroundColor: secondaryBack }}
            keyExtractor={(item) => item.id}
            initialNumToRender={5}
            showsVerticalScrollIndicator={false}
            ref={FlatLists}
          />
        </View>

        <View
          style={{
            ...styles.toolbar,
            marginBottom: Platform.OS === "ios" ? 35 : 0,
            backgroundColor,
          }}
        >
          <TouchableOpacity activeOpacity={0.7} onPress={() => setMode(!mode)}>
            <View style={{ ...styles.toolbarAudio, borderColor: color }}>
              {mode ? (
                <AntDesign name="wifi" size={19} color={color} />
              ) : (
                <MaterialCommunityIcons
                  name="keyboard-settings"
                  size={19}
                  color={color}
                />
              )}
            </View>
          </TouchableOpacity>

          <TextInput
            style={{
              ...styles.toolbarTextInput,
              backgroundColor: threeLevelBack,
            }}
            onChangeText={(text) => onChangeText(text)}
            value={value}
            multiline={false}
            cursorColor={"#000"}
            returnKeyType={"send"}
            clearButtonMode={"while-editing"}
            selectTextOnFocus={true}
            enablesReturnKeyAutomatically={true}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Dialogue;

const styles = StyleSheet.create({
  DialogueHead: {
    height: 60,
    width: "100%",
    paddingHorizontal: 20,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 10 },
  },
  headTitle: {
    flex: 1,
    height: "100%",
    justifyContent: "space-evenly",
    marginLeft: 20,
  },
  name: {
    fontFamily: "Inter-Black",
    fontSize: 20,
  },
  synopsis: {
    paddingRight: 25,
    fontFamily: "Inter-Black",
    fontSize: 12,
    color: "#adb5bd",
  },
  iconRight: {
    marginTop: 3,
    marginRight: 20,
  },
  DialogueShowMain: {
    flex: 1,
    marginBottom: 70,
  },
  toolbar: {
    position: "absolute",
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 70,
    padding: 10,
  },
  toolbarTextInput: {
    flex: 1,
    height: "100%",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  toolbarAudio: {
    borderRadius: 999,
    borderWidth: 2,
    padding: 5,
    marginRight: 10,
  },
});
