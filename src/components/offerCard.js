import React from 'react';
import { View, Text, Image } from 'react-native';

function OfferCard({ id, style }) {
  return (
    <View style={[{height: '100%', width: 370, marginRight: 10}, style]}>
      <Image 
        style={{height: "100%", width: "100%", borderRadius: 10}}
        source={{uri: `https://i.picsum.photos/id/${id}/400/200.jpg`}}
      />
    </View>
  )
}

export default OfferCard;