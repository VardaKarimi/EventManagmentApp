/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 20,
        borderRadius: 10,
        backgroundColor: '#D8D8D8',
    },
    small: {
        marginLeft: -18,
        flexDirection: 'row'
    },
    text: {
        margin: 10,
        fontSize: 20,
        color: '#121330'
    },
    profilePic: {

        width: 150,
        height: 150,
        alignSelf: 'center',
        borderRadius: 100,
        marginTop: 20,
        marginBottom: 20,
    },
})

export default styles;