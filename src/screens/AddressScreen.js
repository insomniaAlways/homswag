import React, { useState, useEffect }from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

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
    <View style={{flex: 1}}>
    <View style={{flex: 1}}><Text>Something</Text></View>
    
      <MapView style={{flex: 6}}
        initialRegion={initialRegion}
        region={isCurrentLoactionLoaded && coordinates}
      >
        {isCurrentLoactionLoaded && coordinates && coordinates.latitude && <Marker coordinate={coordinates}/>}
      </MapView>
      <View style={{flex: 3}}>
        <Text>Something</Text>
        <Text>Something</Text>
        <Text>Something</Text>
        <Text>Something</Text>
      </View>
    </View>
  )
}

export default AddressScreen;