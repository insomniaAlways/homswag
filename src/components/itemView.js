import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAllItems } from '../../store/actions/itemActions';
import _ from 'lodash';
import { Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

function ItemView (props) {
  const { items, getItems, item, cartItem } =  props
  const [ currentItem, setCurrentItem ] = useState()

  useEffect(() => {
    getItems()
  }, [])

  useEffect(() => {
    if(!item.id) {
      let value = _.find(items.values, ['id', item_id])
      setCurrentItem(value)
    } else {
      setCurrentItem(item)
    }
  }, [item])

    return (
      <Layout style={styles.itemCard}>
        <Text>{currentItem && currentItem.name}</Text>
        <Text>{cartItem && cartItem.quantity}</Text>
      </Layout>
    )
}


const mapStateToProps = state => ({
  items: state.items
})

const mapDispatchToProps = dispatch => ({
  getItems: () => dispatch(fetchAllItems())
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemView);


const styles = StyleSheet.create({
  itemCard: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    // paddingHorizontal: 20,
    padding: 10
  }
})