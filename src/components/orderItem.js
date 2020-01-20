import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from '@ui-kitten/components';
import Moment from 'react-moment';
import { FontAwesome } from '@expo/vector-icons';

const OrderItem = function(props) {
  const order = props.order.item;
  const RenderOrderedItem = () => {
    if(order.order_items && Array.isArray(order.order_items) && order.order_items.length) {
      return order.order_items.map((orderItem, index) => {
        return (
          <View key={index} style={{flex: 1, flexDirection: 'row',justifyContent: 'space-between', paddingRight: 10}}>
            <Text ellipsizeMode={'tail'} numberOfLines={2}>{orderItem.item.name}</Text>
            <Text>x {orderItem.quantity}</Text>
            <Text><FontAwesome name="rupee" size={12} color="black" /> {orderItem.total_price}</Text>
          </View>
        )
    })
    } else {
      return <Text>Item no found</Text>
    }
  }
  return (
    <View style={{paddingLeft: 10, paddingRight: 10, borderWidth: 1, borderColor: "#eee", margin: 10, borderBottomWidth: 3}}>
      <View style={{padding: 10}}>
        <Text style={{fontWeight: 'bold', fontSize: 14, width: '100%'}}>Order No: {order.order_no}</Text>
        <Moment element={Text}
            date={order.created_at}
            format="DD/MM/YYYY"
            style={{fontSize: 12, width: '100%', textAlign: 'left'}}
          />
      </View>
      <View style={{paddingLeft: 10, paddingBottom: 10, borderBottomColor: '#eee', borderBottomWidth: 1}}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <View style={{justifyContent: 'center'}}>
            <Icon name='checkmark-circle-2-outline' width={12} height={12} fill="#0D5618"/>
          </View>
          <View style={{paddingLeft: 10, flex: 1}}>
            <RenderOrderedItem />
          </View>
        </View>
      </View>
      <View style={{padding: 10}}>
        <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
          <Text>Total</Text>
          <Text><FontAwesome name="rupee" size={12} color="black" /> {order.item_total_price}</Text>
        </View>
        <View style={{paddingTop: 10, flexDirection: "row", justifyContent: 'space-between'}}>
          <Text>Booked for</Text>
          <Moment element={Text}
            date={order.created_at}
            format="hh:mm A, DD/MM/YYYY"
          />
        </View>
      </View>
    </View>
  )
};

export default OrderItem;