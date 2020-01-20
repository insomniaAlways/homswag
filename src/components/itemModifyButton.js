import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Icon } from '@ui-kitten/components';
import { fetchCartItems, updateItem, deleteItem } from '../../store/actions/cartItemAction';

function ModifyButton(props) {
  const { item, cartItem, removeCartItem } = props
  const [ count, setCount ] = useState(cartItem.quantity)
  
  const updateAddedItem = _.debounce(async (quantity) => {
    if(!_.isNil(cartItem)) {
      let totalPrice = (+item.price * parseInt(quantity))
      let updatedCartItem = await props.updateCartItem(cartItem.id, quantity, totalPrice)
      props.getCartItem()
    }
  }, 600)

  const removeItem = _.debounce(async (quantity) => {
    console.log('here 1st')
    if(cartItem && cartItem.quantity > 1) {
      let totalPrice = (+item.price * quantity)
      let updatedCartItem = await props.updateCartItem(cartItem.id, quantity, totalPrice)
      props.getCartItem()
    } else {
      let deletedCartItem = await props.deleteCartItem(cartItem.id)
      props.getCartItem()
    }
  }, 600)

  const incCount = () => {
    setCount(count + 1)
    updateAddedItem(count + 1)
  }

  const decCount = () => {
    if((count - 1) <= 0) {
      removeCartItem(false)
    }
    setCount(count - 1)
    removeItem(count - 1)
  }

  return (
    <View style={{flexDirection: 'row',justifyContent:'space-between', alignItems: 'center'}}>
      <View style={{flex: 1, borderColor: '#eee', borderWidth: 1}}>
        <TouchableOpacity onPress={decCount}>
          <View style={{height: 25, alignItems: 'center', justifyContent: 'center'}}>
            <Icon name='minus-outline' width={12} height={12} fill="#0D5618"/>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, height: 25, alignItems: 'center', justifyContent: 'center', borderTopColor: '#eee', borderTopWidth: 1, borderBottomColor: '#eee', borderBottomWidth: 1}}>
        <Text>{count}</Text>
      </View>
      <View style={{flex: 1, borderColor: '#eee', borderWidth: 1}}>
        <TouchableOpacity onPress={incCount}>
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
    updateCartItem: (cartItem, quantity, totalPrice) => dispatch(updateItem(cartItem, quantity, totalPrice)),
    getCartItem: () => dispatch(fetchCartItems()),
    deleteCartItem: (cartItem) => dispatch(deleteItem(cartItem))
  }
}
export default connect(null, mapDispatchToProps)(ModifyButton)