/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
import 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogInScreen from '../Screens/login/LogIn';
import SplashScreen from '../Screens/splash/SplashScreen';
import EventList from '../Screens/event_list/event_list';
import CreateEvent from '../Screens/create_event/create_event';
import UserProfile from '../Screens/user_profile/user_profile';
import ShowDetails from '../Screens/event_detail/event_detail';
import UpdateEvent from '../Screens/update_event/update_event';
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
            headerStyle: {
              backgroundColor: theme.colors.primary,
              color: 'white',
            },
            headerTitleStyle: {
              color: 'white'
            }
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
        {/* <Stack.Screen name="EventList" component={EventList} options={({ navigation }) => ({
          headerBackVisible: false,
          headerStyle: {
            backgroundColor: theme.colors.primary
          },
          title: ''
        })} /> */}
        <Stack.Screen name="CreateEvent" component={CreateEvent} options={{
          headerTintColor: '#ffffff',
          title: 'Create Event', headerStyle: {
            backgroundColor: theme.colors.primary
          },
        }} />
        <Stack.Screen name="My Profile" component={UserProfile} />
        <Stack.Screen name="showDetails" component={ShowDetails} options={{
          title: '', headerStyle: {
            backgroundColor: theme.colors.primary
          },
        }} />
        <Stack.Screen name='UpdateEvent' component={UpdateEvent} options={{
          title: 'Edit Event', headerTintColor: '#ffffff', headerStyle: {
            backgroundColor: theme.colors.primary
          },
        }} />
        <Stack.Screen name='CreateTicket' component={CreateTicket} options={{ title: 'Add Ticket', headerTintColor: '#ffffff', headerStyle: { backgroundColor: theme.colors.primary } }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
