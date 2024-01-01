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

export default function CusLisForBarbers(props) {
    const [prog, setprog] = React.useState(false);
    const [data, setData] = useState([]);
    


    useEffect(() => {
        async function check() {
         
          await GetAllCustomers();
        }
        check();
      }, []);

      useEffect(() => {
        async function check() {
         // console.log('update');
        }
        check();
      }, [data]);

  const GetAllCustomers = async () => {
    try {
     
      var response = await GetRequest('GetAllCustomers');

      setData(response);
    } catch (error) {
      console.error('123');
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
        <View style={styles.header}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Ionicons name="ios-chevron-back-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTxt}>Customers List</Text>
        </View>
        <ScrollView
          contentContainerStyle={{ paddingTop: 10,paddingBottom:20 }}
        >
          {data.map((data, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.serviceCard}
             
            >
                 <View style={styles.serviceSec}>
                <Text style={styles.serviceTxt}> Name : </Text>
                <Text style={styles.serviceTxt1}>{data.CFullName}</Text>
              </View>
              <View style={styles.serviceSec}>
                <Text style={styles.serviceTxt}> ID: </Text>
                <Text style={styles.serviceTxt1}>{data.CID}</Text>
              </View>
              <View style={styles.serviceSec}>
                <Text style={styles.serviceTxt}> Number : </Text>
                <Text style={styles.serviceTxt1}>{data.CPhoneNumber}</Text>
              </View>
             
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    )
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
  