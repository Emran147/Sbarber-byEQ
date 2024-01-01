import React, { useState, useEffect } from 'react';
import { GetRequest, PostRequest, PostRequest2 } from '../helper/request';
import AwesomeAlert from 'react-native-awesome-alerts';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';
import { Card, Paragraph, Button } from 'react-native-paper';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BlockAdd({ navigation }) {
  const [prog, setprog] = React.useState(false);
  const [Wrong, setWrong] = React.useState(false);
  const [Unfilled, setunfilled] = React.useState(false);
  const [Message, setMessage] = React.useState(false);
  const [data, setData] = useState([]);
  const [temp, settemp] = useState('');

  const [BID, setBID] = useState('');
  const [CID, setCID] = useState('');

  //update
  useEffect(() => {
    async function check() {
      console.log('update');
    }
    check();
  }, [data]);

  //at the end
  useEffect(() => {
    return () => {
      console.log('end use effect');
    };
  }, []);

  // beginning
  useEffect(() => {
    async function check() {
      console.log('first use effect');
      var item2 = await AsyncStorage.getItem('User');
      if (item2 != null || item2 != undefined) {
        var user2 = await JSON.parse(item2);
        setBID(user2.BID);
      } else {
        setBID('54');
      }
      await GetTheBlockedCustomerInfo();//תביא רשימת הלקוחות החסומים
      console.log('2222');
    }
    check();
  }, []);

  const GetTheBlockedCustomerInfo = async () => {
    try {
      var item2 = await AsyncStorage.getItem('User');
      var user2 = await JSON.parse(item2);
      var response = await GetRequest('GetTheBlockedCustomerInfo/' + user2.BID);

      setData(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getuserid = async () => {
    var item = await AsyncStorage.getItem('User');
    var user = await JSON.parse(item);
    return user.BID;
  };
//מחק לקוח מרשימת הלקוחות הנחסמיים 
  const RemovefromBlockList = async (user, index) => {
    var obj = {
      CID: user.CID,
      BID: await getuserid(),
    };
    setprog(true);
    var response = await PostRequest('RemovefromBlockList', obj);
    setprog(false);
    console.log('Response Is: ');
    console.log(response);

    if (response == 'Removed') {
      // var arr = data;
      // arr.splice(index, 1);
      // setData(arr);

      GetTheBlockedCustomerInfo();
    } else {
      console.log('failed');
    }
  };
//הוספת לקוח לרשימת הלקוחות הנחסמיים
  const AddToBlockList = async () => {
    if (BID === '' || CID === '') {
      setunfilled(true);

      return;
    }

    var newObj = {
      BID: BID,
      CID: CID,
    };
    setprog(true);
    var response = await PostRequest('AddToBlockList', newObj);
     
    console.log('Response Is: ');
    console.log(response);
    
    if (response == 'Blocked  ') {
   
      setprog(false);
      GetTheBlockedCustomerInfo();
    } else {
      setWrong(true);
     
    }
  };

  return (
    <View style={styles.container}>
      <AwesomeAlert
        show={prog}
        showProgress={prog}
        title="Loading "
        message=""
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={false}
      />

      <AwesomeAlert
        show={Message}
        showProgress={Message}
        title="Customer Blocked Successfully "
        message=""
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        onConfirmPressed={() => {
          setMessage(false);
        }}
        confirmButtonColor="#2b2f35"
      />

      <AwesomeAlert
        show={Unfilled}
        showProgress={false}
        title="Unfilled fields"
        titleStyle={{ color: 'red', fontFamily: 'Poppins-Regular' }}
        message="Please Fill All The Fields "
        messageStyle={{ color: '#2b2f35', fontFamily: 'Poppins-Regular' }}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Ok"
        confirmButtonColor="#2b2f35"
        confirmButtonStyle={{
          width: 70,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        confirmButtonTextStyle={{
          fontFamily: 'Poppins-Regular',
        }}
        onCancelPressed={() => {}}
        onConfirmPressed={() => {
          setunfilled(false);
        }}
      />

      <AwesomeAlert
        show={Wrong}
        showProgress={Wrong}
        title="Wrong info"
        message="Check Customer ID and Blocked List "
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Ok"
        confirmButtonColor="#2b2f35"
        onCancelPressed={() => {}}
        onConfirmPressed={() => {
          setWrong(false);
        }}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-chevron-back-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>Add Block</Text>
      </View>
      <View style={styles.container1}>
      <Image
          source={require('./../assets/user.png')}
          style={{ width: 100, height: 100, alignSelf: 'center' }}
        />
        <TextInput
          placeholder="Customer ID"
          value={CID}
          keyboardType={'numeric'}
          maxLength={4}
          onChangeText={(val) => setCID(val)}
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            AddToBlockList();
          }}
        >
          <Entypo name="block" size={15} color="#fff" />
          <Text style={styles.btnTxt}>Block</Text>
        </TouchableOpacity>
        {/* <View style={styles.btn}>
          <Button
            icon="cancel"
            color="#0D47A1"
            labelStyle={{ color: 'white', fontSize: 10 }}
            onPress={() => {
              AddToBlockList();
            }}
          >
            Block
          </Button>
        </View> */}
        <ScrollView
          contentContainerStyle={{ paddingTop: 10,paddingBottom:20 }}
        >
          {data.map((user) => (
            <TouchableOpacity
              key={user.CID}
              style={styles.blockCard}
              onPress={(e) => RemovefromBlockList(user)}
            >

              <Text style={styles.blockCardTxt}>
                {user.CFullName} ID : {user.CID}{' '}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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

  input: {
    width: '90%',
    justifyContent: 'center',
    borderWidth: 1,
    height: 45,
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Regular',
    color: '#2b2f35',
    borderRadius: 5,
    borderColor: '#2b2f35',
    marginTop:10
  },
  container1: {
    paddingTop: 20,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 5,
    width: '30%',
    height: 40,
    backgroundColor: 'red',
    marginLeft: 30,
    height: 40,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: '5%',
    marginTop: 15,
    alignItems: 'center',
  },
  btnTxt: {
    color: '#fff',
    marginLeft: 5,
    fontFamily: 'Poppins-Regular',
  },
  blockCard: {
    backgroundColor: '#f2f2f2',
    width: '90%',
    marginTop: 15,
    alignSelf: 'center',
    elevation: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical:15,
    justifyContent:"center"
  },
  blockCardTxt:{
    fontFamily: 'Poppins-SemiBold',
  }
});
