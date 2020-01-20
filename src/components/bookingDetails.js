import React, { useState } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import PlaceHolderTextInput from './placeHolderTextInput';

function BookingDetails(props) {
  const { appointmentDetails, setAppointmentDetails} = props
  const { name, phone, address, instructions, preferedBeautician} = appointmentDetails
  return (
    <View style={{padding: 10}}>
      <PlaceHolderTextInput placeholder="Name" styles={{margin: 10}} value={name} setValue={setAppointmentDetails} previousState={appointmentDetails} itemKey="name" />
      <PlaceHolderTextInput placeholder="Phone Number" styles={{margin: 10}} value={phone} setValue={setAppointmentDetails} previousState={appointmentDetails} itemKey="phone"/>
      <PlaceHolderTextInput placeholder="Address" styles={{margin: 10}} value={address} setValue={setAppointmentDetails} previousState={appointmentDetails} itemKey="address"/>
      <PlaceHolderTextInput placeholder="Special Instruction" styles={{margin: 10}} value={instructions} setValue={setAppointmentDetails} previousState={appointmentDetails} itemKey="instructions"/>
      <PlaceHolderTextInput placeholder="Prefered Beautician" styles={{margin: 10}} value={preferedBeautician} setValue={setAppointmentDetails} previousState={appointmentDetails} itemKey="preferedBeautician"/>
    </View>
  )
}

export default BookingDetails;