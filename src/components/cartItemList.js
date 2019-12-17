import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Icon, List, ListItem, Text } from '@ui-kitten/components';
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
    let rightAction = accessoryModifyButton

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