import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Icon, List, ListItem, Text } from '@ui-kitten/components';
import ModifyButton from './itemModifyButton';
import AddToCartButton from './addToCartButton';
import _ from 'lodash';

const ItemsList = (props) => {
  const { cart, cartItems } = props
  console.log(cart, cartItems)
  const accessoryAddButton = (style, index) => (
    <AddToCartButton type={'cart-items'} item={cartItems[index]} cart={cart} cartItems={cartItems}/>
  );

  const accessoryModifyButton = (style, index) => (
    <ModifyButton type={'cart-items'} item={cartItems[index]} cart={cart} cartItems={cartItems}/>
  );
  const isItemAdded = (item) => {
    return _.find(cartItems, ['item_id', item.id])
  }

  const renderItem = ({ item, index }) => {
    let rightAction = accessoryAddButton

    if(cartItems && cartItems.length && isItemAdded(item)) {
      rightAction = accessoryModifyButton
    }
    return (
      <ListItem
        title={item.item.name}
        description={item.item.price}
        titleStyle={{textTransform: "capitalize", fontSize: 16}}
        accessory={rightAction}
      />
    );
  }

  return (
    <List
      data={cartItems}
      renderItem={renderItem}
    />
  );
};

export default ItemsList;