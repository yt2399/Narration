import { StyleSheet, Text, View, SafeAreaView, Modal } from "react-native";
import React, { useRef, useState } from "react";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { useThumbnail } from "../hooks/useHooks";
import { VideoThumbnailsResult } from "expo-video-thumbnails";
import { AntDesign } from "@expo/vector-icons";

type PopupVideoProps = {
  uri: string;
  isVisible: Function;
};

const PopupVideo = ({ uri, isVisible }: PopupVideoProps) => {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [thumbnail, setThumbnail] = useState<VideoThumbnailsResult>({
    width: 0,
    height: 0,
    uri: "",
  });
  const getVideo = (status: AVPlaybackStatus) => {
    
  };
  const getThumbnail = async () => {
    const res = (await useThumbnail(uri)) as VideoThumbnailsResult;
    setThumbnail(res as VideoThumbnailsResult);
  };

  return (
    <Modal visible={true} transparent animationType={"fade"}>
      <SafeAreaView style={{ flex: 1 }} />
      <View
        style={styles.PopupVideoMain}
        onLayout={async () => await getThumbnail()}
      >
        <SafeAreaView />
        <AntDesign
          name="close"
          size={24}
          color="#fff"
          style={styles.close}
          onPress={() => isVisible(false)}
        />
        <Video
          ref={video}
          resizeMode={ResizeMode.COVER}
          source={{
            uri: "https://cdn.bestseller.com.cn/assets/db_common/ONLY/image/ONLYDA00534097-1672904482020.mp4",
          }}
          useNativeControls
          isLooping={true}
          style={{ ...styles.video, height: thumbnail.height / 1.7 }}
          onLoad={(status) => getVideo(status)}
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      </View>
    </Modal>
  );
};

export default PopupVideo;

const styles = StyleSheet.create({
  PopupVideoMain: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    zIndex: 99,
    flex: 1,
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    // height: 100,
    position: "absolute",
    top: "30%",
  },
  close: {
    position: "absolute",
    right: 20,
    top: 40,
  },
});
