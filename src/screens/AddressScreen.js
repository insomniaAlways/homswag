import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import DefaultStyles from '../style/customStyles';
import Constants from 'expo-constants';
import CustomHeader from '../components/customHeader';
import { fetchAddress, deleteAddresss, updateAddress } from '../../store/actions/addressActions';
import { Layout, List, Text, Spinner } from '@ui-kitten/components';
import { FontAwesome } from '@expo/vector-icons';

function AddressScreen(props) {
  const { address, getAddress, navigation, deleteSelected, setDefault } = props;
  const addresses = address.values
  const [ isLoading, setLoading ] = useState(false)

  useEffect(() => {
    getAddress()
  }, [])

  const deleteRecord = (value) => {
    deleteSelected(value.id)
  }

  const setDefaultAddress = (value) => {
    setDefault(value.id, true)
  }

  useEffect(() => {
    setLoading(address.isLoading)
  }, [address.isLoading])

  const renderItem = ({ item, index }) => (
    <Layout style={{paddingHorizontal: 20, marginBottom: 10, paddingTop: 10, borderRadius: 10}}>
      <Layout style={{flexDirection: 'row'}}>
        <Layout style={{marginRight: 10}}>
          <FontAwesome name="map-marker" size={20} color="black" />
        </Layout>
        <Layout>
          <Text style={{fontFamily: 'roboto-regular'}}>{item.address.formatedAddress}</Text>
          {item.address.localAddress ? <Text style={{fontFamily: 'roboto-regular'}}>{item.address.localAddress}</Text> : null }
          {item.address.landmark ? <Text style={{fontFamily: 'roboto-regular'}}>{item.address.landmark}</Text> : null}
        </Layout>
      </Layout>
      <Layout style={{flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 20, paddingVertical: 10}}>
        {item.is_default ? 
          <View style={{marginRight: 30}}><Text style={styles.isDefaultTrue}>Set default</Text></View>:
          <TouchableOpacity onPress={() => setDefaultAddress(item)} style={{marginRight: 30}}><Text style={styles.isDefaultFalse}>Set default</Text></TouchableOpacity>
        }
        {item.is_default ? 
          <View><Text style={styles.deleteButtonTrue}>Delete</Text></View>:
          <TouchableOpacity onPress={() => deleteRecord(item)}><Text style={styles.deleteButtonFalse}>Delete</Text></TouchableOpacity>
        }
      </Layout>
    </Layout>
  );


  const AddressList = function() {
    if(addresses && Array.isArray(addresses) && addresses.length) {
      return (
        <List
          contentContainerStyle={styles.addressList}
          showsVerticalScrollIndicator={false}
          data={address.values}
          refreshing={false}
          onRefresh={() => alert('hello')}
          renderItem={renderItem}
        />
      )
    } else {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>No Address found</Text>
        </View>
      )
    }
  }
  return (
    <View style={{flex: 1}}>
      <CustomHeader {...props}/>
      {address.isLoading ? (
        <Layout style={styles.loaderContainer}>
          <Spinner status='success' style={{height: 20, width: 20}}/>
          <Text>Loading...</Text>
        </Layout>
      ) : ( 
        <SafeAreaView style={{flex: 1}}>
          <AddressList />
          <View style={[{height: 55}, DefaultStyles.brandBackgroundColor]}>
            <TouchableOpacity style={[styles.button, DefaultStyles.brandColorButton]} onPress={() => navigation.navigate('AddAddress', { previousRoute: 'Address' })}>
              <Text style={{color:'#fff', fontSize: 18, fontWeight: 'bold', width: '100%', textAlign: 'center'}}>Add new Address</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1
  },
  button: {
    alignItems: 'center',
    padding: 15,
    color:'#fff'
  },
  addressList: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  productItem: {
    flex: 1,
    margin: 8,
    borderRadius: 10,
  },
  itemHeader: {
    height: 140,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  isDefaultTrue: {
    color: 'grey',
    fontFamily:'roboto-medium',
    fontSize: 12
  },
  isDefaultFalse: {
    color: 'green',
    fontSize: 12,
    fontFamily: 'roboto-medium'
  },
  deleteButtonTrue: {
    color: 'grey',
    fontFamily: 'roboto-medium',
    fontSize: 12
  },
  deleteButtonFalse: {
    color: 'red',
    fontFamily: 'roboto-medium',
    fontSize: 12
  }
})

mapStateToProps = state => {
  return {
    address: state.addresses
  }
}

mapDispatchToProps = dispatch => {
  return {
    getAddress: () => dispatch(fetchAddress()),
    deleteSelected: (address_id) => dispatch(deleteAddresss(address_id)),
    setDefault: (address_id, is_default) => dispatch(updateAddress(address_id, is_default))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressScreen);