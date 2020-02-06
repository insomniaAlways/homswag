import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PlaceHolderTextInput from './placeHolderTextInput';
import { brandColor } from '../style/customStyles';

function BookingDetails(props) {
  const { appointmentDetails, setAppointmentDetails, setModal, selectedAddress, goToAddAddress} = props
  const { name, phone, instructions, preferedBeautician} = appointmentDetails
  let address = selectedAddress && selectedAddress.address ? selectedAddress.address.formatedAddress : selectedAddress
  return (
    <View style={{padding: 10}}>
      <PlaceHolderTextInput placeholder="Name" styles={{margin: 10}} value={name} setValue={setAppointmentDetails} previousState={appointmentDetails} itemKey="name" disabled={true}/>
      <PlaceHolderTextInput placeholder="Phone Number" styles={{margin: 10}} value={phone} setValue={setAppointmentDetails} previousState={appointmentDetails} itemKey="phone"/>
        {selectedAddress ? 
          <View style={styles.addressContainer}>
            <Text style={styles.addressText}>{address}</Text>
            <TouchableOpacity style={styles.addressChangeButton} onPress={() => setModal(true)}>
              <Text style={styles.addressChangeText}>Change</Text>
            </TouchableOpacity>
          </View> :
          <View style={styles.addressContainer}>
            <TouchableOpacity style={styles.addressAddButton} onPress={() => goToAddAddress()}>
              <Text style={styles.addressChangeText}>Add Address</Text>
            </TouchableOpacity>
          </View>
        }
      <PlaceHolderTextInput placeholder="Special Instruction" styles={{margin: 10}} value={instructions} setValue={setAppointmentDetails} previousState={appointmentDetails} itemKey="instructions"/>
      <PlaceHolderTextInput placeholder="Prefered Beautician" styles={{margin: 10}} value={preferedBeautician} setValue={setAppointmentDetails} previousState={appointmentDetails} itemKey="preferedBeautician"/>
    </View>
  )
}

export default BookingDetails;

const styles = StyleSheet.create({
  addressContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eee',
    margin: 10
  },
  addressText: {
    width: '80%',
    paddingBottom: 10
  },
  addressChangeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  addressAddButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 10
  },
  addressChangeText: {
    color: brandColor
  }
})