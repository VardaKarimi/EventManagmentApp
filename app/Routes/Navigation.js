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
import { Image } from 'react-native';
import DrawerScreen from '../Screens/drawer_navigation/drawer_screen';
import { theme } from '../core/style/theme';
import CreateTicket from '../Screens/event_detail/Menu/Create_ticket';


// import showDetails from '../Screens/showDetails';
const Navigation = ({ }) => {
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
          name="Drawer"
          component={DrawerScreen}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: theme.colors.primary
            },
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen name="Event List" component={EventList} options={({ navigation }) => ({
          headerBackVisible: false,
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('My Profile')} >
              <Image source={require("../assets/userbtn.png")} style={{ height: 30, width: 30, }} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: theme.colors.primary
          },
          title: ''
        })} />
        <Stack.Screen name="CreateEvent" component={CreateEvent} />
        <Stack.Screen name="Screen3" component={Screen3} />
        <Stack.Screen name="Screen4" component={Screen4} />
        <Stack.Screen name="My Profile" component={UserProfile} />
        <Stack.Screen name="showDetails" component={ShowDetails} options={{
          title: '', headerStyle: {
            backgroundColor: theme.colors.primary
          },
        }} />
        <Stack.Screen name='CreateTicket' component={CreateTicket} options={{ title: '', headerStyle: { backgroundColor: theme.colors.primary } }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
