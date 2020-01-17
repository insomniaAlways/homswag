import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { fetchCartItems, addItemToCart, updateItem } from '../../store/actions/cartItemAction';
import _ from 'lodash';
import DefaultStyles from '../style/customStyles';

function AddToCartButton(props) {
  const [ count, setCount ] = useState(0)
  const { type, item, cart, cartItems } = props
  
  const addItem = () => {
    let length = cartItems.length
    let addedItem = _.find(cartItems, ['item_id', item.id])
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
      <View style={{ width: 70, padding: 5, borderRadius: 5, backgroundColor: '#d4d4d4' }}>
        <Text style={{textAlign: 'center', color: 'black'}}>Add</Text>
      </View>
    </TouchableOpacity>
  )
}

mapDispatchToProps = dispatch => {
  return {
    addItemToCart: (item, quantity, totalPrice, cartItemId) => dispatch(addItemToCart(item, quantity, totalPrice, cartItemId)),
    updateCartItem: (addedItem, quantity, totalPrice) => dispatch(updateItem(addedItem, quantity, totalPrice)),
    getCartItem: () => dispatch(fetchCartItems())
  }
}
export default connect(null, mapDispatchToProps)(AddToCartButton)