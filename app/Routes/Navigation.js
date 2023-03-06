import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../modules/home/HomeScreen';
import DetailScreen from '../modules/detail/DetailScreen';
import SignInScreen from '../modules/sigin/SignInScreen';


const Navigation = () => {

    const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name = "Detail"component={DetailScreen}/>
        <Stack.Screen name = "SignIn"component={SignInScreen}/>

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation