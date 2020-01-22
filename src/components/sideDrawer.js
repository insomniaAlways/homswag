import React from 'react';
import { DrawerItems } from 'react-navigation-drawer';
import { StyleSheet, ScrollView, View, Image, Text, ImageBackground } from 'react-native';
import ProfilePic from '../../assets/images/profilePic.jpeg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileBackground from '../../assets/images/blue-wave.jpg';
import Constants from 'expo-constants';
import { Linking } from 'expo';

const SideDrawer = props => {

  const openWhatsApp = () => {
    let url = `whatsapp://send?text=hello&phone=916366505567`
    Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        console.log("Can't handle url: " + url);
      } else {
        return Linking.openURL(`whatsapp://send?text=hello&phone=916366505567`);
      }
    })
    .catch((err) => console.error('An error occurred', err));
  }

  return (
  <View style={styles.container}>
    <View style={{flex: 1}}>
      <ImageBackground source={ProfileBackground} style={styles.profilePicContainer}>
        <View style={styles.profilePic}>
          <Image style={styles.profilePic} source={ProfilePic}/>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>Hello, Pretty</Text>
        </View>
      </ImageBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <DrawerItems {...props} labelStyle={{width: '100%'}}/>
        <TouchableOpacity onPress={() => openWhatsApp()}>
          <View style={styles.logout}>
            <MaterialCommunityIcons name="logout" size={18} style={{marginHorizontal: 16, width: 24, alignItems: 'center', opacity: 0.62, paddingLeft: 3}}/>
            <Text style={styles.logoutText}>Need Help?</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.logout}>
            <MaterialCommunityIcons name="logout" size={18} style={{marginHorizontal: 16, width: 24, alignItems: 'center', opacity: 0.62, paddingLeft: 3}}/>
            <Text style={styles.logoutText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
    <View style={styles.backButtonContainer}>
      <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
        <View style={styles.backButton}>
          <FontAwesome name="angle-left" size={20} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  </View>
)};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profilePicContainer: {
    height: 230,
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 30,
    paddingTop: Constants.statusBarHeight
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
    backgroundColor: "transparent",
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
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
    marginBottom: 30,
    width: '100%'
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