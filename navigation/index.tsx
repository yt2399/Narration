import * as React from "react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import Home from "../screens/Home";
import Mine from "../screens/Mine";
import Dialogue from "../screens/Dialogue";
import { ColorSchemeName } from "react-native";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  console.log(colorScheme,'主题色');
  
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator   />
    </NavigationContainer>
  );
}

function RootNavigator() {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="Dialogue"
        component={Dialogue}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Mine"
        component={Mine}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
