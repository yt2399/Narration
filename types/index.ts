import { NavigatorScreenParams } from "@react-navigation/native";


declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}

export type RootTabParamList = {
    Home: undefined;
};

export type RootStackParamList = {
    Home: NavigatorScreenParams<RootTabParamList> | undefined;
    Mine: undefined
    NotFound: undefined
    Dialogue: undefined
};