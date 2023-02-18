import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useThemeColor } from "../../../hooks/useHooks";
import { styleAll } from "../../../style";
import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const DialogueHead = ({}) => {
  const backgroundColor = useThemeColor("background");
  const color = useThemeColor("text");
  const Navigation = useNavigation();
  
  return (
    <View style={[styles.DialogueHead, { backgroundColor }]}>
      <View style={[styleAll.center, { height: 70 }]}>
        <AntDesign onPress={Navigation.goBack} name='arrowleft' size={24} color={color} />
        <View style={styles.headTitle}>
          <Text style={{ ...styles.name, color }}>Yi Tao</Text>
          <Text style={styles.synopsis} numberOfLines={1}>
            生而为人，死而后已111111111111111111111111111111111111111111111
          </Text>
        </View>
        <View style={styleAll.center}>
          <FontAwesome style={styles.iconRight} name='phone' size={20} color={color} />
          <FontAwesome5 name='video' size={20} color={color} />
        </View>
      </View>
    </View>
  );
};

export default DialogueHead;

const styles = StyleSheet.create({
  DialogueHead: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 40,
    zIndex: 99,
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
});
