/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react';
import { Title } from 'react-native-paper';
import { View, Text, Image} from 'react-native';
import 'react-native-gesture-handler';
import { theme } from '../../core/style/theme';
import ShowTicketDetail from './Menu/Show_ticket_detail';
import { useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import CustomMaterialMenu from './Menu/menu';
import event_detail_styles from './event_detail_style';
import { openDatabase } from 'react-native-sqlite-storage';
import moment from "moment";

var db = openDatabase({ name: 'EventDatabase1.db' });

import AsyncStorage from '@react-native-async-storage/async-storage';


function ShowDetails({ route, navigation }) {
  // const [eventData, setEventData] = useState([])
  const { ID, DATA } = route.params;
  const event = DATA.find(it=>it.event_id === ID );
  const isFocused = useIsFocused();

  const [ticketDetailKey, setTicketDetailKey] = useState(0);
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

          {/* show menu if user created the event */}

          {showMenu
            ? <CustomMaterialMenu
              onEventEdit={() => {
                navigation.navigate('UpdateEvent', { ID:ID,DATA:DATA})
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

          {/* Displaying details of event */}

          <View>
            <Image style={event_detail_styles.ImageStyle} source={{ uri: event.event_image }} />
            <Text style={event_detail_styles.headingStyle}> Date: </Text>
            <Text style={event_detail_styles.detailStyle}>{moment(event.event_date).format('DD MMM YYYY')}</Text>
            <Text style={event_detail_styles.headingStyle}> Time: </Text>
            <Text style={event_detail_styles.detailStyle}>{moment(event.event_time).format('LT')}</Text>
            <Text style={event_detail_styles.headingStyle}> Location: </Text>
            <Text style={event_detail_styles.detailStyle}> {event.event_address}</Text>
            <Text style={event_detail_styles.headingStyle}> About:</Text>
            <Text style={event_detail_styles.detailStyle}> {event.event_description}</Text>

            <ShowTicketDetail key={ticketDetailKey} ID={ID} DATA={DATA} />


          </View>

        </ScrollView>

      </View>

    </View>
  );
}

export default ShowDetails;
