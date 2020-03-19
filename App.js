import React, { useEffect } from 'react';
import AppContainer from './navigations/index';
import { Provider } from 'react-redux';
import store from './store';
import * as Font from 'expo-font';
import NetInfo from '@react-native-community/netinfo';
import { onNetworkAvailable, onNetworkUnAvailable } from './store/actions/networkActions';

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
      <AppContainer />
    </Provider>
  );
}

export default App;

