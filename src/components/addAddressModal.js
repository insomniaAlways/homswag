import React, { useState, useEffect }from 'react';
import { View, Text, KeyboardAvoidingView, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import FloatingInput from '../components/input-helpers.js/floatingInput';
import DefaultStyles from '../style/customStyles';
import { connect } from 'react-redux';
import { geoCoding } from '../../store/actions/locationActions';
import { creatNew } from '../../store/actions/addressActions';

const initialRegion = {
  latitude: 12.97194,
  longitude: 77.59369,
  latitudeDelta: 0.1422,
  longitudeDelta: 0.0401,
}

const locationValueObject = {
  formatedAddress: '',
  geometry: {},
  place_id: '',
  localAddress: '',
  landmark: '',
}

function AddressScreen(props) {
  const [ coordinates, setCoodinates ] = useState()
  const { location, getGeoCoding, addNewAddress } = props
  const [ isCurrentLoactionLoaded, setCoodinatesLoaded ] = useState(false)
  const [ locationValue, setLocationValue ] = useState(locationValueObject)
  const [ isLoading, setLoading ] = useState(false)
  
  useEffect(() => {
    if(!location.isLoading && location.values && location.values.results && location.values.results.length) {
      let address = location.values.results[0]
      let { formatted_address, geometry, place_id } = address
      setLocationValue({...locationValue, formatedAddress: formatted_address, geometry: geometry.location, place_id: place_id})
    }
  },[location.isLoading])

  const onSuccess = async (geolocation) => {
    const { latitude, longitude, altitude, accuracy} = geolocation.coords
    setCoodinates({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0122,
      longitudeDelta: 0.0101,
    })
    let getLocation = await getGeoCoding(latitude, longitude)
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

  const save = async () => {
    let saveAddress = await addNewAddress({address: locationValue})
    props.setModalVisible(false)
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
      <View style={{flex: 1}}>
        <MapView style={{flex: 5}}
          initialRegion={initialRegion}
          region={isCurrentLoactionLoaded ? coordinates : initialRegion}
        >
          {isCurrentLoactionLoaded && coordinates && coordinates.latitude && <Marker coordinate={coordinates}/>}
        </MapView>
        <View style={{flex: 3, paddingLeft: 30, paddingRight: 30, paddingTop: 5}}>
          <FloatingInput label="Your location" style={{paddingTop: 10}}
            setValue={setLocationValue}
            value={locationValue.formatedAddress}
            previousState={locationValue}
            itemKey={'formatedAddress'}
            disabled={true}/>
          <FloatingInput label="House No/Room no" style={{paddingTop: 10}}
            setValue={setLocationValue}
            value={locationValue.localAddress}
            previousState={locationValue}
            itemKey={'localAddress'}
            disabled={false}/>
          <FloatingInput label="Landmark" style={{paddingTop: 10}}
            setValue={setLocationValue}
            value={locationValue.landmark}
            previousState={locationValue}
            itemKey={'landmark'}
            disabled={false}/>
          <View style={{padding: 20}}>
            <Button title="Save" onPress={() => save()} />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const mapStateToProps = state => ({
  location : state.location
})

const mapDispatchToProps = dispatch => ({
  getGeoCoding: (latitude, longitude) => dispatch(geoCoding(latitude, longitude)),
  addNewAddress: (locationValue) => dispatch(creatNew(locationValue))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressScreen);