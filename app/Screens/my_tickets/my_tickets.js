/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, Image, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'EventDatabase1.db' });

const MyTickets = () => {
    let [flatListItems, setFlatListItems] = useState([]);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            let user = await AsyncStorage.getItem('user');
            console.log(user);
            let parsed = JSON.parse(user);
            setUserData(parsed);
        };

        getUserData();
    }, []);

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM table_ticket,table_event as te JOIN table_event ON table_ticket.event_id = table_event.event_id WHERE table_ticket.event_id = ?',
                [userData.id], (tx, results) => {
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
                        data={flatListItems}
                        ItemSeparatorComponent={listViewItemSeparator}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => listItemView(item)}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default MyTickets

const styles = StyleSheet.create({})