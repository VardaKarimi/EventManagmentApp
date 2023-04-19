/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import React from 'react';
import { theme } from '../../core/style/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#E7D600',
    alignItems: 'center',
    justifyContent: 'center',
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
  logo: {
    fontWeight: 'bold',
    fontSize: 40,
    color: '#000000',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  // loginBtn: {
  //   width: '80%',
  //   backgroundColor: 'blue',
  //   borderRadius: 25,
  //   height: 50,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginTop: 40,
  //   marginBottom: 10,
  // },
  loginText: {
    color: 'white',
  },

  signinText: {
    color: 'blue',
  },
  loginButton: {
    width: '80%',
    backgroundColor: 'lightblue',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  errorMessage: {
    fontSize: 15,
    color: 'red',
    bottom: 10,
  },
});

export default styles;
