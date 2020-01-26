import React from "react";
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { EvilIcons, FontAwesome } from '@expo/vector-icons';
import CartButton from './cartButton';
import DefaultStyles from '../style/customStyles';

const HeaderRightView = function (props) {
  return (
    <View style={[styles.container, DefaultStyles.brandBackgroundColor]}>
      <EvilIcons name="search" size={40} color="#fff"/>
      <CartButton navigation={props.navigation}/>
      <TouchableOpacity style={{width: 20, alignItems: 'center'}} onPress={() => props.navigation.toggleDrawer()}>
        <FontAwesome name="ellipsis-v" size={25} color="#fff"/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 120,
    alignItems: 'center',
    paddingRight: 10,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  }
})

export default HeaderRightView;