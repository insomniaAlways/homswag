import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import ProfilePic from '../../assets/images/profilePic.jpeg';
import PlaceHolderTextInput from '../components/placeHolderTextInput';

function ProfileScreen() {
  return (
    <ScrollView>
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
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30
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
  }
})

export default ProfileScreen;