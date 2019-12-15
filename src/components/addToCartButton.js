import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { fetchCartItems, addItemToCart, updateItem } from '../../store/actions/cartItemAction';
import _ from 'lodash';

function AddToCartButton(props) {
  const [ count, setCount ] = useState(0)
  const { type, item, cart } = props
  
  const addItem = () => {
    let length = props.cartItems.length
    let addedItem = _.find(props.cartItems, ['item_id', item.id])
    if(!_.isNil(addedItem)) {
      let quantity = (+addedItem.quantity + 1)
      let totalPrice = (+item.price * (+addedItem.quantity + 1))
      props.updateCartItem(addedItem, quantity, totalPrice)
    } else {
      props.addItemToCart(item, 1, (+item.price * 1), length+1)
    }
    props.getCartItem()
  }
  return (
    <TouchableOpacity onPress={addItem}>
      <View style={{backgroundColor: '#47d9a8', width: 70, padding: 5, borderRadius: 5}}>
        <Text style={{textAlign: 'center', color: '#fff'}}>Add</Text>
      </View>
    </TouchableOpacity>
  )
}

mapStateToProp = state => {
  return {
    cart: state.cart.values[0],
    cartItems: state.cartItems.values
  }
}

mapDispatchToProps = dispatch => {
  return {
    addItemToCart: (item, quantity, totalPrice, cartItemId) => dispatch(addItemToCart(item, quantity, totalPrice, cartItemId)),
    updateCartItem: (addedItem, quantity, totalPrice) => dispatch(updateItem(addedItem, quantity, totalPrice)),
    getCartItem: () => dispatch(fetchCartItems())
  }
}
export default connect(mapStateToProp, mapDispatchToProps)(AddToCartButton)