import React, { useEffect, useState } from 'react';
import { fetchItems } from '../../store/actions/itemActions';
import { connect } from 'react-redux';
import ItemsList from '../components/itemList';
import { Spinner, Layout, Text } from '@ui-kitten/components';
import * as Animatable from 'react-native-animatable';
import _ from 'lodash';
import DynamicTabs from '../components/dynamicTabs';

function Items(props) {
  const { navigation, items, cartItem, cart } = props;
  const category = navigation.getParam('category')
  const [ selectedItems, setSelectedItems ] = useState([])
  const [ showButton, setShowButton ] = useState(false)

  useEffect(() => {
    if(category.id) {
      setSelectedItems(_.filter(items, ['category_id', category.id]))
    }
  }, [category])

  useEffect(() => {
    if(cartItem.values.length) {
      setShowButton(true)
    } else {
      setShowButton(false)
    }
  }, [cartItem.isLoading, cartItem.values.length])

  return (
    <Layout style={{flex: 1}}>
      { category.hasSubCategory ? <DynamicTabs category={category} selectedItems={selectedItems} {...props}/> :
        selectedItems.isLoading ? 
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Spinner status='info'/>
        </Layout> :
        <Animatable.View
          animation={'fadeInLeft'}
          duration={400}
          style={{height: '100%'}}
        >
          <ItemsList data={selectedItems} showButton={showButton} setShowButton={setShowButton} cartItems={cartItem.values} cart={cart} navigation={navigation}/>
        </Animatable.View>
      }
    </Layout>
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
