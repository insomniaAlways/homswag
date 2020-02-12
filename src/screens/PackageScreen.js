import React from 'react';
import { connect } from 'react-redux';
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