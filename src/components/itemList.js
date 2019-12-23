import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import _ from 'lodash';
import ItemRow from '../components/ItemRow';

const ItemsList = (props) => {
  const { data, cartItems, cart } = props
  return (
    <ScrollView>
      {data.map((item, index) => (<ItemRow index={index} key={index} item={item} cartItems={cartItems} cart={cart}/>))}
    </ScrollView>
  )
};

export default ItemsList;