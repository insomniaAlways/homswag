import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, SafeAreaView, StyleSheet, FlatList, Modal, TouchableOpacity } from 'react-native';
import { fetchOrder } from '../../store/actions/orderActions'
import DefaultStyles from '../style/customStyles';
import Constants from 'expo-constants';
import AddAddressModal from '../components/addAddressModal';
import CustomHeader from '../components/customHeader';
import { fetchAddress, creatNew} from '../../store/actions/addressActions';
import { Layout, List, Text } from '@ui-kitten/components';

function AddressScreen(props) {
  const { address, getAddress } = props;
  const addresses = address.values
  const [ modalVisible, setModalVisible ] = useState(false)

  useEffect(() => {
    getAddress()
  }, [])

  const renderItem = ({ item, index }) => (
    <Layout>
      <Text></Text>
      <Text></Text>
      <Text></Text>
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
          <Text>No order found</Text>
        </View>
      )
    }
  }
  return (
    <View style={{flex: 1}}>
      <CustomHeader {...props}/>
      <SafeAreaView style={{flex: 1}}>
        <AddressList />
        <View style={[{height: 55}, DefaultStyles.brandBackgroundColor]}>
          <TouchableOpacity style={[styles.button, DefaultStyles.brandColorButton]} onPress={() => setModalVisible(true)}>
            <Text style={{color:'#fff', fontSize: 18, fontWeight: 'bold', width: '100%', textAlign: 'center'}}>Add new Address</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
            <AddAddressModal setModalVisible={setModalVisible} modalVisible={modalVisible}/>
        </Modal>
      </SafeAreaView>
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
  }
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