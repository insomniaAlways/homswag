import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { fetchCategories } from '../../store/actions/index';

function Dashboard(props) {
  // let [ categories ] = useState(props.categories.values)
  console.log(props.categories.values)
  // props.getAllCategories()
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Dashboard</Text>
      <Button title="Go to Items" onPress={() => props.navigation.navigate('Items')}></Button>
      <Button title="Get All Category" onPress={() => props.getAllCategories()}></Button>
    </View>
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
