/* eslint-disable no-shadow */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import Eventdata from '../../core/constants/EventString';
import React, { useState, useNavigation } from 'react';
import { Card, Button, Title, Paragraph } from 'react-native-paper';
import { View, Text, Image, Alert, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import CustomMaterialMenu from './menu';

function ShowDetails({ route }) {
  const [eventData, setEventData] = useState(Eventdata);
  const { eventId } = route.params;
  const event = Eventdata.find(event => event.id === eventId);


  const handleDeleteEvent = () => {
    deleteEvent(event.id)
    console.log(event.id)

  }

  const deleteEvent = (Id) => {

    const updatedEventData = eventData.filter(event => event.id !== Id);
    setEventData(updatedEventData);
    Alert("Event Deleted")
    // navigation.navigate('Screen1', { Eventdata:updatedEventData });

  }
  return (

    <View style={{ margin: 20 }}>
      <Title>{event.Title}</Title>
      <Image source={{ uri: event.imageUrl }} style={{ width: '100%', height: 200, marginBottom: 10 }} />
      <Text>Date: {event.Date}</Text>
      <Text>Time: {event.Time}</Text>
      <Text>Location: {event.Location}</Text>
      <Text style={{ marginTop: 10 }}>{event.Description}</Text>
      <CustomMaterialMenu onEventDelete={handleDeleteEvent} eventId={event.id} />
    </View>



  );
}


export default ShowDetails;

