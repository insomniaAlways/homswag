import React, { useCallback, useState } from 'react';
import OrderItem from './orderItem';
import { Layout, List, Text, Spinner } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const OrderList = function(props) {
  const { orders, navigation, orderModel } = props
  const [ refreshing, setRefreshing ] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    async function fetchData() {
      await props.getOrders()
      if(refreshing) {
        setRefreshing(false)
      }
    }
    fetchData()
    return () => setRefreshing(false)
  }, [refreshing]);


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
        refreshing={refreshing}
        onRefresh={onRefresh}
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