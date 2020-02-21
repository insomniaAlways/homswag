import React, { useReducer, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Icon } from '@ui-kitten/components';
import { fetchCartItems, updateItem, deleteItem } from '../../store/actions/cartItemAction';

function ModifyButton(props) {
  const { item, cartItem, updateCartItem, deleteCartItem, isOffline } = props
  const [ isLoading, setLoading ] = useState(false)

  const init = (initialCount) => {
    return {count: cartItem ? cartItem.quantity : initialCount};
  }

  function reducer(state, action) {
    switch (action.type) {
      case 'increment': {
        setLoading(true)
        return {count: state.count + 1};
      }
      case 'decrement': {
        setLoading(true)
        return {count: state.count - 1};
      }
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, 1, init);

  useEffect(() => {
    async function updateCT() {
      if(state.count == 0) {
        await deleteCartItem(cartItem.id)
        props.removeCartItem(false)
      } else if(cartItem && state.count && state.count >= 1) {
        let totalPrice = (+item.price * parseInt(state.count))
        await updateCartItem(cartItem.id, state.count, totalPrice)
        setLoading(false)
      }
    }
    updateCT()
  }, [state.count])

  if(isOffline) {
    return (
      <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}>
        <Text style={{textAlign: 'center', color: 'grey'}}>Offline</Text>
      </View>
    )
  } else {
    return (
      <View style={{flexDirection: 'row',justifyContent:'space-between', alignItems: 'center'}}>
        {isLoading ?
          <View style={{width: 90, alignItems: 'center', height: 27, justifyContent: 'center'}}><Text>Loading..</Text></View>:
          <View style={{flexDirection: 'row',justifyContent:'space-between', alignItems: 'center'}}>
            <View style={{flex: 1, borderColor: '#eee', borderWidth: 1}}>
              <TouchableOpacity onPress={() => dispatch({type: 'decrement'})}>
                <View style={{height: 25, alignItems: 'center', justifyContent: 'center'}}>
                  <Icon name='minus-outline' width={12} height={12} fill="#0D5618"/>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, height: 25, alignItems: 'center', justifyContent: 'center', borderTopColor: '#eee', borderTopWidth: 1, borderBottomColor: '#eee', borderBottomWidth: 1}}>
              <Text>{state.count}</Text>
            </View>
            <View style={{flex: 1, borderColor: '#eee', borderWidth: 1}}>
              <TouchableOpacity onPress={() => dispatch({type: 'increment'})}>
                <View style={{height: 25, alignItems: 'center', justifyContent: 'center'}}>
                  <Icon name='plus-outline' width={12} height={12} fill="#0D5618"/>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        }
      </View>
    )
  }
}

const mapStateToProps = state => ({
  cartItemModel: state.cartItems,
})

mapDispatchToProps = dispatch => {
  return {
    updateCartItem: (cart_item_id, quantity, totalPrice) => dispatch(updateItem(cart_item_id, quantity, totalPrice)),
    getCartItem: () => dispatch(fetchCartItems()),
    deleteCartItem: (cart_item_id) => dispatch(deleteItem(cart_item_id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ModifyButton)