import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Icon, List, ListItem, Text, Card } from '@ui-kitten/components';
import ModifyButton from './itemModifyButton';
import AddToCartButton from './addToCartButton';
import _ from 'lodash';

const ItemsList = (props) => {
  const { cart } = props
  let cartItems = cart[0].cart_items
  useEffect(() => {
    cartItems = cart[0].cart_items
  }, [cart[0].cartItems])

  const accessoryModifyButton = (style, index) => (
    <ModifyButton type={'cart-items'} item={cartItems[index].item} cart={cart} cartItems={cartItems}/>
  );
  const isItemAdded = (item) => {
    return _.find(cartItems, ['item_id', item.id])
  }

  const priceComponent = (item) => {
    let mrp = +item.item.mrp * item.quantity
    let actualPrice = item.item.price * item.quantity
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 14}}>{actualPrice}</Text>
      </View>
    )
  }

  const renderItem = (item, index) => {
    let rightAction = accessoryModifyButton({}, index)
    let price = priceComponent(item)
    if(item) {
      return (
        <View key={index} style={{flex: 1, flexDirection: 'row', paddingLeft: 10, paddingBottom: 10}}>
          <View style={{flex: 4,justifyContent: 'center'}}>
            <View style={{width: '80%', flexDirection: 'row'}}>
              <View style={{justifyContent: 'center'}}>
                <Icon name='checkmark-circle-2-outline' width={12} height={12} fill="#0D5618"/>
              </View>
              <View style={{paddingLeft: 10}}>
                <Text ellipsizeMode={'tail'} numberOfLines={2}>{item.item.name}</Text>
              </View>
            </View>
          </View>
          <View style={{flex: 2, justifyContent: 'center'}}>
            <View style={{width: 90}}>
              {rightAction}
            </View>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            {price}
          </View>
        </View>
      )
    } else {
      return (<View></View>)
    }
  }
  return cartItems.map((ct, index) => renderItem(ct, index))
};

export default ItemsList;