import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Icon, List, ListItem, Text, Card } from '@ui-kitten/components';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchCart } from '../../store/actions/cartAction';
import CartItemRow from './cartItemRow';

const ItemsList = (props) => {
  const { cartItem, getCart, setLoading } = props
  const cartItems = _.sortBy(cartItem.values, 'id')

  useEffect(() => {
    getCart()
  }, [cartItem.isLoading])

  if(cartItems && Array.isArray(cartItems) && cartItems.length) {
    return cartItems.map((ct, index) => <CartItemRow index={index} cartItem={ct} key={index} setLoading={setLoading}/>)
  } else {
    return (<View><Text>Something went worng</Text></View>)
  }
};

const mapStateToProps = state => ({
  cartItem: state.cartItems
})

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(fetchCart)
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);