import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Text } from '@ui-kitten/components';
import { fetchItems } from '../../store/actions/itemActions';
import { connect } from 'react-redux';
import CartItemList from '../components/cartItemList';
import { fetchCart } from '../../store/actions/cartAction';
import DatePickerComponent from '../components/datePickerComponent';
import ItemSmallCard from '../components/itemSmallCard';
import PriceBreakDown from '../components/priceBreackDown';
import SelectAddress from '../components/selectaddress';
import DefaultStyles from '../style/customStyles';
import AppointmentDetails from '../components/appointmentDetails';

function CartScreen(props) {
  const { navigation, cart, user, cartItems } = props;

  useEffect(() => {
    if(user.id) {
      props.getCart(user.id)
    }
  }, [])

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 14}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{padding: 10, fontWeight: 'bold'}}>Added Items: </Text>
          <CartItemList cart={cart.values} cartItems={cartItems.values}/>
          <View style={{height: 7, backgroundColor: '#eee'}}></View>
          <AppointmentDetails />
          <View style={{height: 7, backgroundColor: '#eee'}}></View>
          <View style={{paddingLeft: 10, paddingTop: 10}}>
            <Text style={{paddingBottom: 10}}>People also search for:</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <ItemSmallCard id={211}/>
              <ItemSmallCard id={212}/>
              <ItemSmallCard id={213}/>
              <ItemSmallCard id={214}/>
              <ItemSmallCard id={215}/>
              <ItemSmallCard id={216}/>
              <ItemSmallCard id={217}/>
            </ScrollView>
          </View>
          <View style={{padding: 10}}>
            <Text style={{paddingTop: 10, paddingBottom: 10, fontWeight: "bold"}}>Price Breakdown: </Text>
            <PriceBreakDown />
          </View>
        </ScrollView>
      </View>
      {/* <View style={{borderTopWidth: 2, borderTopColor: '#eee', padding: 10, justifyContent: 'center', minHeight: 30, height: 100}}>
        <SelectAddress navigation={navigation}/>
      </View> */}
      <View style={[{height: 55}, DefaultStyles.brandBackgroundColor]}>
       <TouchableOpacity style={[styles.button, DefaultStyles.brandColorButton]} onPress={() => navigation.navigate('SelectPaymentType')}>
        <Text style={{color:'#fff', fontSize: 18, fontWeight: 'bold', width: '100%', textAlign: 'center'}}>Next</Text>
       </TouchableOpacity>
      </View>
    </View>
  );
}

mapStateToProps = state => {
  return {
    cart: state.cart,
    cartItems: state.cartItems,
    user: state.user
  }
}

mapDispatchToProps = dispatch => {
  return {
    getCart: (user_id) => dispatch(fetchCart(user_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    padding: 15,
    color:'#fff'
  },
  countContainer: {
    alignItems: 'center',
    padding: 10
  }
})


