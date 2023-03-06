import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const Home = ({ navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Screen 1"
          onPress={() => navigation.navigate('Screen1')}
        />
        <Button
          title="Screen 2"
          onPress={() => navigation.navigate('Screen2')}
        />
        <Button
          title="Screen 3"
          onPress={() => navigation.navigate('Screen3')}
        />
        <Button
          title="Screen 4"
          onPress={() => navigation.navigate('Screen4')}
        />
      </View>
    );
  }
  
  
 
  
 
  
  export default Home ;

 