import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Input } from '@ui-kitten/components';

function PlaceHolderTextInput(props) {
  const { setValue, previousState, itemKey } = props;
  const { value } = props;

  const updateText = function(text) {
    if(previousState) {
      setValue({...previousState, [itemKey]: text})
    }
  }

  const [ inputStyle, setStyle ] = useState(styles.placeholder);
  return (
      <TextInput
        style={[inputStyle, props.styles]}
        onChangeText={text => updateText(text)}
        placeholder={props.placeholder}
        onFocus={() => setStyle(styles.input)}
        onBlur={() => setStyle(styles.placeholder)}
        value={value}
      />
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