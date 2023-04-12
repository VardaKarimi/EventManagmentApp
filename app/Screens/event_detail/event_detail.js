
import Eventdata from '../../core/constants/EventString';
import React, { useState, useEffect} from 'react';
import { Title} from 'react-native-paper';
import { View, Text, Image} from 'react-native';
import 'react-native-gesture-handler';
import CustomMaterialMenu from './menu';
import event_detail_styles from './event_detail_style';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'EventDatabase1.db' });



function ShowDetails({ route,navigation }) {

  const [eventData, setEventData] = useState([]);


  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM table_event_1', [], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setEventData(temp);
        });
      });
    });
  
    return unsubscribe;
  }, []);
  
  
console.log(eventData)


  const { eventId } = route.params;
  
  const event = eventData.find(it => it.event_id == eventId);
  

  


  return (
    <View style={{margin:20}}>
      <View style={{flexDirection:'row'}}>
        <Title style={event_detail_styles.TitleStyle}>{event?.event_name}</Title>
        <CustomMaterialMenu 
          onEventEdit={() => navigation.navigate('UpdateEvent',{id:event?.event_id,eventData})} 
          onEventDelete={() => navigation.navigate('EventList',{id:event?.event_id})}
          eventId={event?.event_id}
        />
      </View>
      {event && (
        <>
          <Text style={{fontSize:20,color:"#000000",fontWeight:500}}> Date: </Text> 
          <Text style={{fontSize:16 ,color:"#000000" , marginLeft:5}}>{event.event_date}</Text>
          <Text style={{fontSize:20,color:"#000000",fontWeight:500}}> Time: </Text>
          <Text style={{fontSize:16 ,color:"#000000" , marginLeft:5}}>{event.event_time}</Text>
          <Text style={{fontSize:20,color:"#000000",fontWeight:500}}> Location: </Text>
          <Text style={{fontSize:16 ,color:"#000000" , marginLeft:5}}> {event.event_address}</Text>
          <Text style={{fontSize:20,color:"#000000",fontWeight:500}}> About:</Text>
          <Text style={{fontSize:16 ,color:"#000000" , marginLeft:5}}> {event.event_description}</Text>
        </>
      )}
    </View>
  );
  
}


export default ShowDetails;

