import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Badge, Box } from "react-native-magnus";
import { SceneRendererProps, Route, NavigationState } from "react-native-tab-view";
import { useThemeColor, useWindow } from "../hooks/useHooks";
import { styleAll } from "../style";

const Width = useWindow("Width");

function tabBar<T extends Route>(
  props: SceneRendererProps & {
    navigationState: NavigationState<T>;
    setIndex: React.Dispatch<React.SetStateAction<number>>;
  }
) {
  const color = useThemeColor("text");
  const { navigationState, setIndex } = props;

  const LeftAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(LeftAnim, {
      toValue: Width * (((100 / navigationState.routes.length) * navigationState.index) / 100),
      useNativeDriver: false,
    }).start();
  }, [navigationState.index]);

  return (
    <View>
      <Box w={"100%"} h={40} row style={{ marginTop: 20, marginBottom: 10 }}>
        {navigationState.routes.map((item, index) => {
          const opacity = navigationState.index === index ? 1 : 0.5;
          return (
            <Box w={`${100 / navigationState.routes.length}%`} h={30} key={item.key}>
              <TouchableOpacity style={{ flex: 1 }} onPress={() => setIndex(index)}>
                <Text style={[styleAll.font, { color, opacity, textAlign: "center" }]}>
                  {item.title}
                </Text>
                {item.key === "newFriends" && <Badge bg='red500' right={-85} top={-19} />}
              </TouchableOpacity>
            </Box>
          );
        })}
      </Box>

      <Animated.View
        style={{
          width: `${100 / navigationState.routes.length - 5}%`,
          left: LeftAnim,
          // backgroundColor: color,
          ...styleAll.center,
          ...styles.borderBottom,
        }}
      >
        <View style={[styles.dot,{backgroundColor: color,}]}></View>
        </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  borderBottom: {
    position: "relative",
    bottom: 30,
    height: 4,
    marginLeft: "2.5%",
    justifyContent:"center"
  },
  dot:{
    width:30,
    height:4,
    borderRadius: 10,
  }
});

export default tabBar;
