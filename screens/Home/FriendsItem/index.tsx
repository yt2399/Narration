import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { styleAll } from "../../../style";
import { useThemeColor } from "../../../hooks/useHooks";

const FriendsItem = () => {
  const avatar =
    "https://img2.baidu.com/it/u=260211041,3935441240&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800";
  const backgroundColor = useThemeColor("background");
  const secondaryBack = useThemeColor("secondaryBack");
  const threeLevelBack = useThemeColor("threeLevelBack");
  const Line = useThemeColor('line')
  const color = useThemeColor("text");
  return (
    <View
      style={[
        styles.ItemMain,
        styleAll.center,
        { borderBottomColor: Line, backgroundColor: secondaryBack },
      ]}
    >
      <Image
        style={styles.avatar}
        source={{
          uri: avatar,
        }}
      />
      <View style={styles.ItemInfo}>
        <View style={[styleAll.center, { flex: 1, justifyContent: "space-between" }]}>
          <Text style={[styles.ItemName, { color }]}>测试名称</Text>
          <Text style={styles.lastNews}>五分钟前</Text>
        </View>
        <View style={[styleAll.center, { flex: 1, justifyContent: "space-between" }]}>
          <Text style={styles.lastNews}>Photo</Text>
          <Text style={[styles.block, { backgroundColor: color, color: backgroundColor }]}>4</Text>
        </View>
      </View>
    </View>
  );
};

export default FriendsItem;

const styles = StyleSheet.create({
  ItemMain: {
    width: "100%",
    height: 70,
    paddingLeft:20,
    paddingRight:10,
    borderBottomWidth: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  ItemInfo: {
    flex: 1,
    height: 45,
    display: "flex",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  ItemName: {
    fontFamily: "Inter-Black",
    fontSize: 15,
  },
  lastNews: {
    fontFamily: "Inter-Black",
    fontSize: 12,
    color: "#ccc",
  },
  block: {
    paddingHorizontal:5,
    borderRadius:4,
    overflow:"hidden"
  },
});