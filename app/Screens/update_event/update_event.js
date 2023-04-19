import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import Mytextinput from '../../Components/Mytextinput';
import Mybutton from '../../Components/Mybutton';
import {openDatabase} from 'react-native-sqlite-storage';
import DateTimePicker from '@react-native-community/datetimepicker'
import Iconic from 'react-native-vector-icons/Ionicons';
import Mytext from '../../Components/Mytext';

var db = openDatabase({name: 'EventDatabase1.db'});

const UpdateEvent = ({navigation,route}) => {
  const { event } = route.params;

 
  let [inputEventId, setInputEventId] = useState(event.event_id);
  let [EventName, setEventName] = useState(event.event_name);
  let [EventDate, setEventDate] = useState(event.event_date);
  let [EventTime, setEventTime] = useState(event.event_time);
  let [EventAddress, setEventAddress] = useState(event.event_address);
  let [EventDescription, setEventDescription] = useState(event.event_description);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);


  console.log(inputEventId)

  const showDatePickerHandler = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, selectedDate) => {

    const currentDate = selectedDate || EventDate;
    setShowDatePicker(false);
    setEventDate(currentDate.toISOString());
    
  };


  const hideDatePickerHandler = ()=> {
    setEventDate(null);
  }


  const showTimePickerHandler = () => {
    setShowTimePicker(true);
  };

  const hideTimePickerHandler = () => {
    setShowTimePicker(false);
  };

  const handleTimeChange = (event, selectedTime) => {
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
    console.log(inputEventId);
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
            updateAllStates('', '', '','','');
          }
        },
      );
    });
  }, []);

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
        [EventName, EventDate,EventTime, EventAddress, EventDescription, inputEventId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Event updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('showDetails',{eventId:inputEventId}),
                },
              ],
              {cancelable: false},
            );
          } else Alert.alert('Updation Failed');
        },
      );
    });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{flex: 1, justifyContent: 'space-between'}}>
              <Mytext
              value={inputEventId}/>
              {/* <Mybutton title="Search Event" customClick={searchEvent} /> */}
              <Mytextinput
                placeholder="Enter Name"
                value={EventName}
                style={{padding: 10}}
                onChangeText={(EventName) => setEventName(EventName)}
              />
               <Mytextinput 

                editable={false}
                placeholder="Select date"
                value={EventDate ? new Date(EventDate).toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}) : ''}
                iconName = {'calendar-outline'}   handleIconPress={showDatePickerHandler}/> 
                {showDatePicker && (
                <DateTimePicker
                 value={  new Date()}
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

                iconName = {'time-outline'}   handleIconPress={showTimePickerHandler}
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
                style={{padding: 10}}
                onChangeText={(EventAddress) => setEventAddress(EventAddress)}
              />
              <Mytextinput
                placeholder="Enter Description"
                value={EventDescription}
                style={{padding: 10}}
                onChangeText={(EventDescription) => setEventDescription(EventDescription)}
              />
              <Mybutton title="Update Event" customClick={updateEvent} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateEvent;