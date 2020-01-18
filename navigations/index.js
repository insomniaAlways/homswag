import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

// screens
import DashboardScreen from '../src/screens/DashboardScreen';
import ItemsScreen from '../src/screens/ItemsScreen';
import CartScreen from '../src/screens/CartScreen';
import ScheduleAppointmentScreen from '../src/screens/scheduleAppointmentScreen'
import PaymentScreen from '../src/screens/PaymentScreen';
import PaymentSelectionScreen from '../src/screens/PaymentSelectionScreen';
import DefaultStyles from '../src/style/customStyles';
import ProfileScreen from '../src/screens/ProfileScreen';
import AddAddressScreen from '../src/screens/AddAddressScreen';
import OrderHistoryScreen from '../src/screens/OrderHistoryScreen';
import ContactScreen from '../src/screens/ContactScreen';
import SideDrawer from '../src/components/sideDrawer';
import AddressScreen from '../src/screens/AddressScreen';
import HeaderRightView from '../src/components/headerRight';

const AppNavigator = createStackNavigator({
    Dashboard: {
      screen: DashboardScreen
    },
    Items: {
      screen: ItemsScreen,
    },
    Cart: {
      screen: CartScreen,
    },
    BookAppointment: { 
      screen: ScheduleAppointmentScreen,
      navigationOptions: () => ({
        title: `Book Appointment`,
      }),
    },
    SelectPaymentType: {
      screen: PaymentSelectionScreen,
      navigationOptions: () => ({
        title: `Payment Type`,
      }),
    },
    Payment: {
      screen: PaymentScreen
    },
    AddAddress: {
      screen: AddAddressScreen,
      navigationOptions: () => ({
        title: `Add Address`,
      }),
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
      headerRight: <HeaderRightView navigation={navigation}/>
    })
  }
);

const DrawerNavigation = createDrawerNavigator({
  Dashboard: {
    screen: AppNavigator,
  },
  Profile: {
    screen: ProfileScreen,
  },
  Address: {
    screen: AddressScreen,
  },
  Orders: { 
    screen: OrderHistoryScreen
  },
  Contact: {
    screen: ContactScreen
  }
}, { contentComponent: SideDrawer });




export default createAppContainer(DrawerNavigation);