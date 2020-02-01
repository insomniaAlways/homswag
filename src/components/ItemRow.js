import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import ModifyButton from './itemModifyButton';
import AddToCartButton from './addToCartButton';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchCartItems, creatCartItem } from '../../store/actions/cartItemAction';

function ItemRow(props) {
  const { item, cartItem, cart, creatNewCartItem, getCartItem, setShowButton } = props;
  const [ isAdded, setAdded ] = useState(false)
  const cartItems = cartItem.values
  const [ quantity, setQuantity ] = useState(0)
  const isItemAdded = () => {
    return _.find(cartItems, ['item.id', item.id])
  }

  const create = async () => {
    let newCartItem = await creatNewCartItem(item.id, (+item.price * 1))
    getCartItem()
  }

  const addCartItem = () => {
    setAdded(true)
    setQuantity(1)
    create()
    setShowButton(true)
  }

  useEffect(() => {
    if(cartItems && cartItems.length && isItemAdded()) {
      setAdded(true)
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
          setQuantity={setQuantity}
          removeCartItem={setAdded}/> : 
          <AddToCartButton
            type={'cart-items'}
            item={item}
            cart={cart}
            cartItems={cartItems}
            isAdded={isAdded}
            setAdded={addCartItem}/> 
        }
    </View>
  )
}

const mapStateToProps = state => {
  return  {
    cartItem: state.cartItems
  }
}
const mapDispatchToProps = dispatch => {
  return {
    creatNewCartItem: (item, quantity, totalPrice, cartItemId) => dispatch(creatCartItem(item, quantity, totalPrice, cartItemId)),
    getCartItem: () => dispatch(fetchCartItems())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemRow);