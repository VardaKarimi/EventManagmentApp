/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, Image, Modal, TouchableWithoutFeedback, Alert, LogBox } from 'react-native';
import { Card, Button, Title } from 'react-native-paper';
import { TextInput, BackHandler } from 'react-native';
import styles from './event_list_styles';
import FloatingButton from '../../Components/FloatingButton';
import { openDatabase } from 'react-native-sqlite-storage';
import { theme } from '../../core/style/theme';
import { useIsFocused } from '@react-navigation/native';
import moment from "moment";
import AsyncStorage from '@react-native-async-storage/async-storage';

LogBox.ignoreAllLogs();
var db = openDatabase({ name: 'EventDatabase1.db' });

const EventList = ({ route, navigation }) => {
  const [search, setSearch] = useState()
  const [eventData, setEventData] = useState([])
  const [favEvent, setFavEvent] = useState([]);
  const [filteredData, setFilteredData] = useState()
  const [shouldShow, setShoulShow] = useState(true)
  const [noResults, setNoResults] = useState(false)
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [isFavouriteFilterActive, setIsFavouriteFilterActive] = useState(false);
  let [UserId, setUserId] = useState('');

  const isFocused = useIsFocused();


  // GETTING USERID FROM ASYNC

  useEffect(() => {

    const getUserId = async () => {
      let userid = await AsyncStorage.getItem('userId');
      let parsed = JSON.parse(userid);
      setUserId(parsed);
    };

    getUserId();
  }, []);

  //to get event id of favourited event

  useEffect(() => {
    if (UserId) {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT DISTINCT event_id FROM table_favourite_event WHERE user_id = ?",
          [UserId],
          (tx, result) => {
            let temp2 = [];
            for (let i = 0; i < result.rows.length; i++) {
              temp2.push(result.rows.item(i).event_id);
            }
            setFavEvent(temp2);
            console.log(temp2, 'My Fav Event Id')
          }
        );
      });
    }
  }, [UserId])


  //Dailouge box to exit app

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
  }, [navigation]);


  // ALL EVENT FILTER LIST DISPLAY
  useEffect(() => {
    if (isFocused) {
      var temp = [];
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM table_event ORDER BY event_id DESC',
          [],
          (tx, results) => {
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push(results.rows.item(i));
            }

            setEventData(temp);
            console.log(temp, "my all event data");
          }
        );
      });
    }
  }, [isFocused, isFavouriteFilterActive]);

  // FAVOURITE FILTER LIST DISPLAY
  useEffect(() => {
    if (isFocused) {
      var temp1 = [];
      if (isFavouriteFilterActive) {
        db.transaction((tx) => {
          tx.executeSql(
            `SELECT DISTINCT * FROM table_event INNER JOIN table_favourite_event ON table_event.event_id = table_favourite_event.event_id  WHERE table_favourite_event.user_id = ? ORDER BY table_event.event_id DESC`,
            [UserId],
            (tx, results) => {
              for (let i = 0; i < results.rows.length; ++i) {
                temp1.push(results.rows.item(i));
              }
              setEventData(temp1);
              console.log(temp1, "my fav data");
            }
          );
        });
      }
    }
  }, [isFocused, isFavouriteFilterActive]);


  ///Delete event query

  useEffect(() => {
    if (route.params && route.params.ID) {
      db.transaction((tx) => {
        tx.executeSql('DELETE FROM table_event where event_id=?', [route.params.ID], (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setEventData(temp);
          navigation.reset({
            index: 0,
            routes: [{ name: 'EventList' }]
          })
          console.log(eventData, "<<<<<after Delete>>>>>")
        });
      });

    }
  }, [route.params]);

  // favourite button

  const toggleFavorite = (event) => {
    const updatedEvents = [...eventData];
    const index = updatedEvents.findIndex((item) => item.event_id === event.event_id);
    const updatedEvent = { ...event, isFavorite: !event.isFavorite };
    updatedEvents.splice(index, 1, updatedEvent);
    setEventData(updatedEvents);
    db.transaction((tx) => {
      if (updatedEvent.isFavorite) {
        tx.executeSql(
          'INSERT INTO table_favourite_event (event_id, user_id) SELECT DISTINCT ?,? WHERE NOT EXISTS (SELECT 1 FROM table_favourite_event WHERE event_id = ? AND user_id = ?)',
          [updatedEvent.event_id, UserId, updatedEvent.event_id, UserId],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              console.log('Event ID inserted to table_favourite_event');
              if (UserId) {
                db.transaction((tx) => {
                  tx.executeSql(
                    "SELECT DISTINCT event_id FROM table_favourite_event WHERE user_id = ?",
                    [UserId],
                    (tx, result) => {
                      let temp2 = [];
                      for (let i = 0; i < result.rows.length; i++) {
                        temp2.push(result.rows.item(i).event_id);
                      }
                      setFavEvent(temp2);
                      console.log(temp2, 'My Fav Event Id')
                    }
                  );
                });
              }
              console.log(favEvent);
            } else {
              console.log('Event ID already exists in table_favourite_event');
            }
          },
          (error) => {
            console.log('Error inserting event ID to table_favourite_event:', error);
          }
        );
      } else {
        tx.executeSql(
          'DELETE FROM table_favourite_event WHERE event_id = ?',
          [updatedEvent.event_id],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              console.log('Event ID deleted from table_favourite_event');
              if (UserId) {
                db.transaction((tx) => {
                  tx.executeSql(
                    "SELECT DISTINCT event_id FROM table_favourite_event WHERE user_id = ?",
                    [UserId],
                    (tx, result) => {
                      let temp2 = [];
                      for (let i = 0; i < result.rows.length; i++) {
                        temp2.push(result.rows.item(i).event_id);
                      }
                      setFavEvent(temp2);
                      console.log(temp2, 'My Fav Event Id')
                    }
                  );
                });
              }
              favEvent.pop(updatedEvent.event_id);
              console.log(favEvent)
            }
          },
          (error) => {
            console.log('Error deleting event ID from table_favourite_event:', error);
          }
        );
      }
    });

  };

  // show details of each event

  const onPressShowDetails = (eventId) => {
    navigation.navigate('showDetails', { ID: eventId, DATA: eventData });
    console.log(eventData, "SENDING DATA")


  }

  const checkIsFav = (event_id) => {
    var index = favEvent.findIndex((item) => item.event_id === event_id);
    if (index > 0) {
      return true;
    }
    else {
      return false;
    }

  };


  //SearchBar

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = eventData.filter(function (item) {
        const itemEventData = `${item.event_name} ${item.event_address}`.toUpperCase();
        const searchText = text.toUpperCase();
        return itemEventData.indexOf(searchText) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
      if (newData.length == 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
    } else {
      setFilteredData(eventData);
      setSearch(text);
    }
  };


  //to Display item searched

  const ItemView = ({ item }) => {
    return (
      <Card style={styles.cardStyle} key={item.event_id}>
        <Card.Content>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <View style={{ flex: 0.9 }}>
              <Title style={styles.TitleStyle}>{item.event_name}</Title>
            </View>
            <View style={{ flex: 0.1 }}>
              <TouchableOpacity onPress={() => toggleFavorite(item)}>
                <Image
                  source={(favEvent.includes(item.event_id) || item.isFavorite) ? require('../../assets/heart2.png') : require('../../assets/heart.png')}
                  style={{ width: 35, height: 35, marginTop: -5 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Card.Content>
        <Card.Cover style={styles.cardCover} source={{ uri: item.event_image }} />
        <Card.Content>
          <Text style={styles.DescriptionStyle}>
            <Image source={require('../../assets/calendar_list.png')} style={{ width: 20, height: 20 }} />
            {"  " + moment(item.event_date).format('DD MMM YYYY')}
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
        {/* <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={toggleFavorite}>
          <Image source={isFavorite ? require('../../assets/heart2.png') : require('../../assets/heart.png')} style={{ width: 35, height: 35 }} />
        </TouchableOpacity> */}
      </Card>
    )
  }


  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.primary }}>
      <StatusBar backgroundColor={theme.colors.primary} />
      <ScrollView>
        <View >
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'column' }}>
              <TextInput onChangeText={(text) => searchFilterFunction(text)}
                placeholder="Search Here" style={styles.searchBar} onFocus={() => setShoulShow(false)} />
              {noResults && <Text style={styles.noresultText}>No results found.</Text>}
            </View>
            <View style={{ flexDirection: 'column' }}>
              <TouchableOpacity style={styles.filterBtn} onPress={() => setShowFilterDropdown(true)}>
                <Image style={styles.filterImage} source={require('../../assets/filter.png')} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableWithoutFeedback onPress={() => setShowFilterDropdown(!showFilterDropdown)}>
            <Modal visible={showFilterDropdown} animationType="slide" onRequestClose={() => setShowFilterDropdown(false)}
              transparent={true}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>

                  {/* Filter Code */}
                  <TouchableOpacity onPress={() => {
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'EventList' }],
                    });
                    setShowFilterDropdown(false);
                    setIsFavouriteFilterActive(false);
                  }}>
                    <Text style={styles.filterBtn}>All Events</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    setIsFavouriteFilterActive(true);
                    setShowFilterDropdown(false)
                  }}>
                    <Text style={styles.filterBtn}>Favourite Events</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterDropdownStyle} onPress={() => { setShowFilterDropdown(false) }}>
                    <Text style={styles.dropdownText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </TouchableWithoutFeedback>



          <View>
            <FlatList
              data={filteredData}
              keyExtractor={(item) => item.event_id.toString()}
              ItemSeparatorComponent={""}
              renderItem={ItemView}
            />
          </View>
        </View>

        {/* mapping each event from db */}

        {shouldShow && eventData && eventData?.map(event => (
          <Card style={styles.cardStyle} key={event.event_id}>
            <Card.Content>
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <View style={{ flex: 0.9 }}>
                  <Title style={styles.TitleStyle}>{event.event_name}</Title>
                </View>
                <View style={{ flex: 0.1 }}>
                  <TouchableOpacity onPress={() => toggleFavorite(event)}>
                    <Image
                      source={(favEvent.includes(event.event_id) || event.isFavorite) ? require('../../assets/heart2.png') : require('../../assets/heart.png')}
                      style={{ width: 35, height: 35, marginTop: -5 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </Card.Content>
            <Card.Cover style={styles.cardCover} source={{ uri: event.event_image }} />
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



