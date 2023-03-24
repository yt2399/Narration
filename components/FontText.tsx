import { StyleSheet, Text, TextStyle, View } from "react-native";
import React from "react";
import { useThemeColor } from "../hooks/useHooks";

export type FontPropsType = {
  textContent: string;
  color?: string;
  style?: Object ;
  
};

export default function FontText(props: FontPropsType) {
  const colors = useThemeColor("text");

  const { textContent, color, style } = props;

  return <Text style={[style,styles.FontText, { color: color || colors }]}>{textContent}</Text>;
}

const styles = StyleSheet.create({
  FontText: {
    fontFamily: "Inter-Black",
  },
});
