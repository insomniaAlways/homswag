import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, List, Text, Modal, Spinner } from '@ui-kitten/components';
import { isLoading } from 'expo-font';

const AddressList = function(props) {
  const { addresses, setSelectedAddress, setModal } = props

  const onSelect = (address) => {
    if(setSelectedAddress) {
      setSelectedAddress(address)
      setModal(false)
    }
  }

  const RenderItem = ({address}) => {
    return (
    <TouchableOpacity onPress={() => onSelect(address)}>
      <Layout>
        <Text>{address.address.formatedAddress}</Text>
        <Text>{address.address.localAddress}</Text>
        <Text>{address.address.landmark}</Text>
      </Layout>
    </TouchableOpacity>
  )};

  if(addresses.values && Array.isArray(addresses.values) && addresses.values.length) {
    return (
      <Layout style={[styles.addressList ,props.style]}>
        {addresses.values.map((address) => (<RenderItem key={address.id} address={address} />))}
      </Layout>
    )
  } else {
    return (
      <View style={[{flex: 1, justifyContent: 'center', alignItems: 'center'}, props.style]}>
        { addresses.isLoading ? (
          <Layout style={styles.loaderContainer}>
            <Spinner status='success' style={{height: 20, width: 20}}/>
            <Text>Loading...</Text>
          </Layout>
        ) : 
          <Text>No Address found</Text>
        }
      </View>
    )
  }
}

export default AddressList;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: 15,
    color:'#fff'
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addressList: {
    flex: 1
  }
})