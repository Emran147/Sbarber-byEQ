import React, { useState, useEffect } from 'react';
import { PostRequest } from '../helper/request';
import AwesomeAlert from 'react-native-awesome-alerts';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ServiceAdd(props) {
  const [ServiceName, setServiceName] = useState('');
  const [prog, setprog] = React.useState(false);
  const [Unfilled, setunfilled] = React.useState(false);
  const [Sucscess, setSucscess] = React.useState(false);
  const [ServiceTime, setServiceTime] = useState('');
  const [ServicePrice, setServicePrice] = useState('');
  const [BID, setBID] = useState('');

  //at the end
  useEffect(() => {
    return () => {
      //    AsyncStorage.removeItem("Barber");
      console.log('end');
      setprog(false);
    };
  }, []);

  // beginning
  useEffect(() => {
    async function check() {
      //  var item = await AsyncStorage.getItem("Barber");
      //     console.log(item);
      var item2 = await AsyncStorage.getItem('User');
      console.log('item2');
      console.log(item2);
      //           if (item != null || item != undefined ) {
      //           var user = await JSON.parse(item);
      //                  setBEmail(user.BEmail)

      //           }
      if (item2 != null || item2 != undefined) {
        var user2 = await JSON.parse(item2);
        setBID(user2.BID);
      } else {
        setBID('0');
      }
    }
    check();
  }, []);

  const AddService = async () => {
    if (ServiceName === '' || ServiceTime === '' || ServicePrice === '') {
      setunfilled(true);
      return;
    }
    setprog(true);

    var newObj = {
      BID: BID,
      ServiceName: ServiceName,
      ServiceTime: ServiceTime,
      ServicePrice: ServicePrice,
    };
    var response = await PostRequest('AddService', newObj);
    console.log('Response Is: ');
    console.log(response);

    if (response == 'Service  Created ') {
      console.log('created');

      setSucscess(true);
      //   await  AsyncStorage.removeItem("Barber");
      setTimeout(function () {
        setServiceName('');
        setServicePrice('');
        setServiceTime('');
        setprog(false);
        setSucscess(false);
        props.navigation.navigate('BarberHP');
      }, 1000);
    } else {
      console.log('eror');
    }
  };

  return (
    <SafeAreaView
      style={{
        width: '100%',
      }}
    >
      <AwesomeAlert
        show={prog}
        showProgress={false}
        title="Loading "
        message=""
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={false}
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
        show={Sucscess}
        showProgress={false}
        title="good job "
        message="The service has been added successfully "
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={false}
        cancelText="No, cancel"
        confirmText="Ok"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {}}
        onConfirmPressed={() => {
          setSucscess(false);
        }}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Ionicons name="ios-chevron-back-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>Add Service</Text>
      </View>
      <ScrollView contentContainerStyle={{ width: '100%' }}>
        <View style={styles.body}>
          <Image
            source={require('./../assets/barbershoplogo.png')}
            style={{ width: 150, height: 150, alignSelf: 'center' }}
          />
          <TextInput
            value={ServiceName}
            onChangeText={(val) => setServiceName(val)}
            style={styles.input1}
            placeholder="Service Name"
          ></TextInput>
          <TextInput
            value={ServiceTime}
            onChangeText={(val) => setServiceTime(val)}
            style={styles.input1}
            keyboardType="number-pad"
            placeholder="Duration"
          ></TextInput>
          <TextInput
            value={ServicePrice}
            onChangeText={(val) => setServicePrice(val)}
            style={styles.input1}
            keyboardType="number-pad"
            placeholder="Price"
          ></TextInput>
          <TouchableOpacity
            onPress={AddService}
            style={styles.TouchableOpacity1}
          >
            <Text style={styles.btnTxt}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  input1: {
    borderWidth: 1,
    width: '90%',
    height: 45,
    marginTop: 10,
    borderRadius: 5,
    alignSelf: 'center',
    borderColor: '#2b2f35',
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Regular',
    color: '#2b2f35',
  },
  TouchableOpacity1: {
    width: '90%',
    borderRadius: 5,
    height: 45,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#2b2f35',
    marginTop: 15,
  },
  btnTxt: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#2b2f35',
    alignItems: 'center',
    paddingHorizontal: '2%',
    paddingVertical: 15,
  },

  headerTxt: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginLeft: 5,
  },
});
