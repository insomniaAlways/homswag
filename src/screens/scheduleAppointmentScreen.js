import React, { useState, useEffect } from 'react';
import { Button, View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import SelectDate from '../components/SelectDate';
import SelectTimeSlot from '../components/selectTimeSlot';
import BookingDetails from '../components/bookingDetails';
import DefaultStyles, { brandColor } from '../style/customStyles';
import moment from 'moment';
import { connect } from 'react-redux';
import Modal from "react-native-modal";
import AddressList from '../components/addressList';
import { fetchAddress } from '../../store/actions/addressActions';
import { Layout } from '@ui-kitten/components';
import { KeyboardAvoidingView } from '../components/KeyboardAvoidView';
import { updateAppointmentState } from '../../store/actions/appointmentActions';
import _ from 'lodash';

function ScheduleAppointmentScreen(props) {
  const { appointment, addresses, getAddress, currentUser, updateAppointment } = props
  const [ openAddressModal, setModal ] = useState(false)
  const [ scrollOffset, setScrollOffset ] = useState(0)
  const [ selectedAddress, setSelectedAddress ] = useState()
  let scrollViewRef;
  const { defaultValues, slots } = appointment

  const goToAddAddress = () => {
    setModal(false)
    props.navigation.navigate('AddAddress', { previousRoute: 'BookAppointment' })
  }

  const save = () => {
    updateAppointment(appointmentDetails)
    props.navigation.navigate('Cart', { bookingDetails: appointmentDetails})
  }

  useEffect(() => {
    getAddress()
    return () => setModal(false)
  }, [])

  useEffect(() => {
    if(!addresses.isLoading && addresses.values && addresses.values.length && !selectedAddress) {
      let defaultAddress = _.find(addresses.values, ['is_default', true])
      if(defaultAddress) {
        setSelectedAddress(defaultAddress)
      } else {
        setSelectedAddress(addresses.values[0])
      }
    }
    return () => setModal(false)
  }, [addresses.isLoading, addresses.values, addresses.values.length])

  const [ appointmentDetails, setAppointmentDetails ] = useState(defaultValues)

  useEffect(() => {
    updateAppointment({
      ...defaultValues,
      appointment_for: currentUser.values.name,
      phone_number: currentUser.values.phone,
      selectedAddress: selectedAddress,
      special_instruction: appointmentDetails.special_instruction,
      prefered_beautician: appointmentDetails.prefered_beautician
    })
    return () => setModal(false)
  }, [currentUser, selectedAddress, addresses.isLoading])

  useEffect(() => {
    setAppointmentDetails({...appointment.defaultValues})
  }, [appointment.defaultValues])

  const handleOnScroll = event => {
    setScrollOffset(event.nativeEvent.contentOffset.y)
  };

  const handleScrollTo = p => {
    if (scrollViewRef) {
      scrollViewRef.scrollTo(p);
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <View style={{flex: 1, padding: 10, marginBottom: 50}}>
        <View>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Select Date and Time: </Text>
          <View>
            <SelectDate appointmentDetails={appointmentDetails} setAppointmentDetails={setAppointmentDetails}/>
            <SelectTimeSlot appointmentDetails={appointmentDetails} setAppointmentDetails={setAppointmentDetails} slots={slots}/>
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Fill Details:</Text>
          <BookingDetails
            appointmentDetails={appointmentDetails}
            setAppointmentDetails={setAppointmentDetails}
            openAddressModal={openAddressModal}
            selectedAddress={selectedAddress}
            setModal={setModal}
            isAddressLoading={addresses.isLoading}
            goToAddAddress={goToAddAddress}
            navigation={props.navigation}
            />
        </View>
      </View>
      <View style={[{height: 55}, DefaultStyles.brandBackgroundColor]}>
        <TouchableOpacity onPress={() => save()} style={{alignItems: 'center', paddingTop: 15, paddingBottom: 10, width: '100%'}}>
          <Text style={{color: '#fff', fontSize: 16}}>Save & Continue</Text>
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={openAddressModal}
        onSwipeComplete={() => setModal(false)}
        swipeDirection="down"
        scrollTo={handleScrollTo}
        scrollOffset={scrollOffset}
        scrollOffsetMax={400 - 300}
        style={styles.bottomModal}>
        <ScrollView
          ref={ref => (scrollViewRef = ref)}
          onScroll={handleOnScroll}
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}>
            <Layout style={{height: 300, backgroundColor: 'transparent'}}></Layout>
            <Layout style={styles.scrollableModal}>
              <Layout style={styles.addressListHeader}>
                <Text style={[styles.addressListHeaderText, {width: '70%'}]}>
                  Address Lists: 
                </Text>
                <TouchableOpacity onPress={() => goToAddAddress()}>
                  <Text style={[{width: 50}, styles.addressListHeaderText]}>+ Add</Text>
                </TouchableOpacity>
              </Layout>
              <AddressList addresses={addresses}
                style={{padding: 10, flex: 1}}
                setSelectedAddress={setSelectedAddress}
                setModal={setModal}
                />
            </Layout>
          </ScrollView>
      </Modal>
    </KeyboardAvoidingView>
  )
}

const mapPropsToState = state => ({
  appointment: state.appointment,
  addresses: state.addresses,
  currentUser: state.currentUser
})

const mapDispatchToProps = dispatch => {
  return {
    getAddress: () => dispatch(fetchAddress()),
    updateAppointment: (appointment) => dispatch(updateAppointmentState(appointment))
  }
}

export default connect(mapPropsToState, mapDispatchToProps)(ScheduleAppointmentScreen);

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
    flex: 1
  },

  addressListHeader: {
    padding: 15,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#eee',
    backgroundColor: brandColor,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
  },
  addressListHeaderText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  scrollableModal: {
    flex: 1,
    minHeight: 500,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
  },
});