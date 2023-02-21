import * as React from "react";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import Homes from "../screens/Home";
import Mine from "../screens/Mine";
import Dialogue from "../screens/Dialogue";
import { ColorSchemeName } from "react-native";
import Cameras from "../screens/Camera";
import Login from "../screens/Login";




export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}
const Stack = createNativeStackNavigator<RootStackParamList>();
function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={Homes} options={{ headerShown: false }} />
      <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
      <Stack.Screen name='Dialogue' component={Dialogue} options={{ headerShown: false }} />
      <Stack.Screen name='Mine' component={Mine} options={{ headerShown: false }} />
      <Stack.Screen name='Camera' component={Cameras} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
