import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import OfferCard from './offerCard';
import { connect } from 'react-redux';

function OfferView(props) {
  const { packages } = props

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {packages.isLoading ? 
        <View><Text>Loading..</Text></View> :
        packages.values.map((packageService, index) => <OfferCard key={packageService.id} packageService={packageService} styles={index == 0 && { marginLeft: 10 }}/>)
      }
    </ScrollView>
  )
}

export default OfferView;