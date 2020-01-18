import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import SelectDate from '../components/SelectDate';
import SelectTimeSlot from '../components/selectTimeSlot';
import BookingDetails from '../components/bookingDetails';
import DefaultStyles from '../style/customStyles';
import moment from 'moment';

function ScheduleAppointmentScreen(props) {
  const initialAppointmentDetails= {
    date: moment().toDate(),
    timeSlot: "9AM - 12PM",
    name: 'Pretty Sharma',
    phone: '9706055724',
    address: 'ITI Layout Main Road',
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
            <SelectTimeSlot appointmentDetails={appointmentDetails} setAppointmentDetails={setAppointmentDetails}/>
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Fill Details:</Text>
          <BookingDetails appointmentDetails={appointmentDetails} setAppointmentDetails={setAppointmentDetails}/>
        </View>
      </View>
      <View style={[{height: 55}, DefaultStyles.brandBackgroundColor]}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Cart')} style={{alignItems: 'center', paddingTop: 15, paddingBottom: 10, width: '100%'}}>
          <Text style={{color: '#fff', fontSize: 16}}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ScheduleAppointmentScreen;