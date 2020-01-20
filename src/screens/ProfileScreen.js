import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ProfilePic from '../../assets/images/profilePic.jpeg';
import PlaceHolderTextInput from '../components/placeHolderTextInput';
import { FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';

function ProfileScreen(props) {
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.profilePicContainer}>
          <View style={styles.profilePic}>
            <Image style={styles.profilePic} source={ProfilePic}/>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>Pretty</Text>
          </View>
        </View>
        <View style={styles.detialsContainer}>
          <Text style={{textAlign: 'left', width: '80%'}}>Email</Text>
          <PlaceHolderTextInput placeholder="Email" styles={styles.placeholderInput}/>
          <Text style={{textAlign: 'left', width: '80%', marginTop: 10}}>Phone</Text>
          <PlaceHolderTextInput placeholder="Phone" styles={styles.placeholderInput}/>
          <Text style={{textAlign: 'left', width: '80%', marginTop: 10}}>Address</Text>
          <PlaceHolderTextInput placeholder="Address" styles={styles.placeholderInput}/>
        </View>
      </View>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
          <View style={styles.backButton}>
            <FontAwesome name="angle-right" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    height: '100%',
    // borderWidth: 1
  },
  profilePicContainer: {
    height: 250,
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profilePic: {
    height: 140,
    width: 140,
    borderRadius: 70
  },
  nameContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    fontWeight: 'bold',
    width: '100%',
    textAlign:'center'
  },
  detialsContainer: {
    // flex: 1,
    flexDirection: 'column',
    height: 250,
    // borderWidth: 1,
    width: '100%',
    paddingTop: 20,
    // justifyContent: 'center',
    alignItems: 'center'
  },
  placeholderInput: {
    width: '80%'
  },
  backButtonContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignContent: 'flex-end',
    // borderWidth: 1,
    alignItems: "center",
    marginBottom: 30,
    width: '100%',
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
})

export default ProfileScreen;