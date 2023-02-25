import {  ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useWindow } from "../hooks/useHooks";


const width = useWindow('Width')
const height = useWindow('Height')


const Loading = () => {
  return (
    <View style={styles.LoadingMain}>
      <View style={styles.LoadingContent}>
        <ActivityIndicator size={40} animating={true} color={"#fff"} />
      </View>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  LoadingMain: {
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent:'center',
    alignItems:'center',
    width: width,
    height: height,
    zIndex: 99,
    backgroundColor:"rgba(0, 0, 0, .1)",
  },
  LoadingContent: {
    justifyContent:'center',
    alignItems:'center',
    width: 150,
    height: 150,
    borderRadius:10,
    backgroundColor: "rgba(0, 0, 0, .7)",
  },
});
