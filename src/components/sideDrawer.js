import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import { DrawerItems } from 'react-navigation-drawer';
import { StyleSheet, ScrollView } from 'react-native';

const SideDrawer = props => (
  <ScrollView>
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: 'always', horizontal: 'never' }}
      >
        <DrawerItems {...props} labelStyle={{width: '100%'}}/>
      </SafeAreaView>
    </SafeAreaProvider>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
});

export default SideDrawer;