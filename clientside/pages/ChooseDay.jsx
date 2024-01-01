import React, { useState, useEffect } from "react";
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

export default function ChooseDay({ route, navigation }) {
  const { BSname, BID,RestDay, BFullName, ServiceTime, ServiceName } = route.params;

  const getCurrentDate=()=>{

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + '-' + month + '-' + year;//format: dd-mm-yyyy;
}
  const ChooceDay = async (data) => {
    navigation.navigate("TimeList", {
      day: data,
      ServiceTime: ServiceTime,
      ServiceName: ServiceName,
      BSname: BSname,
      BID: BID,
      BFullName: BFullName,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-chevron-back-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>Choose Day</Text>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
        // style={{ width: "100%", height: windowHeight * 0.8, paddingTop: 10 }}
      >
      <Text>{getCurrentDate()}</Text>
        <TouchableOpacity
          style={RestDay!='1'?styles.reservationCard:styles.reservationCard2}
          onPress={(e) => ChooceDay("1")}
        >
          <Text style={styles.dayTxt}>Sunday</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={RestDay!='2'?styles.reservationCard:styles.reservationCard2}
          onPress={(e) => ChooceDay("2")}
        >
          <Text style={styles.dayTxt}>MonDay</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={RestDay!='3'?styles.reservationCard:styles.reservationCard2}
          onPress={(e) => ChooceDay("3")}
        >
          <Text style={styles.dayTxt}>TuesDay</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={RestDay!='4'?styles.reservationCard:styles.reservationCard2}
          onPress={(e) => ChooceDay("4")}
        >
          <Text style={styles.dayTxt}>WednesDay</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={RestDay!='5'?styles.reservationCard:styles.reservationCard2}
          onPress={(e) => ChooceDay("5")}
        >
          <Text style={styles.dayTxt}>ThursDay</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={RestDay!='6'?styles.reservationCard:styles.reservationCard2}
          onPress={(e) => ChooceDay("6")}
        >
          <Text style={styles.dayTxt}>Friday</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={RestDay!='7'?styles.reservationCard:styles.reservationCard2}
          onPress={(e) => ChooceDay("7")}
        >
          <Text style={styles.dayTxt}>Saturday</Text>
        </TouchableOpacity>
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
  reservationCard2: {
    backgroundColor: "#f2f2f2",
    width: "0%",
    height:'0%',
    alignSelf: "center",
    elevation: 0,
    borderRadius: 0,
    alignItems: "center",
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginTop: 0,
  },
  dayTxt: {
    fontFamily: "Poppins-SemiBold",
    color: "#2b2f35",
  },
});
