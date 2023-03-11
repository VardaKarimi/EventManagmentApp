import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LogInScreen from '../modules/login/LogIn';
import HomeScreen from '../Screens/HomeScreen';
import SplashScreen from '../Screens/SplashScreen';
import Screen1 from '../Screens/Screen1';
import Screen2 from '../Screens/Screen2';
import Screen3 from '../Screens/Screen3';
import Screen4 from '../Screens/Screen4';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Navigation = () => {
  const Stack = createNativeStackNavigator();
  // useEffect(() => {
  //   const retrieveData = async () => {
  //     try {
  //       const storedEmail = await AsyncStorage.getItem('email');
  //       const storedPassword = await AsyncStorage.getItem('password');
  //       // setEmail(storedEmail);
  //       // setPassword(storedPassword);
  //       console.log(storedEmail, '<<email');
  //       console.log(storedPassword, '<<<Password');
  //     } catch (error) {
  //       console.log('Error retrieving data from AsyncStorage: ', error);
  //     }
  //   };
  //   retrieveData();
  // });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LogIn" component={LogInScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Screen1" component={Screen1} />
        <Stack.Screen name="Screen2" component={Screen2} />
        <Stack.Screen name="Screen3" component={Screen3} />
        <Stack.Screen name="Screen4" component={Screen4} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
