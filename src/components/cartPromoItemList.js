import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Text, Card, List, Layout } from '@ui-kitten/components';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchCart } from '../../store/actions/cartAction';
import { FontAwesome } from '@expo/vector-icons';
import BeautyImage from '../../assets/images/beautyImage.jpg'
import AddToCartButton from './addToCartButton';
import { fetchCartItems, creatCartItem } from '../../store/actions/cartItemAction';

const CartPromoItemList = (props) => {
  const defaultLength = 5
  const { cartItem, getCart, items, getCartItem, creatNewCartItem } = props
  const cartItemLength = cartItem.values.length
  const defaultList = _.take(items, (defaultLength + cartItemLength))

  const isItemAdded = (item) => {
    return _.find(cartItem.values, ['item.id', item.id])
  }

  const addToCart = async (item) => {
    let newCartItem = await creatNewCartItem(item.id, (+item.price * 1))
    getCartItem()
    getCart()
  }

  const renderItemFooter = (info) => (
    <View>
      <View style={styles.itemFooter} accentStyle={{borderWidth:0}}>
        <Text category='s1'>
        <FontAwesome name="rupee" size={12} color="black" /> {info.item.price}
        </Text>
        <Text category='s1' style={{textDecorationLine: 'line-through'}}>
        <FontAwesome name="rupee" size={12} color="black" /> {info.item.mrp_price}
        </Text>
      </View>
      <View style={{justifyContent:'center', alignItems: 'center'}}>
        <AddToCartButton addToCart={addToCart} item={info.item}/>
      </View>
    </View>
  );

  const getList = () => {
    return _.filter(defaultList, (item) => !isItemAdded(item))
  }

  const [ itemList, setItemList ] = useState(getList)

  useEffect(() => {
    setItemList(getList)
  }, [cartItem.isLoading])

  const renderItemHeader = (info) => (
    <ImageBackground
      style={styles.itemHeader}
      source={BeautyImage}
    />
  );

  const renderProductItem = (info) => (
    <Card
      style={styles.productItem}
      header={() => renderItemHeader(info)}
      footer={() => renderItemFooter(info)}
      accentStyle={{borderWidth:0}}>
      <Layout>
        <Text category='s1'>
          {info.item.name}
        </Text>
        <Text
          appearance='hint'
          category='c1'>
          {info.item.description}
        </Text>
      </Layout>
    </Card>
  );

  return (
    <List
      contentContainerStyle={styles.productList}
      showsHorizontalScrollIndicator={false}
      data={itemList}
      horizontal={true}
      renderItem={renderProductItem}
    />
  )
};

const mapStateToProps = state => ({
  cartItem: state.cartItems,
  items: state.items.values
})

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(fetchCart),
  getCartItem: () => dispatch(fetchCartItems()),
  creatNewCartItem: (item, quantity) => dispatch(creatCartItem(item, quantity))
})

export default connect(mapStateToProps, mapDispatchToProps)(CartPromoItemList);

const styles = StyleSheet.create({
  productList: {
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  productItem: {
    margin: 8,
    borderRadius: 10,
    width: 200,
  },
  itemHeader: {
    height: 140,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});