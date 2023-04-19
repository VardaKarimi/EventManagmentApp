/* eslint-disable prettier/prettier */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, Image } from 'react-native';
import { Card, Button, Title, Paragraph } from 'react-native-paper';
import Eventdata from '../../core/constants/EventString';
import { TextInput, BackHandler } from 'react-native';
import styles from './event_list_styles';
import FloatingButton from '../../Components/FloatingButton';
import { openDatabase } from 'react-native-sqlite-storage';
import { theme } from '../../core/style/theme';
import { useIsFocused } from '@react-navigation/native';
import moment from "moment";


var db = openDatabase({ name: 'EventDatabase1.db' });

const EventList = ({ route, navigation }) => {
  const [search, setSearch] = useState()
  const [eventData, setEventData] = useState([])
  const [filteredData, setFilteredData] = useState()
  const [shouldShow, setShoulShow] = useState(true)
  const [noResults, setNoResults] = useState(false)
  const isFocused = useIsFocused()

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to leave the app?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (navigation.isFocused()) {
          return backAction();
        }
      },
    );
    return () => backHandler.remove();
  }, []);


  useEffect(() => {
    if(isFocused){
    var temp = [];
      db.transaction((tx) => {
        tx.executeSql('SELECT * FROM table_event ORDER BY event_id DESC', [], (tx, results) => {

          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          setEventData(temp);
          console.log(eventData, "my data");
        });
      });
    }
  }, [isFocused]);


///Delete event query

  React.useEffect(() => {
    if (route.params && route.params.ID) {
      // const updatedEventData = eventData.filter(event => event.id !== route.params.id);
      //  setEventData(updatedEventData);

      db.transaction((tx) => {
        tx.executeSql('DELETE FROM table_event where event_id=?', [route.params.ID], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setEventData(temp);
          navigation.reset({
            index:0,
            routes: [{name:'EventList'}]
          })
          console.log(eventData, "<<<<<after Delete>>>>>")
        });
      });

    }
  }, [route.params]);





  const onPressShowDetails = (eventId) => {
    navigation.navigate('showDetails', {ID:eventId,DATA:eventData});
    console.log(eventData,"SENDING DATA")
    

  }

  //SearchBar

  const searchFilterFunction = (text) => {

    if (text) {

      const newData = eventData.filter(
        function (item) {
          const itemData = item.event_name
            ? item.event_name.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
      setFilteredData(newData);
      setSearch(text);
      if (newData.length == 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }

    }
    else {
      setFilteredData(eventData);
      setSearch(text);

    }
  };

  //to Display item
  const ItemView = ({ item }) => {
    return (
      <Card style={{ flex: 1, margin: 15, backgroundColor: theme.colors.secondary, borderColor: "#000000", borderWidth: 0.5 }} key={item.event_id}>
        <Card.Content>
          <Title style={styles.TitleStyle}>{item.event_name}</Title>
        </Card.Content>
        <Card.Cover style={{ flex: 1, padding: 10, backgroundColor: '#D8D8D8' }} source={{ uri: item.event_image }} />
        <Card.Content>
          <Text style={styles.DescriptionStyle}>
            <Image source={require('../../assets/calendar_list.png')} style={{ width: 20, height: 20 }} />
            {"  " + item.event_date}
          </Text>
        </Card.Content>
        <Card.Content>
          <Text style={styles.DescriptionStyle}>
            <Image source={require('../../assets/location.png')} style={{ width: 20, height: 20 }} />
            {"  " + item.event_address}
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => onPressShowDetails(item.event_id)}>Show Details</Button>
        </Card.Actions>
      </Card>
    )
  }


  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.primary }}>
      <StatusBar backgroundColor={theme.colors.primary} />
      <ScrollView>

        <View>
          <TextInput onChangeText={(text) => searchFilterFunction(text)}
            placeholder="Search Here" style={styles.searchBar} onFocus={() => setShoulShow(false)} />
          {noResults && <Text style={{ flex: 1, color: '#000000', fontSize: 20, justifyContent: 'center', alignSelf: 'center' }}>No results found.</Text>}
          <View>
            <FlatList
              data={filteredData}
              keyExtractor={(item) => item.eventid.toString()}
              ItemSeparatorComponent={""}
              renderItem={ItemView}
            />
          </View>
        </View>

        {shouldShow && eventData && eventData?.map(event => (
          <Card style={{ backgroundColor: theme.colors.secondary, flex: 1, margin: 15, borderColor: '#000000', borderWidth: 0.5 }} key={event.event_id}>
            <Card.Content>
              <Title style={styles.TitleStyle}>{event.event_name}</Title>
            </Card.Content>
            <Card.Cover style={{ flex: 1, padding: 10, backgroundColor: '#D8D8D8' }} source={{ uri: event.event_image }} />
            <Card.Content>
              <Text style={styles.DescriptionStyle}>
                <Image source={require('../../assets/calendar_list.png')} style={{ width: 20, height: 20 }} />
                {"  " + moment(event.event_date).format('DD MMM YYYY')}
              </Text>
            </Card.Content>
            <Card.Content>
              <Text style={styles.DescriptionStyle}>
                <Image source={require('../../assets/location.png')} style={{ width: 20, height: 20 }} />
                {"  " + event.event_address}
              </Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => onPressShowDetails(event.event_id)} style={{ borderColor: theme.colors.primary }}><Text style={{ color: theme.colors.primary }}>Show Details</Text></Button>
            </Card.Actions>
          </Card>
        ))
        }


      </ScrollView>
      <FloatingButton navigation={navigation} />
    </View>



  );
}

export default EventList;



