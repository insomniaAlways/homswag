import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { ApplicationProvider, Layout, Text, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { brandTheme } from './src/style/custom-theme';
import AppContainer from './navigations/index';
import { NativeModules } from 'react-native'
import { Provider } from 'react-redux';
import store from './store';

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

export default class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider mapping={mapping} theme={theme}>
          <AppContainer />
        </ApplicationProvider>
      </Provider>
    );
  }
}

