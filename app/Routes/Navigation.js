import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogInScreen from '../modules/login/LogIn';
import HomeScreen from '../Screens/HomeScreen';
import Screen1 from '../Screens/Screen1';
import Screen2 from '../Screens/Screen2';
import Screen3 from '../Screens/Screen3';
import Screen4 from '../Screens/Screen4';

const Navigation = () => {

    const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LogIn'>
        <Stack.Screen name="LogIn" component={LogInScreen} />
        <Stack.Screen name = "Home"component={HomeScreen}/>
        <Stack.Screen name="Screen1" component={Screen1} />
          <Stack.Screen name="Screen2" component={Screen2} />
          <Stack.Screen name="Screen3" component={Screen3} />
          <Stack.Screen name="Screen4" component={Screen4} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation