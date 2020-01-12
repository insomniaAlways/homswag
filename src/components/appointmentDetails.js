import React, { useState } from 'react';
import { View, Text, Picker } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Moment from 'react-moment';
import DateTimePicker from '@react-native-community/datetimepicker';

const intialDate = new Date();
const mode = 'date';
const timeSlots = ["9AM - 12PM", "12PM - 3PM", "3PM - 6PM"];

function AppointmentDetails() {
  const [ date, setDate ] = useState(intialDate);
  const [ isDatePickerVisible, setDatePickeVisibility ] = useState(false);
  const [ selectedTimeSlot, setTimeSlot ] = useState(timeSlots[1])

  const onSelectDate = (event, selectDate = date) => {
    setDatePickeVisibility(false)
    setDate(selectDate);
  }

  return (
    <View style={{marginTop: 30}}>
      <View style={{paddingTop: 10, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 16, fontWeight: "bold", width: '70%'}}>
          Appointment Date
          {/* <Text style={{fontSize: 11, fontWeight: 'normal'}}>(Click on date to change)</Text> */}
        </Text>
        <TouchableOpacity style={{width: '100%'}} onPress={() => setDatePickeVisibility(true)}>
          <Moment element={Text}
            date={date}
            format="DD/MM/YYYY"
            style={{fontSize: 16, width: '100%', textAlign: 'center'}}
          />
        </TouchableOpacity>
      </View>
      <View style={{paddingTop: 5, paddingBottom: 5, paddingLeft: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 16, fontWeight: "bold", width: 295}}>Time stot</Text>
        <View style={{width: 154}}>
          <Picker
            selectedValue={selectedTimeSlot}
            style={{width: '100%', height: 20, textAlign: 'right'}}
            onValueChange={(value) =>setTimeSlot(value)}>
              {timeSlots.map((slot, index) => (<Picker.Item key={index} label={slot} value={slot} />))}
          </Picker>
        </View>
      </View>
      { isDatePickerVisible && <DateTimePicker value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onSelectDate} />
        }
      <Text style={{fontSize: 11, fontWeight: 'normal', paddingLeft: 10, paddingBottom: 5}}>(Click on date and time to change)</Text>
    </View>
  )
}

export default AppointmentDetails;