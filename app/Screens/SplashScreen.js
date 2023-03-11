import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Image} from 'react-native/Libraries/Image/Image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userData} from '../constants/StaticData';
import LogInScreen from '../modules/login/LogIn';
import email from '../modules/login/LogIn';
import Global from '../constants/Global';

console.log(email, '<<<log is created');
const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('LogIn');
      const email = Global.getGlobalEmail();
      console.log(email, '<<<!!!EMail!!!>>>>');
    }, 5000);
  });

  return (
    <View>
      <Text>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 200,
  },
});
