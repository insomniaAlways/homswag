import React from 'react';
import OrderItem from './orderItem';
import { Layout, List, Text, Spinner } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const OrderList = function(props) {
  const { orders, navigation, orderModel } = props

  const renderItem = ({item}) => {
    return (
      <OrderItem order={item} navigation={navigation} orderModel={orderModel}/>
    )
  }

  if(orders && Array.isArray(orders) && orders.length) {
    return (
      <List
        contentContainerStyle={styles.orderList}
        showsVerticalScrollIndicator={false}
        data={orders}
        refreshing={false}
        onRefresh={() => alert('hello')}
        renderItem={renderItem}
      />
    )
  } else {
    return <Text>No order found</Text>
  }
}

export default OrderList;

const styles = StyleSheet.create({
  orderList: {

  }
})