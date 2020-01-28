import React, { useEffect, useState } from 'react';
import { ScrollView, View, TouchableOpacity, Text } from 'react-native';
import _ from 'lodash';
import ItemRow from '../components/ItemRow';
import DefaultStyles from '../style/customStyles';

const ItemsList = (props) => {
  const { data, cartItems, cart, navigation, showButton, setShowButton } = props

  return (
    <View style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        {data.map((item, index) => (<ItemRow index={index} key={index} item={item} cartItems={cartItems} cart={cart} setShowButton={setShowButton}/>))}
      </ScrollView>
      { showButton &&
        (<TouchableOpacity onPress={() => navigation.navigate('BookAppointment')} style={[{height: 55, justifyContent: 'center', alignItems: 'center'}, DefaultStyles.brandBackgroundColor]}>
          <Text style={{fontSize: 20, color: "#fff", fontWeight: 'bold', width: '100%', textAlign: 'center'}}>Proceed Next</Text>
        </TouchableOpacity>)
      }
    </View>
  )
};

export default ItemsList;