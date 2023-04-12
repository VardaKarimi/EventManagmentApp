// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Custom TextInput

import React from 'react';
import { View, TextInput } from 'react-native';
import { theme } from '../core/style/theme';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native';



const Mytextinput = (props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 35,
        marginRight: 35,
        marginTop: 10,
        borderColor: theme.colors.primary,
        borderWidth: 1,
      }}>
      <TouchableOpacity style={{ margin: 10 }} onPress={props.handleIconPress}>
        <Ionicons name={props.iconName} size={24} color="gray" />
      </TouchableOpacity>
      <TextInput
        underlineColorAndroid="transparent"
        placeholder={props.placeholder}
        placeholderTextColor="#000000"
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        returnKeyType={props.returnKeyType}
        numberOfLines={props.numberOfLines}
        multiline={props.multiline}
        onSubmitEditing={props.onSubmitEditing}
        style={props.style}
        blurOnSubmit={false}
        value={props.value}
      />
    </View>
  );
};

export default Mytextinput;
