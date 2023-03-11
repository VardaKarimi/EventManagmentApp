import React, {useRef, useState, useEffect} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import Strings from '../../constants/Strings';
import styles from './LogInStyle';
import * as yup from 'yup';
import {Formik} from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Global from '../../constants/Global';

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
  console.log(navigation, 'navigation');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // console.log(email, '<<<<email');
  // console.log(password, '<<<<password');

  const handleLogin = () => {
    // validate email and password
    if (email && password) {
      // pass email and password as parameters to SplashScreen
      Global.setGlobalEmail(email);
      console.log(email);
      navigation.navigate('SplashScreen', {email, password});
    }
  };
  return (
    <Formik
      validationSchema={loginValidationSchema}
      initialValues={{email: '', password: ''}}
      onSubmit={async values => {
        setEmail(values.email);
        setPassword(values.password);
        // console.log(email);
        // console.log(password);
        // try {
        //   await AsyncStorage.setItem('email', values.email);
        //   await AsyncStorage.setItem('password', values.password);
        // } catch (error) {
        //   console.log(error);
        // }
        navigation.navigate('Home');
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors}) => (
        <View style={styles.container}>
          <Text style={styles.logo}>{Strings.Title}</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder={Strings.Email}
              placeholderTextColor="#003f5c"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
          </View>
          {errors.email && (
            <Text style={styles.errorMessage}>{errors.email}</Text>
          )}
          <View style={styles.inputView}>
            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder={Strings.Password}
              placeholderTextColor="#003f5c"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
            />
          </View>
          {errors.password && (
            <Text style={styles.errorMessage}>{errors.password}</Text>
          )}
          <TouchableOpacity>
            <Text style={styles.forgot}>{Strings.Forgot_Password}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={
              !errors.email &&
              !errors.password &&
              values.email &&
              values.password
                ? false
                : true
            }
            style={styles.loginBtn}
            onPress={() => {
              handleSubmit();
              handleLogin();
              // LogInScreen.email = values.email;
              // LogInScreen.password = values.password;
              // console.log(LogInScreen.email);
              // console.log(LogInScreen.password);
              // navigation.navigate('Home');
            }}>
            <Text style={styles.loginText}>{Strings.Login}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignIn');
            }}>
            <Text style={styles.signinText}>Signup</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default LogInScreen;
