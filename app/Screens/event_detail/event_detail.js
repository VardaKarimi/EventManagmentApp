import Eventdata from '../../core/constants/EventString';
import React, {useEffect, useState} from 'react';
import {Title} from 'react-native-paper';
import {View, Text, Image, Button} from 'react-native';
import 'react-native-gesture-handler';
import {theme} from '../../core/style/theme';
import ShowTicketDetail from './Menu/Show_ticket_detail';
import {useIsFocused} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import CustomMaterialMenu from './Menu/menu';
import event_detail_styles from './event_detail_style';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'EventDatabase1.db'});



function ShowDetails({route, navigation}) {
  const [eventData, setEventData] = useState([]);
  const {eventId} = route.params;
  const event = eventData.find(it => it.event_id === eventId);
  const isFocused = useIsFocused();

  const [ticketDetailKey, setTicketDetailKey] = useState(0);

  useEffect(() => {
    if (isFocused) {
      setTicketDetailKey(prevKey => prevKey + 1); // Increment the key to force a re-render of the ShowTicketDetail component
    }
  }, [isFocused]);

  // React.useEffect(() => {
  //   const unsubscribe =  () => {
  //     db.transaction(tx => {
  //       tx.executeSql('SELECT * FROM table_event', [], (tx, results) => {
  //         var temp = [];
  //         for (let i = 0; i < results.rows.length; ++i)
  //           temp.push(results.rows.item(i));
  //         setEventData(temp);
  //       });
  //     });
  //     unsubscribe()
  //   }
  // },[]);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM table_event', [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
        //console.log(temp)
          setEventData(temp);
        });
      });
    });
    //console.log(eventData,'My event data');
    return unsubscribe;
  }, [navigation]);
   
 
 console.log(event,'My event data')
  

  // const {eventId} = route.params;

  // const event = eventData.find(it => it.event_id == eventId);

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.secondary}}>
      <View style={{flex: 1, margin: 20}}>
        <View style={{flexDirection: 'row'}}>
          <Title style={event_detail_styles.TitleStyle}>
            {event?.event_name}
          </Title>

          <CustomMaterialMenu
            onEventEdit={() => {
              //console.log("eventDetails =>" + event)
              navigation.navigate('UpdateEvent', {event})
            }}
            onEventDelete={() =>
              navigation.navigate('EventList', {id: event?.event_id})
            }
            eventId={event?.event_id}
            navigateToCreateTicket={() =>
              navigation.navigate('CreateTicket', eventId)
            } 
          />
        </View>
        {event && (
          <>
            <ScrollView>
              <View>
                <Image
                  style={event_detail_styles.ImageStyle}
                  source={{uri: event.event_image}}
                />
                <Text style={{fontSize: 20, color: '#000000', fontWeight: 500}}>
                  {' '}
                  Date:{' '}
                </Text>
                <Text style={{fontSize: 16, color: '#000000', marginLeft: 5}}>
                  {event.event_date}
                </Text>
                <Text style={{fontSize: 20, color: '#000000', fontWeight: 500}}>
                  {' '}
                  Time:{' '}
                </Text>
                <Text style={{fontSize: 16, color: '#000000', marginLeft: 5}}>
                  {event.event_time}
                </Text>
                <Text style={{fontSize: 20, color: '#000000', fontWeight: 500}}>
                  {' '}
                  Location:{' '}
                </Text>
                <Text style={{fontSize: 16, color: '#000000', marginLeft: 5}}>
                  {' '}
                  {event.event_address}
                </Text>
                <Text style={{fontSize: 20, color: '#000000', fontWeight: 500}}>
                  {' '}
                  About:
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#000000',
                    marginLeft: 5,
                    textAlign: 'justify',
                  }}>
                  {' '}
                  {event.event_description}
                </Text>

                <ShowTicketDetail
                  key={ticketDetailKey}
                  eventId={event?.event_id}
                />
              </View>
            </ScrollView>
          </>
        )}
      </View>
    </View>
  );
}

export default ShowDetails;
