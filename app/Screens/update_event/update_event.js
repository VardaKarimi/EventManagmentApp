/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import Mytextinput from '../../Components/Mytextinput';
import { openDatabase } from 'react-native-sqlite-storage';
import DateTimePicker from '@react-native-community/datetimepicker'
import Mytext from '../../Components/Mytext';
import styles from './update_event_styles';
import { useIsFocused } from '@react-navigation/native';

var db = openDatabase({ name: 'EventDatabase1.db' });


const UpdateEvent = ({ navigation, route }) => {
  const { ID, DATA } = route.params;

  let [inputEventId, setInputEventId] = useState(ID);
  let [EventName, setEventName] = useState(DATA.event_name);
  let [EventDate, setEventDate] = useState(DATA.event_date);
  let [EventTime, setEventTime] = useState(DATA.event_time);
  let [EventAddress, setEventAddress] = useState(DATA.event_address);
  let [EventDescription, setEventDescription] = useState(DATA.event_description);
  const [eventData, setEventData] = useState([])
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const isFocused = useIsFocused();



  console.log(inputEventId)

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (ID, selectedDate) => {

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

  const handleTimeChange = (ID, selectedTime) => {
    hideTimePickerHandler();
    if (selectedTime !== undefined) {
      const time = selectedTime.toISOString().substr(11, 8);
      setEventTime(time);
    }
  };

  let updateAllStates = (name, date, time, address, description) => {
    setEventName(name);
    setEventDate(date);
    setEventTime(time);
    setEventAddress(address);
    setEventDescription(description);
  };

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_event where event_id = ?',
        [inputEventId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(res.event_name, res.event_date, res.event_time, res.event_address, res.event_description);
          } else {
            Alert.alert('No user found');
            updateAllStates('', '', '', '', '');
          }
        },
      );
    });
  }, []);


  React.useEffect(() => {
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
          }
        );
      });
    }
  }, [isFocused]);

  let updateEvent = () => {


    if (!inputEventId) {
      Alert.alert('Please fill Event id');
      return;
    }
    if (!EventName) {
      Alert.alert('Please fill name');
      return;
    }
    if (!EventDate) {
      Alert.alert('Please fill date');
      return;
    }
    if (!EventTime) {
      Alert.alert('Please fill time');
      return;
    }
    if (!EventAddress) {
      Alert.alert('Please fill Address');
      return;
    }
    if (!EventDescription) {
      Alert.alert('Please fill description');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_event set event_name=?, event_date=? , event_time=?, event_address=?, event_description=? where event_id=?',
        [EventName, EventDate, EventTime, EventAddress, EventDescription, inputEventId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Event updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('showDetails', { ID: inputEventId, DATA: eventData }),
                },
              ],
              { cancelable: false },
            );
          } else Alert.alert('Updation Failed');
        },
      );
    });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1, backgroundColor: 20 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytext
                value={inputEventId} />
              {/* <Mybutton title="Search Event" customClick={searchEvent} /> */}
              <Mytextinput
                placeholder="Enter Name"
                value={EventName}
                style={{ padding: 10 }}
                onChangeText={(EventName) => setEventName(EventName)}
              />
              <Mytextinput

                editable={false}
                placeholder="Select date"
                value={EventDate ? new Date(EventDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : ''}
                iconName={'calendar-outline'} handleIconPress={showDatePickerHandler} />
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
                value={EventTime}
                onChangeText={(EventTime) => setEventTime(EventTime)}
                maxLength={10}
                keyboardType="numeric"
                iconName={'time-outline'}
                handleIconPress={showTimePickerHandler}

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
                value={EventAddress}
                style={{ padding: 10 }}
                onChangeText={(EventAddress) => setEventAddress(EventAddress)}
              />
              <Mytextinput
                placeholder="Enter Description"
                value={EventDescription}
                style={{ padding: 10 }}
                onChangeText={(EventDescription) => setEventDescription(EventDescription)}
              />
              <TouchableOpacity style={styles.btn} onPress={updateEvent}>
                <Text style={{ color: 'white', padding: 10, alignSelf: 'center', fontWeight: 'bold' }}>Submit</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateEvent;