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
  Alert,
  Image,
} from 'react-native';
import { Card, Paragraph, Button } from 'react-native-paper';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BRL({ navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function check() {
      console.log('first use effect in Reservation List BarberSide');
      GetReservations();
    }
    check();
  }, []);

  const GetReservations = async () => {
    var temp = await getuserid();

    var response = await GetRequest('GetTheResevetionForBarber/' + temp);
    //  console.log('222')

    //   console.log(response)
    setData(response);
  };

  const getuserid = async () => {
    var item = await AsyncStorage.getItem('User');
    var user = await JSON.parse(item);

    return user.BID;
  };

  const CancelReservation = async (data) => {
    console.log('CancelReservation function');
    console.log(data.RID);
    var response = await GetRequest('CancelByBarber/' + data.RID);
    //  console.log('CancelByBarber')

    console.log('Response Is: ');
    console.log(response);

    if (response == 'Reservation Canceled ') {
      GetReservations();
    } else {
      console.log('failed');
    }
  };

  const ConfirmReservation = async (data) => {
    console.log('ConfirmReservation function');
    console.log(data.RID);
    var response = await GetRequest('ConfirmReservation/' + data.RID);
    // console.log('333')

    console.log('Response Is: ');
    console.log(response);

    if (response == 'Reservation confirmed ') {
      GetReservations();
    } else {
      console.log('failed');
    }
  };

  const createThreeButtonAlert = (data) =>
    Alert.alert('Reservation status', 'Choose Status', [
      {
        text: 'Ask me later',
        onPress: () => console.log('Ask me later Pressed'),
      },
      {
        text: 'Cancel Reservation',
        onPress: () => CancelReservation(data),
      },
      { text: 'Confirm Reservation', onPress: () => ConfirmReservation(data) },
    ]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-chevron-back-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>Reservetions</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingTop: 10, paddingBottom: 30 }}>
        {data.map((data, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.reservationCard]}
            onPress={(e) => createThreeButtonAlert(data)}
          >
            <View style={styles.cardFirstSec}>
              <Image
                source={require('./../assets/reservations.png')}
                style={{ width: 30, height: 30 }}
              />
            </View>
            <View style={styles.reservationCardSec}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  color: '#2b2f35',
                }}
              >
                {data.ServiceName} for {data.Cname}
                {'\n'}At
                {data.Day == 1 ? <Text>Sunday-</Text> : <></>}{' '}
                {data.Day == 2 ? <Text>Monday-</Text> : <></>}{' '}
                {data.Day == 3 ? <Text>TuesDay -</Text> : <></>}
                {data.Day == 4 ? <Text>WednesDay -</Text> : <></>}
                {data.Day == 5 ? <Text>Thursday -</Text> : <></>}
                {data.Day == 6 ? <Text>Friday -</Text> : <></>}
                {data.Day == 7 ? <Text>Saturday -</Text> : <></>}
                {data.RTime}
              </Text>
              <TouchableOpacity
                style={[
                  styles.status,
                  data.Status == '4'
                    ? { backgroundColor: 'rgba(255, 56, 0, 0.8)' }
                    : null,
                  data.Status == 2 ? { backgroundColor: '#59b259' } : null,
                  data.Status == 1
                    ? { backgroundColor: 'rgba(rgba(0, 205, 255, 0.8))' }
                    : null,
                  data.Status == 3 ? { backgroundColor: '#9d9d9d' } : null,
                ]}
              >
                {data.Status == 2 ? (
                  <Text style={styles.statusTxt}>confirmed</Text>
                ) : null}
                {data.Status == 4 ? (
                  <Text style={styles.statusTxt}>Canceled by you</Text>
                ) : null}
                {data.Status == 3 ? (
                  <Text style={styles.statusTxt}>Waiting barber Response</Text>
                ) : null}
                {data.Status == 1 ? (
                  <Text style={styles.statusTxt}>
                    Barber Canceled Reservation
                  </Text>
                ) : null}
              </TouchableOpacity>
            </View>
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
  but1: {
    width: windowWidth / 2.5,
    margin: 50,

    justifyContent: 'center',
  },

  reservationCard: {
    backgroundColor: '#f2f2f2',
    width: '90%',
    marginTop: 15,
    alignSelf: 'center',
    elevation: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  reservationCardSec: {
    flex: 1,
    marginLeft: 5,
    paddingVertical: 10,
  },
  cardFirstSec: {
    backgroundColor: '#2b2f35',
    height: '100%',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  status: {
    width: '60%',
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 5,
  },
  statusTxt: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    textAlign: 'center',
  },
  best: {
    borderRadius: 7,
    borderWidth: 2,
    borderColor: 'black',
    width: '80%',
    height: windowHeight * 0.09,
    marginBottom: 10,
  },
  confirmed: {
    borderRadius: 7,
    borderWidth: 2,
    borderColor: 'black',
    width: '80%',
    height: windowHeight * 0.09,
    marginBottom: 10,
    backgroundColor: 'rgba(88, 220, 19, 0.8)', //green
    //false
  },
  canceledbybarber: {
    borderRadius: 7,
    borderWidth: 2,
    borderColor: 'black',
    width: '80%',
    height: windowHeight * 0.09,
    marginBottom: 10,
    backgroundColor: 'rgba(rgba(0, 205, 255, 0.8))', //blue
    //true
  },
  canceledbyCustomer: {
    borderRadius: 7,
    borderWidth: 2,
    borderColor: 'black',
    width: '80%',
    height: windowHeight * 0.09,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 56, 0, 0.8)', //red
    //true
  },
});
