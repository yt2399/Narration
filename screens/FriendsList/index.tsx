import {
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
  Text,
  TouchableOpacity,
  Animated,
  PanResponder,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ProviderProps } from "../../types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor, useWindow } from "../../hooks/useHooks";
import { setStatusBarStyle, StatusBar } from "expo-status-bar";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { styleAll } from "../../style";
import { useNavigation } from "@react-navigation/native";
import {
  TabView,
  SceneMap,
  NavigationState,
  SceneRendererProps,
  Route,
} from "react-native-tab-view";
import { Div as Box } from "react-native-magnus";

const all = () => <View style={{ flex: 1, backgroundColor: "#ff4081" }} />;

const groupChat = () => <View style={{ flex: 1, backgroundColor: "#673ab7" }} />;
const starTarget = () => <View style={{ flex: 1, backgroundColor: "#673ab7" }} />;
const newFriends = () => <View style={{ flex: 1, backgroundColor: "#673ab7" }} />;

const renderScene = SceneMap({
  all,
  groupChat,
  starTarget,
  newFriends,
});
const Width = useWindow("Width");
const FriendsList = ({ webSocketStore, store, Sqlite }: ProviderProps) => {
  const [routes] = React.useState([
    { key: "all", title: "好友列表" },
    { key: "groupChat", title: "群聊" },
    { key: "starTarget", title: "星标好友" },
    { key: "newFriends", title: "新的朋友" },
  ]);
  const navigation = useNavigation();
  const LeftAnim = useRef(new Animated.Value(0)).current;
  const backgroundColor = useThemeColor("background");

  const secondaryBack = useThemeColor("secondaryBack");

  const threeLevelBack = useThemeColor("threeLevelBack");

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  const color = useThemeColor("text");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      setStatusBarStyle("auto");
    });

    return unsubscribe;
  }, [navigation]);

  const [value, setValue] = useState<string>();

  const handleSendChatContent = () => {
    console.log("触发搜索");
  };

  function tabBar<T extends Route>({
    navigationState,
  }: SceneRendererProps & { navigationState: NavigationState<T> }) {
    useEffect(() => {
      Animated.spring(LeftAnim, {
        toValue: Width * (((100 / navigationState.routes.length) * navigationState.index) / 100),
        useNativeDriver: false,
      }).start();
    }, [index]);

    return (
      <View>
        <Box w={"100%"} h={40} row style={{ marginTop: 20, marginBottom: 10 }}>
          {navigationState.routes.map((item, index) => {
            const opacity = navigationState.index === index ? 1 : 0.5;
            return (
              <Box
                w={`${100 / navigationState.routes.length}%`}
                h={40}
                row
                alignItems='center'
                justifyContent='center'
                key={item.key}
              >
                <TouchableOpacity style={{ flex: 1 }} onPress={() => setIndex(index)}>
                  <Text style={[styleAll.font, { opacity, textAlign: "center" }]}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              </Box>
            );
          })}
        </Box>

        <Animated.View
          style={{
            width: `${100 / navigationState.routes.length - 5}%`,
            height: 2,
            marginLeft: "2.5%",
            backgroundColor: "#000",
            position: "relative",
            left: LeftAnim,
            bottom: 10,
          }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }} edges={["top", "right", "left"]}>
      <StatusBar style='auto' backgroundColor={backgroundColor} animated={true} />

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

      {/* <View style={styles.addFriends}>
        <View style={[styles.addFriendsIcon, styleAll.center]}>
          <FontAwesome5 name='user-friends' size={22} color='#006aff' />
        </View>
      </View> */}

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        lazy
        renderTabBar={tabBar}
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
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
});
