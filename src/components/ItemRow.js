import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import ModifyButton from './itemModifyButton';
import AddToCartButton from './addToCartButton';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchCartItems, createCartItem } from '../../store/actions/cartItemAction';

function ItemRow(props) {
  const { item, cartItemModel, cart, addItemToCart, getCartItem, setShowButton, networkAvailability } = props;
  const [ isAdded, setAdded ] = useState(false)
  const cartItems = cartItemModel.values

  const isItemAdded = () => {
    return _.find(cartItems, ['item.id', item.id])
  }

  const create = () => {
    addItemToCart(item.id, (+item.price * 1))
  }

  const addCartItem = () => {
    setAdded(true)
    create()
    setShowButton(true)
  }

  useLayoutEffect(() => {
    if(isItemAdded()) {
      setAdded(true)
    } else {
      setAdded(false)
    }
  }, [cartItemModel.isLoading])

  return (
    <View style={props.style}>
      {isAdded ?
        <ModifyButton
          type={'cart-items'}
          item={item}
          cart={cart}
          refreshing={props.refreshing}
          cartItems={cartItems}
          cartItem={isItemAdded()}
          navigation={props.navigation}
          isOffline={networkAvailability.isOffline}
          removeCartItem={setAdded}/> : 
        <AddToCartButton
          type={'cart-items'}
          item={item}
          cart={cart}
          cartItems={cartItems}
          isOffline={networkAvailability.isOffline}
          isAdded={isAdded}
          setAdded={addCartItem}/> 
        }
    </View>
  )
}

const mapStateToProps = state => {
  return  {
    cartItemModel: state.cartItems,
    networkAvailability: state.networkAvailability
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addItemToCart: (item, totalPrice, cartItemId) => dispatch(createCartItem(item, totalPrice, cartItemId)),
    getCartItem: () => dispatch(fetchCartItems())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemRow);