import React, { useState, useLayoutEffect } from 'react';
import { View, KeyboardAvoidingView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PlaceHolderTextInput from './placeHolderTextInput';
import { brandColor } from '../style/customStyles';

function BookingDetails(props) {
  const { appointmentDetails, setAppointmentDetails, setModal, selectedAddress, goToAddAddress, isAddressLoading } = props
  const { appointment_for, phone_number, special_instruction, prefered_beautician} = appointmentDetails
  let address = selectedAddress && selectedAddress.address ? selectedAddress.address.formatedAddress : selectedAddress

  return (
    <View style={{padding: 10}}>
      <PlaceHolderTextInput placeholder="Name" styles={{margin: 10}} value={appointment_for} setValue={setAppointmentDetails} previousState={appointmentDetails} itemKey="appointment_for" disabled={true}/>
      <PlaceHolderTextInput placeholder="Phone Number" styles={{margin: 10}} value={phone_number} setValue={setAppointmentDetails} previousState={appointmentDetails} itemKey="phone_number" disabled={true}/>
        { isAddressLoading ? 
          <View style={styles.addressContainer}>
            <Text style={styles.addressLoading}>Loading...</Text>
          </View> :
        ( selectedAddress ? 
          <View style={styles.addressContainer}>
            <View style={{width: '80%', paddingBottom: 10}}>
              <Text style={styles.addressText}>{address}</Text>
              {selectedAddress.address.localAddress ? <Text style={styles.addressText}>{selectedAddress.address.localAddress}</Text> : null }
              {selectedAddress.address.landmark ? <Text style={styles.addressText}>{selectedAddress.address.landmark}</Text> : null}
            </View>
            <TouchableOpacity style={styles.addressChangeButton} onPress={() => setModal(true)}>
              <Text style={styles.addressChangeText}>Change</Text>
            </TouchableOpacity>
          </View> :
          <View style={styles.addressContainer}>
            <TouchableOpacity style={styles.addressAddButton} onPress={() => goToAddAddress()}>
              <Text style={styles.addressChangeText}>Add Address</Text>
            </TouchableOpacity>
          </View>
        )}
      <PlaceHolderTextInput placeholder="Special Instruction" styles={{margin: 10}} value={special_instruction} setValue={setAppointmentDetails} previousState={appointmentDetails} itemKey="special_instruction"/>
      <PlaceHolderTextInput placeholder="Prefered Beautician" styles={{margin: 10}} value={prefered_beautician} setValue={setAppointmentDetails} previousState={appointmentDetails} itemKey="prefered_beautician"/>
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
    fontFamily: 'roboto-regular',
  },
  addressLoading: {
    width: '100%',
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