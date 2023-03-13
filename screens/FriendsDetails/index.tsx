import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import { FriendInfoListType, ProviderProps } from "../../types";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";

import {
  AvatarHeaderScrollView,
  withAvatarHeaderFlashList,
} from "react-native-sticky-parallax-header";
import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";
import {
  useColorScheme,
  userAvatar,
  useSetStatusBarBackgroundColor,
  useThemeColor,
} from "../../hooks/useHooks";
import { setStatusBarStyle, StatusBar } from "expo-status-bar";

import { Button, Div, Header, Icon } from "react-native-magnus";

type paramsType = {
  friendInfo: FriendInfoListType;
};



const FriendsDetails = ({ webSocketStore, store, Sqlite }: ProviderProps) => {
  const navigation = useNavigation();
  const backgroundColor = useThemeColor("background");
  const secondaryBack = useThemeColor("secondaryBack");
  const color = useThemeColor("text");
  const useColorSchemes = useColorScheme();
  const router = useRoute();
  const { friendInfo } = router.params as paramsType;

  useEffect(() => {
    setStatusBarStyle("light");
    useSetStatusBarBackgroundColor(color);
  }, []);

  function goBack() {
    navigation.goBack();
  }

  return (
    <>
      <AvatarHeaderScrollView
        leftTopIcon={() => <FontAwesome5 name='angle-left' {...{ color: "#fff", size: 24 }} />}
        leftTopIconOnPress={goBack}
        leftTopIconTestID={"leftID"}
        rightTopIcon={() => <AntDesign name='staro' {...{ color: "#fff", size: 24 }} />}
        rightTopIconTestID={"menuID"}
        // backgroundImage={{ uri: "https://img.zmtc.com/2019/1120/20191120100448137.jpg" }}
        contentContainerStyle={{ backgroundColor }}
        containerStyle={styles.stretchContainer}
        backgroundColor={"#111111"}
        hasBorderRadius
        image={{ uri: friendInfo.avatar || userAvatar }}
        parallaxHeight={350}
        subtitle={"生而为人、死而后裔"}
        subtitleStyle={styles.title}
        subtitleTestID={"SubtitleID"}
        title={friendInfo.friendsName}
        titleStyle={styles.title}
        titleTestID={"titleID"}
        decelerationRate='fast'
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1, height: 1000 }}>
          <Div row justifyContent='center' alignItems='center'>
            <Button
              mt='lg'
              w={"60%"}
              mr={10}
              borderWidth={1}
              bg={color}
              color={backgroundColor}
              prefix={
                <AntDesign
                  name='staro'
                  {...{ color: backgroundColor, size: 18 }}
                  style={{ marginRight: 10, position: "relative", top: -1 }}
                />
              }
            >
              置星标好友
            </Button>
            <Button
              mt='lg'
              bg={backgroundColor}
              borderWidth={1}
              borderColor={color}
              color={color}
              prefix={<Entypo name='chat' size={18} color={color} style={{ marginRight: 10 }} />}
              onPress={() => navigation.navigate("Dialogue", { friendInfo })}
            >
              发消息
            </Button>
          </Div>
        </View>
      </AvatarHeaderScrollView>
      {/* <StatusBar backgroundColor={color} translucent /> */}
    </>
  );
};

export default FriendsDetails;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
    marginBottom: 25,
  },
  contentText: {
    alignSelf: "flex-start",
    // color: colors.black,
    fontFamily: "AvertaStd-Semibold",
    fontSize: 24,
    letterSpacing: -0.2,
    lineHeight: 28,
    paddingBottom: 20,
    paddingTop: 40,
  },
  screenContainer: {
    alignItems: "center",
    alignSelf: "stretch",
    flex: 1,
    justifyContent: "center",
  },
  stretch: {
    alignSelf: "stretch",
  },
  stretchContainer: {
    alignSelf: "stretch",
    flex: 1,
    overflow: "hidden",
  },
  text: {
    fontFamily: "Inter-Black",
  },
  title: {
    color: "#fff",
    shadowColor: "#000",
    fontFamily: "Inter-Black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 50,
  },
  headerBnt: {
    padding: 20,
  },
});
