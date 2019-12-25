import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import DefaultStyles from '../style/customStyles';
import { connect } from 'react-redux';
import { fetchCart } from '../../store/actions/cartAction';

function PriceBreakDown(props) {
  const { cart, cartItems } = props;
  const { item_total_price, discount_amount, taxes, total_price, total_saved } = cart.values;

  useEffect(() => {
    props.getCartData()
  },[]);
  
  useEffect(() => {
    props.getCartData()
  },[cartItems.isLoading])

  return (
    <View style={{}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingLeft:10, paddingBottom: 5}}>
        <Text>Item total</Text>
        <View style={{flexDirection: 'row', width: 70, justifyContent: 'space-between'}}>
          <Text>: </Text>
          <Text>{item_total_price}</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingLeft:10, paddingBottom: 5}}>
        <Text>Total discount</Text>
        <View style={{flexDirection: 'row', width: 70, justifyContent: 'space-between'}}>
          <Text>: </Text>
          <Text>{discount_amount}</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingLeft:10, paddingBottom: 5}}>
        <Text>Taxes</Text>
        <View style={{flexDirection: 'row', width: 70, justifyContent: 'space-between'}}>
          <Text>: </Text>
          <Text>{taxes}</Text>
        </View>
      </View>
      <View style={{borderColor: '#eee', borderWidth: .5}}></View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingLeft:10, paddingBottom: 5, paddingTop: 5}}>
        <Text>Total</Text>
        <View style={{flexDirection: 'row', width: 70, justifyContent: 'space-between'}}>
          <Text>: </Text>
          <Text>{total_price}</Text>
        </View>
      </View>
      <View style={[{padding: 10, alignItems: 'center', marginLeft: 30, marginRight: 30, marginTop: 10, borderRadius: 50 }, DefaultStyles.brandBackgroundColor]}>
        <Text style={{color: "#fff", fontWeight: "bold", width: '100%', textAlign: 'center'}}>You saved total Rs. {total_saved}</Text>
      </View>
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    cartItems: state.cartItems
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCartData: (user_id) => dispatch(fetchCart(user_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceBreakDown);