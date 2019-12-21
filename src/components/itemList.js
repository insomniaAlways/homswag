import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, List, ListItem, Text } from '@ui-kitten/components';
import ModifyButton from './itemModifyButton';
import AddToCartButton from './addToCartButton';
import _ from 'lodash';

const ItemsList = (props) => {
  const { cart, data, cartItems } = props
  
  const accessoryAddButton = (style, index) => (
    <AddToCartButton type={'cart-items'} item={data[index]} cart={cart} cartItems={cartItems}/>
  );

  const accessoryModifyButton = (style, index) => (
    <ModifyButton type={'cart-items'} item={data[index]} cart={cart} cartItems={cartItems}/>
  );
  const isItemAdded = (item) => {
    return _.find(cartItems, ['item_id', item.id])
  }

  const renderItem = ({ item, index }) => {
    let rightAction = accessoryAddButton

    if(cartItems && cartItems.length && isItemAdded(item)) {
      rightAction = accessoryModifyButton
    }

    // return (
    //   <View style={{flex: 1}}>
    //     <View style={{flex: 1, borderColor: 1, borderWidth: 'black'}}></View>
    //     <View style={{flex: 1, borderColor: 1, borderWidth: 'black'}}></View>
    //     <View style={{flex: 1, borderColor: 1, borderWidth: 'black'}}></View>
    //   </View>
    // )
    return (
      <ListItem
        title={item.name}
        description={item.price}
        titleStyle={{textTransform: "capitalize", fontSize: 16}}
        accessory={rightAction}
      />
    );
  }

  return (
    <List
      data={data}
      renderItem={renderItem}
    />
  );
};

export default ItemsList;