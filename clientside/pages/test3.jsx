import React,{useState,useEffect} from 'react'
import { GetRequest, PostRequest } from '../helper/request'
import AwesomeAlert from 'react-native-awesome-alerts';
import { View, Text,ScrollView, TextInput ,Dimensions,StyleSheet,TouchableOpacity,FlatList} from 'react-native'
import {  Card, Paragraph ,Button} from 'react-native-paper';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function test3() {
  return (
    <View style={styles.container}>

<TextInput
    style={[ false ? styles.textinvalid : styles.textvalid]}>
</TextInput>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      margin: 10,
      paddingTop:50,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    but1: {
  
      width: windowWidth/2.5,
      margin:50,

        justifyContent: "center"
    },
    text: {
      height: 40, backgroundColor: 'white', borderRadius: 5, padding: 10, 
      //klle
  },
  textvalid: {
      borderWidth: 2,
      borderColor: 'green',
      //false
  },
  textinvalid: {
      borderColor: 'red',
      borderWidth:2
      //true
  },


})