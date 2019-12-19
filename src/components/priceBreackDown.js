import React from 'react';
import { View, Text } from 'react-native';

function PriceBreakDown() {
  return (
    <View style={{}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingLeft:10, paddingBottom: 5}}>
        <Text>Item total</Text>
        <View style={{flexDirection: 'row', width: 70, justifyContent: 'space-between'}}>
          <Text>: </Text>
          <Text>700</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingLeft:10, paddingBottom: 5}}>
        <Text>Total discount</Text>
        <View style={{flexDirection: 'row', width: 70, justifyContent: 'space-between'}}>
          <Text>: </Text>
          <Text>700</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingLeft:10, paddingBottom: 5}}>
        <Text>Taxes</Text>
        <View style={{flexDirection: 'row', width: 70, justifyContent: 'space-between'}}>
          <Text>: </Text>
          <Text>700</Text>
        </View>
      </View>
      <View style={{borderColor: '#eee', borderWidth: .5}}></View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingLeft:10, paddingBottom: 5, paddingTop: 5}}>
        <Text>Total</Text>
        <View style={{flexDirection: 'row', width: 70, justifyContent: 'space-between'}}>
          <Text>: </Text>
          <Text>700</Text>
        </View>
      </View>
      <View style={{padding: 10, alignItems: 'center', backgroundColor: '#47d9a8', marginLeft: 30, marginRight: 30, marginTop: 10, borderRadius: 50}}>
        <Text style={{color: "#fff", fontWeight: "bold"}}>You saved total Rs. 300</Text>
      </View>
    </View>
  )
}

export default PriceBreakDown;