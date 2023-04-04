import { StyleSheet, Text, TouchableHighlight, TouchableOpacity } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { FriendsItemProps } from "../../../types";
import * as SQLite from "expo-sqlite";
import { FlashList } from "@shopify/flash-list";
import { Avatar, Div as Box } from "react-native-magnus";
import { useCurrentTimeStamp, userAvatar, useThemeColor } from "../../../hooks/useHooks";
import { styleAll } from "../../../style";
import { useAddFriendMsg } from "../../../hooks/useSQLite";
import { useNavigation } from "@react-navigation/native";

/**
* @param userList  好友信息列表
* @param Sqlite   本地sql
*/
type FriendsAllProps = {
  userList: FriendsItemProps[];
  Sqlite: SQLite.WebSQLDatabase | null;
};


/** @好友列表 */

const FriendsAll = ({ userList, Sqlite }: FriendsAllProps) => {
  const MemoUserList = useMemo(() => userList, []);
  const Navigation = useNavigation();
  const Line = useThemeColor("line");
  const color = useThemeColor("text");

  const handleSelect = async (FriendsItem: FriendsItemProps) => {

    const finalTime = useCurrentTimeStamp()
    const parameter = {
      friendsId: FriendsItem.id,
      friendsName: FriendsItem.nickname,
      lastMessage: " ",
      finalTime,
      lastMessageCount: 0,
      ...FriendsItem,
    };

    Navigation.navigate("FriendsDetails", { friendInfo: parameter });
  };

  return (
    <Box p={10} row alignItems={"center"} justifyContent={'center'} h={'100%'} >
      {
        MemoUserList.length ? <FlashList
          data={MemoUserList}
          renderItem={({ item }) => {
            return (
              <TouchableHighlight
                underlayColor={Line}
                activeOpacity={0.7}
                onPress={() => handleSelect(item)}
              >
                <Box p={10} row alignItems={"center"} borderBottomWidth={1} borderColor={Line}>
                  <Avatar shadow={1} rounded='lg' size={40} source={{ uri: item.avatar || userAvatar }} />
                  <Text style={[styleAll.font, { marginLeft: 20, color }]}>{item.nickname}</Text>
                </Box>
              </TouchableHighlight>
            );
          }}
          keyExtractor={(item, index) => String(item.id) + index}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={119}
          keyboardDismissMode={"on-drag"}
          initialScrollIndex={userList.length > 11 ? 11 : 0}
        /> :
          <Text>暂无好友</Text>
      }

    </Box>

  );
};

export default FriendsAll;

const styles = StyleSheet.create({});
