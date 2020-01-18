import React from 'react';
import { View, Text, Image } from 'react-native';

function PromoCard({ style, source }) {
  return (
    <View style={[{height: '100%', width: 200, marginRight: 10}, style]}>
      <Image 
        style={{height: "100%", width: "100%", borderRadius: 10}}
        source={source}
      />
    </View>
  )
}

export default PromoCard;