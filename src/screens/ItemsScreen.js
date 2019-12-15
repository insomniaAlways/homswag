import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { fetchItems } from '../../store/actions/itemActions';
import { connect } from 'react-redux';
import ItemsList from '../components/itemList';


function Items(props) {
  const { navigation } = props;
  const category = navigation.getParam('category')
  
  useEffect(() => {
    if(category.id) {
      props.getfetchItemsFor(category.id)
    }
  }, ['category'])
  return (
    <ItemsList data={props.items.values}/>
  );
}

mapStateToProps = state => {
  return {
    items: state.items
  }
}

mapDispatchToProps = dispatch => {
  return {
    getfetchItemsFor: (category_id) => dispatch(fetchItems(category_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Items);
