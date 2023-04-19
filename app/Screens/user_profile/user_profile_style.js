/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import { StyleSheet } from 'react-native';
import { theme } from '../../core/style/theme';
const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 20,
        borderRadius: 10,
        backgroundColor: theme.colors.secondary,
    },
    small: {
        marginLeft: -10,
        flexDirection: 'row',


    },
    btn: {
        backgroundColor: theme.colors.primary,
        width: "60%",
        padding: 5,
        margin: 5,
        borderRadius: 10,
        alignSelf: 'center',
        // borderWidth: 3,
        justifyContent: 'center',
    },
    text: {
        margin: 10,
        fontSize: 20,
        flex: 0.8,

        flexWrap: 'wrap',
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        height: 300,
        justifyContent: 'center',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
    },
    modalInput: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 5,
        marginBottom: 20,
        width: 300,
    },
    modalButton: {
        margin: 10,
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        minWidth: 80,
    },
    modalButtonLabel: {
        flexDirection: 'row',
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",

    },

})

export default styles;