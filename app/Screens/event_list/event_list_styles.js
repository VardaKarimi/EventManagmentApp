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
    marginLeft: 17,
    fontSize: 15,
    padding: 10,
    width: 320,
    backgroundColor: theme.colors.secondary,
    borderRadius: 10

  },
  serchView: {
    flexDirection: 'row'
  },
  filterImage: {
    width: 40,
    height: 40,
    marginTop: 15,
  },
  favBtn: {
    width: 35,
    height: 35
  },
  filterBtn: {
    fontSize: 15,
    marginBottom: 15,

    color: theme.colors.primary,
    fontWeight: 'bold',
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
    marginLeft: 5
  },
  modalContainer: {
    //position: "absolute",
    left: 140,
    zIndex: 1,
    width: '90%',
    alignItems: 'center',
  },
  modalContent: {
    margin: 20,
    height: 160,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowRadius: 6,
    elevation: 6,
  },
})

export default styles;