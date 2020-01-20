import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import _ from 'lodash';
// import DefaultStyles from '../style/customStyles';

function AddToCartButton(props) {
  const { isAdded, setAdded } = props
  
  return (
    <TouchableOpacity onPress={() => setAdded(true)}>
      <View style={{ width: 70, padding: 5, borderRadius: 5, backgroundColor: '#d4d4d4' }}>
        <Text style={{textAlign: 'center', color: 'black'}}>Add</Text>
      </View>
    </TouchableOpacity>
  )
}

export default AddToCartButton;