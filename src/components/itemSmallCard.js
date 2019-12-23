import React from 'react';
import { View } from 'react-native';

function ItemSmallCard() {
  return (
    <View style={{height: 150, width: 170, marginRight: 10, borderWidth: 1, borderColor: '#eee'}}>
      <View style={{height: '80%', borderWidth: 1, borderColor: '#eee'}}></View>
      <View style={{height: '20%', borderWidth: 1, borderColor: '#eee'}}></View>
    </View>
  )
}

export default ItemSmallCard;