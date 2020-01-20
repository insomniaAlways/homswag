import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import ModifyButton from './itemModifyButton';
import AddToCartButton from './addToCartButton';
import { connect } from 'react-redux';
import _ from 'lodash';
import { FontAwesome } from '@expo/vector-icons';
import { fetchCartItems, creatCartItem } from '../../store/actions/cartItemAction';

function ItemRow(props) {
  const { item, cartItem, cart, creatNewCartItem, getCartItem } = props;
  const [ isAdded, setAdded ] = useState(false)
  const cartItems = cartItem.values

  const isItemAdded = () => {
    return _.find(cartItems, ['item.id', item.id])
  }

  const create = async () => {
    let newCartItem = await creatNewCartItem(item.id, (+item.price * 1))
    getCartItem()
  }

  const addCartItem = () => {
    setAdded(true)
    create()
  }

  const AccessoryAddButton = () => (
    <AddToCartButton
      type={'cart-items'}
      item={item}
      cart={cart}
      cartItems={cartItems}
      isAdded={isAdded}
      setAdded={addCartItem}/>
  );

  const AccessoryModifyButton = () => (
    <ModifyButton
      type={'cart-items'}
      item={item}
      cart={cart}
      cartItems={cartItems}
      cartItem={isItemAdded()}
      removeCartItem={setAdded}/>
  );

  const [ RightAction, setRightAction ] = useState(AccessoryAddButton)

  useEffect(() => {
    if(cartItems && cartItems.length && isItemAdded()) {
      setAdded(true)
    }
    if(isAdded && (cartItems && cartItems.length && isItemAdded())) {
      setRightAction(AccessoryModifyButton)
    } else {
      setRightAction(AccessoryAddButton)
    }
  }, [isAdded, cartItem.isLoading])
  

  return (
    <View style={{flexDirection: 'row', borderBottomColor: '#eee', borderBottomWidth: 1, padding: 10}}>
      <View style={{flex: 2, backgroundColor: "#5DDE92", height: 100}}>
      </View>
      <View style={{flex: 4, justifyContent: 'flex-start', paddingLeft: 10, paddingRight: 10}}>
        <Text style={{fontWeight: 'bold', fontSize: 16, color: "#1C2833"}}>{item.name}</Text>
        {/* <View style={{flexDirection: 'row'}}> */}
          <Text style={{fontSize: 14, textDecorationLine: 'line-through', marginRight: 20}}><FontAwesome name="rupee" size={12} color="black" /> {item.mrp_price}</Text>
          <Text style={{fontSize: 14, fontWeight: 'bold'}}><FontAwesome name="rupee" size={12} color="black" /> {item.price}</Text>
        {/* </View> */}
          <Text style={{fontSize: 12, textTransform: "capitalize", paddingTop: 10}}>{item.description}</Text>
      </View>
      <View style={{flex: 1.5, justifyContent: 'center', paddingLeft: 10, paddingRight: 10}}>
        {RightAction}
      </View>
    </View>
  )
}

const mapStateToProps = state => {
  return  {
    cartItem: state.cartItems
  }
}
const mapDispatchToProps = dispatch => {
  return {
    creatNewCartItem: (item, quantity, totalPrice, cartItemId) => dispatch(creatCartItem(item, quantity, totalPrice, cartItemId)),
    getCartItem: () => dispatch(fetchCartItems())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemRow);