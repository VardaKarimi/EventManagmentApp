import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from "react-native";
import { theme } from "../../../core/style/theme";
import { openDatabase } from 'react-native-sqlite-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import Mytextinput from "../../../Components/Mytextinput";
import moment from "moment";
import CreateTicket_styles from "./Create_ticket_styles";


var db = openDatabase({ name: 'EventDatabase1.db' });


function CreateTicket({ navigation, route }) {

  const [ticketType, setTicketType] = useState()
  const [ticketPrice, setTicketPrice] = useState()
  const [date, setDate] = useState('')
  const [shouldShow, setShouldShow] = useState(false)
  const [count, setCount] = useState(0)
  const { ID, DATA } = route.params;

  const handleDateChange = (event, selectedDate) => {

    const currentDate = selectedDate || EventDate;
    setShouldShow(false);
    setDate(currentDate.getTime());

  };
  const handleShow = () => {
    setShouldShow(true)
  }

  const generateTicket = () => {
    if (!ticketType) {
      Alert.alert('Please Enter Ticket Type.');
      return;
    }
    if (!ticketPrice) {
      Alert.alert('Please Enter Price.');
      return;
    }
    if (!date) {
      Alert.alert("Please provide date");
      return;
    }


    db.transaction(function (tx) {
      console.log(ticketType, ticketPrice, date, ID)
      tx.executeSql(
        'INSERT INTO table_ticket (event_id, ticket_type, ticket_price,ticket_valid_date,max_ticket) VALUES (?,?,?,?,?)',
        [ID, ticketType, ticketPrice, date, count],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            navigation.navigate('showDetails', { ID: ID, DATA: DATA })

          } else Alert.alert('Generation Failed');
        },
      );
    });

  };


  return (
    <View style={CreateTicket_styles.mainContainer}>
      <View style={CreateTicket_styles.ViewStyle}>
        <Mytextinput placeholder="Enter Ticket Type"
          maxLength={8}
          style={CreateTicket_styles.TextInputStyle}
          onChangeText={(text) => setTicketType(text)} />
      </View>

      <View style={CreateTicket_styles.ViewStyle}>
        <Mytextinput placeholder="Enter Price"
          maxLength={4}
          style={CreateTicket_styles.TextInputStyle}
          keyboardType='numeric'
          onChangeText={(text) => setTicketPrice(text)} />
      </View>

      <View style={CreateTicket_styles.ViewStyle}>

        <Mytextinput
          style={CreateTicket_styles.TextInputStyle}

          editable={false}
          placeholder="Valid Upto Date"
          value={date ? moment(date).format('DD MMM YYYY') : ''}
          iconName={'calendar-outline'}
          handleIconPress={handleShow}
        />
        {shouldShow && (
          <DateTimePicker
            value={new Date()}
            display="default"
            onChange={handleDateChange}
          />
        )}

      </View>
      <View style={CreateTicket_styles.ViewStyle}>
        <Text style={{ fontSize: 20, color: '#000000' }}>Tickets Available:</Text>
        <TouchableOpacity onPress={() => setCount(count + 1)}>
          <Text style={CreateTicket_styles.counterTextStyle}>+</Text>
        </TouchableOpacity>
        <Text style={CreateTicket_styles.counterTextStyle}>{count}</Text>
        <TouchableOpacity onPress={() => setCount(count - 1)}>
          <Text style={CreateTicket_styles.counterTextStyle}>-</Text>
        </TouchableOpacity>

      </View>

      <View>
        <TouchableOpacity onPress={generateTicket}>
          <Text style={CreateTicket_styles.btn}>Generate Ticket</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default CreateTicket;