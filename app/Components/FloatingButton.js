/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Button from './Button'
import { theme } from '../core/style/theme'


const FloatingButton = ({ navigation }) => {
    return (
        <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => navigation.navigate('CreateEvent')}
        >
            <Text style={styles.icon}>+</Text>
        </TouchableOpacity>
    )
}

export default FloatingButton;

const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor:'#FFB100' ,
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    icon: {
        color: '#ffffff',
        fontSize: 30,
    }
});