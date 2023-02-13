import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Home = () => {


  const Navigation = useNavigation().navigate

  
  return (
    <View style={styles.HomeMain}>
      <Text style={styles.textMain} onPress={()=>Navigation('Mine')} >Home</Text>
      
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  HomeMain:{
    width:'100%',
    height:'100%',
    backgroundColor:'#000'
  },
  textMain:{
    marginTop:100,
    marginLeft:20,
    backgroundColor:"#fff"
  }
})