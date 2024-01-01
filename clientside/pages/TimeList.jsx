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
import { Card, Paragraph, Button } from "react-native-paper";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function TimeList({ route, navigation }) {
  const { day, ServiceTime, ServiceName, BSname, BID, BFullName } =
    route.params;
  const [data, setData] = useState([]);

  //End useEffect
  useEffect(() => {
    return () => {
      console.log("end use effect");
    };
  }, []);

  useEffect(() => {
    async function check() {
      console.log("first use effect at time list");

      await GetTheAvailableTime();
    }
    check();
  }, []);

  const GetTheAvailableTime = async () => {
    try {
      var newObj = {
        Day: day,
        BID: BID,
        Time: ServiceTime,
      };
      var response = await PostRequest("GetTheAvailableTime", newObj);
      console.log(response);
      setData(response);
    } catch (error) {
      console.error("eror in GetTheAvailableTime ");
    }
  };

  const CreateReservation = async (data) => {
    var newObj = {
      Cname: await getusername(),
      Bname: BFullName,
      BSname: BSname,
      ServiceName: ServiceName,
      RTime: data,
      Status: "3",
      Day: day,
      CID: await getuserid(),
      BID: BID,
    };
    console.log("123");
    console.log(newObj);
    console.log("123");
    var response = await PostRequest("CreateReservetion", newObj);
    console.log(response);
    if (response === "Reservation Created ") {
      navigation.navigate("CustomerHP");
    }
  };

  const getuserid = async () => {
    var item = await AsyncStorage.getItem("User");
    var user = await JSON.parse(item);

    return user.CID;
  };
  const getusername = async () => {
    var item = await AsyncStorage.getItem("User");
    var user = await JSON.parse(item);

    return user.CFullName;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-chevron-back-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>Choose Time</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}>
        {data.map((data, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.reservationCard}
            onPress={(e) => CreateReservation(data)}
          >
            <Text style={{ width: "100%", textAlign: "center" }}>{data} </Text>
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
  reservationCard: {
    backgroundColor: "#f2f2f2",
    width: "90%",
    alignSelf: "center",
    elevation: 10,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  timeTxt: {
    fontFamily: "Poppins-SemiBold",
  },
});
