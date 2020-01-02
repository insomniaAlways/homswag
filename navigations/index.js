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
import PaymentScreen from '../src/screens/PaymentScreen';
import DefaultStyles from '../src/style/customStyles';
import { EvilIcons, FontAwesome, Feather } from '@expo/vector-icons';

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
    },
    Payment: {
      screen: PaymentScreen
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      title: navigation.state.routeName,
      headerStyle: DefaultStyles.brandBackgroundColor,
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        flex: 1
      },
      headerRight: () => {
        return (
          <View style={{paddingRight: 20, flexDirection: 'row'}}>
            <EvilIcons name="search" size={40} color="#fff" style={{marginRight: 10}}/>
            <CartButton navigation={navigation}/>
          </View>
        )
      },
      headerLeft: () => {
        return (
          <View style={{paddingLeft: 10}}>
            <Feather name="menu" size={30} color="#fff" style={{marginRight: 10}}/>
          </View>
        )
      }
    })
  }
);

export default createAppContainer(AppNavigator);