import * as React from "react";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProviderProps, RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import Homes from "../screens/Home";
import Mine from "../screens/Mine";
import Dialogue from "../screens/Dialogue";
import { ColorSchemeName } from "react-native";
import Cameras from "../screens/Camera";
import Login from "../screens/Login";
import { inject, observer } from "mobx-react";


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


type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
type DialogueScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dialogue'>;
type MineScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Mine'>;

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


const HomeScreen = inject('webSocketStore', 'store','Sqlite')(
  observer((props: HomeProps) => {
    const { webSocketStore, store, Sqlite } = props as unknown as ProviderProps
    return <Homes webSocketStore={webSocketStore} store={store} Sqlite={Sqlite} />;
  })
);

const LoginScreen = inject('webSocketStore', 'store','Sqlite')(
  observer((props: LoginProps) => {
    const { webSocketStore, store, Sqlite } = props as unknown as ProviderProps
    return <Login webSocketStore={webSocketStore} store={store} Sqlite={Sqlite} />;
  })
);


const DialogueScreen = inject('webSocketStore', 'store','Sqlite')(
  observer((props: DialogueProps) => {
    const { webSocketStore, store, Sqlite } = props as unknown as ProviderProps
    return <Dialogue webSocketStore={webSocketStore} store={store} Sqlite={Sqlite} />;
  })
);

const MineScreen = inject('webSocketStore', 'store','Sqlite')(
  observer((props: MineProps) => {
    const { webSocketStore, store, Sqlite } = props as unknown as ProviderProps
    return <Mine webSocketStore={webSocketStore} store={store} Sqlite={Sqlite} />;
  })
);

const Stack = createNativeStackNavigator<RootStackParamList>();
function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Dialogue' component={DialogueScreen} options={{ headerShown: false }}  initialParams={{}} />
      <Stack.Screen name='Mine' component={MineScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Camera' component={Cameras} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}


