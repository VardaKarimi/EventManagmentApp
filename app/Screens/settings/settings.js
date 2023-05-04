/* eslint-disable prettier/prettier */
import { StyleSheet, Text, Switch, View } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { theme } from '../../core/style/theme';


const Settings = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <View style={styles.card}>
            <Text style={styles.label}>Dark Theme</Text>
            <Switch
                trackColor={{ false: '#767577', true: theme.colors.primary }}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{ marginTop: -25 }}
            />
        </View>
    );
};

export default Settings;

const styles = StyleSheet.create({
    card: {
        margin: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    label: {
        color: theme.colors.primary,
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
});