/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import React, { useRef, useState, useEffect } from 'react';
import { TouchableOpacity, View, BackHandler, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import styles from './login_style';
import * as yup from 'yup';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from '../../Components/Background';
import Header from '../../Components/Header';
import Button from '../../Components/Button';
import staticData from '../../core/constants/StaticData';
import Logo2 from '../../Components/Logo2';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    ),
});

const LogInScreen = ({ navigation }) => {
  // console.log(navigation, 'navigation');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
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


  useEffect(() => {
    GoogleSignin.configure();


  }, []);

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info', userInfo);

      const user = {
        firstName: userInfo.user.givenName,
        lastName: userInfo.user.familyName,
        email: userInfo.user.email,
        profilePicUrl: userInfo.user.photo,
      };

      // Object.assign(userModel, user);
      console.log(user);
      AsyncStorage.setItem('user', JSON.stringify(user));
      AsyncStorage.setItem('email', JSON.stringify(user.email));
      navigation.navigate('EventList');
      // eslint-disable-next-line no-catch-shadow, no-shadow
    } catch (error) {
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

  const handleSubmit = values => {
    console.log(staticData.userData);
    const emailExists = staticData.userData.some(
      user => user.email === values.email,
    );

    // if (emailExists) {
    //   AsyncStorage.setItem('email', values.email);
    //   Global.setGlobalEmail(values.email);
    //   navigation.navigate('Home');
    // } else {
    //   setError('Invalid Email');
    // }
  };
  // const [loading, setLoading] = useState();
  // console.log(email, '<<<<email');
  // console.log(password, '<<<<password');

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
      initialValues={{ email: '', password: '' }}
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
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <Background>
          <Logo2 />
          <Header>Welcome back.</Header>

          {/* <TextInput
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
          )} */}

          {/* <View style={styles.forgotPassword}>
            <TouchableOpacity>
              <Text style={styles.forgot}>{Strings.Forgot_Password}</Text>
            </TouchableOpacity>
          </View> */}

          {/* <Button
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
          </Button> */}

          {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
          <Button onPress={googleLogin}>
            <Text style={styles.loginText}>SignIn With Google</Text>
          </Button>
        </Background>
      )}
    </Formik>
  );
};

export default LogInScreen;
