import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Text, Modal, Spinner } from '@ui-kitten/components';
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
  const { navigation, cart, user, cartItem } = props;
  const [ isLoading, setLoading ] = useState(false)

  useEffect(() => {
    if(user.id) {
      props.getCart(user.id)
    }
  }, [])

  useEffect(() => {
    if(cart.isLoading || cartItem.isLoading) {
      setLoading(true)
    } else if(!cart.isLoading && !cartItem.isLoading){
      setLoading(false)
    }
  }, [cart.isLoading, cartItem.isLoading])

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 14}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{padding: 10, fontWeight: 'bold'}}>Added Items: </Text>
          <CartItemList cart={cart.values} cartItems={cartItem.values} setLoading={setLoading}/>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={isLoading}
        backdropStyle={styles.modal}
        onBackdropPress={() => {
          setLoading(false);
        }}>
          <View style={styles.modalContainer}>
            <View style={styles.controlContainer}>
              <Spinner status='control'/>
            </View>
          </View>
      </Modal>
    </View>
  );
}

mapStateToProps = state => {
  return {
    cart: state.cart,
    cartItem: state.cartItems,
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
  },
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
})


