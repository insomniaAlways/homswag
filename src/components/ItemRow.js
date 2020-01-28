import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import ModifyButton from './itemModifyButton';
import AddToCartButton from './addToCartButton';
import { connect } from 'react-redux';
import _ from 'lodash';
import { FontAwesome } from '@expo/vector-icons';
import { fetchCartItems, creatCartItem } from '../../store/actions/cartItemAction';
import BeautyImage from '../../assets/images/beautyImage.jpg'

function ItemRow(props) {
  const { item, cartItem, cart, creatNewCartItem, getCartItem, setShowButton } = props;
  const [ isAdded, setAdded ] = useState(false)
  const cartItems = cartItem.values
  const [ quantity, setQuantity ] = useState(0)
  const isItemAdded = () => {
    return _.find(cartItems, ['item.id', item.id])
  }

  const create = async () => {
    let newCartItem = await creatNewCartItem(item.id, (+item.price * 1))
    getCartItem()
  }

  const addCartItem = () => {
    setAdded(true)
    setQuantity(1)
    create()
    setShowButton(true)
  }

  useEffect(() => {
    if(cartItems && cartItems.length && isItemAdded()) {
      setAdded(true)
      setQuantity(isItemAdded().quantity)
    }
  }, [])
  

  return (
    <View style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        <Image source={BeautyImage} style={styles.image}/>
      </View>
      <View style={styles.itemDetailContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={{fontSize: 14, textDecorationLine: 'line-through', marginRight: 20}}><FontAwesome name="rupee" size={12} color="black" /> {item.mrp_price}</Text>
        <Text style={{fontSize: 14, fontWeight: 'bold'}}><FontAwesome name="rupee" size={12} color="black" /> {item.price}</Text>
        <Text style={{fontSize: 12, textTransform: "capitalize", paddingTop: 10}}>{item.description}</Text>
      </View>
      <View style={{flex: 1.5, justifyContent: 'center', paddingLeft: 10, paddingRight: 10}}>
        {isAdded ?
          <ModifyButton
            type={'cart-items'}
            item={item}
            cart={cart}
            cartItems={cartItems}
            cartItem={isItemAdded()}
            quantity={quantity}
            setQuantity={setQuantity}
            removeCartItem={setAdded}/> : 
            <AddToCartButton
              type={'cart-items'}
              item={item}
              cart={cart}
              cartItems={cartItems}
              isAdded={isAdded}
              setAdded={addCartItem}/> 
          }
      </View>
    </View>
  )
}

const mapStateToProps = state => {
  return  {
    cartItem: state.cartItems
  }
}
const mapDispatchToProps = dispatch => {
  return {
    creatNewCartItem: (item, quantity, totalPrice, cartItemId) => dispatch(creatCartItem(item, quantity, totalPrice, cartItemId)),
    getCartItem: () => dispatch(fetchCartItems())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemRow);

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    padding: 10
  },
  imageContainer: {
    flex: 2,
    backgroundColor: "#5DDE92",
    height: 100
  },
  image: {
    width: '100%',
    height: '100%'
  },
  itemDetailContainer: {
    flex: 4,
    justifyContent: 'flex-start',
    paddingLeft: 10,
    paddingRight: 10
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: "#1C2833"
  }
})