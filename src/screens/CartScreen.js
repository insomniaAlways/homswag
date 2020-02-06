import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Text, Modal, Spinner, Layout } from '@ui-kitten/components';
import { fetchItems } from '../../store/actions/itemActions';
import { connect } from 'react-redux';
import CartItemList from '../components/cartItemList';
import { fetchCart } from '../../store/actions/cartAction';
import DatePickerComponent from '../components/datePickerComponent';
import PriceBreakDown from '../components/priceBreackDown';
import SelectAddress from '../components/selectaddress';
import DefaultStyles from '../style/customStyles';
import AppointmentDetails from '../components/appointmentDetails';
import CartPromoItemList from '../components/cartPromoItemList';

function CartScreen(props) {
  const { navigation, cart, user, cartItem } = props;
  const bookingDetails = navigation.getParam('bookingDetails', {})
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
    <Layout style={{flex: 1}}>
     {cartItem && cartItem.values && cartItem.values.length ? (
      <Layout style={{flex: 1}}>
        <Layout style={{flex: 14, backgroundColor: "#F7F9FC"}}>
          <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: 'transparent'}}>
            <Layout style={{marginVertical: 10, paddingVertical: 10, borderRadius: 20, marginHorizontal: 10, paddingHorizontal: 10}}>
              <Text style={{padding: 10, fontWeight: 'bold'}}>Added Items: </Text>
              <CartItemList cart={cart.values} cartItems={cartItem.values} setLoading={setLoading}/>
            </Layout>
            <Layout style={{marginVertical: 10, paddingVertical: 20, borderRadius: 20, marginHorizontal: 10}}>
              <AppointmentDetails bookingDetails={bookingDetails} navigation={navigation}/>
            </Layout>
            <Layout style={{borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingVertical: 10, paddingHorizontal: 10}}>
              <Text style={{paddingBottom: 10, marginTop: 10, paddingLeft: 10}}>People also search for:</Text>
            </Layout>
            <CartPromoItemList setLoading={setLoading}/>
            <Layout style={{marginHorizontal: 10, marginBottom: 10, borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: 10, paddingHorizontal: 10}}>
              <Text style={{paddingTop: 10, paddingBottom: 10, fontWeight: "bold"}}>Price Breakdown: </Text>
              <PriceBreakDown />
            </Layout>
          </ScrollView>
        </Layout>
        {/* <Layout style={{borderTopWidth: 2, borderTopColor: '#eee', padding: 10, justifyContent: 'center', minHeight: 30, height: 100}}>
          <SelectAddress navigation={navigation}/>
        </Layout> */}
        <Layout style={[{height: 55}, DefaultStyles.brandBackgroundColor]}>
          <TouchableOpacity style={[styles.button, DefaultStyles.brandColorButton]} onPress={() => navigation.navigate('SelectPaymentType')}>
            <Text style={{color:'#fff', fontSize: 18, fontWeight: 'bold', width: '100%', textAlign: 'center'}}>Next</Text>
          </TouchableOpacity>
        </Layout>
      </Layout> ) : (
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>No item added</Text>
        </Layout>
     )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isLoading}
        backdropStyle={styles.modal}
        onBackdropPress={() => {
          setLoading(false);
        }}>
          <Layout style={styles.modalContainer}>
            <Layout style={styles.controlContainer}>
              <Spinner status='control'/>
            </Layout>
          </Layout>
      </Modal>
    </Layout>
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


