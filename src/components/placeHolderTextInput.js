import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';

function PlaceHolderTextInput(props) {
  const { setValue, itemKey, value } = props;
  const updateText = function(text) {
    if(props.previousState) {
      setValue({...props.previousState, [itemKey]: text})
    } else {
      setValue(text)
    }
  }

  const [ inputStyle, setStyle ] = useState(styles.placeholder);
  return (
      <TextInput
        style={[inputStyle, props.styles]}
        keyboardType={props.keyboardType ? props.keyboardType : 'default'}
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