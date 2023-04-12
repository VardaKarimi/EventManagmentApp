
import Eventdata from '../../core/constants/EventString';
import React, { useEffect, useState } from 'react';
import { Title } from 'react-native-paper';
import { View, Text, Image, Button } from 'react-native';
import 'react-native-gesture-handler';

import CustomMaterialMenu from './Menu/menu';
import event_detail_styles from './event_detail_style';
import { theme } from '../../core/style/theme';
import ShowTicketDetail from './Menu/Show_ticket_detail';
import { useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

function ShowDetails({ route, navigation }) {
  const [eventData, setEventData] = useState(Eventdata);
  const eventId = route.params;
  const event = Eventdata.find(event => event.id === eventId);

  const isFocused = useIsFocused();
  const [ticketDetailKey, setTicketDetailKey] = useState(0);
  
  useEffect(() => {
    if (isFocused) {
      setTicketDetailKey(prevKey => prevKey + 1); // Increment the key to force a re-render of the ShowTicketDetail component
    }
  }, [isFocused]);


  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.secondary }}>
      
      <View style={{ flex: 1, margin: 20 }}>
        <View style={{ flexDirection: 'row' }}>
          <Title style={event_detail_styles.TitleStyle}>{event.Title}</Title>
          <CustomMaterialMenu onEventDelete={() => navigation.navigate('EventList', { id: event.id })} eventId={event.id} navigateToCreateTicket={() => navigation.navigate('CreateTicket', eventId)} />
        </View>
        <ScrollView>
        <View>
        <Image style={event_detail_styles.ImageStyle} source={{ uri: event.imageUrl }} />
        <Text style={{ fontSize: 20, color: "#000000", fontWeight: 500 }}> Date: </Text>
        <Text style={{ fontSize: 16, color: "#000000", marginLeft: 5 }}>{event.Date}</Text>
        <Text style={{ fontSize: 20, color: "#000000", fontWeight: 500 }}> Time: </Text>
        <Text style={{ fontSize: 16, color: "#000000", marginLeft: 5 }}>{event.Time}</Text>
        <Text style={{ fontSize: 20, color: "#000000", fontWeight: 500 }}> Location: </Text>
        <Text style={{ fontSize: 16, color: "#000000", marginLeft: 5 }}> {event.Location}</Text>
        <Text style={{ fontSize: 20, color: "#000000", fontWeight: 500 }}> About:</Text>
        <Text style={{ fontSize: 16, color: "#000000", marginLeft: 5,textAlign:'justify' }}> {event.Description}</Text>

        <ShowTicketDetail  key={ticketDetailKey} eventId={event.id} />
     

        </View>
        
        </ScrollView>

        </View>
      
    </View>



  );
}


export default ShowDetails;

