import React, { useState } from 'react';
import Eventdata from '../constants/EventString';
import {
    Text,
    View,
    TouchableOpacity,
    Alert,
} from 'react-native';
import Navigation from '../Routes/Navigation';

function Deleteevent() {
    

    //delete function
    const Delete = ()=> {

    //     const[Eventdata,setEventdata] = useState(Eventdata);
    //   // Filter the event data array to remove the event with the specified ID
    //         const updatedEventData = Eventdata.filter((event) => event.id !== eventId);
    //         setEventdata(updatedEventData);

    //         return Delete(Eventdata.id);

            Alert.alert("Deleted")

      };
    
      return Delete
    

}

export default Deleteevent;