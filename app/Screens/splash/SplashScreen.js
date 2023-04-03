import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../../core/style/theme';
import Background from '../../Components/Background';
import Logo2 from '../../Components/Logo2';

const SplashScreen = ({navigation}) => {
    // console.log(Global.setGlobalEmail());
    useEffect(() => {
      setTimeout(() => {
        // navigation.navigate('LogIn');
        // const email = Global.sampleVar;
        AsyncStorage.getItem('email').then(email => {
          console.log(email, '<<<!!!EMail!!!>>>>');
          if (email == null) {
            navigation.navigate('LogIn');
          } else {
            navigation.navigate('Screen1');
          }
        });
      }, 2000);
    });
    return (
      <Background>
        <Logo2 />
        {/* <Text style={styles.link}> Event Management Application</Text> */}
      </Background>
    );
  };
  export default SplashScreen;
  const styles = StyleSheet.create({
    image: {
      height: 200,
      width: 200,
    },
    link: {
      fontWeight: 'bold',
      fontFamily: 'Arial Black',
      color: theme.colors.primary,
    },
  });