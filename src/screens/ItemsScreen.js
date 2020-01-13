import React, { useEffect, useState } from 'react';
import { fetchItems } from '../../store/actions/itemActions';
import { connect } from 'react-redux';
import ItemsList from '../components/itemList';
import { View, TouchableOpacity, Text } from 'react-native';
import DefaultStyles from '../style/customStyles';

function Items(props) {
  const { navigation, items, cartItems, cart } = props;
  const category = navigation.getParam('category')
  const [ shouldShowBookAppointment, toggleBookAppointment ] = useState(false)

  useEffect(() => {
    if(category.id) {
      props.getfetchItemsFor(category.id)
    }
  }, [category])

  useEffect(() => {
    if(cartItems.values.length) {
      toggleBookAppointment(true)
    } else {
      toggleBookAppointment(false)
    }
  }, [cartItems.isLoading])

  return (
    <View style={{flex: 1}}>
      <ItemsList data={items} cartItems={cartItems.values} cart={cart}/>
      { shouldShowBookAppointment && 
      <TouchableOpacity
        style={[{width: '100%', height: 50, justifyContent: 'center', alignItems: 'center'}, DefaultStyles.brandColorButton]}
        onPress={() => props.navigation.navigate('BookAppointment')}>
        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>Book Appointment</Text>
      </TouchableOpacity>}
    </View>
  );
}

mapStateToProps = state => {
  return {
    items: state.items.values,
    cartItems: state.cartItems,
    cart: state.cart.values
  }
}

mapDispatchToProps = dispatch => {
  return {
    getfetchItemsFor: (category_id) => dispatch(fetchItems(category_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Items);
