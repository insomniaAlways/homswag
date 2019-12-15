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
  const accessoryAddButton = (style) => (
    <AddButton />
  );

  const accessoryModifyButton = (style) => (
    <ModifyButton />
  );

  const renderItem = ({ item, index }) => (
    <ListItem
      title={item.name}
      description={item.price}
      titleStyle={{textTransform: "capitalize", fontSize: 16}}
      accessory={accessoryAddButton}
    />
  );

  return (
    <List
      data={props.data}
      renderItem={renderItem}
    />
  );
};

export default ItemsList;