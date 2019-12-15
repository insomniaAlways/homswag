import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { fetchCategories } from '../../store/actions/index';
import CategoryList from '../components/categoryList';

function Dashboard(props) {
  useEffect(() => {
    props.getAllCategories()
  }, [])
  
  return (
      <CategoryList data={props.categories.values} navigation={props.navigation}/>
  );
}

mapStateToProps = state => {
  return {
    categories: state.categories
  }
}

mapDispatchToProps = dispatch => {
  return {
    getAllCategories: () => dispatch(fetchCategories())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
