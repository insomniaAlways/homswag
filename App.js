import React, { useLayoutEffect } from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { brandTheme } from './src/style/custom-theme';
import AppContainer from './navigations/index';
import { Provider } from 'react-redux';
import store from './store';
import * as Font from 'expo-font';
import NetInfo from '@react-native-community/netinfo';
import Constants from 'expo-constants';
import * as firebase from 'firebase';
import { onNetworkAvailable, onNetworkUnAvailable } from './store/actions/networkActions';
import * as Sentry from 'sentry-expo';
import { AppLoading, SplashScreen } from 'expo';
import { useState } from 'react';
import { Asset } from 'expo-asset';

Sentry.init({
  dsn: Constants.manifest.extra.sentry.dsnKey,
  enableInExpoDevelopment: true,
  debug: true
});

firebase.initializeApp(Constants.manifest.extra.firebaseConfig);

const theme = { ...lightTheme, ...brandTheme };

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
  const [ isLoaded, setLoaded ] = useState(false)

  // -----------------------: Methods :-----------------------

  function cacheImages(images) {
    return images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  }
  
  function cacheFonts() {
    // 'roboto-bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
    // 'roboto-bold-italic': require('./assets/fonts/Roboto/Roboto-BoldItalic.ttf'),
    // 'sans-serif': require('./assets/fonts/Roboto/Roboto-Italic.ttf'),
    let allFont = {
      'roboto-light-italic': require('./assets/fonts/Roboto/Roboto-LightItalic.ttf'),
      'roboto-medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
      'roboto-medium-italic': require('./assets/fonts/Roboto/Roboto-MediumItalic.ttf'),
      'roboto-regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
    }
    return [Font.loadAsync(allFont)];
  }

  const cacheResourcesAsync = async () => {
    const imageAssets = cacheImages([
      require('./assets/images/login_background.png'),
      require('./assets/images/logo_rounded_512*512.png'),
    ]);
    // require('./assets/images/splash.png'),
    // require('./assets/images/logo.png'),

    const fontAssets = cacheFonts();

    return await Promise.all([...imageAssets, ...fontAssets]);
  }

  const onFinish = () => {
    setLoaded(true)
    SplashScreen.hide()
  }

  const onError = (e) => {
    SplashScreen.hide()
    Sentry.captureException(e)
  }
  // -----------------------: End Methods :-----------------------

  // ---------------------------: Hooks :-------------------------

  useLayoutEffect(() => {
    SplashScreen.preventAutoHide()
    const unsubscribe = NetInfo.addEventListener(state => {
      if(!state.isConnected) {
        store.dispatch(onNetworkUnAvailable())
        alert('Seems like you are not connected to Internet')
      } else {
        store.dispatch(onNetworkAvailable())
      }
    });
  })

  // ------------------------: End Hooks :------------------------

  if(isLoaded) {
    return (
      <Provider store={store}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider mapping={mapping} theme={theme}>
          <AppContainer />
        </ApplicationProvider>
      </Provider>
    );
  } else {
    return (
      <AppLoading
        startAsync={cacheResourcesAsync}
        onFinish={onFinish}
        onError={onError}
      />
    );
  }
}

export default App;

