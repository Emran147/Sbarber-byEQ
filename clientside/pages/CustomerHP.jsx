import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import AsyncStorage from '@react-native-async-storage/async-storage';
export default function BarberHP(props) {
  const Logout = async () => {
    await AsyncStorage.removeItem('User');
    props.navigation.navigate('Login');
  };

  return (
    <View style={styles.container2}>
      <ImageBackground
        source={require('./../assets/background1.png')}
        style={{ width: '100%', height: '50%' }}
      >
        <View style={styles.header}>
          {/* <TouchableOpacity
            style={styles.Profile}
            onPress={() => {
              props.navigation.navigate('CustomerProfile');
            }}
          >
            <FontAwesome name="user" size={30} color="#fff" />
          </TouchableOpacity> */}
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
            props.navigation.navigate('CReservationslist');
          }}
        >
          <Image
            source={require('./../assets/reservations.png')}
            style={{ width: 20, height: 20 }}
          />
          <Text style={styles.addservicebtnTxt}>Reservations List</Text>
        </TouchableOpacity>

        
        <TouchableOpacity
          style={styles.addservicebtn}
          onPress={() => {
            props.navigation.navigate('BSLFCR');
          }}
        >
          <Entypo name="plus" size={24} color="#fff" />
          <Text style={styles.addservicebtnTxt}>Make Reservetion</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container2: {
    flex: 1,
  },

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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  logoutbtn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    flexDirection:"row"
  },
  logoutBtnTxt: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  Profile: {
    justifyContent: 'center',
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
  },
});
