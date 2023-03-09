import { StyleSheet, Text, TouchableHighlight, TouchableOpacity } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { FriendsItemProps } from "../../../types";

import { FlashList } from "@shopify/flash-list";
import { Avatar, Div as Box } from "react-native-magnus";
import { userAvatar, useThemeColor } from "../../../hooks/useHooks";
import { styleAll } from "../../../style";

type FriendsAllProps = {
  userList: FriendsItemProps[];
};

const FriendsAll = ({ userList }: FriendsAllProps) => {
  const MemoUserList = useMemo(() => userList, []);
  const Line = useThemeColor("line");
  const color = useThemeColor("text");
  // useEffect(() => {
  //   // console.log(userLists);
  // }, []);

  const handleSelect = (userInfo: FriendsItemProps) => {
    console.log(userInfo);
  };

  return (
    <FlashList
      data={MemoUserList}
      renderItem={({ item }) => {
        return (
          <TouchableHighlight underlayColor={Line} activeOpacity={0.7} onPress={() => handleSelect(item)}>
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
          </TouchableHighlight >
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
