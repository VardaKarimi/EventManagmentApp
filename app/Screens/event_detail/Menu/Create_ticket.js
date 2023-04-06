import React, { useState } from "react";
import { View, Text } from "react-native";
import { StyleSheet } from 'react-native';
import { TextInput } from "react-native";
import DatePicker from "react-native-date-picker";
import { TouchableOpacity } from "react-native";
import { Image } from 'react-native'
import { theme } from "../../../core/style/theme";




function CreateTicket(){

    const[date,setDate] = useState(new Date())
    const[shouldShow,setShouldShow] = useState(false)


    return(
        <View style={CreateTicket_styles.mainContainer}>
            <View style={CreateTicket_styles.ViewStyle}>
              <Text style={CreateTicket_styles.TextStyle}> Type of Ticket: </Text>
              <TextInput placeholder="EX. Silver,Gold,Platinum" style={CreateTicket_styles.TextInputStyle}/>
            </View>

            <View style={CreateTicket_styles.ViewStyle}>
              <Text style={CreateTicket_styles.TextStyle}> Enter price: </Text>
              <TextInput placeholder="In Rs." style={CreateTicket_styles.TextInputStyle} keyboardType='numeric'/>
            </View>

            <View style={CreateTicket_styles.ViewStyle}>
              <Text style={CreateTicket_styles.TextStyle}> Valid upto:</Text>
              <TouchableOpacity onPress={()=>setShouldShow(!shouldShow)}>
                <Image source={require('../../../assets/calendar.png')} style={{width:30,height:30}}/>
              </TouchableOpacity>
              
              <View>
              {shouldShow
              ?
              (
              <DatePicker style={{width:250,height:200}} date={date} onDateChange={setDate} />
              )
              :
              null}
              </View>
              <Text>{date.toLocaleString()}</Text>
            </View>
            
        </View>
    )
}
const CreateTicket_styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:theme.colors.secondary
    },
    ViewStyle:{
        flexDirection:'row',
        alignItems:'center'

    },
    TextStyle:{
        padding:5,
        margin:5,
        fontSize:20,
        color:'#000000',
        backgroundColor:theme.colors.primary,
        borderRadius:15

    },
    TextInputStyle:{
        padding:5,
        borderWidth:1,
        borderColor:'#000000',
        margin:5,
        fontSize:15
    },
    datePickerStyle: {
        width: 200,
        marginTop: 20,
      },
})
export default CreateTicket;