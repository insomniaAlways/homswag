import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, SafeAreaView, StyleSheet, FlatList, Modal, TouchableOpacity } from 'react-native';
import { fetchOrder } from '../../store/actions/orderActions'
import DefaultStyles from '../style/customStyles';
import Constants from 'expo-constants';
import AddAddressModal from '../components/addAddressModal';
import CustomHeader from '../components/customHeader';

function AddressScreen(props) {
  const { addresses } = props;
  const [ modalVisible, setModalVisible ] = useState(false)

  const AddressList = function() {
    if(addresses && Array.isArray(addresses) && addresses.length) {
      return (
        <FlatList
          data={addresses}
          renderItem={(address) => <OrderItem order={address} />}
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
})

mapStateToProps = state => {
  return {
    addresses: state.addresses.values
  }
}

mapDispatchToProps = dispatch => {
  return {
    getOrders: () => dispatch(fetchOrder())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressScreen);