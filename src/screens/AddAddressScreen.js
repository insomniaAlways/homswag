import React, { useState, useEffect }from 'react';
import { View, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import FloatingInput from '../components/input-helpers.js/floatingInput';
import { connect } from 'react-redux';
import { geoCoding } from '../../store/actions/locationActions';
import { creatNew, fetchAddress } from '../../store/actions/addressActions';
import { Modal, Spinner, Layout } from '@ui-kitten/components';
import { KeyboardAvoidingView } from '../components/KeyboardAvoidView'

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
  const { location, getGeoCoding, addNewAddress, getfetchAddress, navigation } = props
  const previousScreen = navigation.getParam('previousRoute')
  const [ isCurrentLoactionLoaded, setCoodinatesLoaded ] = useState(false)
  const [ locationValue, setLocationValue ] = useState(locationValueObject)
  const [ isLoading, setLoading ] = useState(false)
  
  useEffect(() => {
    if(!location.isLoading && location.values && location.values.results && location.values.results.length) {
      let address = location.values.results[0]
      let { formatted_address, geometry, place_id } = address
      setLocationValue({...locationValue, formatedAddress: formatted_address, geometry: geometry.location, place_id: place_id})
      setLoading(false)
    }
  },[location.isLoading])

  const onSuccess = async (geolocation) => {
    const { latitude, longitude} = geolocation.coords
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
    setLoading(true)
    let saveAddress = await addNewAddress({address: locationValue})
    let allAddress = await getfetchAddress()
    setLoading(false)
    navigation.navigate(previousScreen)
  }

  return (
    <KeyboardAvoidingView>
      <View style={{flex: 1}}>
        <MapView style={{flex: 9}}
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={isLoading}
        backdropStyle={styles.modal}
        onBackdropPress={() => {
          return false
        }}>
          <Layout style={styles.modalContainer}>
            <Layout style={styles.controlContainer}>
              <Spinner status='control'/>
            </Layout>
          </Layout>
      </Modal>
    </KeyboardAvoidingView>
  )
}

const mapStateToProps = state => ({
  location : state.location
})

const mapDispatchToProps = dispatch => ({
  getGeoCoding: (latitude, longitude) => dispatch(geoCoding(latitude, longitude)),
  addNewAddress: (locationValue) => dispatch(creatNew(locationValue)),
  getfetchAddress: () => dispatch(fetchAddress())
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressScreen);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  controlContainer: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#3366FF',
  }
})