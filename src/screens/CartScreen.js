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

function CartScreen(props) {
  const { navigation, cart, user, cartItems } = props;
  console.log(cartItems)
  

  useEffect(() => {
    if(user.id) {
      props.getCart(user.id)
    }
  }, [])

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 11}}>
        <ScrollView>
          <Text style={{padding: 10, fontWeight: 'bold'}}>Added Items: </Text>
          <CartItemList cart={cart.values} cartItems={cartItems.values}/>
          <View style={{height: 7, backgroundColor: '#eee'}}></View>
          <View style={{paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 16, fontWeight: "bold"}}>Appointment Date</Text>
            <Text style={{fontSize: 16}}>21/11/19</Text>
          </View>
          <View style={{paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 16, fontWeight: "bold"}}>Time stot</Text>
            <Text style={{fontSize: 16}}>9am-12pm</Text>
          </View>
          <View style={{height: 7, backgroundColor: '#eee'}}></View>
          <View style={{paddingLeft: 10, paddingTop: 10}}>
            <Text style={{paddingBottom: 10}}>People also search for:</Text>
            <ScrollView horizontal={true}>
              <ItemSmallCard />
              <ItemSmallCard />
              <ItemSmallCard />
              <ItemSmallCard />
              <ItemSmallCard />
              <ItemSmallCard />
              <ItemSmallCard />
            </ScrollView>
          </View>
          <View style={{padding: 10}}>
            <Text style={{paddingTop: 10, paddingBottom: 10, fontWeight: "bold"}}>Price Breakdown: </Text>
            <PriceBreakDown />
          </View>
        </ScrollView>
      </View>
      <View style={styles.container}>
       <TouchableOpacity
         style={styles.button}
       >
         <Text style={{color:'#fff'}}>Chect out</Text>
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
    backgroundColor: '#47d9a8',
    padding: 15,
    color:'#fff'
  },
  countContainer: {
    alignItems: 'center',
    padding: 10
  }
})


