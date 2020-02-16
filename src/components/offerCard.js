import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const OfferCard = (props) => {
  const { packageService, navigation } = props
  const styles = props.styles

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Packages', { packageService: packageService })}>
      <View style={[{height: '100%', width: 370, marginRight: 10}, styles]}>
        <Image 
          style={{height: "100%", width: "100%", borderRadius: 10}}
          source={{uri: packageService.poster_image_source}}
        />
      </View>
    </TouchableOpacity>
  )
}

export default OfferCard;