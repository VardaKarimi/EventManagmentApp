/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, StyleSheet, TouchableOpacity, Alert, Modal } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { theme } from '../../../core/style/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Show_ticket_detail_style';

var db = openDatabase({ name: 'EventDatabase1.db' });

const ShowTicketDetail = (props, { navigation }) => {
  let [TicketData, setTicketData] = useState([]);
  const [showDelete, setShowDelete] = useState(false)
  let [isDialogVisible, setIsDialogVisible] = useState(false);
  const [count, setCount] = useState(0);
  const [userid, setUserid] = useState();
  const [ticketId, setTicketId] = useState();
  const [ticketPrice, setTicketPrice] = useState();
  const ID = props.ID
  const DATA = props.DATA
  const event = DATA.find(event => event.event_id === ID);
  const time = new Date().toISOString()


  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM table_ticket where event_id=?', [ID], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setTicketData(temp);
      });
    });


  }, []);



  useEffect(() => {
    const getUserData = async () => {
      let user = await AsyncStorage.getItem('userId');
      let userID = JSON.parse(user)
      console.log(ID, '<<<event id>>')
      console.log(event.user_id, '<<user id>>')
      setUserid(userID);

      if (userID === event.user_id) {
        setShowDelete(true)
      }

    };

    getUserData();


  }, []);

  //Delete Ticket query

  function DeleteTicket(id) {
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM table_ticket where ticket_id=?', [id], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setTicketData(temp);
        console.log(TicketData, "<<<<<after Delete>>>>>")

      });
      () => navigation.reset({
        index: 0,
        routes: [{ name: 'showDetails', params: { ID: ID, DATA: DATA } }]

      })
    });

    console.log(ID)
    console.log("working")



  }


  //Ticket Purchase feature  

  function BuyTicket(id) {
    setIsDialogVisible(!isDialogVisible);

    db.transaction((tx) => {
      tx.executeSql('INSERT INTO table_my_ticket (ticket_id,event_id,user_id,time,number_of_tickets) VALUES (?,?,?,?,?)',
        [id, ID, userid, time, count],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            () => navigation.reset({
              index: 0,
              routes: [{ name: 'showDetails', params: { ID: ID, DATA: DATA } }]

            })

          } else Alert.alert('Generation Failed');
        },)
    });

    db.transaction(function (tx) {
      tx.executeSql(
        'UPDATE table_ticket SET max_ticket = max_ticket - ? WHERE ticket_id = ?',
        [count, id],
        (tx, results) => {
          console.log(max_ticket, "max ticket");
          () => navigation.reset({
            index: 0,
            routes: [{ name: 'showDetails', params: { ID: ID, DATA: DATA } }]

          })


        },
      );
    });

  }



  let listViewItemSeparator = () => {
    return (
      <View style={styles.separator} />
    );
  };



  let listItemView = (item) => {

    return (

      <View key={item.ticket_id} style={styles.listItem}>

        <View style={styles.row}>
          <Text style={styles.title}>Ticket Type:</Text>
          <Text style={styles.text}>{item.ticket_type}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Ticket Price: </Text>
          <Text style={styles.text}>{item.ticket_price}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Available Tickets:</Text>
          <Text style={styles.text}>{item.max_ticket}</Text>
        </View>

        <View>
          {showDelete
            ? <View style={{ alignSelf: 'flex-end' }}>
              <TouchableOpacity onPress={() => { DeleteTicket(item.ticket_id) }}
                style={{ ...styles.modalButton, backgroundColor: theme.colors.primary }} >
                <Text style={styles.modalButtonLabel}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
            : <View style={{ alignSelf: 'flex-end' }}>
              {item.max_ticket > 0 && item.ticket_valid_date > new Date().getTime()
                ?
                <TouchableOpacity style={{ ...styles.modalButton, backgroundColor: theme.colors.primary }}
                  onPress={() => { setIsDialogVisible(true), setTicketId(item.ticket_id), setTicketPrice(item.ticket_price) }}>
                  <Text style={styles.modalButtonLabel}>
                    Buy
                  </Text>
                </TouchableOpacity>

                : <TouchableOpacity disabled={true}
                  style={{ ...styles.modalButton, backgroundColor: theme.colors.secondary }}>
                  <Text style={styles.modalButtonLabel}>
                    Buy
                  </Text>
                </TouchableOpacity>}
            </View>
          }
        </View>

        <View>


          <Modal
            animationType="slide"
            transparent={true}
            visible={isDialogVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setIsDialogVisible(!isDialogVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>

                <Text style={styles.modalText}>
                  How many tickets?
                </Text>

                <View style={{ flexDirection: 'column' }}>

                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                    <TouchableOpacity onPress={() => setCount(count - 1)}>
                      <Text style={styles.counterText}>
                        -
                      </Text>
                    </TouchableOpacity>

                    <Text style={styles.countStyle}>
                      {count}
                    </Text>

                    <TouchableOpacity onPress={() => setCount(count + 1)}>
                      <Text style={styles.counterText}>
                        +
                      </Text>
                    </TouchableOpacity>

                  </View>

                  <View style={{ flexDirection: 'row' }}>

                    <Text style={{
                      textAlign: "center",
                      fontSize: 20,
                      fontWeight: "bold",
                      marginEnd: 10
                    }}>
                      Total Price:
                    </Text>

                    <Text style={styles.priceStyle}>
                      {ticketPrice * count}
                    </Text>

                  </View>

                </View>

                <View style={styles.modalButtonLabel}>
                  <TouchableOpacity
                    style={{ ...styles.modalButton, backgroundColor: theme.colors.primary }}
                    onPress={() => { BuyTicket(ticketId) }}>

                    <Text style={styles.modalButtonLabel}>
                      Buy
                    </Text>

                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{ ...styles.modalButton, backgroundColor: theme.colors.secondary }}
                    onPress={() => {
                      setIsDialogVisible(!isDialogVisible);
                    }}>

                    <Text style={styles.modalButtonLabel}>
                      Cancel
                    </Text>

                  </TouchableOpacity>

                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  };



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <FlatList
          data={TicketData}
          ItemSeparatorComponent={listViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => listItemView(item)}
        />
      </View>
    </SafeAreaView>
  );
};




export default ShowTicketDetail;
