import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme, useThemeColor } from "./hooks/useHooks";
import Navigation from "./navigation";
import React, { useEffect } from "react";
import { ToastProvider } from "react-native-toast-notifications";
import { useGetStoreObject } from "./hooks/useStorage";
import { ProviderProps } from "./types";
import store from "./hooks/store";




const AppWrapper = () => {
    const colorScheme = useColorScheme();
    const backgroundColor = useThemeColor("background");

    useEffect(() => {
        useGetStoreObjects()
    }, [])

    const useGetStoreObjects = async () => {
        try {
            const result = await useGetStoreObject("userInfo") as any
            console.log(result, '测试');

            if (result) {
                store.setUser(result)
            }
            // const socket = new WebSocket('ws://43.136.103.251:9999');
            // socket.addEventListener('open', () => {
            //     console.log('链接成功');

            //     setSocketState({ socket, isReady: true });
            // });
            // setUserInfo(res)
        } catch (error) {
            
        }


    }


    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor }}>
            {/* 黑夜模式 */}
            <StatusBar style={"auto"} backgroundColor={backgroundColor} animated={true} />
            <ToastProvider>
                <Navigation colorScheme={colorScheme} />
            </ToastProvider>
            {/* {state.isActivityIndicator && <Loading />} */}
        </SafeAreaProvider>
    )
}

export default AppWrapper

