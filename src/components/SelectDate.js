import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Button } from 'react-native';

function SelectDate() {
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
      <View style={{...styles.buttonContainer, marginRight: 0}}>
        <TouchableOpacity style={styles.button}>
          <Text>Date</Text>
        </TouchableOpacity>
      </View>
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
