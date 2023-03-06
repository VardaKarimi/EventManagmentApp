import React, {useRef, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {string} from 'yup';
import Strings from '../../constants/Strings';
import styles from './HomeScreenStyle';
import * as yup from 'yup';
import {Formik} from 'formik';
import {ErrorMessage} from 'formik/dist/ErrorMessage';
import {NavigationContainer} from '@react-navigation/native';

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

const HomeScreen = ({navigation}) => {
  console.log(navigation, 'navigation');
//   const [email, setEmail] = useState();
//   const [Password, setPassword] = useState();
//   const [getvalues, setGetValues] = useState('');

//   console.log(getvalues, 'getvalues');

  return (
    <Formik
      validationSchema={loginValidationSchema}
      initialValues={{email: '', password: ''}}
      onSubmit={values => setGetValues(values)}>
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
            <Text style={styles.errorMessage}>
              {errors.email}
            </Text>
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
            <Text style={styles.errorMessage}>
              {errors.password}
            </Text>
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
              navigation.navigate('Detail');
            }}>
            <Text style={styles.loginText}>{Strings.Login}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress ={() => {navigation.navigate('SignIn')}}>
            
            <Text style={styles.signinText}>Signup</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default HomeScreen;
