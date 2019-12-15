import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { fetchCategories } from '../../store/actions/index';
import CategoryList from '../components/categoryList';
import { getUser } from '../../store/actions/authenticationAction';
import { fetchCart } from '../../store/actions/cartAction';

function Dashboard(props) {
  useEffect(() => {
    props.getAllCategories()
    props.getUser()
    props.getCart()
  }, [])
  
  return (
      <CategoryList data={props.categories.values} navigation={props.navigation}/>
  );
}

mapStateToProps = state => {
  return {
    categories: state.categories,
    cart: state.cart
  }
}

mapDispatchToProps = dispatch => {
  return {
    getAllCategories: () => dispatch(fetchCategories()),
    getUser: () => dispatch(getUser()),
    getCart: ()=> dispatch(fetchCart())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
