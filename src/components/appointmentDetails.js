import React, { useState } from 'react';
import { View, Text, Picker } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Moment from 'react-moment';
import { Layout } from '@ui-kitten/components';
import { connect } from 'react-redux';

function AppointmentDetails(props) {
  const { appointment, navigation } = props

  const onSelectDate = (event, selectDate = date) => {
    setDatePickeVisibility(false)
    setDate(selectDate);
  }

  return (
    <TouchableOpacity onPress={() => navigation.navigate('BookAppointment')}>
      <Layout style={{justifyContent: 'center', alignItems: 'center', borderRadius: 20}}>
        <Text style={{width: '100%', textAlign: 'center', fontSize: 16, fontWeight: 'bold', paddingBottom: 10}}>Appointment Details & Slot</Text>
        <Moment element={Text}
          date={appointment.defaultValues.from}
          format="MMMM DD, YYYY"
          style={{fontSize: 16, width: '100%', textAlign: 'center'}}
        />
        <Text>{appointment.defaultValues.slots[appointment.defaultValues.slot].value}</Text>
      </Layout>
    </TouchableOpacity>
  )
}

const mapPropsToState = state => ({
  appointment: state.appointment,
  addresses: state.addresses
})

export default connect(mapPropsToState)(AppointmentDetails);