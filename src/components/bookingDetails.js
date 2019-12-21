import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { Input } from '@ui-kitten/components';
import PlaceHolderTextInput from './placeHolderTextInput';

function BookingDetails() {
  return (
    <View style={{padding: 10}}>
      <PlaceHolderTextInput placeholder="Name"/>
      <PlaceHolderTextInput placeholder="Phone Number"/>
      <PlaceHolderTextInput placeholder="Address"/>
      <PlaceHolderTextInput placeholder="Special Instruction"/>
    </View>
  )
}

export default BookingDetails;