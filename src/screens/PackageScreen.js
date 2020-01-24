import React from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { brandColor } from '../style/customStyles';
import PackageDetails from '../components/packageDetailsView';
import TabView from '../components/tabView';

const PackageScreen = (props) => {
  const { packages } = props
  const selectedPackage = props.navigation.getParam('packageService', {})
  
  return (
    <TabView tabs={packages.values} selectedTab={selectedPackage} ItemContainerComponent={PackageDetails} {...props}/>
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