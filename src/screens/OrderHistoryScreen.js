import React from 'react';
import { connect } from 'react-redux';
import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native';
import { fetchOrder } from '../../store/actions/orderActions'
import OrderList from '../components/orderList';
import DefaultStyles from '../style/customStyles';

function ProfileScreen(props) {
  const { orders } = props;
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={[{height: 60, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 10, paddingRight: 10}, DefaultStyles.brandBackgroundColor]}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18, width: '100%'}}>Order History</Text>
        </View>
        <OrderList orders={orders}/>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1
  }
})

mapStateToProps = state => {
  return {
    orders: state.orders.values
  }
}

mapDispatchToProps = dispatch => {
  return {
    getOrders: () => dispatch(fetchOrder())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);