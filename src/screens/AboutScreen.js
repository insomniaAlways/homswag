import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Logo from '../../assets/images/logo.png';
import { MaterialCommunityIcons, FontAwesome, Feather } from '@expo/vector-icons';
import { Linking } from 'expo';

function ContactScreen(props) {

  const openDialScreen = () => {
    let number = '';
    number = 'tel:${+916366505567}'; 
    Linking.openURL(number);
  };
  const openMailScreen = () => {
    let mailAddress = '';
    mailAddress = 'mailto: care@homswag.com'
    Linking.openURL(mailAddress);
  };

  return (
    <View style={{flex: 1, paddingTop: 70, backgroundColor: 'rgba(99, 186, 193, 0.3)'}}>
      <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 40}}>
        <Image source={Logo} style={{width: 110, height: 120}}/>
      </View>
      <View style={{flex: 3, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 40, paddingRight: 40}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', width: '100%', textAlign: 'center'}}>About HomSwag</Text>
        <Text style={{textAlign: 'center', marginTop: 10, fontStyle: 'italic'}}>
          HomSwag we have lunch professional salon services at home with very enthusiastic and Professionally educated teams
          from known academy VIDAL SASSOON And well experienced from industry, lunched with all salon services.
        </Text>
        <Text style={{fontSize: 18, fontWeight: 'bold', width: '100%', textAlign: 'center', marginTop: 30}}>Contact details</Text>
        <View style={{flexDirection: 'row', width: "70%", marginTop: 10}}>
          <MaterialCommunityIcons name="map-marker-outline" size={16} color="black"/>
          <Text style={{textAlign: 'left', marginLeft: 10}}>
            #339 4th Floor 27th main road HSR Layout Sector - 2, Bangalore -560102
          </Text>
        </View>
        <View style={{flexDirection: 'row', width: "70%", marginTop: 10, alignItems: "center"}}>
          <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => openDialScreen()}>
            <FontAwesome name="phone" size={16} color="black" style={{paddingTop: 2}}/>
            <Text style={{textAlign: 'left', marginLeft: 10}}>
            +91 6366-505567
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', width: "70%", marginTop: 10}}>
          <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => openMailScreen()}>
            <Feather name="mail" size={16} color="black" style={{paddingTop: 2}}/>
            <Text style={{textAlign: 'left', marginLeft: 10}}>care@homswag.com</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
          <View style={styles.backButton}>
            <FontAwesome name="angle-left" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ContactScreen;

const styles = StyleSheet.create({
  backButtonContainer: {
    justifyContent: 'center',
    // borderWidth: 1,
    alignItems: "center",
    marginBottom: 30,
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