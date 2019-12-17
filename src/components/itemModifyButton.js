import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchCartItems, addItemToCart, updateItem, deleteItem } from '../../store/actions/cartItemAction';

function ModifyButton(props) {
  const { item, cart, cartItems } = props
  let cartItem = _.find(cartItems, ['item_id', item.id])
  
  const addItem = () => {
    if(!_.isNil(cartItem)) {
      let quantity = (+cartItem.quantity + 1)
      let totalPrice = (+item.price * (+cartItem.quantity + 1))
      props.updateCartItem(cartItem, quantity, totalPrice)
    } else {
      props.addItemToCart(item, 1, (+item.price * 1), length+1)
    }
    props.getCartItem()
  }

  const removeItem = () => {
    if(cartItem.quantity > 1) {
      let quantity = (+cartItem.quantity - 1)
      let totalPrice = (+item.price * quantity)
      props.updateCartItem(cartItem, quantity, totalPrice)
    } else {
      props.deleteCartItem(cartItem)
    }
    props.getCartItem()
  }

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderColor: '#eee', borderWidth: 1}}>
      <TouchableOpacity onPress={removeItem}>
        <View style={{borderRightWidth: 1, borderRightColor: '#eee', paddingRight: 10, paddingLeft: 10}}> 
          <Text>-</Text>
        </View>
      </TouchableOpacity>
      <View style={{paddingTop: 3, paddingRight: 10, paddingBottom: 5, paddingLeft: 10}}>
        <Text>{cartItem.quantity}</Text>
      </View>
      <TouchableOpacity onPress={addItem}>
        <View style={{borderLeftWidth: 1, borderLeftColor: '#eee', paddingRight: 10, paddingLeft: 10}}> 
          <Text style={{color: '#47d9a8'}}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

mapDispatchToProps = dispatch => {
  return {
    addItemToCart: (item, quantity, totalPrice, cartItemId) => dispatch(addItemToCart(item, quantity, totalPrice, cartItemId)),
    updateCartItem: (cartItem, quantity, totalPrice) => dispatch(updateItem(cartItem, quantity, totalPrice)),
    getCartItem: () => dispatch(fetchCartItems()),
    deleteCartItem: (cartItem) => dispatch(deleteItem(cartItem))
  }
}
export default connect(null, mapDispatchToProps)(ModifyButton)