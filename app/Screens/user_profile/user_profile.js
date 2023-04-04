/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-paper';
import { theme } from '../../core/style/theme';
import Button from '../../Components/Button';
import styles from './user_profile_style';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


const UserProfile = ({ navigation }) => {
    const [userData, setUserData] = useState(null);

    const googleSignOut = async () => {
        try {
            await AsyncStorage.removeItem('email');
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();

            // eslint-disable-next-line no-catch-shadow, no-shadow
        } catch (error) {
            console.log(error);
        }
        navigation.navigate('LogIn');
        console.log(userData);
    };

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
        <Card style={styles.card}>
            <Card.Cover source={userData.profilePicUrl ? { uri: userData.profilePicUrl } : require('../../assets/user.png')} style={styles.profilePic} />
            <Card.Content>
                <Card >
                    <Card.Content>
                        <View style={styles.small}>
                            <Text style={[styles.text, { fontWeight: 'bold' }]}>First Name:</Text>
                            <Text style={[styles.text, { color: 'blue' }]}>{userData.firstName}</Text>
                        </View>

                        <View style={styles.small}>
                            <Text style={[styles.text, { fontWeight: 'bold' }]}>Last Name:</Text>
                            <Text style={[styles.text, { color: 'blue' }]}>{userData.lastName}</Text>
                        </View>
                        <View style={styles.small}>
                            <Text style={[styles.text, { fontWeight: 'bold' }]}>Email:</Text>
                            <Text style={[styles.text, { color: 'blue' }]}>{userData.email}</Text>
                        </View>
                        <Button onPress={googleSignOut}>
                            <Text style={{ color: 'white' }}>SignOut</Text>
                        </Button>
                    </Card.Content>
                </Card>
            </Card.Content>
        </Card>
    );
};

export default UserProfile;
