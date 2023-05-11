import { StyleSheet } from 'react-native';
import { theme } from '../../core/style/theme';

const styles = StyleSheet.create({
    datePickerStyle: {
      width: 200,
      marginTop: 20,
    },
    btn: {
      backgroundColor: theme.colors.primary,
      width: "50%",
      height: 50,
      padding: 5,
      margin: 10,
      borderRadius: 10,
      alignSelf: 'center',
      // borderWidth: 3,
      justifyContent: 'center',
    },
    ImageStyle: {
      width: 200, alignSelf: 'center', height: 200, marginTop: 20
    },
    btnTextStyle: {
      color: 'white', padding: 10, alignSelf: 'center', fontWeight: 'bold'
    }
  });

  export default styles;