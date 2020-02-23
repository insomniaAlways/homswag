import React, { Component, useLayoutEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { ApplicationProvider, Layout, Text, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { brandTheme } from './src/style/custom-theme';
import AppContainer from './navigations/index';
import { NativeModules } from 'react-native'
import { Provider } from 'react-redux';
import store from './store';
import * as Font from 'expo-font';
import NetInfo from '@react-native-community/netinfo';
import Constants from 'expo-constants';
import * as firebase from 'firebase';
import { onNetworkAvailable, onNetworkUnAvailable } from './store/actions/networkActions';
import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: 'https://16e35b4da8db4096b2298db1fb8049f0@sentry.io/2787983',
  enableInExpoDevelopment: true,
  debug: true
});

firebase.initializeApp(Constants.manifest.extra.firebaseConfig);

const theme = { ...lightTheme, ...brandTheme };
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

// if (__DEV__) {
// NativeModules.DevSettings.setIsDebuggingRemotely(true)
// }

XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
    GLOBAL.originalXMLHttpRequest :
    GLOBAL.XMLHttpRequest;

  // fetch logger
global._fetch = fetch;
global.fetch = function (uri, options, ...args) {
  return global._fetch(uri, options, ...args).then((response) => {
    return response;
  });
};

function App () {
  useLayoutEffect(() => {
    Font.loadAsync({
      'roboto-bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
      'roboto-bold-italic': require('./assets/fonts/Roboto/Roboto-BoldItalic.ttf'),
      'sans-serif': require('./assets/fonts/Roboto/Roboto-Italic.ttf'),
      'roboto-light-italic': require('./assets/fonts/Roboto/Roboto-LightItalic.ttf'),
      'roboto-medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
      'roboto-medium-italic': require('./assets/fonts/Roboto/Roboto-MediumItalic.ttf'),
      'roboto-regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
    });
    
    const unsubscribe = NetInfo.addEventListener(state => {
      if(!state.isConnected) {
        store.dispatch(onNetworkUnAvailable())
        alert('Seems like you are not connected to Internet')
      } else {
        store.dispatch(onNetworkAvailable())
      }
    });
  })
  
  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={theme}>
        <AppContainer />
      </ApplicationProvider>
    </Provider>
  );
}

export default App;

