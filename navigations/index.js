import React from 'react';
import { View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// screens
import DashboardScreen from '../src/screens/DashboardScreen';
import ItemsScreen from '../src/screens/ItemsScreen';
import CartScreen from '../src/screens/CartScreen';
import CartButton from '../src/components/cartButton';
import ScheduleAppointmentScreen from '../src/screens/scheduleAppointmentScreen'

const AppNavigator = createStackNavigator({
    Dashboard: {
      screen: DashboardScreen,
    },
    Items: {
      screen: ItemsScreen,
    },
    Cart: {
      screen: CartScreen,
    },
    BookAppointment: { 
      screen: ScheduleAppointmentScreen
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      title: navigation.state.routeName,
      headerStyle: {
        backgroundColor: '#47d9a8',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        flex: 1
      },
      headerRight: () => {
        return (
          <View style={{paddingRight: 20}}>
            <CartButton navigation={navigation}/>
          </View>
        )
      }
    })
  }
);

export default createAppContainer(AppNavigator);