import React, { useState, useEffect } from "react";
import { GetRequest, PostRequest } from "../helper/request";
import AwesomeAlert from "react-native-awesome-alerts";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Card, Paragraph, Button } from "react-native-paper";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ServiceListR({ route, navigation }) {
  const {  BSname, BFullName, BID , RestDay } = route.params;
  const [data, setData] = useState([]);

  useEffect(() => {
    async function check() {
      console.log("first use effect");
      GetAllServices();
    }
    check();
  }, []);

  const GetAllServices = async () => {
    try {
      console.log("1111");
      console.log(BID);
      console.log(BFullName);
      var response = await GetRequest("GetAllServices/" + BID);
      console.log("222");

      console.log(response);
      setData(response);
    } catch (error) {}
  };

  const ChoseService = async (data) => {
    console.log(RestDay)
    navigation.navigate("ChooseDay", {
      BSname: BSname,
      BFullName: BFullName,
      BID: BID,
      RestDay:RestDay,
      ServiceTime: data.ServiceTime,
      ServiceName: data.ServiceName,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-chevron-back-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>Choose Service</Text>
      </View>
      {/* <Text style={styles.makeReservetionTxt}>Choose service</Text> */}
      <ScrollView contentContainerStyle={{ paddingTop: 10, paddingBottom: 10 }}>
        {data.map((data, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.reservationCard}
            onPress={(e) => ChoseService(data)}
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
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#2b2f35",
    alignItems: "center",
    paddingHorizontal: "2%",
    paddingVertical: 15,
  },

  headerTxt: {
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    marginLeft: 5,
  },
  makeReservetionTxt: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
  },
  reservationCard: {
    backgroundColor: "#f2f2f2",
    width: "90%",
    alignSelf: "center",
    elevation: 10,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop:20
  },
  serviceTxt: {
    fontFamily: "Poppins-SemiBold",
    width: "25%",
  },
  serviceSec: {
    flexDirection: "row",
  },
  serviceTxt1: {
    fontFamily: "Poppins-Regular",
    flex: 1,
  },
});
