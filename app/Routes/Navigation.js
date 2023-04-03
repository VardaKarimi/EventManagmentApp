import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LogInScreen from '../Screens/login/LogIn';
import Home from '../Screens/HomeScreen';
import SplashScreen from '../Screens/splash/SplashScreen';
import Screen1 from '../Screens/event_list/Screen1';
import Screen2 from '../Screens/Screen2';
import Screen3 from '../Screens/Screen3';
import Screen4 from '../Screens/Screen4';
import showDetails from '../Screens/event_detail/showDetails';
const Navigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen'>
        <Stack.Screen 
          name="SplashScreen" 
          component={SplashScreen}
          options={{headerShown: false}} 
        />
        <Stack.Screen 
          name="LogIn" 
          component={LogInScreen} 
        />
        <Stack.Screen 
          name = "Home"
          component={Home}
          options = {{headerBackVisible: false}}
        />
        <Stack.Screen name="Screen1" component={Screen1} options = {{headerBackVisible: false}}/>
        <Stack.Screen name="Screen2" component={Screen2} />
        <Stack.Screen name="Screen3" component={Screen3} />
        <Stack.Screen name="Screen4" component={Screen4} />
        <Stack.Screen name="showDetails" component={showDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;