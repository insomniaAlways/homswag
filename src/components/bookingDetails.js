import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { Input } from '@ui-kitten/components';
import PlaceHolderTextInput from './placeHolderTextInput';

function BookingDetails() {
  return (
    <View style={{padding: 10}}>
      <PlaceHolderTextInput placeholder="Name" styles={{margin: 10}}/>
      <PlaceHolderTextInput placeholder="Phone Number" styles={{margin: 10}}/>
      <PlaceHolderTextInput placeholder="Address" styles={{margin: 10}}/>
      <PlaceHolderTextInput placeholder="Special Instruction" styles={{margin: 10}}/>
    </View>
  )
}

export default BookingDetails;