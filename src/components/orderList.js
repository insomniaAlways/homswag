import React from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import OrderItem from './orderItem';

const OrderList = function(props) {
  const { orders } = props
  if(orders && Array.isArray(orders) && orders.length) {
    return (
      <FlatList
        data={orders}
        renderItem={(order) => <OrderItem order={order} />}
        keyExtractor={(order) => order.order_no}
      />
    )
  } else {
    return <Text>No order found</Text>
  }
}

export default OrderList;