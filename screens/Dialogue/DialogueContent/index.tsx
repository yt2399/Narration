import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo, useEffect, useState } from "react";
import { useThemeColor, useThumbnail, useWindow } from "../../../hooks/useHooks";
import ImageAout from "../../../components/ImageAout";
import { VideoThumbnailsResult } from "expo-video-thumbnails";
import { AntDesign } from "@expo/vector-icons";
import PopupVideo from "../../../components/PopupVideo";
import ImageView from "react-native-image-viewing";
import { Popable } from "react-native-popable";
import { SingleChatType, TYPE_IMG, TYPE_TEXT, TYPE_VIDEO } from "../../../types";
const width = useWindow("Width");

const userAvatar =
  "https://img2.baidu.com/it/u=260211041,3935441240&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800";

const avatar2 =
  "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F28%2F20210628204020_17863.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1678716425&t=f557d5986b25451a91c201fb8988107c";

const DialogueContents = ({
  avatar,
  userId,
  isSender,
  senderId,
  recipient,
  type,
  content,
  timeStamp,
}: SingleChatType) => {
  const [visible, setVisible] = useState(false);
  const [visibleTow, setVisibleTow] = useState(false);
  const [imageUri, setImageUri] = useState([{ uri: "" }]);
  const [videoUri, setVideoUri] = useState("");
  //   const color = useThemeColor( 'text');
  const [thumbnail, setThumbnail] = useState<VideoThumbnailsResult>({
    width: 0,
    height: 0,
    uri: "",
  });

  const MenuItems = [
    { text: "Actions", icon: "home", isTitle: true, onPress: () => {} },
    { text: "Action 1", icon: "edit", onPress: () => {} },
    { text: "Action 2", icon: "map-pin", withSeparator: true, onPress: () => {} },
    { text: "Action 3", icon: "trash", isDestructive: true, onPress: () => {} },
  ];

  useEffect(() => {
    // console.log(avatar, "头像");
  }, []);
  const getThumbnail = async (url: string) => {
    const res = await useThumbnail(url);
    setThumbnail(res as VideoThumbnailsResult);
  };

  const handleImageView = (content: string) => {
    setImageUri([{ uri: content }]);
    setVisible(true);
  };

  const ChangeVideoVisible = (uri: string) => {
    setVideoUri(uri);
    setVisibleTow(true);
  };

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    //   keyboardVerticalOffset={100}
    //   style={{flex:1}}
    // >

    <View
      style={{
        ...styles.direction,
        flexDirection: !isSender ? "row" : "row-reverse",
      }}
    >
      <View
        style={{
          ...styles.content,
          flexDirection: !isSender ? "row" : "row-reverse",
        }}
      >
        <View style={styles.avatar}>
          <Image style={styles.avatar} source={{ uri: !isSender ? avatar : userAvatar }} />
        </View>

        <View
          style={{
            ...styles.details,
            padding: type === TYPE_IMG || type === TYPE_VIDEO ? 0 : 10,
          }}
        >
          <View style={!isSender ? styles.triangleLeft : styles.triangleRight}></View>
          
            {(type === TYPE_TEXT && (
              <Popable content='See profile' animationType="spring" strictPosition position="bottom">
              <Text style={{ fontSize: 16 }} numberOfLines={20}>
                {content}
              </Text>
              </Popable>
            )) ||
              (type === TYPE_IMG && (
                <ImageAout
                  source={{
                    uri: content,
                  }}
                  style={{ ...styles.ImagesStyle }}
                  Press={() => handleImageView(content)}
                />
              )) ||
              (type === TYPE_VIDEO && (
                <View onLayout={async () => await getThumbnail(content)}>
                  <TouchableOpacity activeOpacity={0.7} onPress={() => ChangeVideoVisible(content)}>
                    <Image
                      source={{ uri: thumbnail.uri }}
                      style={{ ...styles.ImagesStyle, width: 180, height: 130 }}
                    />
                    <AntDesign name='play' size={30} color='#fff' style={styles.play} />
                  </TouchableOpacity>
                </View>
              ))}
          
        </View>
      </View>
      {visibleTow && <PopupVideo isVisible={setVisibleTow} uri={videoUri} />}
      <ImageView
        images={imageUri}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      />
    </View>
  );
};

export default memo(DialogueContents);

const styles = StyleSheet.create({
  direction: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  content: {
    display: "flex",
    alignItems: "center",
    width: (width && width - 100) || "80%",
    marginTop: 30,
    paddingHorizontal: 10,
  },
  ImagesStyle: {
    minWidth: 120,
    minHeight: 70,
    borderRadius: 5,
    overflow: "hidden",
  },
  details: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    borderRadius: 5,
    backgroundColor: "#e9ecef",
  },
  triangleLeft: {
    position: "absolute",
    left: -11,
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderTopColor: "transparent",
    borderRightWidth: 10,
    borderRightColor: "#e9ecef",
    borderLeftWidth: 5,
    borderLeftColor: "transparent",
    borderBottomWidth: 10,
    borderBottomColor: "transparent",
  },
  triangleRight: {
    position: "absolute",
    right: -17,
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderTopColor: "transparent",
    borderRightWidth: 10,
    borderRightColor: "transparent",
    borderLeftWidth: 10,
    borderLeftColor: "#e9ecef",
    borderBottomWidth: 10,
    borderBottomColor: "transparent",
  },
  play: {
    position: "absolute",
    top: "40%",
    left: "45%",
    // transform: [{ translateX: "-50%" }],
  },
});
