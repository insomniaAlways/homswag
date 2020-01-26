import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { fetchCategories } from '../../store/actions/index';
import CategoryList from '../components/categoryList';
import { getUser } from '../../store/actions/authenticationAction';
import { fetchCart } from '../../store/actions/cartAction';
import { fetchCartItems } from '../../store/actions/cartItemAction';
import { fetchAllItems } from '../../store/actions/itemActions';
import { fetchPackages } from '../../store/actions/packageActions';
import OfferView from '../components/offerView';
import PromoView from '../components/promoView';
import TabViews from '../components/tabs';
import * as Animatable from 'react-native-animatable';
import { Spinner } from '@ui-kitten/components';
import Constants from 'expo-constants';
import DefaultStyles from '../style/customStyles';
import { LinearGradient } from 'expo-linear-gradient';

function Dashboard(props) {
  useEffect(() => {
    props.getAllCategories()
    // props.getUser()
    props.getCart()
    props.getAllCartItems()
    props.getAllItems()
    props.getPackages()
  }, [])
  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={['#192f6a','#3b5998','#4c669f']}
        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
        style={styles.tvscreen}>
        <LinearGradient
          colors={['#192f6a','#3b5998']}
          start={{x: 0, y: 0}}
          style={styles.tvscreen2} />
        <LinearGradient
          colors={['#3b5998','#4c669f']}
          style={styles.tvscreen3} />
      </LinearGradient>
      {/* <SafeAreaView style={{flex: 1, marginTop: Constants.statusBarHeight, paddingTop: 30}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{height: 200, paddingTop: 10, paddingBottom: 10}}>
            <OfferView packages={props.packages} navigation={props.navigation}/>
          </View>
          <Text style={{paddingLeft: 20, paddingBottom: 0}}>What would you like to do?</Text>
          <View style={{paddingLeft: 25, paddingRight: 25, paddingTop: 10, paddingBottom: 10}}>
            {props.categories.isLoading ? 
              <View style={{height: 600, justifyContent: 'center', alignItems: 'center'}}>
                <Spinner status='info'/>
              </View> : 
              <Animatable.View
                duration={800}
                animation={'fadeIn'}
                >
                <TabViews {...props}/>
              </Animatable.View>
            }
          </View>
          <View style={{height: 230, paddingTop: 10, paddingBottom: 10}}>
            <PromoView />
          </View>
          <View style={{marginBottom: 50, marginTop: 10, padding: 20, borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#ABDAF6", marginLeft: 20, marginRight: 20}}>
            <Text style={{textAlign: "center", fontStyle: 'italic', color: '#e84393', fontSize: 18}}>
              An experience you’ll never forget at the cutting edge of contemporary hair & beauty
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView> */}
    </View>
  );
}

mapStateToProps = state => {
  return {
    categories: state.categories,
    packages: state.packages
  }
}

mapDispatchToProps = dispatch => {
  return {
    getAllCategories: () => dispatch(fetchCategories()),
    getUser: () => dispatch(getUser()),
    getCart: ()=> dispatch(fetchCart()),
    getAllCartItems: () => dispatch(fetchCartItems()),
    getAllItems: () => dispatch(fetchAllItems()),
    getPackages: () => dispatch(fetchPackages())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

const styles = StyleSheet.create({
  tvscreen: {
    height: 180,
    position: 'absolute',top: 0,
    left: 0,
    width: '100%',
    borderBottomLeftRadius: 95,
    borderBottomRightRadius: 95,
    flexDirection: 'row'
  },
  tvscreen2: {
    height: '100%',
    left: -30,
    width: '50%',
    borderBottomLeftRadius: 95,
    backgroundColor: 'green'
  },
  tvscreen3: {
    height: '100%',
    right: -30,
    width: '50%',
    borderBottomRightRadius: 95,
    backgroundColor: 'green'
  },
  tvscreenMain: {
    width: '100%',
    height: 75,
    backgroundColor: 'red',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  tvscreenTop: {
    width: 73,
    height: 70,
    backgroundColor: 'green',
    position: 'absolute',
    top: -26,
    left: 39,
    borderRadius: 35,
    transform: [
      {scaleX: 2},
      {scaleY: .5}
    ]
  },
  tvscreenBottom: {
    width: '80%',
    height: 70,
    backgroundColor: 'yellow',
    position: 'absolute',
    bottom: -26,
    left: 39,
    borderRadius: 35,
    transform: [
      {scaleX: 2},
      {scaleY: .5}
    ]
  },
  tvscreenLeft: {
    width: 20,
    height: 38,
    backgroundColor: 'orange',
    position: 'absolute',
    left: -7,
    top: 18,
    borderRadius: 35,
    transform: [
      {scaleX: .5},
      {scaleY: 2},
    ]
  },
  tvscreenRight: {
    width: 20,
    height: 38,
    backgroundColor: 'pink',
    position: 'absolute',
    right: -7,
    top: 18,
    borderRadius: 35,
    transform: [
      {scaleX: .5},
      {scaleY: 2},
    ]
  }
})
