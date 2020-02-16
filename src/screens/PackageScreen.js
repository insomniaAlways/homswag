import React from 'react';
import { connect } from 'react-redux';
import PackageDetails from '../components/packageDetailsView';
import TabView from '../components/tabView';
import { fetchCartItems } from '../../store/actions/cartItemAction';

const PackageScreen = (props) => {
  const { packages } = props
  const selectedPackage = props.navigation.getParam('packageService', {})

  return (
    <TabView tabs={packages.values} selectedTab={selectedPackage} ItemContainerComponent={PackageDetails} {...props}/>
  )
}

const mapStateToProps = state => {
  return {
    packages: state.packages,
    cartItemModel: state.cartItems
  }
}

const mapDispatchToProps = dispatch => ({
  getCartItems: () => dispatch(fetchCartItems())
})

export default connect(mapStateToProps, mapDispatchToProps)(PackageScreen);