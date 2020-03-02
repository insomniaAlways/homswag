import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet, Text, Platform} from 'react-native';
import { Dimensions } from 'react-native';
import moment from 'moment';
import Moment from 'react-moment';
import DateTimePicker from '@react-native-community/datetimepicker';

const screenWidth = Math.round(Dimensions.get('window').width);

const isIOS = Platform.OS === 'ios'
const mode ='date'

function DateButton (props) {
  const { title, value, type, date, setDate } = props
  const [ isDisabled, setDisable ] = useState(false)
  const [ isDateSelected, setDateSelected ] = useState(false)
  const [ isDatePickerVisible, enableDatePicker ] = useState(false)

  useEffect(() => {
    if(type == 1 && moment().isAfter(moment().startOf('days').add(17, 'hours'))) {
      setDisable(true)
    }
  })

  const onButtonClick = (date) => {
    setDate(date)
  }

  const onSelectDate = (event, selectDate = value) => {
    enableDatePicker(false)
    onButtonClick(moment(selectDate).toDate())
    setDateSelected(true)
  }

  if(isDisabled) {
    return (
      <View style={[styles.button, styles.container]}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    )
  } else if(isIOS && type == 3) {
    return (
      <View>
        <TouchableOpacity style={styles.container} onPress={() => onButtonClick(value)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>{title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  } else if(type == 3 && !isIOS) {
    return (
      <View>
        <TouchableOpacity style={styles.container} onPress={() => enableDatePicker(true)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              { !isDateSelected ? title :
                <Moment element={Text}
                  date={date}
                  format="DD/MM/YYYY"
                  style={{fontSize: 16, width: '100%', textAlign: 'center'}}
                />
              }
            </Text>
          </View>
        </TouchableOpacity>
        {isDatePickerVisible &&
          <DateTimePicker mode={mode} value={date ? date : new Date()} is24Hour={true} minimumDate={new Date()} display="default" onChange={onSelectDate} />}
      </View>
    )
  } else {
    return (
      <TouchableOpacity style={styles.container} onPress={() => onButtonClick(value)}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default DateButton;

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
  },

  button: {
    width: (screenWidth - 60)/3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#eee",
    paddingTop: 10,
    paddingBottom: 10,
  },

  buttonText: {
    color: '#000'
  },

  disableButton: {

  },

  disableButtonText: {

  }
})