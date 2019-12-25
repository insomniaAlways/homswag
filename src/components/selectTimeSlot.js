import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';

function SelectTimeSlot() {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'center', margin: 10}}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text>9am - 12pm</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text>12pm - 3pm</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.buttonContainer, {marginRight: 0}]}>
        <TouchableOpacity style={styles.button}>
          <Text>3pm - 6pm</Text>
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
  button: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%'
  }
})