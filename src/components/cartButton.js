import React, { useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Icon, Text } from '@ui-kitten/components';
import { connect } from 'react-redux';

function CartButton(props) {
  const { navigate } = props.navigation
  const { cartItemModel } = props
  let totalCartItem = 0
  if(cartItemModel && !cartItemModel.isLoading  && cartItemModel.values && Array.isArray(cartItemModel.values)) {
    totalCartItem = cartItemModel.values.length
  }

  useEffect(() => {
    if(cartItemModel && !cartItemModel.isLoading && cartItemModel.values && Array.isArray(cartItemModel.values) && cartItemModel.values.length) {
      totalCartItem = cartItemModel.values.length
    }
  }, [cartItemModel.isLoading, cartItemModel.values.length])
  
  return (
    <TouchableOpacity onPress={() => navigate('Cart')}>
      <Icon name='shopping-cart-outline' width={32} height={32} fill='#FFF' />
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{totalCartItem}</Text>
      </View>
    </TouchableOpacity>
  )
}

mapStateToProps = state => {
  return {
    cartItemModel: state.cartItems
  }
}

export default connect(mapStateToProps)(CartButton);

const styles = StyleSheet.create({
  badge: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#52c41a',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  badgeText: {
    color: '#fff',
    paddingBottom: 6,
    fontSize: 14,

  }
})