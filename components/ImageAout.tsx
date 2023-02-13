import {
  Image,
  ImageSourcePropType,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ImageLoadEventData,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";

interface ImageAutoPropsType {
  source: ImageSourcePropType;
  width?: string | number;
  style?: Object;
  Press?: Function;
}

const ImageAuto = ({ source, style, Press }: ImageAutoPropsType) => {
  const [imageRealSize, setImageRealSize] = useState({ height: 0 });
  const [indicator, setIndicator] = useState(true);
  const { uri }: any = source;

  const LoadEnd = () => {
    setIndicator(false);
  };
  useEffect(() => {
    Image.getSize(uri, (width, height) => {
      setImageRealSize({
        height: Math.floor(
          (Dimensions.get("window").width * height) / width / 3
        ),
      });
    });
  }, []);

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => Press && Press()}>
      <Image
        style={{ ...imageRealSize, ...style, zIndex: 99 }}
        resizeMethod={"resize"}
        source={source}
        onLoadEnd={LoadEnd}
      />
      {indicator && <ActivityIndicator style={styles.Indicator} color="#ccc" />}
    </TouchableOpacity>
  );
};

export default ImageAuto;


const styles = StyleSheet.create({
  Indicator:{
    position:'absolute',
    left:'43%',
    top:'55%',
    zIndex:1
  }
});
