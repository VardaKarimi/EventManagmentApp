import React from 'react';
import * as yup from 'yup';
import {Formik} from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Global from '../../core/constants/Global';
import TextInput from '../../Components/TextInput';
import Background from '../../Components/Background';
import Logo from '../../Components/Logo';
import Header from '../../Components/Header';
import BackButton from '../../Components/BackButton';
import Button from '../../Components/Button';
import staticData from '../../core/constants/StaticData';
// import SharedPreferences from 'react-native-shared-preferences';
import Logo2 from '../../Components/Logo2';
import { useState } from 'react';
import Strings from '../../core/constants/Strings';
import styles from './LogInStyle';
// import { View } from 'react-native/Libraries/Components/View/View';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View} from 'react-native';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    ),
});
const LogInScreen = ({navigation}) => {
  // console.log(navigation, 'navigation');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = values => {
    console.log(staticData.userData);
    const emailExists = staticData.userData.some(
      user => user.email === values.email,
    );
    if (emailExists) {
      AsyncStorage.setItem('email', values.email);
      navigation.navigate('Screen1');
    } else {
      setError('Invalid Email');
    }
  };
  // const [loading, setLoading] = useState();
  // console.log(email, '<<<<email');
  // console.log(password, '<<<<password');  git branch --set-upstream-to=origin/master dev-varda
  // const handleLogin = () => {
  //   // validate email and password
  //   if (email && password) {
  //     // pass email and password as parameters to SplashScreen
  //     Global.setGlobalEmail(email);
  //     console.log(email);
  //     navigation.navigate('SplashScreen', {email, password});
  //   }
  // };
  return (
    <Formik
      validationSchema={loginValidationSchema}
      initialValues={{email: '', password: ''}}
      onSubmit={handleSubmit}
      // setEmail(values.email);
      // setPassword(values.password);
      // Global.sampleVar = values.email;
      // console.log(Global.sampleVar);
      // // console.log(email);
      // // console.log(password);
      // Global.setGlobalEmail(values.email);
      // try {
      //   await AsyncStorage.setItem('email', values.email);
      //   await AsyncStorage.setItem('password', values.password);
      // } catch (error) {
      //   console.log(error);
      // }
      // navigation.navigate('SplashScreen');
    >
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <Background>
          <Logo2 />
          <Header>Welcome back.</Header>
          {/* <Text style={styles.logo}>{Strings.Title}</Text> */}
          <TextInput
            placeholder={Strings.Email}
            placeholderTextColor="#003f5c"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
          />
          {errors.email && (
            <Text style={styles.errorMessage}>{errors.email}</Text>
          )}
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder={Strings.Password}
            placeholderTextColor="#003f5c"
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
          />
          {errors.password && (
            <Text style={styles.errorMessage}>{errors.password}</Text>
          )}
          <View style={styles.forgotPassword}>
            <TouchableOpacity>
              <Text style={styles.forgot}>{Strings.Forgot_Password}</Text>
            </TouchableOpacity>
          </View>
          <Button
            mode="contained"
            // disabled={
            //   !errors.email &&
            //   !errors.password &&
            //   values.email &&
            //   values.password
            //     ? false
            //     : true
            // }
            onPress={() => {
              handleSubmit();
              // handleLogin();
              // LogInScreen.email = values.email;
              // LogInScreen.password = values.password;
              // console.log(LogInScreen.email);
              // console.log(LogInScreen.password);
              // navigation.navigate('Home');
            }}>
            LogIn
          </Button>
          {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignIn');
              }}>
              <Text style={styles.link}>Signup</Text>
            </TouchableOpacity>
          </View>
        </Background>
      )}
    </Formik>
  );
};
export default LogInScreen;

