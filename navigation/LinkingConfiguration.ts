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
      Dialogue: {
        //设置子页面路由
        screens: {
          DialogueScreen: "Dialogue",
        },
      },
      Home: {
        //设置子页面路由
        screens: {
          Home: {
            screens: {
              HomeScreen: "home",
            },
          },
        },
      },
      Mine: {
        //设置子页面路由
        screens: {
          MineScreen: "mine",
        },
      },
      NotFound: "*",
    },
  },
};

export default linking;
