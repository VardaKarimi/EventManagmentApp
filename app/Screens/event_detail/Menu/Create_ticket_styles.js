/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { theme } from '../../../core/style/theme';

const CreateTicket_styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.colors.secondary
  },
  ViewStyle: {
    marginTop: 10,
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
  TextInputStyle2: {
    padding: 10,
    width: 278,
    fontSize: 15,
    marginTop: 10,

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
  btnTextStyle: {
    color: 'white', padding: 10, alignSelf: 'center', fontWeight: 'bold'
  },
  countStyle: {
    fontSize: 20, borderColor: theme.colors.primary, borderWidth: 1, padding: 5, margin: 10, fontWeight: 'bold'
  },
  counterTextStyleForCount: {
    fontSize: 20, borderColor: '#000000', borderWidth: 0.5, margin: 10, backgroundColor: theme.colors.primary, color: '#ffffff', fontWeight: 'bold'
  },
})

export default CreateTicket_styles;