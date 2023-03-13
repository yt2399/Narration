import { StyleSheet, Text, TouchableHighlight, TouchableOpacity } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { FriendsItemProps } from "../../../types";
import * as SQLite from "expo-sqlite";
import { FlashList } from "@shopify/flash-list";
import { Avatar, Div as Box } from "react-native-magnus";
import { userAvatar, useThemeColor } from "../../../hooks/useHooks";
import { styleAll } from "../../../style";
import { useAddFriendMsg } from "../../../hooks/useSQLite";
import { useNavigation } from "@react-navigation/native";

type FriendsAllProps = {
  userList: FriendsItemProps[];
  Sqlite: SQLite.WebSQLDatabase | null;
};

const FriendsAll = ({ userList, Sqlite }: FriendsAllProps) => {
  const MemoUserList = useMemo(() => userList, []);
  const Navigation = useNavigation();
  const Line = useThemeColor("line");
  const color = useThemeColor("text");
  // useEffect(() => {
  //   // console.log(userLists);
  // }, []);

  const handleSelect = async ({ id, avatar, nickname, star, updTime }: FriendsItemProps) => {
    const finalTime = Math.floor(new Date().getTime() / 1000);
    const parameter = {
      friendsId: id,
      avatar,
      friendsName: nickname,
      lastMessage: " ",
      finalTime,
      star,
      updTime,
    };

    Navigation.navigate("FriendsDetails", { friendInfo: parameter });

    // console.log(Sqlite);

    // if (Sqlite) {
    //   try {
    //     await useAddFriendMsg(Sqlite, parameter, id);
    //     console.log(111);

    //   } catch (error) {
    //     console.log(error);

    //   }
    // }
  };

  return (
    <FlashList
      data={MemoUserList}
      renderItem={({ item }) => {
        return (
          <TouchableHighlight
            underlayColor={Line}
            activeOpacity={0.7}
            onPress={() => handleSelect(item)}
          >
            <Box p={10} row alignItems={"center"} borderBottomWidth={1} borderColor={Line}>
              <Avatar
                shadow={1}
                rounded='lg'
                size={40}
                source={{
                  uri: item.avatar || userAvatar,
                }}
              />
              <Text style={[styleAll.font, { marginLeft: 20, color }]}>{item.nickname}</Text>
            </Box>
          </TouchableHighlight>
        );
        //   return <DialogueContents avatar={friendInfo.avatar} {...item} />;
      }}
      keyExtractor={(item, index) => String(item.id) + index}
      showsVerticalScrollIndicator={false}
      estimatedItemSize={119}
      keyboardDismissMode={"on-drag"}
      initialScrollIndex={userList.length > 11 ? 11 : 0}
    />
  );
};

export default FriendsAll;

const styles = StyleSheet.create({});
