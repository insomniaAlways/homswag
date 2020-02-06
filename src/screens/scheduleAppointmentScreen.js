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

function ScheduleAppointmentScreen(props) {
  const [ openAddressModal, setModal ] = useState(false)
  const [ scrollOffset, setScrollOffset ] = useState(0)
  const [ selectedAddress, setSelectedAddress ] = useState()
  let scrollViewRef;
  const { appointment, addresses, getAddress } = props
  const { defaultValues } = appointment

  useEffect(() => {
    getAddress()
  }, [])

  const goToAddAddress = () => {
    setModal(false)
    props.navigation.navigate('AddAddress', { previousRoute: 'BookAppointment' })
  }

  useEffect(() => {
    if(addresses.isLoading && addresses.values && addresses.values.length && !selectedAddress) {
      setSelectedAddress(addresses.values[0])
    }
  }, [addresses.isLoading])

  const handleOnScroll = event => {
    setScrollOffset(event.nativeEvent.contentOffset.y)
  };

  const handleScrollTo = p => {
    if (scrollViewRef) {
      scrollViewRef.scrollTo(p);
    }
  };

  const initialAppointmentDetails= {
    date: moment().toDate(),
    timeSlot: "9AM - 12PM",
    name: 'Pretty Sharma',
    phone: '9706055724',
    instructions: '',
    preferedBeautician: ''
  }

  const [ appointmentDetails, setAppointmentDetails ] = useState(initialAppointmentDetails)
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, padding: 10}}>
        <View>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Select Date and Time: </Text>
          <View>
            <SelectDate appointmentDetails={appointmentDetails} setAppointmentDetails={setAppointmentDetails}/>
            <SelectTimeSlot appointmentDetails={appointmentDetails} setAppointmentDetails={setAppointmentDetails} slots={defaultValues.slots} slot={defaultValues.slot}/>
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
            goToAddAddress={goToAddAddress}
            navigation={props.navigation}
            />
        </View>
      </View>
      <View style={[{height: 55}, DefaultStyles.brandBackgroundColor]}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Cart', { bookingDetails: defaultValues})} style={{alignItems: 'center', paddingTop: 15, paddingBottom: 10, width: '100%'}}>
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
    </View>
  )
}

const mapPropsToState = state => ({
  appointment: state.appointment,
  addresses: state.addresses
})

const mapDispatchToProps = dispatch => {
  return {
    getAddress: () => dispatch(fetchAddress())
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
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
  },
});