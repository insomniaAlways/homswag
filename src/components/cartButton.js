import React, { useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { fetchCart } from '../../store/actions/cartAction';
import { Badge } from 'react-native-elements';

function CartButton(props) {
  const { navigate } = props.navigation
  const { cartItems } = props
  let totalcCartItem = 0
  if(cartItems && Array.isArray(cartItems)) {
    totalcCartItem = cartItems.length
  }

  useEffect(() => {
    if(cartItems && Array.isArray(cartItems) && cartItems.length) {
      totalcCartItem = cartItems.length
    }
  }, [cartItems.length])
  
  return (
    <TouchableOpacity onPress={() => navigate('Cart')}>
      <Icon name='shopping-cart-outline' width={32} height={32} fill='#FFF' />
      <Badge
          status="success"
          value={totalcCartItem}
          containerStyle={{ position: 'absolute', top: -4, right: -4 }}
        />
    </TouchableOpacity>
  )
}

mapStateToProps = state => {
  return {
    cart: state.cart,
    cartItems: state.cartItems.values && Array.isArray(state.cartItems.values) ? state.cartItems.values : []
  }
}

mapDispatchToProps = dispatch => {
  return {
    getCart: ()=> dispatch(fetchCart()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartButton);