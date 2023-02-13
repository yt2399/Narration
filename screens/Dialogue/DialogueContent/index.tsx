import {
  Image,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useThemeColor, useThumbnail, useWindow } from "../../../hooks/useHooks";
import ImageAout from "../../../components/ImageAout";
import { VideoThumbnailsResult } from "expo-video-thumbnails";
import { AntDesign } from "@expo/vector-icons";
import PopupVideo from "../../../components/PopupVideo";
import ImageView from "react-native-image-viewing";
const width = useWindow("Width");

const avatar =
  "https://img2.baidu.com/it/u=260211041,3935441240&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800";

const avatar2 =
  "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F28%2F20210628204020_17863.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1678716425&t=f557d5986b25451a91c201fb8988107c";

type Data = {
  id: string;
  reverse: boolean;
  body: {
    type: string;
    content: string;
  };
};

const DialogueContents = ({ item }: ListRenderItemInfo<Data>) => {
  const {
    reverse,
    body: { type, content },
  } = item;

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
    <View
      style={{
        ...styles.direction,
        flexDirection: reverse ? "row" : "row-reverse",
      }}
    >
      <View
        style={{
          ...styles.content,
          flexDirection: reverse ? "row" : "row-reverse",
        }}
      >
        <View style={styles.avatar}>
          <Image
            style={styles.avatar}
            source={{
              uri: reverse ? avatar2 : avatar,
            }}
          />
        </View>

        <View
          style={{
            ...styles.details,
            padding: type === "img" || type === "video" ? 0 : 10,
          }}
        >
          <View
            style={reverse ? styles.triangleLeft : styles.triangleRight}
          ></View>
          {(type === "text" && <Text numberOfLines={20}>{content}</Text>) ||
            (type === "img" && (
              <ImageAout
                source={{
                  uri: content,
                }}
                width={110}
                style={{ ...styles.ImagesStyle }}
                Press={() => handleImageView(content)}
              />
            )) ||
            (type === "video" && (
              <View onLayout={async () => await getThumbnail(content)}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => ChangeVideoVisible(content)}
                >
                  <Image
                    source={{
                      uri: thumbnail.uri,
                    }}
                    style={{
                      ...styles.ImagesStyle,
                      width: 200,
                      height: 130,
                    }}
                  />
                  <AntDesign
                    name="play"
                    size={30}
                    color="#fff"
                    style={styles.play}
                  />
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

export default DialogueContents;

const styles = StyleSheet.create({
  direction: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 5,
  },
  content: {
    display: "flex",
    alignItems: "center",
    width: (width && width - 100) || "80%",
    marginTop: 30,
    paddingHorizontal: 10,
  },
  ImagesStyle: {
    minWidth: 110,
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
