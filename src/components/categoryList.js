import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Icon,
  List,
  ListItem,
  Text
} from '@ui-kitten/components';

const CategoryList = (props) => {
  const renderItem = ({ item, index }) => (
    <ListItem
      title={item.name}
      titleStyle={{textTransform: "capitalize", fontSize: 16, fontWeight: "bold"}}
      onPress={() => props.navigation.navigate('Items', {
        category: item
      })}
    />
  );

  return (
    <List
      data={props.data}
      renderItem={renderItem}
    />
  );
};

export default CategoryList;