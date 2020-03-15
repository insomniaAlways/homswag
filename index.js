import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';
import * as firebase from 'firebase';

firebase.initializeApp(Constants.manifest.extra.firebaseConfig);

Sentry.init({
  dsn: Constants.manifest.extra.sentry.dsnKey,
  enableInExpoDevelopment: true,
  debug: true
});

AppRegistry.registerComponent(appName, () => App);
