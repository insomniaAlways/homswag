import React, { useState, useCallback } from 'react';
import { Dimensions, ImageBackground, View, StyleSheet } from 'react-native';
import { Card, List, Text } from '@ui-kitten/components';
import BeautyImage from '../../assets/images/beautyImage.jpg'
import ItemRow from './ItemRow';
import { FontAwesome } from '@expo/vector-icons';

const ItemsList = (props) => {
  const { data, cartItems, cart, setShowButton, getCartItems} = props
  const [ isAdded, setAdded ] = useState(false)
  const [ refreshing, setRefreshing ] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    async function fetchData() {
      await props.getAllCartItems()
      await props.getAllCategories()
      await props.getAllItems()
      setRefreshing(false)
    }
    fetchData()
  }, [refreshing]);

  const renderItemFooter = (info) => (
    <View>
      <View style={styles.itemFooter}>
        <Text category='s1'>
        <FontAwesome name="rupee" size={12} color="black" /> {info.item.price}
        </Text>
        <Text category='s1' style={{textDecorationLine: 'line-through'}}>
        <FontAwesome name="rupee" size={12} color="black" /> {info.item.mrp_price}
        </Text>
      </View>
      <ItemRow
        item={info.item}
        cartItems={cartItems}
        cart={cart}
        getCartItems={getCartItems}
        isAdded={isAdded}
        setAdded={setAdded}
        setShowButton={setShowButton}
        style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10}}/>
    </View>
  );

  const renderItemHeader = (info) => {
    let image_source = info.item.image_source ? {uri : info.item.image_source} : BeautyImage
    return (
      <ImageBackground
        style={styles.itemHeader}
        source={image_source}
      />
    )
  }

  const renderProductItem = (info) => (
    <Card
      style={styles.productItem}
      header={() => renderItemHeader(info)}
      footer={() => renderItemFooter(info)}>
      <Text category='s1'>
        {info.item.name}
      </Text>
      <Text
        appearance='hint'
        category='c1'>
        {info.item.description}
      </Text>
    </Card>
  );

  return (
    <List
      contentContainerStyle={styles.productList}
      showsVerticalScrollIndicator={false}
      data={data}
      numColumns={2}
      refreshing={refreshing}
      onRefresh={onRefresh}
      renderItem={renderProductItem}
    />
  );
};

const styles = StyleSheet.create({
  productList: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  productItem: {
    flex: 1,
    margin: 8,
    maxWidth: Dimensions.get('window').width / 2 - 24,
    borderRadius: 10,
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

export default ItemsList;