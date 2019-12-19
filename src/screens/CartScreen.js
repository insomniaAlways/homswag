import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
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
    <View style={{flex: 1}}>
      <View style={{flex: 11, paddingTop: 10}}>
        <CartItemList cart={cart.values} cartItems={cartItems.values}/>
      </View>
      <View style={styles.container}>
       <TouchableOpacity
         style={styles.button}
       >
         <Text style={{color:'#fff'}}>Chect out</Text>
       </TouchableOpacity>
      </View>
    </View>
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#47d9a8',
    padding: 15,
    color:'#fff'
  },
  countContainer: {
    alignItems: 'center',
    padding: 10
  }
})


