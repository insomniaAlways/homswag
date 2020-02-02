import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Icon, Text } from '@ui-kitten/components';
import ModifyButton from './itemModifyButton';
import { FontAwesome } from '@expo/vector-icons';

const CartItemRow = (props) => {
  const { cart, cartItem, setLoading } = props
  const [ actualPrice, setActualPrice ] = useState(0)

  useEffect(() => {
    if(cartItem) {
      let ap = cartItem.item.price * cartItem.quantity
      setActualPrice(ap)
    }
  }, [cartItem.quantity])

  return (
    <View style={{flex: 1, flexDirection: 'row', paddingLeft: 10, paddingBottom: 10}}>
      <View style={{flex: 4,justifyContent: 'center'}}>
        <View style={{width: '80%', flexDirection: 'row'}}>
          <View style={{justifyContent: 'center'}}>
            <Icon name='checkmark-circle-2-outline' width={12} height={12} fill="#0D5618"/>
          </View>
          <View style={{paddingLeft: 10}}>
            <Text ellipsizeMode={'tail'} numberOfLines={2} category='s1' style={{fontSize: 18}}>{cartItem.item.name}</Text>
          </View>
        </View>
      </View>
      <View style={{flex: 2, justifyContent: 'center'}}>
        <View style={{width: 90}}>
          <ModifyButton cartItem={cartItem} cart={cart} item={cartItem.item} quantity={cartItem.quantity} setLoading={setLoading}/>
        </View>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 14}}><FontAwesome name="rupee" size={12} color="black" /> {actualPrice}</Text>
        </View>
      </View>
    </View>
  )
};

export default CartItemRow;