import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, Image, StyleSheet } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { theme } from '../../../core/style/theme';

var db = openDatabase({ name: 'EventDatabase1.db' });

const ShowTicketDetail = (props) => {
  let [TicketData, setTicketData] = useState([]);
  const eventId = props.eventId

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM table_ticket where event_id=?', [eventId], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setTicketData(temp);
      });
    });
  }, []);

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
    marginTop:20
  },
  innerContainer: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.primary,
    marginTop: 10,
    marginBottom: 10,
  },
  listItem: {
    padding: 10,
    backgroundColor: theme.colors.secondary,
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    color: '#000000',
    fontWeight: '500',
    marginRight: 5,
  },
  text: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'justify',
  },
});

export default ShowTicketDetail;
