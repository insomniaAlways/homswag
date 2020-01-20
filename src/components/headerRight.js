import React from "react";
import { View, TouchableOpacity } from 'react-native';
import { EvilIcons, FontAwesome } from '@expo/vector-icons';
import CartButton from './cartButton';

const HeaderRightView = function (props) {
  return (
    <View style={{flexDirection: 'row', flexDirection: 'row', justifyContent: 'space-around', width: 120, alignItems: 'center', paddingRight: 10}}>
      <EvilIcons name="search" size={40} color="#fff"/>
      <CartButton navigation={props.navigation}/>
      <TouchableOpacity style={{width: 20, alignItems: 'center'}} onPress={() => props.navigation.toggleDrawer()}>
        <FontAwesome name="ellipsis-v" size={25} color="#fff"/>
      </TouchableOpacity>
    </View>
  )
}

export default HeaderRightView;