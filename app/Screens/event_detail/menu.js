import * as React from 'react';
import {View, Text, Image, TouchableOpacity,Alert} from 'react-native';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';

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

 onEdit = () => {
  this.props.onEventEdit();
};



  render(){
  return (
    <View>
      <Menu
        visible={this.state.visible}
        anchor= {
          <TouchableOpacity onPress={this.showMenu}>
            <Image
              source={require('../../assets/dots.png')}
              style={{width: 30, height: 30}}
              />
            </TouchableOpacity>
          }
          onRequestClose={this.hideMenu}
        >
          <MenuItem onPress={this.onEdit}>
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
