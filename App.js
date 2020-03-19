import React, { useLayoutEffect, useEffect } from 'react';
// import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
// import { EvaIconsPack } from '@ui-kitten/eva-icons';
// import { mapping, light as lightTheme } from '@eva-design/eva';
import { brandTheme } from './src/style/custom-theme';
import AppContainer from './navigations/index';
import { Provider } from 'react-redux';
import store from './store';
import * as Font from 'expo-font';
import NetInfo from '@react-native-community/netinfo';
import { onNetworkAvailable, onNetworkUnAvailable } from './store/actions/networkActions';
import moment from 'moment';

// const theme = { ...lightTheme, ...brandTheme };

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
  console.log('appjs load', moment().format('mm:ss, SS'))

  // -----------------------: Methods :-----------------------

  const cacheResourcesAsync = async () => {
    let allFont = {
      'roboto-light-italic': require('./assets/fonts/Roboto/Roboto-LightItalic.ttf'),
      'roboto-medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
      'roboto-medium-italic': require('./assets/fonts/Roboto/Roboto-MediumItalic.ttf'),
      'roboto-regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
    }
    return Font.loadAsync(allFont)
  }

  // -----------------------: End Methods :-----------------------

  // ---------------------------: Hooks :-------------------------
  
  useEffect(() => {
    cacheResourcesAsync()
    const unsubscribe = NetInfo.addEventListener(state => {
      if(!state.isConnected) {
        store.dispatch(onNetworkUnAvailable())
        alert('Seems like you are not connected to Internet')
      } else {
        store.dispatch(onNetworkAvailable())
      }
    })
  }, [])

  // ------------------------: End Hooks :------------------------

  return (
    <Provider store={store}>
      {/* <IconRegistry icons={EvaIconsPack} /> */}
      {/* <ApplicationProvider mapping={mapping} theme={theme}> */}
        <AppContainer />
      {/* </ApplicationProvider> */}
    </Provider>
  );
}

export default App;

