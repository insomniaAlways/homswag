import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
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
  return (
    <View>
      <TouchableOpacity onPress={() => props.navigation.navigate('BookAppointment')}>
        <Text>Go to appointment screen</Text>
      </TouchableOpacity>
      <CategoryList data={props.categories.values} navigation={props.navigation}/>
    </View>
  );
}

mapStateToProps = state => {
  return {
    categories: state.categories
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
