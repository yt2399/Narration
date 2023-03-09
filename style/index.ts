import { Platform, StyleSheet } from "react-native";
import { useWindow } from "../hooks/useHooks";

const Width = useWindow("Width");
export const styleAll = StyleSheet.create({
  iosBottom: {
    paddingBottom: Platform.OS === "ios" ? 25 : 0,
  },
  iosButtonBottom: {
    marginBottom: Platform.OS === "ios" ? 35 : 0,
  },
  iosTop: {
    paddingTop: Platform.OS === "ios" ? 50 : 0,
  },
  androidTop: {
    paddingTop: Platform.OS === "android" ? 20 : 0,
  },
  center: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  shadow: {
    borderRadius: 20,
    // elevation 是 Android 上的阴影效果，iOS 上会被忽略
    elevation: 10,
    // shadow 是 iOS 上的阴影效果
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.52,
    shadowRadius: 10,
  },
  MoreHead: {
    width: 70,
    height: 5,
    borderRadius: 99,
    alignItems: "center",
    marginVertical: 10,
    marginLeft: Width / 2 - 35,
    backgroundColor: "#e9ecef",
  },
  font: { fontSize: 15, fontFamily: "Inter-Black" },
});
