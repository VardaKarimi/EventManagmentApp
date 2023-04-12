/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import { Alert, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogInScreen from '../Screens/login/LogIn';
import HomeScreen from '../Screens/HomeScreen';
import SplashScreen from '../Screens/splash/SplashScreen';
import EventList from '../Screens/event_list/event_list';
import CreateEvent from '../Screens/create_event/create_event';
import Screen3 from '../Screens/Screen3';
import Screen4 from '../Screens/Screen4';
import UserProfile from '../Screens/user_profile/user_profile';
import ShowDetails from '../Screens/event_detail/event_detail';
import UpdateEvent from '../Screens/update_event/update_event';
import { Image } from 'react-native';


// import showDetails from '../Screens/showDetails';
const Navigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LogIn"
          component={LogInScreen}
          options={{
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        // options={{
        //   headerBackVisible: false,
        //   headerRight: () => (
        //     <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}><Text>click</Text></TouchableOpacity>
        //   ),
        // }}

        // options={({ navigation }) => ({
        //   headerRight: () => (
        //     <Button title="Update count" onPress={() => navigation.navigate('UseProfile')} />
        //   ),
        // })}
        />
        <Stack.Screen name="EventList" component={EventList} options={({ navigation }) => ({
          headerBackVisible: false,
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('UserProfile')} >
              <Image source={require("../assets/user1.png")} style={{ height: 30, width: 30, }} />
            </TouchableOpacity>
          ),
        })} />
        <Stack.Screen name="CreateEvent" component={CreateEvent} />
        <Stack.Screen name="Screen3" component={Screen3} />
        <Stack.Screen name="Screen4" component={Screen4} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="showDetails" component={ShowDetails} options={{title:''}} />
        <Stack.Screen name="UpdateEvent" component={UpdateEvent} />
      </Stack.Navigator> 
    </NavigationContainer>
  );
};

export default Navigation;
