import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import ModifyButton from './itemModifyButton';
import AddToCartButton from './addToCartButton';
import { connect } from 'react-redux';
import _ from 'lodash';
import { FontAwesome } from '@expo/vector-icons';

function ItemRow(props) {
  const { item, cartItems, cart } = props;
  const [ isItemAdded, setIsItemAdded ] = useState(false)

  useEffect(() => {
    console.log(cartItems.isLoading, cartItems)
    if(_.find(cartItems.values, ['item.id', item.id])) {
      setIsItemAdded(true)
    } else {
      setIsItemAdded(false)
    }
  }, [cartItems.isLoading, cartItems.values.length])

  const accessoryAddButton = () => (
    <AddToCartButton type={'cart-items'} item={item} cart={cart} cartItems={cartItems.values}/>
  );

  const accessoryModifyButton = () => (
    <ModifyButton type={'cart-items'} item={item} cart={cart} cartItems={cartItems.values} cartItem={_.find(cartItems.values, ['item.id', item.id])}/>
  );

  let RightAction = accessoryAddButton
  if(cartItems.values && cartItems.values.length && isItemAdded) {
    RightAction = accessoryModifyButton
  }

  return (
    <View style={{flexDirection: 'row', borderBottomColor: '#eee', borderBottomWidth: 1, padding: 10}}>
      <View style={{flex: 1, backgroundColor: "green", height: 60}}>
      </View>
      <View style={{flex: 4, justifyContent: 'center', paddingLeft: 10, paddingRight: 10}}>
        <Text>{item.name}</Text>
        <Text style={{fontSize: 12}}><FontAwesome name="rupee" size={12} color="black" /> {item.price}</Text>
        <Text style={{fontSize: 12, textTransform: "capitalize"}}>{item.description}</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', paddingLeft: 10, paddingRight: 10}}>
        <RightAction />
      </View>
    </View>
  )
}

const mapStateToProps = state => {
  return  {
    cartItems: state.cartItems
  }
}

export default connect(mapStateToProps)(ItemRow);