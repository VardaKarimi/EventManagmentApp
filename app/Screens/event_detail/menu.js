import * as React from 'react';
import {useState} from 'react';
import {View, Text, Image, TouchableOpacity,Alert} from 'react-native';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import Eventdata from '../../core/constants/EventString';
//HandelDelete
  
// const handleDelete = (EId) => {
//   const [eventData, setEventData] = useState(Eventdata);
//   const updatedEventData = eventData.filter((events) => events.id === EId);
//   setEventData(updatedEventData);
//   Alert.alert('Event Deleted');
// }
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
  console.log(this.props.eventId);
  this.props.onEventDelete();
 };
  render(){
  return (
    <View>
      <Menu
        visible={this.state.visible}
        anchor= {
          <TouchableOpacity onPress={this.showMenu}>
            <Image
              source={require('../../assets/menuicon.png')}
              style={{width: 30, height: 30}}
              />
            </TouchableOpacity>
          }
          onRequestClose={this.hideMenu}
        >
          <MenuItem onPress={() => {Alert.alert('PopUp Menu Edit Clicked...' + this.props.eventId)}}>
            Edit
          </MenuItem>
          <MenuItem disabled>Disabled Menu Item 2</MenuItem>
          <MenuDivider />
          <TouchableOpacity >
          <MenuItem onPress={this.onDelete}>
            Delete
          </MenuItem>
          </TouchableOpacity>
        </Menu>
      </View>
    );}
  };
  export default CustomMaterialMenu;