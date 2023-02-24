import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { styleAll } from "../../style";
import { useThemeColor } from "../../hooks/useHooks";
import FriendsItem from "./FriendsItem";
import { SwipeListView } from "react-native-swipe-list-view";

import { useGetStoreObject } from "../../hooks/useStorage";
import { useToast } from "react-native-toast-notifications";
import { WebSocketStore } from "../../hooks/WebSocketStore";
import { inject, observer } from "mobx-react";
import { StoreType } from "../../hooks/store";
import { ProviderProps } from "../../types";




const Homes = ({ webSocketStore, store }:ProviderProps ) => {
  const backgroundColor = useThemeColor("background");
  const secondaryBack = useThemeColor("secondaryBack");
  const threeLevelBack = useThemeColor("threeLevelBack");

  const color = useThemeColor("text");

  const navigation = useNavigation()
  const toast = useToast()



  const handleClick = () => {
    // send("Hello, WebSocket!");
  };

  // useEffect(()=>{
  //   console.log(webSocketStates,'监听后');

  // },[webSocketStates])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {

      

      console.log(webSocketStore);
      console.log(store);
      

      if (!store.userInfo) {
        navigation.navigate('Login')
      }

    });
    // useRemoveStore('userInfo')
    return unsubscribe;
    // connect('ws://192.168.1.174:9999')
    //获取失败直接退出登陆

    // useQueryDemand(
    //   {
    //     surface: "u_chat_content",
    //     senderId: 1122,
    //     recipient: 11122,
    //   },
    //   20
    // )
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(res => {
    //     console.log(res);
    //   });
  }, [navigation]);


  const useGetStoreObjects = async () => {
    try {
      const res = await useGetStoreObject("userInfo") as any

    } catch (error) {

    }


  }

  const [listData, setListData] = useState(
    Array(20)
      .fill("")
      .map((_, i) => ({ key: `${i}`, text: `item #${i}` }))
  );

  const closeRow = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap: any, rowKey: any) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const onRowDidOpen = (rowKey: any) => {
    //执行删除
    console.log("This row opened", rowKey);
  };

  const renderItem = (data: { item: { text: any } }) => (
    <TouchableHighlight onPress={() => navigation.navigate('Dialogue')} style={styles.rowFront}>
      <FriendsItem />
    </TouchableHighlight>
  );

  const renderHiddenItem = (data: any, rowMap: any) => (
    <View style={[styles.rowBack, { backgroundColor: secondaryBack }]}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.backRightBtn, styles.backRightBtnLeft, { backgroundColor: color }]}
        onPress={() => closeRow(rowMap, data.item.key)}
      >
        <Text style={{ color: backgroundColor, fontFamily: "Inter-Black" }}>标记已读</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.key)}
      >
        <Text style={{ color: backgroundColor, fontFamily: "Inter-Black" }}>删除</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <View style={[styles.HomeMain, { backgroundColor }]}>
        <View style={[styles.head, styleAll.center]}>
          <AntDesign name='search1' size={24} color={color} />
          <AntDesign name='pluscircle' size={24} color={color} />
        </View>
        <SwipeListView
          disableRightSwipe
          data={listData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={0}
          rightOpenValue={-150}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={2000}
          onRowDidOpen={onRowDidOpen}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Homes

const styles = StyleSheet.create({
  HomeMain: {
    width: "100%",
    height: "100%",
  },
  head: {
    height: 50,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  headTitle: {
    fontFamily: "Inter-Black",
    fontSize: 30,
    color: "#212529",
  },

  rowFront: {
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    overflow: "hidden",
  },
  rowBack: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
    height: 70,
  },
  backRightBtnLeft: {
    backgroundColor: "#000",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "#e75d58",
    right: 0,
  },
});
