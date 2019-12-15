import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export function AddButton() {
  const [ count, setCount ] = useState(0)

  return (
    <TouchableOpacity onPress={() => setCount(count + 1)}>
      <View style={{backgroundColor: '#47d9a8', width: 70, padding: 5, borderRadius: 5}}>
        <Text style={{textAlign: 'center', color: '#fff'}}>Add</Text>
      </View>
    </TouchableOpacity>
  )
}
export function ModifyButton() {
  const [ count, setCount ] = useState(0)

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderColor: '#eee', borderWidth: 1}}>
      <TouchableOpacity onPress={() => { count != 0 ? setCount(count - 1) : false }}>
        <View style={{borderRightWidth: 1, borderRightColor: '#eee', paddingRight: 10, paddingLeft: 10}}> 
          <Text>-</Text>
        </View>
      </TouchableOpacity>
      <View style={{paddingTop: 3, paddingRight: 10, paddingBottom: 5, paddingLeft: 10}}>
        <Text>{count}</Text>
      </View>
      <TouchableOpacity onPress={() => setCount(count + 1)}>
        <View style={{borderLeftWidth: 1, borderLeftColor: '#eee', paddingRight: 10, paddingLeft: 10}}> 
          <Text style={{color: '#47d9a8'}}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    // flex:1,
    // justifyContent: 'space-between'
  },
  container: {
    flex: 1,
    marginTop:5
  },
  borderView: {
    borderWidth: 1,
    borderColor: 'black'
  }
});