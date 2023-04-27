/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { Card } from 'react-native-paper';
import styles from './about_app_styles';
import { theme } from '../../core/style/theme';

const AboutApp = () => {
    return (
        <Card style={styles.card}>
            <Text style={{ fontSize: 30, alignSelf: 'center', color: theme.colors.primary, fontWeight: 800 }}>About App</Text>
            <Text style={styles.text}>- Eventify is an event registration and ticket purchasing app that allows users to easily create, browse, and purchase tickets for events.</Text>

            <Text style={styles.text}>- With Eventify, users can create and manage their own events by providing event details such as event poster, time, date, location, and description.</Text>
            <Text style={styles.text}>- Users can also search for events by name and location, and view events by category. In addition, users can add events to their favorites list and filter events by all events and their favorite events.</Text>
            <Text style={styles.text}>- With a simple and user-friendly interface, Eventify makes it easy for users to discover and attend the events they love.</Text>
        </Card>
    )
}

export default AboutApp
