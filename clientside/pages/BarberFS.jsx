import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Button,
  TouchableOpacity,
  Pressable,
  AppRegistry,
  Dimensions,
  TextInput,
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const image = {
  uri: 'https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX25399484.jpg',
};

import { Card, Text, Paragraph } from 'react-native-paper';
export default function BarberFS(props) {
  return (
    <View style={styles.container}>
      {/* <ImageBackground source={image} resizeMode="cover" style={styles.image}> */}
      <ImageBackground
        source={require('./../assets/background1.png')}
        style={{
          width: '100%',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        resizeMode="cover"
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate('BarberShopC');
          }}
        >
          <Text style={styles.label}>Create Barber Shop</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate('BRegister');
          }}
        >
          <Text style={styles.label}>Join to Exist Barber Shop</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  light: {
    fontWeight: 'normal',
  },
  label: {
    textAlign: 'center',
    fontFamily: '',
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Poppins-Medium',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2b2f35',
    marginTop: 20,
    borderRadius: 10,
    justifyContent: 'center',
    height: 50,
    width: windowWidth / 1.1,
  },
  image: {
    flex: 1,

    justifyContent: 'center',
  },
});
