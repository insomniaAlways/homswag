import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from '@ui-kitten/components';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { updateItem, deleteItem } from '../../store/actions/cartItemAction';

const CartItemRow = (props) => {
  const { cartItem, updateCartItem, deleteCartItem, cartItemModel } = props
  const data = cartItem.is_package ? cartItem.package : cartItem.item
  const [ quantity, setQuantity ] = useState()
  const [ isLoading, setLoading ] = useState(false)

  useEffect(() => {
    async function updateCT() {
      if(quantity) {
        let totalPrice = (+data.price * parseInt(quantity))
        await updateCartItem(cartItem.id, quantity, totalPrice)
        setLoading(false)
      }
    }
    updateCT()
  }, [quantity])

  useEffect(() => {
    setQuantity(cartItem.quantity)
  }, [])

  const incCount = () => {
    setLoading(true)
    setQuantity(cartItem.quantity + 1)
  }

  const decCount = () => {
    setLoading(true)
    if(cartItem.quantity == 1) {
      deleteCartItem(cartItem.id)
      setLoading(false)
    } else {
      setQuantity(cartItem.quantity - 1)
    }
  }

  return (
    <View style={{flex: 1, flexDirection: 'row', paddingLeft: 10, paddingBottom: 10}}>
      <View style={{flex: 4,justifyContent: 'center'}}>
        <View style={{width: '80%', flexDirection: 'row'}}>
          <View style={{justifyContent: 'center'}}>
            <Icon name='checkmark-circle-2-outline' width={12} height={12} fill="#0D5618"/>
          </View>
          <View style={{paddingLeft: 10}}>
            <Text ellipsizeMode={'tail'} numberOfLines={2} category='s1' style={{fontSize: 18}}>{data.name}</Text>
          </View>
        </View>
      </View>
      <View style={{flex: 2, justifyContent: 'center'}}>
        {isLoading ?
          <View style={{width: 90, alignItems: 'center'}}><Text>Loading..</Text></View>:
          <View style={{width: 90, flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}>
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
        }
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 14}}><FontAwesome name="rupee" size={12} color="black" /> {data.price * cartItem.quantity}</Text>
        </View>
      </View>
    </View>
  )
};

const mapStateToProps = state => ({
  cartItemModel: state.cartItems
})

const mapDispatchToProps = dispatch => ({
  updateCartItem: (cart_item_id, quantity, totalPrice) => dispatch(updateItem(cart_item_id, quantity, totalPrice)),
  deleteCartItem: (cart_item_id) => dispatch(deleteItem(cart_item_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(CartItemRow);