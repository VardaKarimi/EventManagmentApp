/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */





// import Eventdata from "../core/constants/EventString";

// export default function Screen3 ()  
// {
//   <Eventdata/>
// }





import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, Image } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'EventDatabase1.db' });

const Screen3 = () => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM table_event ORDER BY event_id DESC', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setFlatListItems(temp);
      });
    });
  }, []);

  let listViewItemSeparator = () => {
    return (
      <View
        style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }}
      />
    );
  };


  const EventInfo = flatListItems.map((item) => ({
        Id: item.event_id,
        Name: item.event_name,
        Date: item.event_date,
        Time: item.event_time,
        Address: item.event_address,
        Description: item.event_description,
      }));





  let listItemView = (item) => {
    return (
      <View
        key={item.event_id}
        style={{ backgroundColor: 'white', padding: 20 }}>
        <Text>Id: {item.event_id}</Text>
        <Text>Name: {item.event_name}</Text>
        <Text>Date: {item.event_date}</Text>
        <Text>Time: {item.event_time}</Text>
        <Text>Address: {item.event_address}</Text>
        <Text>Description: {item.event_description}</Text>
        <Text>Uri: {item.event_image}</Text>
        <Image
          source={{ uri: item.event_image }}
          style={{ width: '100%', height: 200, marginTop: 10 }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={EventInfo}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Screen3;