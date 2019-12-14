import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// screens
import DashboardScreen from '../src/screens/DashboardScreen';
import ItemsScreen from '../src/screens/ItemsScreen';

const AppNavigator = createStackNavigator({
  Dashboard: {
    screen: DashboardScreen,
  },
  Items: {
    screen: ItemsScreen,
  },
});

export default createAppContainer(AppNavigator);