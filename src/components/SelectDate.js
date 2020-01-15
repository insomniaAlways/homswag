import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'react-moment';

const intialDate = new Date();
const mode = 'date';

function SelectDate() {
  const [ date, setDate ] = useState(intialDate);
  const [ isDateSelected, setDateSelected ] = useState(false);
  const [ isDatePickerVisible, setDatePickeVisibility ] = useState(false);
  const [ selectedStyle, setStyle ] = useState()

  const onSelectDate = (event, selectDate = date) => {
    setDatePickeVisibility(false)
    setDate(selectDate);
    setDateSelected(true)
  }

  return (
    <View style={{flexDirection: 'row', justifyContent: 'center', margin: 10}}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text>Today</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text>Tomorrow</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.buttonContainer, { marginRight: 0}]}>
        <TouchableOpacity style={styles.button} onPress={() => setDatePickeVisibility(true)}>
          <Text>
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
  button: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%'
  }
})
