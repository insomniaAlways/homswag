import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';

function SelectTimeSlot(props) {
  const { appointmentDetails, setAppointmentDetails } = props
  const { timeSlot } = appointmentDetails

  return (
    <View style={{flexDirection: 'row', justifyContent: 'center', margin: 10}}>
      <View style={timeSlot ===  "9AM - 12PM" ?  styles.selectedButtonContainer: styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setAppointmentDetails({...appointmentDetails, timeSlot: "9AM - 12PM"})}>
          <Text style={timeSlot ===  "9AM - 12PM" ? {color: 'white'} : {color: 'black'}}>9am - 12pm</Text>
        </TouchableOpacity>
      </View>
      <View style={timeSlot ===  "12PM - 3PM" ?  styles.selectedButtonContainer: styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setAppointmentDetails({...appointmentDetails, timeSlot: "12PM - 3PM"})}>
          <Text style={timeSlot ===  "12PM - 3PM" ? {color: 'white'} : {color: 'black'}}>12pm - 3pm</Text>
        </TouchableOpacity>
      </View>
      <View  style={timeSlot ===  "3PM - 6PM" ?  styles.isSelectedLastButtonContainer: styles.isLastButtonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setAppointmentDetails({...appointmentDetails, timeSlot: "3PM - 6PM"})}>
          <Text style={timeSlot ===  "3PM - 6PM" ? {color: 'white'} : {color: 'black'}}>3pm - 6pm</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SelectTimeSlot;

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#eee",
    marginRight: 10,
  },
  selectedButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "green",
    marginRight: 10,
  },
  isLastButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#eee",
    marginRight: 0
  },
  isSelectedLastButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "green",
    marginRight: 0
  },
  button: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%'
  }
})