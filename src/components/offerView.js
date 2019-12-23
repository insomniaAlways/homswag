import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import OfferCard from './offerCard';

function OfferView() {
  return (
    <ScrollView horizontal={true}>
      <OfferCard id={211} style={{marginLeft: 10}}/>
      <OfferCard id={451}/>
      <OfferCard id={452}/>
      <OfferCard id={453}/>
      <OfferCard id={454}/>
      <OfferCard id={455}/>
    </ScrollView>
  )
}

export default OfferView;