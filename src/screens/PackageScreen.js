import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Tab, Tabs, ScrollableTab } from 'native-base';
import DefaultStyles, { brandColor } from '../style/customStyles';
import _ from 'lodash';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PackageScreen = (props) => {
  const { packages } = props
  const selectedPackage = props.navigation.getParam('packageService', {})
  let selectedIndex = 0
  
  if(selectedPackage) {
    selectedIndex =  _.findIndex(packages.values, ['id', selectedPackage.id])
  }
  
  const [ selectedTabIndex, setSelectedTabIndex ] = useState(selectedIndex)


  return (
    <Tabs tabBarUnderlineStyle={styles.tabBarUnderlineStyle} initialPage={selectedTabIndex} renderTabBar={()=> <ScrollableTab tabsContainerStyle={styles.tabsContainerStyle}/>}>
      { packages.values.map((packageService) => (
        <Tab tabStyle={styles.tabStyle}
          activeTabStyle={styles.activeTabStyle}
          textStyle={styles.textStyle}
          activeTextStyle={styles.activeTextStyle}
          key={packageService.id} heading={packageService.name}>
          <View style={{flex: 1, padding: 20, justifyContent: 'center', paddingTop: 0}}>
            <View>
              <Text style={{fontSize: 30, fontStyle: 'italic', textAlign: 'center'}}>
                <FontAwesome name="rupee" size={30} color="black" />
                {packageService.price}
              </Text>
            </View>
            <View style={{marginTop: 10}}>
              {packageService.items.map((item, index) => {
                return (
                  <View key={index} style={{padding: 10}}>
                    <Text style={{textAlign: 'center', fontSize: 18}}>{item.name}</Text>
                  </View>
                )
              })}
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
              <TouchableOpacity style={[DefaultStyles.brandBackgroundColor, {paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, borderRadius: 5}]}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16, width: 100, textAlign: 'center'}}>Book Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Tab>
        ))
      }
      </Tabs>
  )
}

const mapStateToProps = state => {
  return {
    packages: state.packages
  }
}

export default connect(mapStateToProps)(PackageScreen);

const styles = StyleSheet.create({
  tabBarUnderlineStyle: {
    backgroundColor: brandColor,
    borderRadius: 5
  },
  tabsContainerStyle: {
    paddingLeft: 10,
    backgroundColor: '#fff'
  },
  tabStyle: {
    backgroundColor: '#fff',
    marginRight:10
  },
  activeTabStyle: {
    backgroundColor: '#fff',
    marginRight:10
  },
  textStyle: {
    color: 'rgba(0, 0, 0, 0.8)'
  },
  activeTextStyle: {
    color: brandColor,
    fontWeight: '700' 
  }
})