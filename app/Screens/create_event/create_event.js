// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Screen to register the user

import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  alert,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import Mybutton from '../../Components/Mybutton';
import Mytextinput from '../../Components/Mytextinput';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'EventDatabase1.db'});

const CreateEvent = ({navigation}) => {
  let [EventName, setEventName] = useState('');
  let [EventDate, setEventDate] = useState('');
  let [EventTime, setEventTime] = useState('');
  let [EventAddress, setEventAddress] = useState('');
  let [EventDescription, setEventDescription] = useState('');

  let register_event = () => {
    console.log(EventName, EventDate, EventTime,EventAddress, EventDescription);

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
                  onPress: () => navigation.navigate('EventList'),
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
              <Mytextinput
                placeholder="Enter Date"
                onChangeText={(EventDate) => setEventDate(EventDate)}
                maxLength={10}
                keyboardType="numeric"
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Enter Time"
                onChangeText={(EventTime) => setEventTime(EventTime)}
                maxLength={10}
                keyboardType="numeric"
                style={{padding: 10}}
              />
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




export default CreateEvent;

// import * as React from 'react';
// import { 
//   View, 
//   Text, 
//   TextInput,
//   Button, 
//   ScrollView, 
//   KeyboardAvoidingView, 
//   Alert,
//   alert, 
//   SafeAreaView
// } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { useState } from 'react';
// import {openDatabase} from 'react-native-sqlite-storage';

// var db = openDatabase({name: 'EventDatabase.db'});

// const Screen2 = ({ navigation }) => {
//   let [EventName, setEventName] = useState('');
//   let [EventDate, setEventDate] = useState('');
//   let [EventTime, setEventTime] = useState('');
//   let [EventLocation, setEventLocation] = useState('');
//   let [EventDescription, setEventDescription] = useState('');

//   let Register_event = () => {
//     console.log(EventName, EventDate, EventTime, EventLocation)
    
//     if (!EventName) {
//       alert('Please fill name');
//       return;
//     }
//     if (!EventDate) {
//       alert('Please fill date');
//       return;
//     }
//     if (!EventTime) {
//       alert('Please fill Time');
//       return;
//     }
//     if (!EventLocation) {
//       alert('Please fill location');
//       return;
//     }
//     if (!EventDescription) {
//       alert('Please fill description');
//       return;
//     }


//     db.transaction(function (tx)
//       {
//         tx.executeSql(
//           'INSERT INTO table_event (event_name, event_date, event_time, event_location, event_description) VALUES (?,?,?,?,?)',
//           [EventName, EventDate, EventTime, EventLocation, EventDescription],
//           (tx, results) => {
//             console.log('Results', results.rowsAffected);
//             if (results.rowsAffected > 0) {
//               Alert.alert(
//                 'Success',
//                 'Event Registered Successfully',
//                 [
//                   {
//                     text: 'Ok',
//                     onPress: () => navigation.navigate('HomeScreen'),
//                   },
//                 ],
//                 {cancelable: false},
//               );
//             } else alert('Registration Failed');
//           },
//         );
//       });
    
//   };
//     return (
//         <SafeAreaView style={{flex: 1}}>
//           <View style = {{flex:1 , backgroundColor: 'white'}}>
//             <View style = {{flex:1}}>
//               <ScrollView keyboardShouldPersistTaps = "handled">
//                 <KeyboardAvoidingView
//                 behavior='padding'
//                 style= {{flex:1, justifyContent:'space-between'}}>
//                   <TextInput
//                   placeholder='Enter Name'
//                   onChangeText={(EventName)=> setEventName(EventName)}
//                   style={{padding:10}}
//                   />
//                   <TextInput
//                   placeholder='Enter Date'
//                   onChangeText={(EventDate)=> setEventDate(EventDate)}
//                   style={{padding:10}}
//                   />
//                   <TextInput
//                   placeholder='Enter Time'
//                   onChangeText={(EventTime)=> setEventTime(EventTime)}
//                   style={{padding:10}}
//                   />
//                   <TextInput
//                   placeholder='Enter Location'
//                   onChangeText={(EventLocation)=> setEventLocation(EventLocation)}
//                   style={{padding:10}}
//                   />
//                   <TextInput
//                   placeholder='Enter Description'
//                   onChangeText={(EventDescription)=> setEventDescription(EventDescription)}
//                   style={{padding:10}}
//                   />
//                   <Button title='Register' customClick={Register_event}/>
//                 </KeyboardAvoidingView>
//               </ScrollView>
//             </View>
//           </View>
//         </SafeAreaView>
//     );
     
//   };
//   export default Screen2;