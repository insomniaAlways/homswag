import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Icon, List, ListItem, Text } from '@ui-kitten/components';
import ModifyButton from './itemModifyButton';
import AddToCartButton from './addToCartButton';

const ItemsList = (props) => {
  const { cart, data, cartItems } = props
  
  const accessoryAddButton = (style, index) => (
    <AddToCartButton type={'cart-items'} item={data[index]} cart={cart}/>
  );

  const accessoryModifyButton = (style) => (
    <ModifyButton />
  );

  const renderItem = ({ item, index }) => {
    let rightAction = accessoryAddButton
    if(cartItems && cartItems.length) {
      rightAction = accessoryModifyButton
    }
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