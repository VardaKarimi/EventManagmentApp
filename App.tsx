import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import HomeScreen from './app/modules/login/LogIn';
import Navigation from './app/Routes/Navigation';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  return (
    <>
      <Navigation />
    </>
  );
};

export default App;
