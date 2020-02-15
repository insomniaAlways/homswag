import React, { useEffect, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native';
import { fetchAllOrder } from '../../store/actions/orderActions'
import OrderList from '../components/orderList';
import DefaultStyles from '../style/customStyles';
import Constants from 'expo-constants';
import CustomHeader from '../components/customHeader';

function OrderHistoryScreen(props) {
  const { orders, getOrders, navigation } = props;

  useLayoutEffect(() => {
    getOrders()
  }, [])

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{padding: 10, paddingLeft: 20}}><Text style={{fontSize: 16, fontWeight: 'bold'}}>My Orders: </Text></View>
        {orders.isLoading ? 
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Loading..</Text>
          </View> :
          <OrderList orders={orders.values} navigation={navigation}/>
        }
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1
  }
})

mapStateToProps = state => {
  return {
    orders: state.orders
  }
}

mapDispatchToProps = dispatch => {
  return {
    getOrders: () => dispatch(fetchAllOrder())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistoryScreen);