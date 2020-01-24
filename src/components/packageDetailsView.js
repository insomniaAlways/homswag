import React from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import DefaultStyles from '../style/customStyles';

const PackageDetails = (props) => {
  const packageService = props.tab

  return (
    <View style={{flex: 1, padding: 20, justifyContent: 'center', paddingTop: 0}}>
      <View>
        <Text style={{fontSize: 30, fontStyle: 'italic', textAlign: 'center'}}>
          <FontAwesome name="rupee" size={30} color="black" />
          {packageService.price}
        </Text>
      </View>
      <View style={{marginTop: 10}}>
        {packageService.items.map((item, index) => {
          return (
            <View key={index} style={{padding: 10}}>
              <Text style={{textAlign: 'center', fontSize: 18}}>{item.name}</Text>
            </View>
          )
        })}
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
        <TouchableOpacity style={[DefaultStyles.brandBackgroundColor, {paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, borderRadius: 5}]}>
          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16, width: 100, textAlign: 'center'}}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default PackageDetails;