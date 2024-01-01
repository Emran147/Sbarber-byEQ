import React, { useState, useEffect, version } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import AwesomeAlert from 'react-native-awesome-alerts';
import { PostRequest } from '../helper/request';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BarberShopC(props) {
  const [BScode, setBScode] = React.useState('');
  const [BScodeM, setBScodeM] = React.useState('');
  const [BSname, setBSname] = React.useState('');
  const [BSAddress, setBSAddress] = React.useState('');
  const [Unfilled, setunfilled] = React.useState(false);
  const [Message, setMessage] = React.useState(false);
  const [prog, setprog] = React.useState(false);

  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//יצירת קוד חדש למספרה חדשה (קוד אקראי)
  useEffect(() => {
    async function check() {
      createrandom();
    }

    check();
  }, []);
//פונקצית יצירת מספרה 
  const Create = async () => {
    if (BSname == '' || BSAddress == '') {//בדיקה שאין נתונים חסריים
      setunfilled(true);
      return;
    }

    setprog(true);
    var newObj = {
      BScode: BScode,
      BSname: BSname,
      BSAddress: BSAddress,
    };
    setBScodeM(
      'Now You Should Make A Barber Account , Dont ForgeT Your BarberShop Code' + ' ' +
        BScode
    );
    // setIndicator(true);

    var response = await PostRequest('CreateBarberShop', newObj);
    console.log('Response Is: ');
    console.log(response);

    if (response == 'BarberShop Created ') {
      setMessage(true);
      await AsyncStorage.setItem('Shop', JSON.stringify(newObj));

      setTimeout(function () {
        props.navigation.navigate('BRegister');
        setMessage(false);
      }, 3000);
    } else {
      alert('wrong ');
    }
    setprog(false);
  };

  const createrandom = () => {
    setBScode(generateString(6));
  };
  function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  return (
    <View style={styles.container}>
      <AwesomeAlert
        show={Message}
        showProgress={false}
        title="Welcome :)  "
        message={BScodeM}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={false}
        cancelText="No, cancel"
        confirmText="Ok"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {}}
        onConfirmPressed={() => {
          setMessage(false);
        }}
      />

      <AwesomeAlert
        show={Unfilled}
        showProgress={false}
        title="Unfilled fields "
        message="Please Fill All The Fields "
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Ok"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {}}
        onConfirmPressed={() => {
          setunfilled(false);
        }}
      />

      <AwesomeAlert
        show={prog}
        showProgress={prog}
        title="Loading "
        message=""
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={false}
        cancelText="No, cancel"
        confirmText="Ok"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {}}
        onConfirmPressed={() => {
          setprog(false);
        }}
      />
      <View style={styles.headerSec}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Ionicons name="ios-chevron-back-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.signInHeading}>Create Barber Shop</Text>
      </View>
      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            source={require('./../assets/barbershoplogo.png')}
            style={{ width: 100, height: 100, alignSelf: 'center' }}
          />
          <View style={styles.input}>
            <Entypo name="mail" size={24} color="#2b2f35" />
            <TextInput
              placeholder="Enter Barber Shop Name"
              value={BSname}
              onChangeText={(val) => setBSname(val)}
              style={styles.textInput}
            />
          </View>

          <View style={styles.input}>
            <Entypo name="location-pin" size={24} color="#2b2f35" />
            <TextInput
              placeholder="Enter Barber Shop Address "
              value={BSAddress}
              onChangeText={(val) => setBSAddress(val)}
              style={styles.textInput}
            />
          </View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              Create();
            }}
          >
            <Text style={styles.loginBtnTxt}>CREATE</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b2f35',
  },
  light: {
    fontFamily: 'sans-serif-thin',
    fontWeight: 'normal',
  },
  input: {
    width: (windowWidth * 50) / 100,
    margin: 4,
    fontSize: 10,
    height: 24,
    justifyContent: 'center',
    borderBottomWidth: 1,
    marginTop: 15,
  },
  loginBtn: {
    backgroundColor: '#2b2f35',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 10,
    marginTop: 20,
    elevation: 5,
    width: '90%',
    alignSelf: 'center',
  },
  loginBtnTxt: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  signInHeading: {
    color: '#fff',
    width: '100%',
    fontSize: 18,
    marginLeft: 10,
    fontFamily: 'Poppins-Medium',
  },
  headerSec: {
    paddingVertical: 15,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    backgroundColor: '#fff',
    width: '100%',
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
  },
  input: {
    width: '90%',
    marginTop: 20,
    justifyContent: 'center',
    borderWidth: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#2b2f35',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  textInput: {
    flex: 1,
    color: '#2b2f35',
    marginLeft: 10,
    fontFamily: 'Poppins-Regular',
  },
});
