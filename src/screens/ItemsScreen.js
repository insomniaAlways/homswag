import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { fetchItems } from '../../store/actions/itemActions';
import { connect } from 'react-redux';
import ItemsList from '../components/itemList';
import { Spinner } from '@ui-kitten/components';
import * as Animatable from 'react-native-animatable';
import _ from 'lodash';

function Items(props) {
  const { navigation, items, cartItem, cart } = props;
  const category = navigation.getParam('category')
  const [ selectedItems, setSelectedItems ] = useState([])

  useEffect(() => {
    if(category.id) {
      setSelectedItems(_.filter(items, ['category_id', category.id]))
    }
  }, [category])

  return (
    <View style={{flex: 1}}>
      {
        selectedItems.isLoading ? 
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Spinner status='info'/>
        </View> :
        <Animatable.View
          animation={'fadeInLeft'}
          duration={400}
          style={{height: '100%'}}
        >
          <ItemsList data={selectedItems} cartItems={cartItem.values} cart={cart} navigation={navigation}/>
        </Animatable.View>
      }
    </View>
  );
}

mapStateToProps = state => {
  return {
    items: state.items.values,
    cartItem: state.cartItems,
    cart: state.cart.values
  }
}

mapDispatchToProps = dispatch => {
  return {
    getfetchItemsFor: (category_id) => dispatch(fetchItems(category_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Items);
