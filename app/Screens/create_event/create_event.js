/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  alert,
  Alert,
  SafeAreaView,
  Text,
  Button,
  StyleSheet,
  BackHandler,
  Image,
  TouchableOpacity
} from 'react-native';
import Mybutton from '../../Components/Mybutton';
import FilePicker, { types } from 'react-native-document-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';
// import Button from '../../Components/Button';
import Mytextinput from '../../Components/Mytextinput';
import { openDatabase } from 'react-native-sqlite-storage';
import DateTimePicker from '@react-native-community/datetimepicker'
import { theme } from '../../core/style/theme';



var db = openDatabase({ name: 'EventDatabase1.db' });
console.log("database opened" + db)

const CreateEvent = ({ navigation }) => {
  let [EventName, setEventName] = useState('');
  let [EventDate, setEventDate] = useState('');
  let [EventTime, setEventTime] = useState('');
  let [EventAddress, setEventAddress] = useState('');
  let [EventDescription, setEventDescription] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
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

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, selectedDate) => {

    const currentDate = selectedDate || EventDate;
    setShowDatePicker(false);
    setEventDate(currentDate.toISOString());

  };


  const hideDatePickerHandler = () => {
    setEventDate(null);
  }


  const showTimePickerHandler = () => {
    setShowTimePicker(true);
  };

  const hideTimePickerHandler = () => {
    setShowTimePicker(false);
  };

  const handleTimeChange = (event, selectedTime) => {
    if (event.type === 'set') {
      const time = new Date(selectedTime.getTime());
      time.setSeconds(0);
      setEventTime(time.getTime());
      hideTimePickerHandler();
    }
  };




  // const handleTimeChange = (event, selectedTime) => {
  //   const currentTime = selectedTime || EventTime;
  //   setShowTimePicker(false);
  //   setEventTime(currentTime.toLocaleTimeString());
  // };

  let register_event = () => {
    console.log('DHirav')
    console.log(EventName, EventDate, EventTime, EventAddress, EventDescription, EventImagePath, UserId);
    // const c = {d1 : new Date(1672720648000)}
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
      tx.executeSql(
        'INSERT INTO table_event (user_id,event_name, event_date, event_time, event_address, event_description, event_image) VALUES (?,?,?,?,?,?,?)',
        [UserId, EventName, EventDate, EventTime, EventAddress, EventDescription, EventImagePath],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Event Created SuccessFully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('EventList'),
                },
              ],
              { cancelable: false }
            );
          }
          else alert('Event Creation Failed..!!');
        }
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
                editable={false}
                placeholder="Select date"
                value={EventDate ? new Date(EventDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : ''}
                iconName={'calendar-outline'}
                handleIconPress={showDatePickerHandler}
              />

              {showDatePicker && (
                <DateTimePicker
                  value={new Date()}
                  display="default"
                  onChange={handleDateChange}
                  onCancel={hideDatePickerHandler}
                />
              )}


              <Mytextinput
                editable={false}
                placeholder="Enter Time"
                value={EventTime ? new Date(EventTime).toLocaleTimeString() : ''}
                onChangeText={(EventTime) => setEventTime(EventTime)}
                maxLength={10}
                keyboardType="numeric"

                iconName={'time-outline'} handleIconPress={showTimePickerHandler}
              />
              {showTimePicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="time"
                  display="default"
                  onChange={handleTimeChange}
                  onCancel={hideTimePickerHandler}
                />

              )}
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
              <TouchableOpacity style={styles.btn} onPress={() => {
                if (EventImagePath !== '') {
                  setEventImagePath('');
                } else {
                  handleFilePicker();
                }
              }}>
                <Text style={{ color: 'white', padding: 10, alignSelf: 'center', fontWeight: 'bold' }}>
                  {EventImagePath !== '' ? 'Remove Image' : 'Select Image'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={register_event} title="Submit">
                <Text style={{ color: 'white', padding: 10, alignSelf: 'center', fontWeight: 'bold' }}>Submit</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
  btn: {
    backgroundColor: theme.colors.primary,
    width: "50%",
    height: 50,
    padding: 5,
    margin: 10,
    borderRadius: 10,
    alignSelf: 'center',
    // borderWidth: 3,
    justifyContent: 'center',
  },
});



export default CreateEvent;

