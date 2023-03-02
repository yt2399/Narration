import * as React from "react";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { ProviderProps, RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import Homes from "../screens/Home";
import Mine from "../screens/Mine";
import Dialogue from "../screens/Dialogue";
import { ColorSchemeName } from "react-native";
import Cameras from "../screens/Camera";
import Login from "../screens/Login";
import { inject, observer } from "mobx-react";
import Start from "../screens/Start";
import { useColorScheme } from "../hooks/useHooks";
import { Entypo, FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import {
  AnimatedTabBarNavigator,
  DotSize, // optional
  TabElementDisplayOptions, // optional
  TabButtonLayout, // optional
  IAppearanceOptions, // optional
} from "react-native-animated-nav-tab-bar";
import Colors from "../constants/Colors";
import FriendsList from "../screens/FriendsList";
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <HomeRouter />
    </NavigationContainer>
  );
}

type StartScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Start">;
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;
type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;
type DialogueScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Dialogue">;
type MineScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Mine">;
type FriendsListNavigationProp = NativeStackNavigationProp<RootStackParamList, "FriendsList">;

type StartProps = {
  navigation: StartScreenNavigationProp;
};
type HomeProps = {
  navigation: HomeScreenNavigationProp;
};
type LoginProps = {
  navigation: LoginScreenNavigationProp;
};
type DialogueProps = {
  navigation: DialogueScreenNavigationProp;
};
type MineProps = {
  navigation: MineScreenNavigationProp;
};
type FriendsList = {
  navigation: FriendsListNavigationProp;
};

const StartScreen = inject(
  "webSocketStore",
  "store",
  "Sqlite"
)(
  observer((props: StartProps) => {
    const { webSocketStore, store, Sqlite } = props as unknown as ProviderProps;
    return <Start webSocketStore={webSocketStore} store={store} Sqlite={Sqlite} />;
  })
);

const HomeScreen = inject(
  "webSocketStore",
  "store",
  "Sqlite"
)(
  observer((props: HomeProps) => {
    const { webSocketStore, store, Sqlite } = props as unknown as ProviderProps;
    return <Homes webSocketStore={webSocketStore} store={store} Sqlite={Sqlite} />;
  })
);

const LoginScreen = inject(
  "webSocketStore",
  "store",
  "Sqlite"
)(
  observer((props: LoginProps) => {
    const { webSocketStore, store, Sqlite } = props as unknown as ProviderProps;
    return <Login webSocketStore={webSocketStore} store={store} Sqlite={Sqlite} />;
  })
);

const DialogueScreen = inject(
  "webSocketStore",
  "store",
  "Sqlite"
)(
  observer((props: DialogueProps) => {
    const { webSocketStore, store, Sqlite } = props as unknown as ProviderProps;
    return <Dialogue webSocketStore={webSocketStore} store={store} Sqlite={Sqlite} />;
  })
);

const MineScreen = inject(
  "webSocketStore",
  "store",
  "Sqlite"
)(
  observer((props: MineProps) => {
    const { webSocketStore, store, Sqlite } = props as unknown as ProviderProps;
    return <Mine webSocketStore={webSocketStore} store={store} Sqlite={Sqlite} />;
  })
);

const FriendsListScreen = inject(
  "webSocketStore",
  "store",
  "Sqlite"
)(
  observer((props: MineProps) => {
    const { webSocketStore, store, Sqlite } = props as unknown as ProviderProps;
    return <FriendsList webSocketStore={webSocketStore} store={store} Sqlite={Sqlite} />;
  })
);

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeRouter() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Start' component={StartScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name='Home'
        component={BottomTabNavigator}
        options={{
          headerShown: false,
          gestureEnabled:false
        }}
      />
      <Stack.Screen
        name='Dialogue'
        component={DialogueScreen}
        options={{ headerShown: false }}
        initialParams={{}}
      />
      <Stack.Screen name='Camera' component={Cameras} options={{ headerShown: false }} />
      <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

// function MineRouter() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name='Mine'
//         component={MineScreen}
//         options={{
//           headerShown: false,
//         }}
//       />
//     </Stack.Navigator>
//   );
// }

const Tabs = AnimatedTabBarNavigator();
// BottomTab.Navigator 快捷创建底部tab导航栏组件
function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Tabs.Navigator
      // default configuration from React Navigation
      appearance={{
        shadow: true,
        floating: true,
        tabBarBackground: Colors[colorScheme].background,
        dotSize: DotSize["SMALL"],
        // dotCornerRadius:10
      }}
      initialRouteName='Home'
      tabBarOptions={{
        activeBackgroundColor: Colors[colorScheme].text,
        activeTintColor: Colors[colorScheme].line,
        inactiveTintColor: Colors[colorScheme].text,
      }}
    >
      <Tabs.Screen
        name='叙述'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }: any) => (
            <Entypo name='chat' size={24} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name='好友列表'
        component={FriendsListScreen}
        options={{
          tabBarIcon: ({ focused, color, size }: any) => (
            <FontAwesome5 name='user-alt' size={24} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name='设置'
        component={MineScreen}
        options={{
          tabBarIcon: ({ focused, color, size }: any) => (
            // <FontAwesome5 name='user-alt' size={size ? size : 24} color={color} focused={focused}
            <Ionicons name='md-settings' size={24} color={color} focused={focused} />
            // />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
