import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { fetchCategories } from '../../store/actions/index';
import CategoryList from '../components/categoryList';
import { getUser } from '../../store/actions/authenticationAction';
import { fetchCart } from '../../store/actions/cartAction';
import { fetchCartItems } from '../../store/actions/cartItemAction';

function Dashboard(props) {
  useEffect(() => {
    props.getAllCategories()
    props.getUser()
    props.getCart()
    props.getAllCartItems()
  }, [])
  console.log(props.cartItems)
  return (
      <CategoryList data={props.categories.values} navigation={props.navigation}/>
  );
}

mapStateToProps = state => {
  return {
    categories: state.categories,
    cart: state.cart,
    cartItems: state.cartItems
  }
}

mapDispatchToProps = dispatch => {
  return {
    getAllCategories: () => dispatch(fetchCategories()),
    getUser: () => dispatch(getUser()),
    getCart: ()=> dispatch(fetchCart()),
    getAllCartItems: () => dispatch(fetchCartItems())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
