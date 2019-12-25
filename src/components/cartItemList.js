import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Icon, List, ListItem, Text, Card } from '@ui-kitten/components';
import ModifyButton from './itemModifyButton';
import AddToCartButton from './addToCartButton';
import _ from 'lodash';
import { FontAwesome } from '@expo/vector-icons';

const ItemsList = (props) => {
  const { cart, cartItems } = props

  const accessoryModifyButton = (style, cartItem) => (
    <ModifyButton type={'cart-items'} cartItem={cartItem} cart={cart} cartItems={cartItems} item={cartItem.item}/>
  );

  const priceComponent = (cartItem) => {
    let mrp = +cartItem.item.mrp * cartItem.quantity
    let actualPrice = cartItem.item.price * cartItem.quantity
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 14}}><FontAwesome name="rupee" size={12} color="black" /> {actualPrice}</Text>
      </View>
    )
  }

  const renderItem = (cartItem, index) => {
    let rightAction = accessoryModifyButton({}, cartItem, index)
    let price = priceComponent(cartItem)
    if(cartItem) {
      return (
        <View key={index} style={{flex: 1, flexDirection: 'row', paddingLeft: 10, paddingBottom: 10}}>
          <View style={{flex: 4,justifyContent: 'center'}}>
            <View style={{width: '80%', flexDirection: 'row'}}>
              <View style={{justifyContent: 'center'}}>
                <Icon name='checkmark-circle-2-outline' width={12} height={12} fill="#0D5618"/>
              </View>
              <View style={{paddingLeft: 10}}>
                <Text ellipsizeMode={'tail'} numberOfLines={2}>{cartItem.item.name}</Text>
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