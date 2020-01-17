import React from 'react';
import { View, Text } from 'react-native';
import ModifyButton from './itemModifyButton';
import AddToCartButton from './addToCartButton';
import { connect } from 'react-redux';
import _ from 'lodash';
import { FontAwesome } from '@expo/vector-icons';

function ItemRow(props) {
  const { item, cartItems, cart } = props;
  
  const isItemAdded = () => {
    return _.find(cartItems, ['item.id', item.id])
  }

  const accessoryAddButton = (style, index) => (
    <AddToCartButton type={'cart-items'} item={item} cart={cart} cartItems={cartItems}/>
  );

  const accessoryModifyButton = (style, index) => (
    <ModifyButton type={'cart-items'} item={item} cart={cart} cartItems={cartItems} cartItem={isItemAdded(item)}/>
  );

  let RightAction = accessoryAddButton
  if(cartItems && cartItems.length && isItemAdded()) {
    RightAction = accessoryModifyButton
  }

  return (
    <View style={{flexDirection: 'row', borderBottomColor: '#eee', borderBottomWidth: 1, padding: 10}}>
      <View style={{flex: 2, backgroundColor: "#5DDE92", height: 100}}>
      </View>
      <View style={{flex: 4, justifyContent: 'flex-start', paddingLeft: 10, paddingRight: 10}}>
        <Text>{item.name}</Text>
        <Text style={{fontSize: 12}}><FontAwesome name="rupee" size={12} color="black" /> {item.price}</Text>
        <Text style={{fontSize: 12, textTransform: "capitalize"}}>{item.description}</Text>
      </View>
      <View style={{flex: 1.5, justifyContent: 'center', paddingLeft: 10, paddingRight: 10}}>
        <RightAction />
      </View>
    </View>
  )
}

const mapStateToProps = state => {
  return  {
    cartItems: state.cartItems.values
  }
}

export default connect(mapStateToProps)(ItemRow);