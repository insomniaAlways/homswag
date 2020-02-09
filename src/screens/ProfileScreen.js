import React, { useEffect } from 'react';
import {ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ProfilePic from '../../assets/images/profilePic.jpeg';
import { Text, Layout } from '@ui-kitten/components';
import PlaceHolderTextInput from '../components/placeHolderTextInput';
import { FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import { fetchUser, updateUser } from '../../store/actions/userActions';
import { fetchAddress } from '../../store/actions/addressActions';

function ProfileScreen(props) {
  const { currentUser, getAddress, getUser, addresses } = props
  const address = addresses && addresses[0].address && addresses[0].address.formatedAddress

  const updateProfile = (data) => {
    console.log(data)
  }

  useEffect(() => {
    getUser()
    getAddress()
  }, [])

  return (
    <Layout style={{flex: 1}}>
      <Layout style={styles.container}>
        <Layout style={styles.profilePicContainer}>
          <Layout style={styles.profilePic}>
            <Image style={styles.profilePic} source={ProfilePic}/>
          </Layout>
          <Layout style={styles.nameContainer}>
            <Text style={styles.name}>Pretty</Text>
          </Layout>
        </Layout>
        <Layout style={styles.detialsContainer}>
          <Layout style={styles.item}>
            <Text style={styles.label}>Email</Text>
            <PlaceHolderTextInput
              placeholder="Email"
              containerStyle={styles.placeholderInput}
              styles={styles.field}
              value={currentUser.values.email}
              setValue={updateProfile}
              previousState={currentUser.values}
              itemKey="email"
              disabled={false}/>
          </Layout>
          <Layout style={styles.item}>
            <Text style={styles.label}>Phone</Text>
            <PlaceHolderTextInput
              placeholder="phone"
              containerStyle={styles.placeholderInput}
              styles={styles.field}
              value={currentUser.values.phone}
              setValue={updateProfile}
              previousState={currentUser.values}
              itemKey="phone"
              disabled={false}/>
          </Layout>
          <Layout style={styles.item}>
            <Text style={styles.label}>Address</Text>
            {address ? 
              <Text style={[styles.placeholderInput, styles.field]}>{address}</Text> :
              <Text style={[styles.placeholderInput, styles.field]}>No address found</Text>
            }
          </Layout>
        </Layout>
      </Layout>
      <Layout style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
          <Layout style={styles.backButton}>
            <FontAwesome name="angle-right" size={20} color="white" />
          </Layout>
        </TouchableOpacity>
      </Layout>
    </Layout>
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
    height: 250,
    width: '100%',
    borderColor: 'blue',
    paddingTop: 20,
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  placeholderInput: {
    width: '70%',
  },

  field: {
    paddingHorizontal: 10
  },
  backButtonContainer: {
    justifyContent: 'center',
    alignContent: 'flex-end',
    alignItems: "center",
    marginBottom: 30,
    width: '100%',
  },

  backButton: {
    paddingTop: 7,
    paddingBottom: 7,
    width: 150,
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#6495ed'
  },

  label: {
    width: '20%',
    textAlign: 'left',
    justifyContent: 'center'
  }

})

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  addresses: state.addresses.values
})

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(fetchUser()),
  updateUserDetails: (user) => dispatch(updateUser(user)),
  getAddress: () => dispatch(fetchAddress())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);