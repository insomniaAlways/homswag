import React, { useState, useLayoutEffect, useEffect } from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import DefaultStyles from '../style/customStyles';
import { ImageOverlay } from "./imageOverlay";
import { StyleSheet } from 'react-native';
import { connect } from "react-redux";
import { createCartItem, deleteItem } from "../../store/actions/cartItemAction";
import _ from 'lodash';

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
    <ImageOverlay
      style={styles.container}
      source={{uri: packageService.background_image_source}}>
      <View style={{flex: 1, padding: 20, justifyContent: 'center', paddingTop: 0}}>
        <View>
          <Text style={{fontSize: 30, textAlign: 'center', color: '#fff', fontFamily: 'roboto-bold-italic'}}>
            <FontAwesome name="rupee" size={30} color="#fff" />
            <Text> {packageService.price}</Text>
          </Text>
        </View>
        <View style={{marginTop: 10}}>
          {packageService.items.map((item, index) => {
            return (
              <View key={index} style={{padding: 10}}>
                <Text style={{textAlign: 'center', fontSize: 24, color: '#fff', fontFamily: 'roboto-light-italic'}}>{item.name}</Text>
                <Text style={{color: '#fff'}}>{cartItemModel.isLoading}</Text>
              </View>
            )
          })}
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
          {cartItemModel.isLoading ? 
            <View
              style={[DefaultStyles.brandBackgroundColor, {paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, borderRadius: 5, backgroundColor: 'grey'}]}>
              <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16, width: 130, textAlign: 'center'}}>Loading..</Text>
            </View> :
            <View>
              {!networkAvailability.isOffline &&
                <View>
                  { isAdded ? 
                    <TouchableOpacity
                      onPress={removePackageFromCart}
                      style={[DefaultStyles.brandBackgroundColor, {paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, borderRadius: 5}]}>
                      <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16, width: 170, textAlign: 'center'}}>Remove Package</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity
                      onPress={addPackageToCart}
                      style={[DefaultStyles.brandBackgroundColor, {paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, borderRadius: 5}]}>
                      <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16, width: 100, textAlign: 'center'}}>Book Now</Text>
                    </TouchableOpacity>
                  }
                </View>
              }
            </View>
          }
        </View>
      </View>
    </ImageOverlay>
  )
}

const mapStateToProps = state => ({
  networkAvailability: state.networkAvailability
})
// const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({
  addItemToCart: (package_id, package_price, is_package) => dispatch(createCartItem(package_id, package_price, is_package)),
  deletePackage: (cart_item_id) => dispatch(deleteItem(cart_item_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PackageDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})