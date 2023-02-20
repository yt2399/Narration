/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      Login: {
        //设置子页面路由
        screens: {
          LoginScreen: "login",
        },
      },
      Home: {
        //设置子页面路由
        screens: {
          HomeScreen: "home",
        },
      },
      Dialogue: {
        //设置子页面路由
        screens: {
          DialogueScreen: "Dialogue",
        },
      },
      Mine: {
        //设置子页面路由
        screens: {
          MineScreen: "mine",
        },
      },
      Camera: {
        //设置子页面路由
        screens: {
          CameraScreen: "camera",
        },
      },
      NotFound: "*",
    },
  },
};

export default linking;
