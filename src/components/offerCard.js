import React from 'react';
import { View, Text, Image } from 'react-native';

const OfferCard = (props) => {
  const { packageService } = props
  const styles = props.styles
  
  return (
    <View style={[{height: '100%', width: 370, marginRight: 10}, styles]}>
      <Image 
        style={{height: "100%", width: "100%", borderRadius: 10}}
        source={{uri: packageService.image_url}}
      />
    </View>
  )
}

export default OfferCard;