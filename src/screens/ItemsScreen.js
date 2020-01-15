import React, { useEffect } from 'react';
import { fetchItems } from '../../store/actions/itemActions';
import { connect } from 'react-redux';
import ItemsList from '../components/itemList';

function Items(props) {
  const { navigation, items, cartItems, cart } = props;
  const category = navigation.getParam('category')

  useEffect(() => {
    if(category.id) {
      props.getfetchItemsFor(category.id)
    }
  }, [category])

  return (
    <ItemsList data={items} cartItems={cartItems} cart={cart} navigation={navigation}/>
  );
}

mapStateToProps = state => {
  return {
    items: state.items.values,
    cartItems: state.cartItems.values,
    cart: state.cart.values
  }
}

mapDispatchToProps = dispatch => {
  return {
    getfetchItemsFor: (category_id) => dispatch(fetchItems(category_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Items);
