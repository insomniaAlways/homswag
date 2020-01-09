import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Input } from '@ui-kitten/components';

function PlaceHolderTextInput(props) {
  const [ value, setValue ] = useState('');
  const [ inputStyle, setStyle ] = useState(styles.placeholder);
  return (
    // <View style={{padding: 10}}>
      <TextInput
        style={[inputStyle, props.styles]}
        onChangeText={text => setValue(text)}
        placeholder={props.placeholder}
        onFocus={() => setStyle(styles.input)}
        onBlur={() => setStyle(styles.placeholder)}
        value={value}
      />
    // </View>
  )
}

export default PlaceHolderTextInput;

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#4A90E2',
    borderBottomWidth: 1
  },
  placeholder: {
    height: 40,
    borderColor: '#eee',
    borderBottomWidth: 1
  }
})