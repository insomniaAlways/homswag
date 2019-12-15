import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Icon,
  List,
  ListItem,
  Text
} from '@ui-kitten/components';
import { ModifyButton, AddButton } from './itemModifyButton';

const ItemsList = (props) => {

  const { cart } = props
  const { cart_items: cartItems } = cart

  const addItem = () => {
    
  }

  const accessoryAddButton = (style) => (
    <AddButton />
  );

  const accessoryModifyButton = (style) => (
    <ModifyButton />
  );

  const renderItem = ({ item, index }) => {
    let rightAction = accessoryAddButton
    if(cart.cart_items && cart.cart_items.length) {
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
      data={props.data}
      renderItem={renderItem}
    />
  );
};

export default ItemsList;