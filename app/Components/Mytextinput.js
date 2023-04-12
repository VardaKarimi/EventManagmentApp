// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Custom TextInput

import React from 'react';
import {View, TextInput,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const Mytextinput = (props) => {
  return (
    <View
      style={{
        flexDirection:'row',
        alignItems:"center",
        marginLeft: 35,
        marginRight: 35,
        marginTop: 10,
        borderColor: '#007FFF',
        borderWidth: 1,
      }}>
       <TouchableOpacity style={{margin:10}} onPress={props.handleIconPress}>
          <Icon name={props.iconName} size={24} color="gray" />
        </TouchableOpacity>
      <TextInput
      
        underlineColorAndroid="transparent"
        placeholder={props.placeholder}
        placeholderTextColor="#007FFF"
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
