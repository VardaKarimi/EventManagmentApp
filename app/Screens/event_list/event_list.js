/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Button, Title, Paragraph } from 'react-native-paper';
import Eventdata from '../../core/constants/EventString';
import { TextInput, BackHandler, Alert } from 'react-native';
import styles from './event_list_styles';
import { openDatabase } from 'react-native-sqlite-storage';
import FloatingButton from '../../Components/FloatingButton';


var db = openDatabase({ name: 'EventDatabase1.db' });

const EventList = ({ route, navigation }) => {
  const [search, setSearch] = useState()
  const [eventData, setEventData] = useState(Eventdata)
  const [filteredData, setFilteredData] = useState()
  const [shouldShow, setShoulShow] = useState(true)
  const [noResults, setNoResults] = useState(false)

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure to exit ?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);


  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_event_2'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length === 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_event', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_event_2(event_id INTEGER PRIMARY KEY AUTOINCREMENT, event_name VARCHAR(20), event_date INT(10), event_time INT(10), event_address VARCHAR(255), event_description VARCHAR(255), event_image VARCHAR(255))',
              [],
            );
          }
        },
      );
    });

  }, []);


  React.useEffect(() => {
    if (route.params && route.params.id) {
      const updatedEventData = eventData.filter(event => event.id !== route.params.id);
      setEventData(updatedEventData);

    }
  }, [route.params]);

  const onPressShowDetails = (eventId) => {
    navigation.navigate('showDetails', { eventId });

  }

  //SearchBar

  const searchFilterFunction = (text) => {

    if (text) {

      const newData = eventData.filter(
        function (item) {
          const itemData = item.Title
            ? item.Title.toUpperCase()
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
      <Card style={{ margin: 5, backgroundColor: "#D8D8D8" }} key={item.id}>
        <Card.Content>
          <Title>{item.Title}</Title>
        </Card.Content>
        <Card.Cover source={{ uri: item.imageUrl }} />
        <Card.Content>
          <Paragraph>{item.Description}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => onPressShowDetails(item.id)}>Show Details</Button>
        </Card.Actions>

      </Card>

      // <Text style={styles.ItemView} onPress={() => onPressShowDetails(item.id)}>{item.Title}</Text>
    )
  }


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 25 }}>
      <ScrollView>

        <View>
          <TextInput onChangeText={(text) => searchFilterFunction(text)}
            placeholder="Search Here" style={styles.searchBar} onFocus={() => setShoulShow(false)} />
          {noResults && <Text>No results found.</Text>}
          <FlatList
            data={filteredData}
            keyExtractor={(item, id) => id.toString()}
            ItemSeparatorComponent={""}
            renderItem={ItemView}
          />
        </View>

        {shouldShow && eventData.map(event => (
          <Card style={{ backgroundColor: "#D8D8D8", flex: 1, marginBottom: 20, borderColor: "#000000", borderWidth: 0.5 }} key={event.id}>
            <Card.Content>
              <Title style={styles.TitleStyle}>{event.Title}</Title>
            </Card.Content>
            <Card.Cover style={{ flex: 1, padding: 10, backgroundColor: "D8D8D8" }} source={{ uri: event.imageUrl }} />
            <Card.Content>
              <Paragraph style={styles.DescriptionStyle}>{event.Description}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => onPressShowDetails(event.id)}>Show Details</Button>
            </Card.Actions>
          </Card>
        ))
        }


        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} >Go to Home</Button>
        <Button title="Go back" onPress={() => navigation.goBack()}>Go back</Button>
      </ScrollView>
      <FloatingButton navigation={navigation} />
    </View>



  );
}
export default EventList;

