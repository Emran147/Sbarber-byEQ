import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  ImageBackground,
  ActivityIndicator,
  AppRegistry,
  Dimensions,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { PostRequest } from '../helper/request';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AwesomeAlert from 'react-native-awesome-alerts';
export default function CRegister(props) {
  const [Unfilled, setunfilled] = React.useState(false);
  const [CEmail, setCEmail] = React.useState('');
  const [CPassWord, setCPassWord] = React.useState('');
  const [CPhoneNumber, setCPhoneNumber] = React.useState('');
  const [CFullName, setCFullName] = React.useState('');
  const [message2, setmessage2] = React.useState(false);
  const [showAlert, setshowAlert] = React.useState(false);
  const [Checkemail, setCheckemail] = React.useState(false);
  const Register = async () => {
    if (
      CEmail == '' ||
      CPassWord == '' ||
      CPhoneNumber == '' ||
      CFullName == ''
    ) {
      setunfilled(true);
      return;
    }
    var newObj = {
      CEmail: CEmail,
      CPassWord: CPassWord,
      CPhoneNumber: CPhoneNumber,
      CFullName: CFullName,
    };
    // setIndicator(true);
    var response = await PostRequest('CustomerRegister', newObj);
    console.log('Response Is: ');
    console.log(response);
    if (response == 'Customer Created ') {
      setmessage2(true);
      setTimeout(function () {
        props.navigation.navigate('Login');
      }, 1000);
    }
    if (response == 'Check Your Email') {
      setCheckemail(true);
    }
    if (response == 'Customer  not Created') {
      setshowAlert(true);
    }
    // setIndicator(false);
  };

  return (
    <View style={styles.container}>
      <AwesomeAlert
        show={Checkemail}
        showProgress={false}
        title="Check Your Email "
        message="Enter Valid Email "
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Ok"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {}}
        onConfirmPressed={() => {
          setCheckemail(false);
        }}
      />
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="This Email Is Taken "
        message="please Chose another Email "
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Ok"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {}}
        onConfirmPressed={() => {
          setshowAlert(false);
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
        show={message2}
        showProgress={message2}
        title="Registration completed successfully"
        message=" "
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={false}
        cancelText="No, cancel"
        confirmText="Ok"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {}}
        onConfirmPressed={() => {
          setmessage2(false);
        }}
      />
      <View style={styles.headerSec}>
        <TouchableOpacity onPress={()=>props.navigation.goBack()}>
          <Ionicons name="ios-chevron-back-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.signInHeading}>Register</Text>
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
              value={CEmail}
              onChangeText={(val) => setCEmail(val)}
              style={styles.textInput}
            />
          </View>

          <View style={styles.input}>
            <Entypo name="lock" size={24} color="#2b2f35" />
            <TextInput
              placeholder="Enter Your Password"
              value={CPassWord}
              secureTextEntry={true}
              onChangeText={(val) => setCPassWord(val)}
              style={styles.textInput}
            />
          </View>
          <View style={styles.input}>
            <Ionicons name="call" size={24} color="#2b2f35" />
            <TextInput
              placeholder="Enter Your PhoneNumber"
              value={CPhoneNumber}
              keyboardType={'numeric'}
              onChangeText={(val) => setCPhoneNumber(val)}
              style={styles.textInput}
            />
          </View>
          <View style={styles.input}>
            <FontAwesome name="user" size={24} color="#2b2f35" />
            <TextInput
              placeholder="Enter Your FullName"
              value={CFullName}
              onChangeText={(val) => setCFullName(val)}
              style={styles.textInput}
            />
          </View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              Register();
            }}
          >
            <Text style={styles.loginBtnTxt}>REGISTER</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.createAccountBtn}
            onPress={() => {
              props.navigation.navigate('BarberFS');
            }}
          >
            <Text style={styles.textpress}>Create Account as a Barber</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
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
  textpress: {
    color: '#2b2f35',
    fontFamily: 'Poppins-Regular',
  },
  image: {
    height: windowHeight,
    width: windowWidth,
    marginTop: 25,
    justifyContent: 'center',
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
  createAccountBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: 40,
    marginTop: 10,
    alignSelf: 'center',
    
  },
});
