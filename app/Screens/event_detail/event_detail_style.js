import { StyleSheet } from 'react-native';


const event_detail_styles = StyleSheet.create({
    TitleStyle:{
      fontSize:30,
      fontStyle:'normal',
      fontWeight:'bold',
      color:"#000000",
      marginBottom:15,
      flex:0.8,
    },
    ImageStyle:{
      borderRadius:20,
      borderColor:"#000000",
      width: '100%', 
      height: 200, 
      marginBottom: 10
    },
    headingStyle:{
      fontSize: 20, color: "#000000", fontWeight: 500
    },
    detailStyle:{
      fontSize: 16, color: "#000000", marginLeft: 5, textAlign: 'justify'
    }
   
  })
  export default event_detail_styles;