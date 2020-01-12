import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { fetchCategories } from '../../store/actions/index';
import CategoryList from '../components/categoryList';
import { getUser } from '../../store/actions/authenticationAction';
import { fetchCart } from '../../store/actions/cartAction';
import { fetchCartItems } from '../../store/actions/cartItemAction';
import OfferView from '../components/offerView';

function Dashboard(props) {
  useEffect(() => {
    props.getAllCategories()
    // props.getUser()
    props.getCart()
    props.getAllCartItems()
  }, [])
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{height: 200, paddingTop: 10, paddingBottom: 10}}>
          <OfferView />
        </View>
        <CategoryList data={props.categories.values} navigation={props.navigation}/>
        <View style={{height: 200, paddingTop: 10, paddingBottom: 10}}>
          <OfferView />
        </View>
      </ScrollView>
    </SafeAreaView>
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
