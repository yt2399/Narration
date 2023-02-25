import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme, useThemeColor } from "./hooks/useHooks";
import Navigation from "./navigation";
import React, { useEffect } from "react";
import { ToastProvider } from "react-native-toast-notifications";
import { useGetStoreObject } from "./hooks/useStorage";
import store from "./hooks/store";
import { View } from "react-native";
import Loading from "./components/Loading";




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
            {store.isActivityIndicator && <Loading />}
        </SafeAreaProvider>
    )
}

export default AppWrapper

