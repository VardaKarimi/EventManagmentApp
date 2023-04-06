import * as React from 'react';
import {View, Text, Image, TouchableOpacity,Alert} from 'react-native';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import {withNavigation} from 'react-navigation';
import { theme } from '../../../core/style/theme';


  class CustomMaterialMenu extends React.Component {
  constructor(props){
    super(props);
    this.state={
      visible:false,
    };
};
  hideMenu = () =>{
    this.setState({
      visible:false
    });
  };
  
  showMenu = () => {
    this.setState({
      visible:true
    });
  };

 onDelete = () =>{
  // console.log(this.props.eventId);
  this.props.onEventDelete();
 };

 onCreateTicket = () =>{
  this.props.navigateToCreateTicket();
 };

  render(){
  return (
    <View style={{flex:0.2}}>
      <Menu
        visible={this.state.visible}
        anchor= {
          <TouchableOpacity onPress={this.showMenu}>
            <Image
              source={require('../../../assets/dots.png')}
              style={{width: 30, height: 30,position:'absolute',left:20}}
              />
            </TouchableOpacity>
          }
          onRequestClose={this.hideMenu}
        >
          <View style={{backgroundColor:theme.colors.primary}}>
          <MenuItem onPress={() => {Alert.alert('PopUp Menu Edit Clicked...' + this.props.eventId)}} >
            <Text style={{color:'#ffffff',fontSize:20}}>Edit Event</Text>
          </MenuItem>

          <MenuItem onPress={this.onCreateTicket}>
            <Text style={{color:'#ffffff',fontSize:20}}>Add Ticket
            </Text>
            </MenuItem>
          
          <TouchableOpacity >
          <MenuItem onPress={this.onDelete}>
            <Text style={{color:'#ffffff',fontSize:20}}>
            Delete Event
            </Text>
          </MenuItem>
          </TouchableOpacity>
          </View>
        </Menu>
      </View>
    );}
  };
  export default CustomMaterialMenu;
