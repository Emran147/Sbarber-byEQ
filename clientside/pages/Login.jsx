import React, { useState, useEffect, version } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Icon,
  Dimensions,
  TextInput,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { PostRequest } from '../helper/request';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';


export default function Login(props) {
  const [showAlert, setshowAlert] = React.useState(false);
  const [indicator, setIndicator] = React.useState(false);
  const [Unfilled, setunfilled] = React.useState(false);
  const [prog, setprog] = React.useState(false);
  const [Wrong, setWrong] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');


  //בדיקה אם יש משתמש מחובר - אם כן אז מעבירים אותו לדף הראשי - אם לא אז לשאר בדף הכניסה
  useEffect(() => {
    async function check() {
      var item = await AsyncStorage.getItem('User');// user  הנתונים שבשם    ASYNCStoarge תביא  מ 
      console.log(item);
      if (item == null || item == undefined) {  // אם אין אז תשאר בדף כניסה
        props.navigation.navigate('Login');
      } else {
        var user = await JSON.parse(item);

        if (Object.keys(user).length < 10) { //   אם זה לקוח  ומחובר תעביר אותו לדף הבית 
          props.navigation.navigate('CustomerHP');
        } else {
          props.navigation.navigate('BarberHP');//     תעבור לדף הבית של הספר 
        }
      }
    }

    check();
  }, []);
//פונקצית LOGIN
// בודקים מאחורי הקלעים שהנתונים נכונים ואז שומרים אותם בתוך זכרוןהטלפון ועוברים לדף ראשי
  const Login = async () => {
    if (email == '' || password == '') {
      setunfilled(true);
      return;
    }

    var newObj = {
      email: email,
      password: password,
    };
    setprog(true);
    var response = await PostRequest('LoginForEveryBody', newObj);

    if (typeof response === 'string') {
      setWrong(true);
    } else {
      console.log(response);
      if (Object.keys(response).length < 10) {
        var obj = {
          CID: response.CID,
          CEmail: response.CEmail,
          CPassWord: response.CPassWord,
          CPhoneNumber: response.CPhoneNumber,
          CFullName: response.CFullName,
        };

        await AsyncStorage.setItem('User', JSON.stringify(obj));
        props.navigation.navigate('CustomerHP');
        
      } else {
        var obj = {
          BID: response.BID,
          BEmail: response.BEmail,
          BPassWord: response.BPassWord,
          BPhoneNumber: response.BPhoneNumber,
          BFullName: response.BFullName,
          BScode: response.BScode,
          owner: response.owner,
          RestDay: response.RestDay,
          ShiftStart: response.ShiftStart,
          ShiftEnd: response.ShiftEnd,
        };
        props.navigation.navigate('BarberHP');
        await AsyncStorage.setItem('User', JSON.stringify(obj));
      }
    }
    setprog(false);
  };

  if (indicator) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text> Fetching Data...</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
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
          show={Wrong}
          showProgress={Wrong}
          title="Wrong info "
          message="Check your email or password "
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Ok"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {}}
          onConfirmPressed={() => {
            setWrong(false);
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
          <Text style={styles.signInHeading}>Sign In</Text>
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
                placeholder="Enter Your Email"
                value={email}
                onChangeText={(val) => setEmail(val)}
                style={styles.textInput}
              />
            </View>
            <View style={styles.input}>
              <Entypo name="lock" size={24} color="#2b2f35" />
              <TextInput
                placeholder="Enter Your Password"
                value={password}
                secureTextEntry={true}
                onChangeText={(val) => setPassword(val)}
                style={styles.textInput}
              />
            </View>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => {
                Login();
                setPassword('');
              }}
            >
              <Text style={styles.loginBtnTxt}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.createAccountBtn}
              onPress={() => {
                props.navigation.navigate('CRegister');
                setPassword('');
              }}
            >
              <Text style={styles.textpress}>Create Account</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <StatusBar barStyle="light-content" translucent={false} backgroundColor="#2b2f35" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b2f35',
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
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#2b2f35',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#2b2f35',
    marginLeft: 10,
    fontFamily:"Poppins-Regular"
  },
  textpress: {
    color: '#2b2f35',
    fontFamily:"Poppins-Regular"
  },
  image: {
    height: windowHeight,
    width: windowWidth,
    marginTop: 25,
    justifyContent: 'center',
  },
  but1: {
    width: '80%',
    justifyContent: 'center',
    marginTop: 20,
  },
  createAccountBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: 40,
    marginTop: 10,
    alignSelf: 'center',
  },
  loginBtn: {
    backgroundColor: '#2b2f35',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
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
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
  },
  headerSec: {
    paddingVertical: 20,
    width: '90%',
    alignSelf: 'center',
  },
});
