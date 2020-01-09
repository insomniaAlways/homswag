import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { fetchOrder } from '../../store/actions/orderActions'

function ProfileScreen(props) {
  const { orders } = props;
  console.log(orders)
  return (
    <ScrollView>
      <View style={styles.container}>
        
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30
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