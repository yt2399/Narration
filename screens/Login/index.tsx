import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";

const Login = () => {
  return (
    <View style={styles.LoginMain}>
      <ImageBackground
        source={require("../../assets/cc2b92eae02eb999ec09e7f880e84537.jpg")}
        style={{flex:1,display:'flex',justifyContent:"center"}}
      >
        <BlurView intensity={100} tint="dark" style={styles.LoginBlock}>

        </BlurView>
      </ImageBackground>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  LoginMain: {
    flex: 1,
    backgroundColor: "#fff",
  },
  LoginBlock: {
    width: "100%",
    height: 500,

    // backgroundColor: "#fff",
  },
});
