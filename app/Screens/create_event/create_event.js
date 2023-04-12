/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */

import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  alert,
  Alert,
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  BackHandler
} from 'react-native';
import Mybutton from '../../Components/Mybutton';
import Mytextinput from '../../Components/Mytextinput';
import { openDatabase } from 'react-native-sqlite-storage';
import Button from '../../Components/Button';
import FilePicker, { types } from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

var db = openDatabase({ name: 'EventDatabase1.db' });

const CreateEvent = ({ navigation }) => {
  let [EventName, setEventName] = useState('');
  let [EventDate, setEventDate] = useState('');
  let [EventTime, setEventTime] = useState('');
  let [EventAddress, setEventAddress] = useState('');
  let [EventDescription, setEventDescription] = useState('');
  let [EventImagePath, setEventImagePath] = useState('');
  let [UserId, setUserId] = useState('');

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => {
      backHandler.remove();
    };
  }, []);


  useEffect(() => {
    const getUserId = async () => {
      let userid = await AsyncStorage.getItem('userId');
      console.log(userid);
      let parsed = JSON.parse(userid);
      setUserId(parsed);
    };

    getUserId();
  }, []);



  const handleFilePicker = async () => {
    try {
      const response = await FilePicker.pick({
        presentationStyle: 'fullScreen',
        allowMultiSelection: true,
        type: [types.images],
      });

      console.log(response.map(file => file.uri));
      if (response.length > 0) {
        setEventImagePath(response[0].uri);
      }
    } catch (err) {
      console.log(err);
    }
  };


  let register_event = () => {


    console.log(EventName, EventDate, EventTime, EventAddress, EventDescription, EventImagePath, UserId);

    if (!EventName) {
      alert('Please fill name');
      return;
    }
    if (!EventDate) {
      alert('Please fill date');
      return;
    }
    if (!EventTime) {
      alert('Please fill time');
      return;
    }

    if (!EventAddress) {
      alert('Please fill Address');
      return;
    }
    if (!EventDescription) {
      alert('Please fill Description');
      return;
    }


    db.transaction(function (tx) {
      //console.log(EventName, EventDate, EventTime,EventAddress, EventDescription);
      tx.executeSql(
        'INSERT INTO table_event(user_id, event_name, event_date, event_time, event_address, event_description, event_image ) VALUES (?,?,?,?,?,?,?)',
        [UserId, EventName, EventDate, EventTime, EventAddress, EventDescription, EventImagePath],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Event Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Screen3'),
                },
              ],
              { cancelable: false },
            );
          } else { alert('Registration Failed'); }
        },
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytextinput
                placeholder="Enter Name"
                onChangeText={(EventName) => setEventName(EventName)}
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter Date"
                onChangeText={(EventDate) => setEventDate(EventDate)}
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter Time"
                onChangeText={(EventTime) => setEventTime(EventTime)}
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter Address"
                onChangeText={(EventAddress) => setEventAddress(EventAddress)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter Description"
                onChangeText={(EventDescription) => setEventDescription(EventDescription)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />

              {EventImagePath !== '' && <Image source={{ uri: EventImagePath }} style={{ width: 200, alignSelf: 'center', height: 200, marginTop: 20 }}></Image>}
              <Button style={styles.btn} onPress={() => {
                if (EventImagePath !== '') {
                  setEventImagePath('');
                } else {
                  handleFilePicker();
                }
              }}>
                {EventImagePath !== '' ? 'Remove Image' : 'Select Image'}
              </Button>
              <Mybutton title="Submit" customClick={register_event} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};




export default CreateEvent;
const styles = StyleSheet.create({
  btn: {
    marginTop: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: 260,
  }
})
