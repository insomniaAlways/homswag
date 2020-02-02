import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

function AddToCartButton(props) {
  const { setAdded } = props
  const addToCart = () => {
    if(props.addToCart) {
      props.addToCart(props.item)
    }
    if(setAdded) {
      setAdded(true)
    }
  }
  return (
    <TouchableOpacity onPress={() => addToCart()}>
      <View style={{ width: 70, padding: 5, borderRadius: 5, backgroundColor: '#d4d4d4' }}>
        <Text style={{textAlign: 'center', color: 'black'}}>Add</Text>
      </View>
    </TouchableOpacity>
  )
}

export default AddToCartButton;