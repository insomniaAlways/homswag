import React, { useState, useLayoutEffect, useEffect } from "react";
import { Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import DefaultStyles from '../style/customStyles';
import { StyleSheet } from 'react-native';
import { connect } from "react-redux";
import { createCartItem, deleteItem } from "../../store/actions/cartItemAction";
import _ from 'lodash';
import { Layout } from '@ui-kitten/components';

const ItemContainer = ({item, index}) => {
  if(index == 0 && item.image_source) {
    return (
      <Layout style={{marginHorizontal: 10, borderTopRightRadius: 30, borderTopLeftRadius: 30, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: -10}}>
        <Image source={{uri: item.image_source}} style={{width: '100%', height: 200, borderTopRightRadius: 30, borderTopLeftRadius: 30, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}/>
      </Layout>
    )
  } else if(item.image_source) {
    return (
      <Layout style={{marginHorizontal: 10, borderTopRightRadius: 30, borderTopLeftRadius: 30, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: 5}}>
        <Image source={{uri: item.image_source}} style={{width: '100%', height: 200, borderTopRightRadius: 30, borderTopLeftRadius: 30, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}/>
      </Layout>
    )
  }
}

const PackageDetails = (props) => {
  const { tab: packageService, cartItemModel, addItemToCart, deletePackage, networkAvailability } = props
  const [ isAdded, setIsAdded ] = useState(false)

  const addPackageToCart = () => {
    addItemToCart(packageService.id, packageService.price, true)
  }

  useEffect(() => {
    if(!cartItemModel.isLoading && cartItemModel.error) {
      alert(cartItemModel.error)
    }
  }, [cartItemModel.error])

  const removePackageFromCart = () => {
    let cartPackages = cartItemModel.values.filter((cartItem) => cartItem.is_package == true)
    let cartItem = _.find(cartPackages, ['package.id', packageService.id])
    deletePackage(cartItem.id)
  }

  useLayoutEffect(() => {
    isPackageAdded()
  }, [cartItemModel.isLoading])

  const isPackageAdded = () => {
    if(cartItemModel && !cartItemModel.isLoading && cartItemModel.values.length) {
      let cartPackages = cartItemModel.values.filter((cartItem) => cartItem.is_package == true)
      if(_.find(cartPackages, ['package.id', packageService.id])) {
        setIsAdded(true)
      } else {
        setIsAdded(false)
      }
    } else {
      setIsAdded(false)
    }
  }

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{paddingBottom: 20}}>
        <Image source={{uri: packageService.poster_image_source}} style={{width: '100%', height: 250}}/>
        {packageService.items.map((item, index) => <ItemContainer key={index} item={item} index={index} />)}
      </ScrollView>
      { cartItemModel.isLoading ? 
        <Layout style={[styles.button, {height: 55, backgroundColor: 'grey'}]}>
          <Text style={{color:'#fff', fontSize: 18, fontWeight: 'bold', width: '100%', textAlign: 'center'}}>Loading..</Text>
        </Layout> :
        <Layout>
          {!networkAvailability.isOffline &&
            <Layout>
              { isAdded ? 
                <Layout style={[{height: 55}, DefaultStyles.brandBackgroundColor]}>
                  <TouchableOpacity style={[styles.button, DefaultStyles.brandColorButton]} onPress={removePackageFromCart}>
                    <Text style={{color:'#fff', fontSize: 18, fontWeight: 'bold', width: '100%', textAlign: 'center'}}>Remove Package</Text>
                  </TouchableOpacity>
                </Layout> :
                <Layout style={[{height: 55}, DefaultStyles.brandBackgroundColor]}>
                  <TouchableOpacity style={[styles.button, DefaultStyles.brandColorButton]} onPress={addPackageToCart}>
                    <Text style={{color:'#fff', fontSize: 18, fontWeight: 'bold', width: '100%', textAlign: 'center'}}>Book Now</Text>
                  </TouchableOpacity>
                </Layout>
              }
            </Layout>
          }
        </Layout>
      }
    </Layout>
  )
}

const mapStateToProps = state => ({
  networkAvailability: state.networkAvailability
})

const mapDispatchToProps = dispatch => ({
  addItemToCart: (package_id, package_price, is_package) => dispatch(createCartItem(package_id, package_price, is_package)),
  deletePackage: (cart_item_id) => dispatch(deleteItem(cart_item_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PackageDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    color:'#fff',
    height: 55
  }
})