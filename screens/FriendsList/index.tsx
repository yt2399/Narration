import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ProviderProps } from "../../types";
import { SafeAreaView } from "react-native-safe-area-context";

const FriendsList = ({ webSocketStore, store, Sqlite }: ProviderProps) => {
  return <SafeAreaView style={{ flex: 1 }} edges={["top", "right", "left"]}></SafeAreaView>;
};

export default FriendsList;

const styles = StyleSheet.create({});
