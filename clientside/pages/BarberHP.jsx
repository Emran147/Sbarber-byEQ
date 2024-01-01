import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function BarberHP(props) {
  //  את נתוני המשתמש   AsyncStoargeאז תמחק מה LOGOUT עם לחיצה על  
  const Logout = async () => {
    await AsyncStorage.removeItem('User');
    props.navigation.navigate('Login');
  };
  const [Bscode, setBscode] = React.useState('');

  const getbscode = async () => {
    var item = await AsyncStorage.getItem('User');
    var user = await JSON.parse(item);
    setBscode(user.BScode) 
  };
  useEffect(() => {
    async function check() {
      console.log("first use effect");
      getbscode();
    }
    check();
  }, []);





  return (
    <View style={styles.container2}>

      <ImageBackground
        source={require('./../assets/background1.png')}
        style={{ width: '100%', height: '50%' }}
      >
        <View style={styles.header}>

          <TouchableOpacity style={styles.logoutbtn} onPress={() => Logout()}>
            <MaterialIcons name="logout" size={20} color="#fff" />
            <Text style={styles.logoutBtnTxt}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View style={styles.container}>
        <Image
          source={require('./../assets/barbershoplogo.png')}
          style={{ width: 150, height: 150, alignSelf: 'center' }}
        />
        <TouchableOpacity
          style={styles.addservicebtn}
          onPress={() => {
            props.navigation.navigate('BlockAdd');
          }}
        >
          <Entypo name="block" size={18} color="#fff" />
          <Text style={styles.addservicebtnTxt}>Block List</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addservicebtn}
          onPress={() => {
            props.navigation.navigate('ServiceAdd');
          }}
        >
          <Entypo name="plus" size={24} color="#fff" />
          <Text style={styles.addservicebtnTxt}>Add Service</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addservicebtn}
          onPress={() => {
            props.navigation.navigate('ServiceList');
          }}
        >
          <MaterialIcons name="miscellaneous-services" size={24} color="#fff" />
          <Text style={styles.addservicebtnTxt}>Service List</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addservicebtn}
          onPress={() => {
            props.navigation.navigate('BRL');
          }}
        >
          <Image
            source={require('./../assets/reservations.png')}
            style={{ width: 20, height: 20 }}
          />
          <Text style={styles.addservicebtnTxt}>Reservetions</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addservicebtn}
          onPress={() => {
            props.navigation.navigate('CusLisForBarbers');
          }}
        >
          
          <Text style={styles.addservicebtnTxt}>Customer List</Text>
        </TouchableOpacity>
        <Text>  {'\n'} {'\n'} {'\n'} {'\n'} {'\n'}your Barber Shop Code Is :   '{Bscode}'</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    position: 'absolute',
    width: '100%',
    top: '20%',
    paddingTop: 10,
  },

  container2: {
    flex: 1,
    backgroundColor: '#fff',
  },

  input: {
    width: (windowWidth * 70) / 100,
    marginLeft: 60,
    justifyContent: 'center',
  },
  textpress: {
    margin: 25,
    paddingTop: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },

  addservicebtn: {
    width: '90%',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#2b2f35',
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    elevation: 5,
    marginTop: 15,
  },
  addservicebtnTxt: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginLeft: 5,
  },
  Reservetions: {
    margin: 10,
    width: windowWidth / 2.5,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: 'rgba(8, 129, 255, 0.8)',
    //
  },
  ServiceList: {
    margin: 10,
    width: windowWidth / 2.5,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 250, 8, 0.79)',
  },

  header: {
    alignItems: 'center',
    paddingHorizontal: '5%',
    borderWidth: 1,
  },
  logoutbtn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  logoutBtnTxt: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  Profile: {
    justifyContent: 'center',
  },
  blockbtn: {
    margin: 10,
    width: windowWidth / 2.5,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 41, 41, 0.8)',
  },
});
