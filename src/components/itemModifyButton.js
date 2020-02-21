import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Icon } from '@ui-kitten/components';
import { fetchCartItems, updateItem, deleteItem } from '../../store/actions/cartItemAction';

function ModifyButton(props) {
  const { item, cartItem, quantity, updateCartItem, deleteCartItem, isOffline } = props

  useEffect(() => {
    async function updateCT() {
      if(cartItem) {
        let totalPrice = (+item.price * parseInt(quantity))
        await updateCartItem(cartItem.id, quantity, totalPrice)
        if(props.setLoading) {
          props.setLoading(false)
        }
      }
    }
    updateCT()
  }, [quantity])

  const incCount = () => {
    if(props.setLoading) {
      props.setLoading(true)
    }
    let count = quantity + 1
    if(props.setQuantity) {
      props.setQuantity(count)
    }
  }

  const decCount = () => {
    let count = quantity - 1
    if(props.setLoading) {
      props.setLoading(true)
    }
    if(count < 1) {
      if(props.removeCartItem) {
        props.removeCartItem(false)
      }
      async function deleteCall() {
        await deleteCartItem(cartItem.id)
        if(props.setLoading) {
          props.setLoading(false)
        }
      }
      deleteCall()
    } else {
      if(props.setQuantity) {
        props.setQuantity(count)
      }
    }
  }

  if(isOffline) {
    return (
      <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}>
        <Text style={{textAlign: 'center', color: 'grey'}}>Offline</Text>
      </View>
    )
  } else {
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
}

const mapStateToProps = state => ({
  cartItemModel: state.cartItems
})

mapDispatchToProps = dispatch => {
  return {
    updateCartItem: (cart_item_id, quantity, totalPrice) => dispatch(updateItem(cart_item_id, quantity, totalPrice)),
    getCartItem: () => dispatch(fetchCartItems()),
    deleteCartItem: (cart_item_id) => dispatch(deleteItem(cart_item_id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ModifyButton)