import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';

function SelectTimeSlot(props) {
  const { appointmentDetails, setAppointmentDetails, slots } = props

  return (
    <View style={{flexDirection: 'row', justifyContent: 'center', margin: 10}}>
      { slots.map(timeSlot => (
        <View
          key={timeSlot.type}
          style={appointmentDetails.slot.type == timeSlot.type ?
           (timeSlot.type == 3 ? styles.isSelectedLastButtonContainer : styles.selectedButtonContainer) :
           (timeSlot.type == 3 ? styles.isLastButtonContainer : styles.buttonContainer)}
          >
          <TouchableOpacity style={styles.button} onPress={() => setAppointmentDetails({...appointmentDetails, slot: timeSlot})}>
            <Text style={appointmentDetails.slot.type == timeSlot.type ? {color: 'white'} : {color: 'black'}}>{timeSlot.value}</Text>
          </TouchableOpacity>
        </View>
      ))}
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