import React, { useState } from 'react';
import { Dimensions, ImageBackground, ListRenderItemInfo, View, StyleSheet } from 'react-native';
import { Button, Card, List, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import BeautyImage from '../../assets/images/beautyImage.jpg'
import ModifyButton from './itemModifyButton';
import AddToCartButton from './addToCartButton';
import ItemRow from './ItemRow';
import { FontAwesome } from '@expo/vector-icons';

const ItemsList = (props) => {
  const { data, cartItems, cart, navigation, showButton, setShowButton } = props
  const [ isAdded, setAdded ] = useState(false)

  const onItemCartPress = (index) => {
    navigation.navigate('Cart');
  };

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
        isAdded={isAdded}
        setAdded={setAdded}
        setShowButton={setShowButton}
        style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10}}/>
    </View>
  );

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
      refreshing={false}
      onRefresh={() => alert('hello')}
      renderItem={renderProductItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  },
  iconButton: {
    paddingHorizontal: 0,
  },
});

export default ItemsList;