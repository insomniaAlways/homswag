import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import OfferCard from './offerCard';

function OfferView() {
  let number = 1033
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <OfferCard id={number} style={{marginLeft: 10}}/>
      <OfferCard id={number + 2}/>
      <OfferCard id={number + 3}/>
      <OfferCard id={number + 7}/>
      <OfferCard id={number + 5}/>
      <OfferCard id={number + 6}/>
    </ScrollView>
  )
}

export default OfferView;