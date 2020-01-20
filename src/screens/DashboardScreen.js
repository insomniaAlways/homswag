import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { fetchCategories } from '../../store/actions/index';
import CategoryList from '../components/categoryList';
import { getUser } from '../../store/actions/authenticationAction';
import { fetchCart } from '../../store/actions/cartAction';
import { fetchCartItems } from '../../store/actions/cartItemAction';
import OfferView from '../components/offerView';
import PromoView from '../components/promoView';
import TabViews from '../components/tabs';
import * as Animatable from 'react-native-animatable';
import { Spinner } from '@ui-kitten/components';

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
        <Text style={{paddingLeft: 20, paddingBottom: 0}}>What would you like to do?</Text>
        <View style={{paddingLeft: 25, paddingRight: 25, paddingTop: 10, paddingBottom: 10}}>
        {props.categories.isLoading ? 
          <View style={{height: 600, justifyContent: 'center', alignItems: 'center'}}>
            <Spinner status='info'/>
          </View> : 
          <Animatable.View
            duration={700}
            animation={'fadeIn'}
            style={{height: '100%'}}
            >
            <TabViews {...props}/>
          </Animatable.View>
        }
        </View>
        <View style={{height: 230, paddingTop: 10, paddingBottom: 10}}>
          <PromoView />
        </View>
        <View style={{marginBottom: 50, marginTop: 10, padding: 20, borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#ABDAF6", marginLeft: 20, marginRight: 20}}>
          <Text style={{textAlign: "center", fontStyle: 'italic', color: '#e84393', fontSize: 18}}>
            An experience you’ll never forget at the cutting edge of contemporary hair & beauty
          </Text>
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
