import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import {  usePickImage, useThemeColor, useWindow } from "../../../hooks/useHooks";
import { FontAwesome } from "@expo/vector-icons";
import { styleAll } from "../../../style";
import { useNavigation } from "@react-navigation/native";

const Width = useWindow("Width");
const More = () => {
    const Navigation = useNavigation().navigate
  const secondaryBack = useThemeColor("secondaryBack");
  const threeLevelBack = useThemeColor("threeLevelBack");
  const backgroundColor = useThemeColor("background");
  const color = useThemeColor("text");

  const Block = [
    { name: "picture", icon: "picture-o", title: "照片" },
    { name: "camera", icon: "camera", title: "拍摄" },
    { name: "map", icon: "map-marker", title: "位置" },
    { name: "folder", icon: "folder", title: "文件" },
    { name: "user", icon: "user", title: "名片" },
  ];

  const handleBlock = async (blockName: string) => {
    switch (blockName) {
      case "picture":
        usePickImage();
        break;
      case "camera":
        // await useCamera()
        Navigation('Camera')
        break;
      case "map":
        break;
      case "folder":
        break;
      case "user":
        break;
 
      default:
        break;
    }
  };

  useEffect(() => {
    console.log(threeLevelBack);
  }, []);
  return (
    <View style={styles.MoreMain}>
      <View style={[styles.MoreHead, { backgroundColor: "#e9ecef" }]} />

      <View style={styles.blockMain}>
        {Block.map(({ name, icon, title }) => (
          <TouchableOpacity key={name} activeOpacity={0.5} onPress={() => handleBlock(name)}>
            <View
              style={[
                styles.block,
                styleAll.center,
                { backgroundColor: threeLevelBack, borderColor: color },
              ]}
            >
              <FontAwesome name={icon} size={24} color={color} />
              <Text style={{ position: "absolute", bottom: -30, color }}>{title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default More;

const styles = StyleSheet.create({
  MoreMain: {
    flex: 1,
  },
  MoreHead: {
    width: 70,
    height: 5,
    borderRadius: 99,
    alignItems: "center",
    marginVertical: 10,
    marginLeft: Width / 2 - 35,
  },
  blockMain: {
    flex: 1,
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  block: {
    width: 60,
    height: 60,
    justifyContent: "center",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 40,
    elevation: 5,
    shadowColor: "#666",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
});
