/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, Image, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { openDatabase } from 'react-native-sqlite-storage';
import { useIsFocused } from '@react-navigation/native';
import moment from "moment";
import { Title } from 'react-native-paper';
import event_detail_styles from '../event_detail/event_detail_style';
import { theme } from '../../core/style/theme';

var db = openDatabase({ name: 'EventDatabase1.db' });

const MyTickets = () => {
    let [flatListItems, setFlatListItems] = useState([]);
    let [userData, setUserData] = useState(null);
    let [id, setId] = useState('');
    const isFocused = useIsFocused();


    useEffect(() => {
        if (isFocused) {
            const getUserData = async () => {
                const user = await AsyncStorage.getItem('user');
                const parsed = JSON.parse(user);
                console.log(parsed);
                setUserData(parsed);
                setId(parsed.id);
                console.log(id, '<<data>>')
            };

            getUserData();
        }
    }, [isFocused]);

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM table_event JOIN table_ticket ON table_event.event_id = table_ticket.event_id JOIN table_my_ticket ON table_ticket.ticket_id = table_my_ticket.ticket_id WHERE table_my_ticket.user_id = ? ORDER BY table_event.event_id DESC',
                [id], (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    setFlatListItems(temp);
                    console.log(flatListItems, '<<<event data>>>')
                });
        });
    }, [id]);

    let listViewItemSeparator = () => {
        return (
            <View
                style={{ height: 1, width: '100%', backgroundColor: theme.colors.primary, marginTop: 20 }}
            />
        );
    };

    let listItemView = (item) => {
        return (
            <View>
                <View
                    key={item.event_id}
                    style={{ backgroundColor: theme.colors.secondary, padding: 20 }}>
                    <Title style={event_detail_styles.TitleStyle}>{item.event_name}</Title>
                    <Image style={event_detail_styles.ImageStyle} source={{ uri: item.event_image }} />
                    <Text style={event_detail_styles.headingStyle}> Date: </Text>
                    <Text style={event_detail_styles.detailStyle}>{moment(item.event_date).format('DD MMM YYYY')}</Text>
                    <Text style={event_detail_styles.headingStyle}> Time: </Text>
                    <Text style={event_detail_styles.detailStyle}>{moment(item.event_time).format('LT')}</Text>
                    <Text style={event_detail_styles.headingStyle}> Location: </Text>
                    <Text style={event_detail_styles.detailStyle}> {item.event_address}</Text>
                    <Text style={event_detail_styles.headingStyle}> About:</Text>
                    <Text style={event_detail_styles.detailStyle}> {item.event_description}</Text>

                </View>
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
                        <Text style={styles.title}>Ticket Purchased: </Text>
                        <Text style={styles.text}>{item.number_of_tickets}</Text>
                    </View>
                </View>
            </View>
        );
    };



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.secondary }}>
            <View style={{ flex: 1, backgroundColor: theme.colors.secondary }}>
                <View style={{ flex: 1, margin: 20 }}>
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

const styles = StyleSheet.create({
    listItem: {
        padding: 10,
        backgroundColor: "#ffffff",
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
    TitleStyle: {
        fontSize: 30,
        fontStyle: 'normal',
        fontWeight: 'bold',
        color: "#000000",
        marginBottom: 15,
        flex: 0.8,
    },
    ImageStyle: {
        borderRadius: 20,
        borderColor: "#000000",
        width: '100%',
        height: 200,
        marginBottom: 10
    },
   

})