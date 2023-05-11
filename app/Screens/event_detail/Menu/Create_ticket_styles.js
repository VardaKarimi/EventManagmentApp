/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { theme } from '../../../core/style/theme';

const CreateTicket_styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: theme.colors.secondary
    },
    ViewStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
  
    },
    TextStyle: {
      padding: 5,
      margin: 5,
      fontSize: 20,
      color: '#ffffff',
      backgroundColor: theme.colors.primary,
      borderRadius: 15
  
    },
    TextInputStyle: {
      padding: 10,
      width: 300,
      fontSize: 15,
      marginTop: 10,
  
    },
    btn: {
      borderWidth: 1, justifyContent: 'center',
      alignSelf: 'center',
      fontSize: 20,
      backgroundColor: theme.colors.primary,
      color: '#ffffff',
      padding: 10,
      margin: 10
  
    },
    counterTextStyle: {
      fontSize: 20, borderColor: theme.colors.primary, borderWidth: 1, padding: 5, margin: 10
  
    },
  })

  export default CreateTicket_styles;