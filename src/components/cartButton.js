import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { fetchCart } from '../../store/actions/cartAction';
import { Badge } from 'react-native-elements';

function CartButton(props) {
  const { navigate } = props.navigation
  const { cart } = props
  const cartValue = cart.values[0]
  let totalcCartItem = 0
  if(cartValue && cartValue.cart_items.length) {
    totalcCartItem = cartValue.cart_items.length
  }
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
  }
}

mapDispatchToProps = dispatch => {
  return {
    getCart: ()=> dispatch(fetchCart()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartButton);