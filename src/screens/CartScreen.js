import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { fetchItems } from '../../store/actions/itemActions';
import { connect } from 'react-redux';
import CartItemList from '../components/cartItemList';
import { fetchCart } from '../../store/actions/cartAction';

function CartScreen(props) {
  const { navigation, cart, user, cartItems } = props;
  console.log(cartItems)
  

  useEffect(() => {
    if(user.id) {
      props.getCart(user.id)
    }
  }, [])

  return (
    <CartItemList cart={cart.values} cartItems={cartItems.values}/>
  );
}

mapStateToProps = state => {
  return {
    cart: state.cart,
    cartItems: state.cartItems,
    user: state.user
  }
}

mapDispatchToProps = dispatch => {
  return {
    getCart: (user_id) => dispatch(fetchCart(user_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);

