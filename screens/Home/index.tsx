import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
const Homes = () => {
  useEffect(() => {
    // webSocket.onmessage = () => {
    //   console.log("HOME");
    // };
  }, []);
  const Navigation = useNavigation().navigate;

  return (
    <View style={styles.HomeMain}>
      <Text style={styles.textMain} onPress={ () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)}>
        Home111
      </Text>
    </View>
  );
};

export default Homes;

const styles = StyleSheet.create({
  HomeMain: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
  },
  textMain: {
    marginTop: 100,
    marginLeft: 20,
    backgroundColor: "#fff",
  },
});
