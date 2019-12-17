import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, List, ListItem, Text, Card } from '@ui-kitten/components';
import ModifyButton from './itemModifyButton';
import AddToCartButton from './addToCartButton';
import _ from 'lodash';

const ItemsList = (props) => {
  const { cart, cartItems } = props

  const accessoryModifyButton = (style, index) => (
    <ModifyButton type={'cart-items'} item={cartItems[index].item} cart={cart} cartItems={cartItems}/>
  );
  const isItemAdded = (item) => {
    return _.find(cartItems, ['item_id', item.id])
  }

  const renderItem = ({ item, index }) => {
    let rightAction = accessoryModifyButton({}, index)
    if(item) {
      return (
        <View style={{flex: 1, flexDirection: 'row', paddingLeft: 10, paddingRight: 10, paddingTop: 20, paddingBottom: 20, borderBottomColor: 'grey', borderBottomWidth: 0.5}}>
          <View style={{flex: 2}}></View>
          <View style={{flex: 7}}>
            <View>
              <Text>{item.item.name}</Text>
            </View>
            <View>
              <Text>{item.item.price} x {item.quantity} = {item.item.price * item.quantity}</Text>
            </View>
          </View>
          <View style={{flex: 3}}>
            {rightAction}
          </View>
        </View>
      )
    } else {
      return (<View></View>)
    }

    // return (
    //   <ListItem
    //     title={item.item.name}
    //     description={item.item.price}
    //     titleStyle={{textTransform: "capitalize", fontSize: 16}}
    //     accessory={rightAction}
    //   />
    // );
  }

  return (
    <List
      data={cartItems}
      renderItem={renderItem}
    />
  );
};

export default ItemsList;