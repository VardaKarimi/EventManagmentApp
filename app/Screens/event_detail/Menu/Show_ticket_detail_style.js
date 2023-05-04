/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { theme } from '../../../core/style/theme';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.secondary,
      marginTop: 20
    },
    innerContainer: {
      flex: 1,
    },
    separator: {
      height: 1,
      backgroundColor: theme.colors.primary,
      marginTop: 10,
      marginBottom: 10,
    },
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
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    counterText:{
        fontSize: 20, borderColor: '#000000', borderWidth: 0.5, padding: 5, margin: 10, backgroundColor: theme.colors.primary, color: '#ffffff', fontWeight: 'bold'
    },
    countStyle:{
    fontSize: 20, borderColor: theme.colors.primary, borderWidth: 1, padding: 5, margin: 10
    },
    priceStyle:{
        borderColor: theme.colors.primary, fontSize: 30, width: 100, height: 35, borderWidth: 1, alignSelf: 'center', textAlign: 'center'
    }
  });


  export default styles;