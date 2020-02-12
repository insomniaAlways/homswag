import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import DefaultStyles from '../style/customStyles';
import Constants from 'expo-constants';
import CustomHeader from '../components/customHeader';
import { fetchAddress, creatNew} from '../../store/actions/addressActions';
import { Layout, List, Text, Modal, Spinner } from '@ui-kitten/components';

function AddressScreen(props) {
  const { address, getAddress, navigation } = props;
  const addresses = address.values
  const [ isLoading, setLoading ] = useState(false)

  useEffect(() => {
    getAddress()
  }, [])

  useEffect(() => {
    setLoading(address.isLoading)
  }, [address.isLoading])

  const renderItem = ({ item, index }) => (
    <Layout>
      <Text>{item.address.formatedAddress}</Text>
      <Text>{item.address.localAddress}</Text>
      <Text>{item.address.landmark}</Text>
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
    paddingVertical: 16,
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
})

mapStateToProps = state => {
  return {
    address: state.addresses
  }
}

mapDispatchToProps = dispatch => {
  return {
    getAddress: () => dispatch(fetchAddress())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressScreen);