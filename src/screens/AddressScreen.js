import React, { useState, useEffect }from 'react';
import { View, Text, KeyboardAvoidingView, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import FloatingInput from '../components/input-helpers.js/floatingInput';
import DefaultStyles from '../style/customStyles';

const initialRegion = {
  latitude: 12.97194,
  longitude: 77.59369,
  latitudeDelta: 0.1422,
  longitudeDelta: 0.0401,
}

let isCurrentLoactionLoaded = false;

function AddressScreen() {
  const [ coordinates, setCoodinates ] = useState()
  const [ isCurrentLoactionLoaded, setCoodinatesLoaded ] = useState(false)
  const [ locationValue, setLocationValue ] = useState({})

  const onSuccess = (geolocation) => {
    const { latitude, longitude, altitude, accuracy} = geolocation.coords
    console.log(geolocation)
    setCoodinates({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0122,
      longitudeDelta: 0.0101,
    })
    setCoodinatesLoaded(true)
  }
  const onError = (a,b,c,d) => {
    console.log(a,b,c,d)
  }

  useEffect(() => {
    if(!isCurrentLoactionLoaded) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy: true, maximumAge: 0});
    }
  }, [])

  return (
    <KeyboardAvoidingView style={{flex: 1,marginTop: 30}} behavior="padding" enabled>
      <View style={{flex: 1}}>
        <View style={[{height: 60, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10}, DefaultStyles.brandBackgroundColor]}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18, width: '100%'}}>Add Address</Text>
        </View>
        <MapView style={{flex: 5}}
          initialRegion={initialRegion}
          region={isCurrentLoactionLoaded && coordinates}
        >
          {isCurrentLoactionLoaded && coordinates && coordinates.latitude && <Marker coordinate={coordinates}/>}
        </MapView>
        <View style={{flex: 3, paddingLeft: 30, paddingRight: 30, paddingTop: 5}}>
          <FloatingInput label="Your location" style={{paddingTop: 10}}/>
          <FloatingInput label="House No/Room no" style={{paddingTop: 10}}/>
          <FloatingInput label="Landmark" style={{paddingTop: 10}}/>
          <View style={{padding: 20}}>
            <Button title="Save" onPress={() => alert('save')} />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default AddressScreen;