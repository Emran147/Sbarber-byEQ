import React, { useState, useEffect, version } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import stam from './pages/stam';
import Login from './pages/Login';
import CustomerHP from './pages/CustomerHP';
import BarberHP from './pages/BarberHP';
import CRegister from './pages/CRegister';
import BRegister from './pages/BRegister';
import BarberFS from './pages/BarberFS';
import BarberShopC from './pages/BarberShopC';
import test from './pages/test';
import ServiceAdd from './pages/ServiceAdd';
import BlockAdd from './pages/BlockAdd';
import ServiceList from './pages/ServiceList';
import BRL from './pages/BRL';
import BSLFCR from './pages/BSLFCR';
import test2 from './pages/test2';
import BarbersListFCR from './pages/BarbersListFCR';
import ServiceListR from './pages/ServiceListR';
import TimeList from './pages/TimeList';
import test3 from './pages/test3';
import ChooseDay from './pages/ChooseDay';
import CReservationslist from './pages/CReservationslist';
import CustomerProfile from './pages/CustomerProfile';
import CusLisForBarbers from './pages/CusLisForBarbers';
const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    'Poppins-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Poppins-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Poppins-ExtraLight': require('./assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="CRegister" component={CRegister} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="CustomerHP" component={CustomerHP} />
          <Stack.Screen name="BarberHP" component={BarberHP} />
          <Stack.Screen name="BRegister" component={BRegister} />
          <Stack.Screen name="BarberFS" component={BarberFS} />
          <Stack.Screen name="BarberShopC" component={BarberShopC} />
          <Stack.Screen name="ServiceAdd" component={ServiceAdd} />
          <Stack.Screen name="test" component={test} />
          <Stack.Screen name="BlockAdd" component={BlockAdd} />
          <Stack.Screen name="ServiceList" component={ServiceList} />
          <Stack.Screen name="BRL" component={BRL} />
          <Stack.Screen name="BSLFCR" component={BSLFCR} />
          <Stack.Screen name="test2" component={test2} />
          <Stack.Screen name="BarbersListFCR" component={BarbersListFCR} />
          <Stack.Screen name="ServiceListR" component={ServiceListR} />
          <Stack.Screen name="TimeList" component={TimeList} />
          <Stack.Screen name="test3" component={test3} />
          <Stack.Screen name="ChooseDay" component={ChooseDay} />
          <Stack.Screen name="CReservationslist"component={CReservationslist}/>
          <Stack.Screen name="CustomerProfile" component={CustomerProfile} />
          <Stack.Screen name="CusLisForBarbers" component={CusLisForBarbers} />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
