import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  alert,
  Alert,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Mybutton from '../../Components/Mybutton';
import Button from '../../Components/Button';
import Mytextinput from '../../Components/Mytextinput';
import {openDatabase} from 'react-native-sqlite-storage';
import DateTimePicker from '@react-native-community/datetimepicker'
import Iconic from 'react-native-vector-icons/Ionicons';
import TextInput from '../../Components/TextInput';


var db = openDatabase({name: 'EventDatabase1.db'});

const CreateEvent = ({navigation}) => {
  let [EventName, setEventName] = useState('');
  let [EventDate, setEventDate] = useState('');
  let [EventTime, setEventTime] = useState('');
  let [EventAddress, setEventAddress] = useState('');
  let [EventDescription, setEventDescription] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);


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
  



  // const handleTimeChange = (event, selectedTime) => {
  //   const currentTime = selectedTime || EventTime;
  //   setShowTimePicker(false);
  //   setEventTime(currentTime.toLocaleTimeString());
  // };

  let register_event = () => {
    console.log(EventName, EventDate, EventTime,EventAddress, EventDescription);
    const c = {d1 : new Date(1672720648000)}
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
        'INSERT INTO table_event_1 (event_name, event_date, event_time, event_address, event_description) VALUES (?,?,?,?,?)',
        [EventName, EventDate,EventTime, EventAddress, EventDescription],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Event Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Home'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Registration Failed');
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
              <Mytextinput
                placeholder="Enter Name"
                onChangeText={(EventName) => setEventName(EventName)}
                style={{padding: 10}}
              />
              {/* <Mytextinput
                placeholder="Enter Date"
                onChangeText={(EventDate) => setEventDate(EventDate)}
                maxLength={10}
                keyboardType="numeric"
                style={{padding: 10}}
              /> */}
  
              
        <Mytextinput 

                  editable={false}
                  placeholder="Select date"
                  value={EventDate ? EventDate.toString() : ''}
                  iconName = {'calendar-outline'}   handleIconPress={showDatePickerHandler}/> 
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
                onChangeText={(EventAddress) => setEventAddress(EventAddress)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{textAlignVertical: 'top', padding: 10}}
              />
              <Mytextinput
                placeholder="Enter Description"
                onChangeText={(EventDescription) => setEventDescription(EventDescription)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{textAlignVertical: 'top', padding: 10}}
              />
              <Mybutton title="Submit" customClick={register_event} />
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
});



export default CreateEvent;

