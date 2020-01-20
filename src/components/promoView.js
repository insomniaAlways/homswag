import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import PromoCard from './promoCard';
import Promo1 from '../../assets/images/promo1.png';
import Promo2 from '../../assets/images/promo2.png';
import Promo3 from '../../assets/images/promo3.png';
import Promo4 from '../../assets/images/promo4.png';

function PromoView() {
  let number = 1033
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <PromoCard source={Promo1} style={{marginLeft: 10}}/>
      <PromoCard source={Promo2}/>
      <PromoCard source={Promo3}/>
      <PromoCard source={Promo4}/>
    </ScrollView>
  )
}

export default PromoView;