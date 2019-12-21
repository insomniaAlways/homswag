import React from 'react';
import { View, Text } from 'react-native';
import ModifyButton from './itemModifyButton';
import AddToCartButton from './addToCartButton';
import { connect } from 'react-redux';
import _ from 'lodash';

function ItemRow(props) {
  const { item, cartItems, cart } = props;
  
  const accessoryAddButton = (style, index) => (
    <AddToCartButton type={'cart-items'} item={item} cart={cart} cartItems={cartItems}/>
  );

  const accessoryModifyButton = (style, index) => (
    <ModifyButton type={'cart-items'} item={item} cart={cart} cartItems={cartItems}/>
  );
  const isItemAdded = (item) => {
    return _.find(cartItems, ['item_id', item.id])
  }

  let RightAction = accessoryAddButton
  if(cartItems && cartItems.length && isItemAdded(item)) {
    RightAction = accessoryModifyButton
  }

  return (
    <View style={{flexDirection: 'row', borderBottomColor: '#eee', borderBottomWidth: 1, padding: 10}}>
      <View style={{flex: 1, backgroundColor: "green", height: 60}}>
      </View>
      <View style={{flex: 4, justifyContent: 'center', paddingLeft: 10, paddingRight: 10}}>
        <Text>{item.name}</Text>
        <Text style={{fontSize: 12}}>{item.name}</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', paddingLeft: 10, paddingRight: 10}}>
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