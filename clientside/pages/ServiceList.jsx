import React, { useState, useEffect } from 'react';
import { GetRequest, PostRequest } from '../helper/request';
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
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Card, Paragraph, Button } from 'react-native-paper';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ServiceList(props) {
  const [prog, setprog] = React.useState(false);
  const [data, setData] = useState([]);
  const [BID, setBID] = useState('');

  // const [ServiceTime,setServiceTime] = useState("");
  // const [ServicePrice,setServicePrice] = useState("");
  // const [ServiceName,setServiceName] = useState("");

  //Update useEffect
  useEffect(() => {
    async function check() {
     // console.log('update');
    }
    check();
  }, [data]);

  //End useEffect
  useEffect(() => {
    return () => {
      console.log('end use effect');
    };
  }, []);

  useEffect(() => {
    async function check() {
      console.log('first use effect');
      var item2 = await AsyncStorage.getItem('User');
      if (item2 != null || item2 != undefined) {
        var user2 = await JSON.parse(item2);
        setBID(user2.BID);
        console.log(user2);
      } else {
        setBID('0');
      }
      await GetAllServices();
    }
    check();
  }, []);

  const GetAllServices = async () => {
    try {
      var item2 = await AsyncStorage.getItem('User');
      var user2 = await JSON.parse(item2);
      var response = await GetRequest('GetAllServices/' + user2.BID);

      setData(response);
    } catch (error) {
      console.error('123');
    }
  };

  const getuserid = async () => {
    var item = await AsyncStorage.getItem('User');
    var user = await JSON.parse(item);
    return user.BID;
  };

  const RemoveService = async (data1) => {
    console.log('data1');
    console.log(data1);
    var obj = {
      BID: await getuserid(),
      ServiceName: data1.ServiceName,
    };
    setprog(true);
    console.log('obj');
    console.log(obj);
    var response = await PostRequest('RemoveService', obj);
    console.log('333');
    setprog(false);
    console.log('Response Is: ');
    console.log(response);

    if (response == 'Removed') {
      GetAllServices();
    } else {
      console.log('failed');
    }
  };

  if (data.length > 0)
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
        <View style={styles.header}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Ionicons name="ios-chevron-back-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTxt}>Service List</Text>
        </View>
        <ScrollView
          contentContainerStyle={{ paddingTop: 10,paddingBottom:20 }}
        >
          {data.map((data, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.serviceCard}
              onPress={(e) => RemoveService(data)}
            >
              <View style={styles.serviceSec}>
                <Text style={styles.serviceTxt}>Service: </Text>
                <Text style={styles.serviceTxt1}>{data.ServiceName}</Text>
              </View>
              <View style={styles.serviceSec}>
                <Text style={styles.serviceTxt}>Price: </Text>
                <Text style={styles.serviceTxt1}>{data.ServicePrice}</Text>
              </View>
              <View style={styles.serviceSec}>
                <Text style={styles.serviceTxt}>Time: </Text>
                <Text style={styles.serviceTxt1}>{data.ServiceTime}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Ionicons name="ios-chevron-back-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>Service List</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.notAnyServiceTxt}>
          There is no Services you need to add one
        </Text>
        <TouchableOpacity
          style={styles.addservicebtn}
          onPress={() => {
            props.navigation.navigate('ServiceAdd');
          }}
        >
          <Entypo name="plus" size={24} color="#fff" />
          <Text style={styles.addservicebtnTxt}>Add Service</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.addservicebtn}>
        <Button
          color="#ff5c5c"
          title=" ADD Service "
          icon="plus"
          labelStyle={{ color: 'black', fontSize: 14 }}
          onPress={() => {
            props.navigation.navigate('ServiceAdd');
          }}
        >
          Add Service
        </Button>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    alignSelf: 'center',
  },
  addservicebtnTxt: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginLeft: 5,
  },

  input: {
    width: (windowWidth * 40) / 100,
    marginLeft: 30,
    marginTop: 100,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    height: 35,
  },

  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    width: windowWidth * 0.4,
    height: 40,
    backgroundColor: 'red',
    marginLeft: 30,
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
  notAnyServiceTxt: {
    fontFamily: 'Poppins-SemiBold',
    color: '#2b2f35',
  },
  serviceCard: {
    backgroundColor: '#f2f2f2',
    width: '90%',
    alignSelf: 'center',
    elevation: 10,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  serviceTxt: {
    fontFamily: 'Poppins-SemiBold',
    width: '25%',
  },
  serviceSec: {
    flexDirection: 'row',
  },
  serviceTxt1: {
    fontFamily: 'Poppins-Regular',
    flex: 1,
  },
});
