/* eslint-disable prettier/prettier */
import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import EventList from '../event_list/event_list';
import Home from '../HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { theme } from '../../core/style/theme';
import UserProfile from '../user_profile/user_profile';
import Favourites from '../favourites/favourite_event';
import Settings from '../settings/settings';
import AboutApp from '../settings/about_app';
import { Alert, BackHandler, Text, Image } from 'react-native';
import MyTickets from '../my_tickets/my_tickets';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    const { state, navigation } = props;


    return (
        <DrawerContentScrollView {...props} style={{ backgroundColor: theme.colors.secondary }}>
            <Text style={{ fontWeight: 'bold', fontSize: 30, padding: 10, marginTop: 10, marginBottom: 20, marginLeft: 10 }}>Eventify</Text>
            <DrawerItem
                label="Event List"
                icon={() => <Image source={require('../../assets/eventlist.png')} style={{ width: 30, height: 30 }} />}
                onPress={() => navigation.navigate('EventList')}
                activeTintColor={theme.colors.primary}
                focused={state.routeNames[state.index] === 'EventList'}
            />
            <DrawerItem
                label="My Profile"
                icon={() => <Ionicons name="person-circle-outline" size={30} />}
                onPress={() => navigation.navigate('My Profile')}
                activeTintColor={theme.colors.primary}
                focused={state.routeNames[state.index] === 'My Profile'}
            />
            <DrawerItem
                label="Favourite Events"
                icon={() => <Ionicons name="heart" size={30} />}
                onPress={() => navigation.navigate('Favourites')}
                activeTintColor={theme.colors.primary}
                focused={state.routeNames[state.index] === 'Favourites'}
            />
            <DrawerItem
                label="My Tickets"
                icon={() => <Image source={require('../../assets/tickets.png')} style={{ width: 30, height: 30 }} />}
                onPress={() => navigation.navigate('MyTickets')}
                activeTintColor={theme.colors.primary}
                focused={state.routeNames[state.index] === 'MyTickets'}
            />
            <DrawerItem
                label="Settings"
                icon={() => <Ionicons name="settings" size={30} />}
                onPress={() => navigation.navigate('Settings')}
                activeTintColor={theme.colors.primary}
                focused={state.routeNames[state.index] === 'Settings'}
            />
            <DrawerItem
                label="About App"
                icon={() => <Ionicons name="information-circle-sharp" size={30} />}
                onPress={() => navigation.navigate('AboutApp')}
                activeTintColor={theme.colors.primary}
                focused={state.routeNames[state.index] === 'AboutApp'}
            />
        </DrawerContentScrollView>
    );
}

export default function DrawerScreen({ }) {

    return (
        <Drawer.Navigator initialRouteName="EventList" drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{
            headerStyle: { backgroundColor: theme.colors.primary },
            headerTintColor: 'white',
        }}>
            <Drawer.Screen name="EventList" component={EventList} options={{ drawerIcon: () => <Ionicons name="calendar-outline" size={30} /> }} />
            <Drawer.Screen name="My Profile" component={UserProfile} options={{ drawerIcon: () => <Ionicons name="person-circle-outline" size={30} /> }} />
            <Drawer.Screen name="Favourites" component={Favourites} options={{ drawerIcon: () => <Ionicons name="heart" size={30} /> }} />
            <Drawer.Screen name="Settings" component={Settings} options={{ drawerIcon: () => <Ionicons name="settings" size={30} /> }} />
            <Drawer.Screen name="MyTickets" component={MyTickets} options={{ drawerIcon: () => <Ionicons name="ticket" size={30} /> }} />
            <Drawer.Screen name="AboutApp" component={AboutApp} options={{ drawerIcon: () => <Ionicons name="information-circle-sharp" size={30} /> }} />
        </Drawer.Navigator>
    );
}
