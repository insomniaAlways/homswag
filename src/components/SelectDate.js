import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'react-moment';
import moment from 'moment';

const mode = 'date';

function SelectDate(props) {
  const { appointmentDetails, setAppointmentDetails } = props
  const [ selectedDate, setSelectedDate ] = useState()

  useEffect(() => {
    if(appointmentDetails && appointmentDetails.date) {
      if(moment(appointmentDetails.date).isSame(moment(), 'day')) {
        setSelectedDate('today')
      } else if (moment(appointmentDetails.date).isSame(moment().add(1, 'd'), 'day')) {
        setSelectedDate('tomorrow')
      } else {
        setSelectedDate('date')
      }
    }
  }, [appointmentDetails.date])

  const [ date, setDate ] = useState(appointmentDetails.date);
  const [ isDateSelected, setDateSelected ] = useState(false);
  const [ isDatePickerVisible, setDatePickeVisibility ] = useState(false);
  const [ selectedStyle, setStyle ] = useState()

  const onSelectDate = (event, selectDate = date) => {
    setDatePickeVisibility(false)
    setDate(selectDate);
    setAppointmentDetails({...appointmentDetails, date: moment(selectDate).toDate()})
    setDateSelected(true)
  }
  return (
    <View style={{flexDirection: 'row', justifyContent: 'center', margin: 10}}>
      <View style={selectedDate == 'today' ? styles.selectedButtonContainer : styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setAppointmentDetails({...appointmentDetails, date: moment()})}>
          <Text style={selectedDate == 'today' ? {color: 'white'}: {color: 'black'}}>Today</Text>
        </TouchableOpacity>
      </View>
      <View style={selectedDate == 'tomorrow' ? styles.selectedButtonContainer : styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setAppointmentDetails({...appointmentDetails, date: moment().add(1, 'd')})}>
          <Text style={selectedDate == 'tomorrow' ? {color: 'white'}: {color: 'black'}}>Tomorrow</Text>
        </TouchableOpacity>
      </View>
      <View style={selectedDate == 'date' ? styles.selectedDateSelectButton : styles.dateSelectButton}>
        <TouchableOpacity style={styles.button} onPress={() => setDatePickeVisibility(true)}>
          <Text style={selectedDate == 'date' ? {color: 'white'}: {color: 'black'}}>
          { !isDateSelected ? 'Date' :
            <Moment element={Text}
              date={date}
              format="DD/MM/YYYY"
              style={{fontSize: 16, width: '100%', textAlign: 'center'}}
            />
          }
          </Text>
        </TouchableOpacity>
      </View>
      { isDatePickerVisible && <DateTimePicker value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onSelectDate} />
        }
    </View>
  )
}

export default SelectDate;

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
    color: 'white'
  },
  button: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%'
  },
  selectedButton: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    color: 'white'
  },
  dateSelectButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#eee",
    marginRight: 0
  },
  selectedDateSelectButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "green",
    color: 'white',
    marginRight: 0
  },
})
