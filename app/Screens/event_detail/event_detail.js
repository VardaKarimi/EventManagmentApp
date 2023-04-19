/* eslint-disable prettier/prettier */

import Eventdata from '../../core/constants/EventString';
import React, { useEffect, useState } from 'react';
import { Title } from 'react-native-paper';
import { View, Text, Image, Button } from 'react-native';
import 'react-native-gesture-handler';
import { theme } from '../../core/style/theme';
import ShowTicketDetail from './Menu/Show_ticket_detail';
import { useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import CustomMaterialMenu from './Menu/menu';
import event_detail_styles from './event_detail_style';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'EventDatabase1.db' });

import AsyncStorage from '@react-native-async-storage/async-storage';


function ShowDetails({ route, navigation }) {
  // const [eventData, setEventData] = useState([])
  const { ID, DATA } = route.params;
  const event = DATA.find(it=>it.event_id === ID );
  const isFocused = useIsFocused();

  const [ticketDetailKey, setTicketDetailKey] = useState(0);
  const [userData, setUserData] = useState(null);
  const [showMenu, setShowMenu] = useState(false)


  useEffect(() => {
    if (isFocused) {
      setTicketDetailKey(prevKey => prevKey + 1); // Increment the key to force a re-render of the ShowTicketDetail component
      console.log(DATA, "received data")

    }

  }, [isFocused]);


  useEffect(() => {
    const getUserData = async () => {
      let user = await AsyncStorage.getItem('userId');
      let userID = JSON.parse(user)
      if (userID == event.user_id) {
        setShowMenu(true)
      }
      // console.log(userID,'<<<<<userid>>>>>')
      // console.log(event.user_id,'<<<event id>>>>')
    };

    getUserData();
  }, []);



  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.secondary }}>
      <View style={{ flex: 1, margin: 20 }}>
        <View style={{ flexDirection: 'row' }}>
          <Title style={event_detail_styles.TitleStyle}>
            {event?.event_name}
            {console.log(ID, "event ID")}
            {console.log(event, "<<<EVENT>>>")}
            {console.log(DATA, "receiving data")}
          </Title>
          {showMenu
            ? <CustomMaterialMenu
              onEventEdit={() => {
                //console.log("eventDetails =>" + event)
                navigation.navigate('UpdateEvent', { event })
              }}
              onEventDelete={() =>
                navigation.navigate('EventList', {ID:ID })
              }
              eventId={event?.event_id}
              navigateToCreateTicket={() =>
                navigation.navigate('CreateTicket', {ID:ID,DATA:DATA})
              }
            /> : null}
        </View>
        <ScrollView>
          <View>
            <Image style={event_detail_styles.ImageStyle} source={{ uri: event.event_image }} />
            <Text style={{ fontSize: 20, color: "#000000", fontWeight: 500 }}> Date: </Text>
            <Text style={{ fontSize: 16, color: "#000000", marginLeft: 5 }}>{event.event_date}</Text>
            <Text style={{ fontSize: 20, color: "#000000", fontWeight: 500 }}> Time: </Text>
            <Text style={{ fontSize: 16, color: "#000000", marginLeft: 5 }}>{event.event_time}</Text>
            <Text style={{ fontSize: 20, color: "#000000", fontWeight: 500 }}> Location: </Text>
            <Text style={{ fontSize: 16, color: "#000000", marginLeft: 5 }}> {event.event_address}</Text>
            <Text style={{ fontSize: 20, color: "#000000", fontWeight: 500 }}> About:</Text>
            <Text style={{ fontSize: 16, color: "#000000", marginLeft: 5, textAlign: 'justify' }}> {event.event_description}</Text>

            <ShowTicketDetail key={ticketDetailKey} ID={ID} DATA={DATA} />


          </View>

        </ScrollView>

      </View>

    </View>
  );
}

export default ShowDetails;
