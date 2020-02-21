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
  const [ quantity, setQuantity ] = useState(0)
  const isItemAdded = () => {
    return _.find(cartItems, ['item.id', item.id])
  }

  const create = () => {
    addItemToCart(item.id, (+item.price * 1))
  }

  const addCartItem = () => {
    setAdded(true)
    setQuantity(1)
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

  useEffect(() => {
    if(cartItems && cartItems.length && isItemAdded()) {
      setQuantity(isItemAdded().quantity)
    }
  }, [])

  return (
    <View style={props.style}>
      {isAdded ?
        <ModifyButton
          type={'cart-items'}
          item={item}
          cart={cart}
          cartItems={cartItems}
          cartItem={isItemAdded()}
          quantity={quantity}
          isOffline={networkAvailability.isOffline}
          setQuantity={setQuantity}
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
    addItemToCart: (item, quantity, totalPrice, cartItemId) => dispatch(createCartItem(item, quantity, totalPrice, cartItemId)),
    getCartItem: () => dispatch(fetchCartItems())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemRow);