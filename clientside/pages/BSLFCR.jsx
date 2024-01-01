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
  Image,
} from 'react-native';
import { Card, Paragraph, Button } from 'react-native-paper';
import { FontAwesome, Ionicons, Entypo } from '@expo/vector-icons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
//BarberShops List For Customer Reservetion
export default function BSLFCR({ navigation }) {
  const [prog, setprog] = React.useState(false);
  const [data, setData] = useState([]);

  //end useEffect
  useEffect(() => {
    return () => {
      console.log('end use effect');
    };
  }, []);
  //begin useEffect
  useEffect(() => {
    async function check() {
      console.log('first use effect');

      await GetAllBarberShops();
    }
    check();
  }, []);

  const GetAllBarberShops = async () => {
    try {
      var response = await GetRequest('GetAllBarberShops');

      setData(response);
    } catch (error) {
      console.error('eror in GetAllBarberShops ');
    }
  };

  const ChoceBarberShop = async (data) => {
    navigation.navigate('BarbersListFCR', {
      BScode: data.BScode,
      BSname: data.BSname,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-chevron-back-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>Choose Barber Shop</Text>
      </View>
      {/* <Text style={styles.makeReservetionTxt}>Choose Barber Shop</Text> */}
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
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {data.map((data, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.barberShopCard}
            onPress={(e) => ChoceBarberShop(data)}
          >
            <View style={styles.firstSec}>
              <Image
                source={require('./../assets/barbershop.png')}
                style={{ width: 20, height: 20 }}
              />
            </View>
            <Text style={{ flex: 1, marginLeft: 20,fontFamily:"Poppins-SemiBold",color:"#2b2f35" }}>{data.BSname} </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  barberShopCard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    width: '90%',
    marginTop: 15,
    alignSelf: 'center',
    // paddingVertical: 10,
    elevation: 10,
    borderRadius: 10,
    // paddingHorizontal: 10,
    flexDirection: 'row',
    height: 50,
  },
  makeReservetionTxt: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  firstSec: {
    backgroundColor: '#2b2f35',
    height: '100%',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
