

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ProviderProps } from '../../types'
import { useNavigation } from '@react-navigation/native'
import { styleAll } from '../../style'

const Mine = ({ webSocketStore, store }:ProviderProps) => {

  const na = useNavigation()
  return (
    <View style={styleAll.center} >
      <Text style={{color:'#fff',padding:100}} onPress={()=>na.navigate("Home")} >Mine</Text>

      
    </View>
  )
}

export default Mine

const styles = StyleSheet.create({})