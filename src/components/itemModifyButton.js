import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Icon } from '@ui-kitten/components';
import { fetchCartItems, updateItem, deleteItem } from '../../store/actions/cartItemAction';

function ModifyButton(props) {
  const { item, cartItem, removeCartItem, quantity, setQuantity } = props

  const updateAddedItem = _.debounce(async (count) => {
    if(!_.isNil(cartItem)) {
      let totalPrice = (+item.price * parseInt(count))
      let updatedCartItem = await props.updateCartItem(cartItem.id, count, totalPrice)
      props.getCartItem()
    }
  }, 1000)

  const removeItem = _.debounce(async (count) => {
    if(quantity > 0) {
      let totalPrice = (+item.price * count)
      let updatedCartItem = await props.updateCartItem(cartItem.id, count, totalPrice)
      props.getCartItem()
    }
  }, 1000)

  const deleteItem = async () => {
    if(props.setLoading) {
      props.setLoading(true)
    }
    let deletedCartItem = await props.deleteCartItem(cartItem.id)
    props.getCartItem()
  }

  const incCount = () => {
    if(props.setLoading) {
      props.setLoading(true)
    }
    if(setQuantity) {
      setQuantity(quantity + 1, cartItem)
    }
    updateAddedItem(quantity + 1)
  }

  const decCount = () => {
    if(props.setLoading) {
      props.setLoading(true)
    }
    if((quantity - 1) <= 0) {
      if(removeCartItem) {
        removeCartItem(false)
      }
      deleteItem()
    } else {
      removeItem(quantity - 1)
    }
    if(setQuantity) {
      setQuantity(quantity - 1, cartItem)
    }
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
        <Text>{quantity}</Text>
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