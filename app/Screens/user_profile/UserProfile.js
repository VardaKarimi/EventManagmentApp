/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfile = ({ navigation }) => {
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

    if (!userData) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View>
            <Text style={styles.text}>First Name: {userData.firstName}</Text>
            <Text style={styles.text}>Last Name: {userData.lastName}</Text>
            <Text style={styles.text}>Email: {userData.email}</Text>
            <Text style={styles.text}>Profilepic: {userData.profilePicUrl}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: '#121330',
    },
})
export default UserProfile;
