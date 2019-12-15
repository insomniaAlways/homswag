import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Icon,
  List,
  ListItem,
  Text
} from '@ui-kitten/components';

const ItemsList = (props) => {
  console.log('itemlist',props)
  const renderItem = ({ item, index }) => (
    <ListItem
      title={item.name}
      titleStyle={{textTransform: "capitalize", fontSize: 16}}
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