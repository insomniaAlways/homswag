import React, { useState, useEffect }from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import FloatingInput from '../components/input-helpers.js/floatingInput';
import { connect } from 'react-redux';
import { geoCoding } from '../../store/actions/locationActions';
import { creatNew, fetchAddress } from '../../store/actions/addressActions';
import { Modal, Spinner, Layout, Text } from '@ui-kitten/components';
import { KeyboardAvoidingView } from '../components/KeyboardAvoidView'
import _ from 'lodash';
import { FontAwesome } from '@expo/vector-icons';
import { Label } from 'native-base';
import * as Permissions from 'expo-permissions';
import { brandColor } from '../style/customStyles';

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

  const onError = () => {
    alert("We need location service permission to fetch your current location")
  }

  const onRegionChange = (latitude, longitude) => {
    setLoading(true)
    setCoodinates({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0122,
      longitudeDelta: 0.0101,
    })
    async function saveData() {
      await getGeoCoding(latitude, longitude)
      setCoodinatesLoaded(true)
      setLoading(false)
    }
    saveData()
  }

  const debounceCall = _.debounce(onRegionChange, 500);

  useEffect(() => {
    if(!isCurrentLoactionLoaded) {
      async function getPemission() {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
          return navigator.geolocation.getCurrentPosition(
            ({coords}) => debounceCall(coords.latitude, coords.longitude),
            onError, {enableHighAccuracy: true, maximumAge: 0});
        } else {
          return alert("We need location service permission to fetch your current location.")
        }
      }
      getPemission()
    }
  }, [])

  const save = async () => {
    setLoading(true)
    await addNewAddress({address: locationValue})
    await getfetchAddress()
    setLoading(false)
    navigation.navigate(previousScreen)
  }

  return (
    <KeyboardAvoidingView extraHeight={100} showsVerticalScrollIndicator={false}>
      <View style={{flex: 1}}>
        <View style={isCurrentLoactionLoaded && coordinates && coordinates.latitude ? styles.padding_b : styles.padding_a}>
          <MapView style={{height: 300}}
            initialRegion={initialRegion}
            onRegionChangeComplete={({latitude, longitude}) => debounceCall(latitude, longitude)}
            showsUserLocation={true}
            loadingEnabled={true}
            showsMyLocationButton={true}
            showsCompass={true}
            followsUserLocation={true}/>
          { isCurrentLoactionLoaded && coordinates && coordinates.latitude && 
            <View style={{position: 'absolute', top: 115, left: '48%', justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesome name="map-marker" size={40} color="red" />
            </View>
          }
        </View>
        <View style={{flex: 3, paddingLeft: 30, paddingRight: 30, paddingTop: 5, justifyContent: 'center'}}>
          {locationValue && locationValue.formatedAddress ? 
            <View style={{paddingTop: 10}}>
              <Text style={{color: 'rgba(0,0,0,0.5)'}}>Current Location</Text>
              <Text style={{marginTop: 5}}>{locationValue.formatedAddress}</Text>
            </View> :
            <View style={{borderBottomWidth: 1, borderColor: '#eee', marginTop: 30}}>
              <Label style={{fontSize: 18, color: 'rgba(0,0,0,0.64)'}}>Current Location</Label>
            </View>
          }
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
          <View style={{padding: 20, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity style={{width: 150, backgroundColor: brandColor, justifyContent: 'center', alignItems: 'center', paddingVertical: 10, borderRadius: 20}} onPress={() => save()}>
              <Text style={{color: '#fff', width: '100%', textAlign: 'center'}}>Save</Text>
            </TouchableOpacity>
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
  },

  padding_a: {
    padding: 1
  },
  padding_b: {
    padding: 2
  }
})