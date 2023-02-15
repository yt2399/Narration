import { Platform, StyleSheet } from "react-native";

export const styleAll = StyleSheet.create({
  iosBottom: {
    paddingBottom: Platform.OS === "ios" ? 25 : 0,
  },
  iosButtonBottom:{
    marginBottom: Platform.OS === "ios" ? 35 : 0,
  },
  iosTop:{
    paddingTop: Platform.OS === "ios" ? 50 : 0,
  },
  center:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  }
});

