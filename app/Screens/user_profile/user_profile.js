/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, Image, BackHandler, Modal, TextInput, TouchableOpacity, Alert, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-paper';
import { theme } from '../../core/style/theme';
// import Button from '../../Components/Button';
import styles from './user_profile_style';
import { useIsFocused } from '@react-navigation/native';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'EventDatabase1.db' });

const UserProfile = ({ navigation }) => {
    const isFocused = useIsFocused();
    let [userData, setUserData] = useState(null);
    let [id, setId] = useState('');
    let [isDialogVisible, setIsDialogVisible] = useState(false);
    let [contactNumber, setContactNumber] = useState();
    let [contact, setContact] = useState('');
    let [isContactSaved, setIsContactSaved] = useState(false);


    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack();
            return true;
        });
        return () => {
            backHandler.remove();
        };
    }, []);
    const googleSignOut = async () => {
        try {
            await AsyncStorage.removeItem('email');
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            // eslint-disable-next-line no-catch-shadow, no-shadow
        } catch (error) {
            console.log(error);
        }
        navigation.reset({
            index: 0,
            routes: [{ name: 'LogIn' }],
        });
        console.log(userData);
    };


    useEffect(() => {
        const getUserData = async () => {
            let user = await AsyncStorage.getItem('user');
            let parsed = JSON.parse(user);
            console.log(parsed);
            setUserData(parsed);
            setId(parsed.id);
        };

        getUserData();
    }, []);




    useEffect(() => {
        db.transaction(function (tx) {
            tx.executeSql(
                'SELECT contact_number FROM user_details WHERE user_id = ?',
                [id],
                (tx, results) => {
                    if (results.rows.length > 0) {
                        let contact = results.rows.item(0).contact_number;
                        console.log(contact);
                        console.log(id);
                        setContact(contact);
                        console.log('dhirav');
                        if (contact === null) {
                            setIsContactSaved(false);
                        } else {
                            setIsContactSaved(true);
                        }
                        //setIsContactSaved(true);
                        console.log(id, '<<<<db id>>>>');
                    }
                },
            );
        });
    }, [id]);


    const addContactNumber = () => {
        console.log(userData.id);
        console.log("contact:", contactNumber);
        db.transaction(function (tx) {
            tx.executeSql(
                'UPDATE user_details SET contact_number = ? WHERE user_id = ?',
                [contactNumber, userData.id],
                (tx, results) => {
                    console.log(contactNumber);
                    console.log('User Results', results.rowsAffected);
                    setIsContactSaved(true);
                },
            );
        });
    }


    if (!userData) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <Card style={styles.card}>
            <Card.Cover source={userData.profilePicUrl ? { uri: userData.profilePicUrl } : require('../../assets/user.png')} style={styles.profilePic} />
            <Card.Content>
                <Card >
                    <Card.Content>
                        <View style={styles.small}>
                            <Text style={[styles.text, { fontWeight: 'bold' }]}>First Name:</Text>
                            <Text style={[styles.text, { color: theme.colors.primary }]}>{userData.firstName}</Text>
                        </View>

                        <View style={styles.small}>
                            <Text style={[styles.text, { fontWeight: 'bold' }]}>Last Name:</Text>
                            <Text style={[styles.text, { color: theme.colors.primary }]}>{userData.lastName}</Text>
                        </View>
                        <View style={styles.small}>
                            <Text style={[styles.text, { fontWeight: 'bold' }]}>Email:</Text>
                            <Text style={[styles.text, { color: theme.colors.primary }]}>{userData.email}</Text>
                        </View>
                        <View style={styles.small}>
                            <Text style={[styles.text, { fontWeight: 'bold' }]}>Contact No:</Text>
                            <Text style={[styles.text, { color: theme.colors.primary }]}>{contact}</Text>
                        </View>
                        <TouchableOpacity style={styles.btn} onPress={() => setIsDialogVisible(true)}>
                            <View style={{ flexDirection: 'row', alignSelf: 'center', padding: 5 }}>

                                {isContactSaved ? <Image source={require('../../assets/pen.png')} style={styles.icon} /> : null}

                                <Text style={{ color: 'white', padding: 10, fontWeight: 'bold' }}>{isContactSaved ? 'Edit Contact' : 'Add Contact'}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={googleSignOut} >
                            <Text style={{ color: 'white', padding: 10, alignSelf: 'center', fontWeight: 'bold' }}>Sign Out</Text>
                        </TouchableOpacity>

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

                                    <Text style={styles.modalText}>{isContactSaved ? 'Edit Contact' : 'Add Contact Number'}</Text>
                                    <TextInput
                                        style={styles.modalInput}
                                        keyboardType="numeric"
                                        placeholder="Enter your phone number"
                                        onChangeText={(contactNumber) => setContactNumber(contactNumber)}
                                        value={contactNumber}
                                    />

                                    <View style={styles.modalButtonLabel}>
                                        <TouchableOpacity
                                            style={{ ...styles.modalButton, backgroundColor: theme.colors.primary }}
                                            onPress={() => {

                                                setIsDialogVisible(!isDialogVisible);
                                                addContactNumber();
                                                navigation.reset({
                                                    index: 0,
                                                    routes: [{ name: 'My Profile' }],
                                                });

                                            }}>
                                            <Text style={styles.modalButtonLabel}>Save</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={{ ...styles.modalButton, backgroundColor: theme.colors.secondary }}
                                            onPress={() => {
                                                setIsDialogVisible(!isDialogVisible);
                                                setContactNumber('');
                                            }}>
                                            <Text style={styles.modalButtonLabel}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </Card.Content>
                </Card>
            </Card.Content>
        </Card>

    );
};

export default UserProfile;

