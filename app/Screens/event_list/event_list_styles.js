/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import Background from '../../Components/Background';
import { theme } from '../../core/style/theme';

const styles = StyleSheet.create({
  ItemView: {
    fontSize: 20,
    textAlign: 'center',
  },
  searchBar: {
    borderColor: "#00235B",
    borderWidth: 1,
    margin: 10,
    fontSize: 15,
    padding: 10,
    backgroundColor: theme.colors.secondary,
    borderRadius: 10

  },
  fabStyle: {
  },
  TitleStyle: {
    fontSize: 30,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: "#000000"
  },
  DescriptionStyle: {
    color: "#000000",
    fontSize: 20,
    marginLeft:5
  }
})

export default styles;