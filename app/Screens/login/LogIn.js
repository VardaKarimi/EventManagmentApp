/* eslint-disable no-sequences */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import React, {useState, useEffect } from 'react';
import { TouchableOpacity, BackHandler, Alert } from 'react-native';
import { Text } from 'react-native-paper';
import styles from './login_style';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from '../../Components/Background';
import Header from '../../Components/Header';
import { openDatabase } from 'react-native-sqlite-storage';
import Logo2 from '../../Components/Logo2';
import { createTableUserDetails, createTableEvent, createTableFavouriteEvent, createTableMyTicket, createTableTicket } from '../../Database/database';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

var db = openDatabase({ name: 'EventDatabase1.db' });


const LogInScreen = ({ navigation }) => {
  const [error, setError] = useState('');

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure to exit ?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  //table_event creation
  useEffect(() => {

    createTableEvent(db);
    createTableUserDetails(db);
    createTableFavouriteEvent(db);
    createTableMyTicket(db);
    createTableTicket(db);

  }, []);




  useEffect(() => {
    GoogleSignin.configure();


  }, []);

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info', userInfo);

      const user = {
        id: userInfo.user.id,
        firstName: userInfo.user.givenName,
        lastName: userInfo.user.familyName,
        email: userInfo.user.email,
        profilePicUrl: userInfo.user.photo,
      };

      // Object.assign(userModel, user);
      console.log(user);
      AsyncStorage.setItem('user', JSON.stringify(user));
      AsyncStorage.setItem('userId', JSON.stringify(user.id));
      AsyncStorage.setItem('email', JSON.stringify(user.email));


      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO user_details(user_id, first_name, last_name, email_id, profilr_url,contact_number) VALUES (?,?,?,?,?,?)',
          [user.id, user.firstName, user.lastName, user.email, user.profilePicUrl],
          (tx, results) => {
            console.log('User Results', results.rowsAffected);
          },
        );
      });
      navigation.navigate('Drawer');

    }



    // eslint-disable-next-line no-catch-shadow, no-shadow
    catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error);
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {

        // play services not available or outdated
      } else {
        console.log(error);
        // some other error happened
      }
    }
  };

  const googleSignOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // eslint-disable-next-line no-catch-shadow, no-shadow
    } catch (error) {
      console.log(error);
    }
  };

 
  return (
    <Formik
    
  
    >
      
        <Background>
          <Logo2 />
          <Header>Welcome back.</Header>

        

          {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
          <TouchableOpacity style={styles.btn} onPress={googleLogin}>
            <Text style={{ color: 'white', padding: 10, alignSelf: 'center', fontWeight: 'bold' }}>SignIn With Google</Text>
          </TouchableOpacity>
        </Background>
      
    </Formik>
  );
};

export default LogInScreen;
