import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Icon } from '@ui-kitten/components';
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
    <View style={{flexDirection: 'row',justifyContent:'space-between', alignItems: 'center'}}>
      <View style={{flex: 1, borderColor: '#eee', borderWidth: 1}}>
        <TouchableOpacity onPress={removeItem}>
          <View style={{height: 25, alignItems: 'center', justifyContent: 'center'}}>
            <Icon name='minus-outline' width={12} height={12} fill="#0D5618"/>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, height: 25, alignItems: 'center', justifyContent: 'center', borderTopColor: '#eee', borderTopWidth: 1, borderBottomColor: '#eee', borderBottomWidth: 1}}>
        <Text>{cartItem.quantity}</Text>
      </View>
      <View style={{flex: 1, borderColor: '#eee', borderWidth: 1}}>
        <TouchableOpacity onPress={addItem}>
          <View style={{height: 25, alignItems: 'center', justifyContent: 'center'}}>
            <Icon name='plus-outline' width={12} height={12} fill="#0D5618"/>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
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