/* eslint-disable prettier/prettier */
import * as React from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserOutlined } from '@ant-design/icons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useEffect } from 'react';
import { openDatabase } from 'react-native-sqlite-storage';



const Home = ({ navigation }) => {

  // import {openDatabase} from 'react-native-sqlite-storage';


  // var db = openDatabase({name: 'EventDatabase.db'});

  // const Home = ({ navigation }) => {
  //  useEffect(() => {
  //   db.transaction(function(txn)
  //   {
  //     txn.executeSql(
  //       "SELECT name FROM sqlite_master WHERE type = 'table' AND name='table_event'",
  //       [],
  //       function (tx,res) {
  //         console.log('item:', res.rows.length);
  //         if (res.rows.length == 0) {
  //            txn.executeSql('DROP TABLE IF EXISTS table_event', []);
  //            txn.executeSql(
  //             'CREATE TABLE IF NOT EXISTS table_event(event_id INTEGER PRIMARY KEY AUTOINCREMENT, event_name VARCHAR(20), event_date INT(10), event_time INT(10), event_location VARCHAR(255))',
  //            [],
  //            )
  //         }
  //       }
  //     )
  //   });
  //  },[]);




  // console.log(navigation, 'home');

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FontAwesome5 />
      <Text>Home Screen</Text>

      <Button title="Screen 1" onPress={() => navigation.navigate('Screen1')} />
      <Button title="Screen 2" onPress={() => navigation.navigate('CreateEvent')} />
      <Button title="Screen 3" onPress={() => navigation.navigate('Screen3')} />
      <Button title="Screen 4" onPress={() => navigation.navigate('Screen4')} />
    </View>
  );
};

export default Home;
