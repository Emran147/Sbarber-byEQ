import React, { useState, useEffect, version } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  TouchableHighlight,
  Pressable,
  AppRegistry,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { concat } from 'react-native-reanimated';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import AwesomeAlert from 'react-native-awesome-alerts';
import { PostRequest } from '../helper/request';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function BRegister(props) {
  const [BEmail, setBEmail] = React.useState('');
  const [BPassWord, setBPassWord] = React.useState('');
  const [BPhoneNumber, setBPhoneNumber] = React.useState('');
  const [BFullName, setFBFullName] = React.useState('');
  const [BScode, setBScode] = React.useState('');
  const [ShiftStart, setShiftStart] = React.useState();
  const [ShiftEnd, setShiftEnd] = React.useState('');
  const [RestDay, setRestDay] = React.useState('');
  const [RestDay1, setRestDay1] = React.useState('');
  const [sh, setsh] = React.useState('00');
  const [eh, seteh] = React.useState('00');
  const [sm, setsm] = React.useState('00');
  const [em, setem] = React.useState('00');
  const [prog, setprog] = React.useState(false);
  const [Unfilled, setunfilled] = React.useState(false);
  const [Checkemail, setCheckemail] = React.useState(false);
  const [showAlert, setshowAlert] = React.useState(false);
  const [showAlert2, setshowAlert2] = React.useState(false);
  const [message2, setmessage2] = React.useState(false);
  const [message3, setmessage3] = React.useState(false);
  //הרשמת ספר 
  const Register = async () => {
    if (//בדיקה שאין נתוניים חסרים
      BFullName == '' ||
      RestDay == '' ||
      BPassWord == '' ||
      BScode == '' ||
      sh == '' ||
      sm == '' ||
      eh == '' ||
      em == ''
    ) {
      setunfilled(true);
      return;
    }
    if (//שהשעות נכונות 
            parseInt(sh) > 23 ||      parseInt(eh) > 23 ||      parseInt(sm) > 59 ||      parseInt(em) > 59    ) {
      setshowAlert2(true);
      return;
    }
    if ( parseInt(sh) >=  parseInt(eh)) {
    setshowAlert2(true);
    return;
    }

    setprog(true);
    var newObj = {
      BEmail: BEmail,
      BPassWord: BPassWord,
      BPhoneNumber: BPhoneNumber,
      BFullName: BFullName,
      BScode: BScode,
      owner: 1,
      ShiftStart: sh.concat(':', sm),
      ShiftEnd: eh.concat(':', em),
      RestDay: parseInt(RestDay),
    };
    var response = await PostRequest('BarberRegister', newObj);
    console.log('Response Is: ');
    console.log(response);
    if (response == 'Barber Created ') {
      await AsyncStorage.removeItem('Shop');
      //  await AsyncStorage.setItem("Barber",JSON.stringify(newObj) );

      setmessage2(true);
      setTimeout(function () {
        props.navigation.navigate('Login');
      }, 1000);
    }

    if (response == 'Email is Taken / Something Wrong') {
      setshowAlert(true);
    }
    if (response == 'Check Your Email') {
      setCheckemail(true);
    }
    if (response == 'Wrong BScode') {
      setmessage3(true);
      setprog(false);
    }
  };

  // begin
  useEffect(() => {
    async function check() {
      var item = await AsyncStorage.getItem('Shop');//תביא קוד המספרה אם הוא עשה מספרה ישירות 
      console.log(item);
      if (item != null || item != undefined) {
        var user = await JSON.parse(item);
        setBScode(user.BScode);
      }
    }
    check();
  }, []);
  //at  the end
  useEffect(() => {
    return () => {
      AsyncStorage.removeItem('Shop');
      setprog(false);
      setmessage2(false);
      setmessage3(false);
      console.log('end');
    };
  }, []);

  return (
    <View style={styles.container}>
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

      <AwesomeAlert
        show={message3}
        showProgress={message3}
        title="Wrong Barber Shop Code "
        message="Check you Barber Shop Code Again "
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Ok"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {}}
        onConfirmPressed={() => {
          setmessage3(false);
        }}
      />

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
        show={showAlert2}
        showProgress={false}
        title="Wrong Hours "
        message="Chose Another Hours "
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Ok"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {}}
        onConfirmPressed={() => {
          setshowAlert2(false);
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
              placeholder="Enter Your Email"
              value={BEmail}
              onChangeText={(val) => setBEmail(val)}
              style={styles.textInput}
            />
          </View>
          {/* <View style={styles.input}>
            <TextInput
              placeholder="Enter Your Email"
              value={BEmail}
              onChangeText={(val) => setBEmail(val)}
            />
          </View> */}

          <View style={styles.input}>
            <Entypo name="lock" size={24} color="#2b2f35" />
            <TextInput
              placeholder="Enter Your Password"
              value={BPassWord}
              secureTextEntry={true}
              onChangeText={(val) => setBPassWord(val)}
              style={styles.textInput}
            />
          </View>

          <View style={styles.input}>
            <Ionicons name="call" size={24} color="#2b2f35" />
            <TextInput
              placeholder="Enter Your PhoneNumber"
              value={BPhoneNumber}
              keyboardType={'numeric'}
              onChangeText={(val) => setBPhoneNumber(val)}
              style={styles.textInput}
            />
          </View>

          <View style={styles.input}>
            <FontAwesome name="user" size={24} color="#2b2f35" />
            <TextInput
              placeholder="Enter Your FullName"
              value={BFullName}
              onChangeText={(val) => setFBFullName(val)}
              style={styles.textInput}
            />
          </View>

          <View style={styles.input}>
            <TextInput
              placeholder="Enter Your BScode"
              value={BScode}
              onChangeText={(val) => setBScode(val)}
              style={styles.textInput}
            />
          </View>

          <Text style={styles.label}>Chose your rest day</Text>
          {/* <View style={styles.but2}>
            <Button
              title="Sun"
              onPress={() => {
                setRestDay(1), setRestDay1('SunDay');
              }}
            />
          </View> */}

          <View style={styles.row}>
            <TouchableOpacity
              style={[
                RestDay1 === 'MonDay' ? styles.selectedDayBtn : styles.dayBtn,
              ]}
              onPress={() => {
                setRestDay(2), setRestDay1('MonDay');
              }}
            >
              <Text
                style={[
                  styles.dayBtnTxt,
                  RestDay1 === 'MonDay'
                    ? { color: '#fff' }
                    : { color: '#2b2f35' },
                ]}
              >
                MON
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                RestDay1 === 'TuesDay' ? styles.selectedDayBtn : styles.dayBtn,
              ]}
              onPress={() => {
                setRestDay(2), setRestDay1('TuesDay');
              }}
            >
              <Text
                style={[
                  styles.dayBtnTxt,
                  RestDay1 === 'TuesDay'
                    ? { color: '#fff' }
                    : { color: '#2b2f35' },
                ]}
              >
                TUES
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                RestDay1 === 'WednesDay'
                  ? styles.selectedDayBtn
                  : styles.dayBtn,
              ]}
              onPress={() => {
                setRestDay(2), setRestDay1('WednesDay');
              }}
            >
              <Text
                style={[
                  styles.dayBtnTxt,
                  RestDay1 === 'WednesDay'
                    ? { color: '#fff' }
                    : { color: '#2b2f35' },
                ]}
              >
                WED
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                RestDay1 === 'ThursDay' ? styles.selectedDayBtn : styles.dayBtn,
              ]}
              onPress={() => {
                setRestDay(2), setRestDay1('ThursDay');
              }}
            >
              <Text
                style={[
                  styles.dayBtnTxt,
                  RestDay1 === 'ThursDay'
                    ? { color: '#fff' }
                    : { color: '#2b2f35' },
                ]}
              >
                THURS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                RestDay1 === 'FriDay' ? styles.selectedDayBtn : styles.dayBtn,
              ]}
              onPress={() => {
                setRestDay(2), setRestDay1('FriDay');
              }}
            >
              <Text
                style={[
                  styles.dayBtnTxt,
                  RestDay1 === 'FriDay'
                    ? { color: '#fff' }
                    : { color: '#2b2f35' },
                ]}
              >
                FRI
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                RestDay1 === 'SaturDay' ? styles.selectedDayBtn : styles.dayBtn,
              ]}
              onPress={() => {
                setRestDay(2), setRestDay1('SaturDay');
              }}
            >
              <Text
                style={[
                  styles.dayBtnTxt,
                  RestDay1 === 'SaturDay'
                    ? { color: '#fff' }
                    : { color: '#2b2f35' },
                ]}
              >
                SAT
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                RestDay1 === 'SunDay' ? styles.selectedDayBtn : styles.dayBtn,
              ]}
              onPress={() => {
                setRestDay(2), setRestDay1('SunDay');
              }}
            >
              <Text
                style={[
                  styles.dayBtnTxt,
                  RestDay1 === 'SunDay'
                    ? { color: '#fff' }
                    : { color: '#2b2f35' },
                ]}
              >
                SUN
              </Text>
            </TouchableOpacity>
          </View>

          {/* <View>
            <Text> Your Rest Day : {RestDay1}</Text>
          </View> */}

          <Text style={styles.label}>Your shift hours</Text>
          <View style={styles.row}>
            <View style={styles.input2}>
              <TextInput
                fontSize={20}
                placeholder="00"
                placeholderTextColor="#2b2f35"
                value={sh}
                maxLength={2}
                keyboardType={'numeric'}
                onChangeText={(val) => setsh(val)}
                style={styles.hoursInput}
              />
            </View>
            <Text style={styles.new}>:</Text>
            <View style={styles.input2}>
              <TextInput
                fontSize={20}
                placeholder="00"
                placeholderTextColor="#2b2f35"
                value={sm}
                maxLength={2}
                keyboardType={'numeric'}
                onChangeText={(val) => setsm(val)}
                style={styles.hoursInput}
              />
            </View>
            <Text style={styles.new}>_</Text>
            <View style={styles.input2}>
              <TextInput
                fontSize={20}
                placeholder="00"
                placeholderTextColor="#2b2f35"
                value={eh}
                maxLength={2}
                keyboardType={'numeric'}
                onChangeText={(val) => seteh(val)}
                style={styles.hoursInput}
              />
            </View>
            <Text style={styles.new}>:</Text>
            <View style={styles.input2}>
              <TextInput
                fontSize={20}
                placeholder="00"
                placeholderTextColor="#2b2f35"
                value={em}
                keyboardType={'numeric'}
                maxLength={2}
                onChangeText={(val) => setem(val)}
                style={styles.hoursInput}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              Register();
            }}
          >
            <Text style={styles.loginBtnTxt}>REGISTER</Text>
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
  btnNormal: {
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 10,
    height: 30,
    width: 100,
  },
  btnPress: {
    borderColor: 'green',
    borderWidth: 1,
    height: 30,
    width: 100,
  },

  textpress: {
    margin: 25,
    paddingTop: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: windowHeight,
    width: windowWidth,
    marginTop: 25,
    justifyContent: 'center',
  },
  dayBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2b2f35',
    width: '32%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    borderRadius: 5,
    marginTop: 10,
  },
  selectedDayBtn: {
    backgroundColor: '#2b2f35',
    borderWidth: 1,
    borderColor: '#2b2f35',
    width: '32%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    borderRadius: 5,
    marginTop: 10,
  },
  dayBtnTxt: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#2b2f35',
  },

  box: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'oldlace',
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '48%',
    textAlign: 'center',
  },
  selected: {
    backgroundColor: 'coral',
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: 'coral',
  },
  selectedLabel: {
    color: 'white',
  },
  label: {
    textAlign: 'left',
    marginTop: 30,
    fontSize: 18,
    width: '90%',
    alignSelf: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  input2: {
    width: (windowWidth * 10) / 100,
    margin: 4,
    fontSize: 10,
    height: 24,
    justifyContent: 'center',
    borderBottomWidth: 2,
    marginTop: 10,
    alignItems:"center",
    borderBottomColor:"#2b2f35",
    borderRadius:4
  },
  hoursInput:{
    fontFamily: 'Poppins-Regular',
    fontSize:14,
    color: "#2b2f35"
  },
  new: {
    width: (windowWidth * 4) / 100,
    margin: 4,
    fontSize: 10,
    height: 24,
    justifyContent: 'center',
    marginTop: 10,
    fontFamily:"Poppins-Regular"
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
