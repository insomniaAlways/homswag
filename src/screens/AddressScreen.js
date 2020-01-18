import React from 'react';
import { connect } from 'react-redux';
import { View, Text, SafeAreaView, StyleSheet, Image, FlatList, Button } from 'react-native';
import { fetchOrder } from '../../store/actions/orderActions'
import OrderList from '../components/orderList';
import DefaultStyles from '../style/customStyles';
import Constants from 'expo-constants';


function AddressScreen(props) {
  const { addresses } = props;

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
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={[{height: 60, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10}, DefaultStyles.brandBackgroundColor]}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18, width: '100%'}}>Address</Text>
        </View>
        <AddressList />
        <Button title="Add Adress" onPress={() => props.navigation.navigate('AddAddress')} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1
  }
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