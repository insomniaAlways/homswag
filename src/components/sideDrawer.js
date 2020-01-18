import SafeAreaView from 'react-native-safe-area-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import { DrawerItems } from 'react-navigation-drawer';
import { StyleSheet, ScrollView, View, Image, Text, ImageBackground } from 'react-native';
import ProfilePic from '../../assets/images/profilePic.jpeg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import ProfileBackground from '../../assets/images/blue-wave.jpg';

const SideDrawer = props => (
  <ScrollView>
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: 'always', horizontal: 'never' }}
      >
        <ImageBackground source={ProfileBackground} style={styles.profilePicContainer}>
          <View style={styles.profilePic}>
            <Image style={styles.profilePic} source={ProfilePic}/>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>Hello, Pretty</Text>
          </View>
        </ImageBackground>
        <DrawerItems {...props} labelStyle={{width: '100%'}}/>
        <TouchableOpacity style={styles.logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>{}
        <View style={styles.backButtonContainer}>
          <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
            <View style={styles.backButton}>
              <FontAwesome name="angle-left" size={20} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    // borderWidth: 1
  },
  profilePicContainer: {
    height: 200,
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 30
  },
  profilePic: {
    height: 100,
    width: 100,
    borderRadius: 70
  },
  nameContainer: {
    marginTop: 20,
    width: '100%',
    paddingLeft: 5,
    // borderWidth: 1,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  name: {
    fontWeight: 'bold',
    width: '100%',
    fontSize: 16,
    color: 'white'
  },
  logout: {
    // justifyContent: 'flex-end',
    // paddingLeft: 16,
    // fontWeight: 'bold',
    // color: '#000000',
    // margin: 16,
    // width: '100%'
  },
  logoutText: {
    fontWeight: 'bold',
    margin: 16,
    color: "rgba(0, 0, 0, .87)",
    width: '100%'
  },

  backButtonContainer: {
    justifyContent: 'center',
    // borderWidth: 1,
    alignItems: "center",
    marginTop: 50,
    width: '100%'
    // position: 'absolute',
    // bottom: 0
  },

  backButton: {
    paddingTop: 7,
    paddingBottom: 7,
    width: 150,
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#6495ed'
  }
});

export default SideDrawer;