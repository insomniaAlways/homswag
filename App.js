import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { ApplicationProvider, Layout, Text, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, light as lightTheme } from '@eva-design/eva';
import AppContainer from './navigations/index';
import { Provider } from 'react-redux';
import store from './store';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider mapping={mapping} theme={lightTheme}>
          <AppContainer />
        </ApplicationProvider>
      </Provider>
    );
  }
}

