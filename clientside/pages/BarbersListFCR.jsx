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

export default function BarbersListFCR({ route, navigation }) {
  const { BScode, BSname } = route.params;
  const [data, setData] = useState([]);

  useEffect(() => {
    async function check() {
      console.log('first use effect');
      GetAllBarbersbyBScode();//תביא רשימת הספרים שבתוך המספרה 
    }
    check();
  }, []);
//AsyncStorageבקשת מספר זיהוי מה 
  const getuserid = async () => {
    var item = await AsyncStorage.getItem("User");
    var user = await JSON.parse(item);

    return user.CID;
  };
  const GetAllBarbersbyBScode = async () => {
   
      console.log('1111');
      console.log(BScode);
      var newObj = {
        BScode: BScode,
        CID: await getuserid() ,
      };
      console.log(newObj)
      var response = await PostRequest('GetAllBarbersbyBScode', newObj);
      console.log('222');

      console.log(response);
      setData(response);
    
  };

  const ChoceBarber = async (data) => {
  //  console.log(data.BFullName);
  console.log(data.RestDay)
    navigation.navigate('ServiceListR', {
      BSname: BSname,
      BFullName: data.BFullName,
      BID: data.BID,
      RestDay:data.RestDay
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-chevron-back-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>Choose Barber</Text>
      </View>
      {/* <Text style={styles.makeReservetionTxt}>Chose Barber</Text> */}

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {data.map((data, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.barberShopCard}
            onPress={(e) => ChoceBarber(data)}
          >
                        <View style={styles.firstSec}>
              <Image
                source={require('./../assets/barber.png')}
                style={{ width: 20, height: 20 }}
              />
            </View>
            <Text
              style={{
                flex: 1,
                marginLeft: 20,
                fontFamily: 'Poppins-SemiBold',
                color: '#2b2f35',
              }}
            >
              {data.BFullName}
            </Text>
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
  makeReservetionTxt: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
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
