import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Modal } from "react-native-magnus";
import { useWindow } from "../hooks/useHooks";

type dialogPropsType = {
  isModalVisible: boolean;
};
const Dialog = ({ isModalVisible }: dialogPropsType) => {
  const deviceWidth = useWindow("Width");
  const deviceHeight = useWindow("Height");
  return (
   
      <Modal
        
        isVisible={isModalVisible}
        avoidKeyboard
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}>
       
        <View style={styles.DialogView}>
          <Text>Hello!</Text>
        </View>
      </Modal>

  );
};

export default Dialog;

const styles = StyleSheet.create({
  DialogView: {
    width: 500,
    height: 200,
    backgroundColor: "#000",
  },
});
