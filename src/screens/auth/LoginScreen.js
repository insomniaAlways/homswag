import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View, ImageStyle } from 'react-native';
import { Button, Input, Text } from '@ui-kitten/components';
import { ImageOverlay } from '../../components/imageOverlay';
import { KeyboardAvoidingView } from '../../components/KeyboardAvoidView';
import { Icon } from '@ui-kitten/components';
import ImageBackground from '../../../assets/images/image-background.jpg'
import { connect } from 'react-redux';
import { addHeader, register, validateToken, onValidationSuccess } from '../../../store/actions/authenticationAction';
import { fetchUser } from '../../../store/actions/userActions'
import { AsyncStorage } from 'react-native';
import { Spinner } from '@ui-kitten/components';

const PhoneIcon = (style) => (
  <Icon {...style} name='phone'/>
);

const LoginScreen = (props) => {
  const { navigation, addTokenToHeader, registerUser, validateOtp, auth, currentUserModel, restoreAuth } = props
  const [ isSessionAuthenticated, setSession ] = useState(false)
  const [ isSessionAuthenticating, setAuthenticating ] = useState(true)
  const [ phone, setPhone ] = useState();
  const [ otp, setOtp ] = useState();
  const [ showOtpField, setShowOtpField ] = useState(false);
  const [ isLoading, setLoading ] = useState(false)
  
  const storeSession = async () => {
    let token
    try {
      await AsyncStorage.setItem('token', auth.userToken);
      token = await AsyncStorage.getItem('token')
      if(token) {
        props.getUser()
      }
    } catch (e) {
      resetState()
    }
  };

  const redirectToApp = () =>  {
    navigation.navigate('App')
  }

  const onSubmit = async () => {
    if(phone && otp) {
      setLoading(true)
      validateOtp(phone, otp)
    }
  };

  const resetState = () => {
    setSession(false)
    setAuthenticating(false)
    setShowOtpField(false)
    setLoading(false)
  }

  const registerPhone = async () => {
    if(phone) {
      setShowOtpField(true)
      try {
        await registerUser(phone)
        setShowOtpField(true)
      }
      catch(e) {
        resetState()
      }
    }
  }

  useEffect(() => {
    if(!currentUserModel.isLoading && currentUserModel.values.id && auth.userToken) {
      if(currentUserModel.values.name) {
        redirectToApp()
      } else {
        navigation.navigate('ProfileUpdate')
      }
    }
    if(!currentUserModel.isLoading && currentUserModel.error) {
      resetState()
      alert("Your session is expired. Please login again.")
    }
  }, [currentUserModel.isLoading, currentUserModel.error])

  const bootstrapApp = async () => {
    let userToken;
    try {
      userToken = await AsyncStorage.getItem('token');
      restoreAuth(userToken)
      if(userToken) {
        let token = userToken ? userToken : auth.userToken
        addTokenToHeader(token)
        props.getUser()
      } else {
        setSession(false)
        setAuthenticating(false)
      }
    } catch (e) {
      alert(e)
      resetState()
    }
  };

  useEffect(() => {
    setShowOtpField(false)
    if(phone) {
      resetState()
    }
    return () => {
      if(!auth.isLoading && auth.userToken) {
        setSession(true)
        setAuthenticating(false)
      }
    }
  }, [phone])

  useEffect(() => {
    if(!auth.isLoading && auth.userToken) {
      storeSession()
    }
    if(!auth.isLoading && auth.error) {
      resetState()
      alert(auth.error.message)
    }
    return () => {
      if(!auth.isLoading && auth.userToken) {
        setSession(true)
        setAuthenticating(false)
      }
    }
  }, [auth.isLoading, auth.isSignOut, auth.userToken, auth.error])

  useLayoutEffect(() => {
    bootstrapApp();
    return () => {
      if(!auth.isLoading && auth.userToken) {
        setSession(true)
        setAuthenticating(false)
      }
    }
  }, [])

  useEffect(() => {
    setOtp();
    return () => {
      if(!auth.isLoading && auth.userToken) {
        setSession(true)
        setAuthenticating(false)
      }
    }
  }, [showOtpField])

  return (
    <KeyboardAvoidingView>
      <ImageOverlay
        style={styles.container}
        source={ImageBackground}>
        {!isSessionAuthenticated && !isSessionAuthenticating ?
        <View style={{flex: 1}}>
          <View style={styles.headerContainer}>
            <Text
              category='h1'
              status='control'>
              Hello
            </Text>
            <Text
              style={styles.signInLabel}
              category='s1'
              status='control'>
              Please provide your phone number
            </Text>
          </View>
          <View style={styles.formContainer}>
            <Input
              status='control'
              placeholder='Phone Number'
              icon={PhoneIcon}
              maxLength={10}
              keyboardType={'number-pad'}
              value={phone}
              onChangeText={setPhone}
            />
            {showOtpField && 
              <Input
                style={styles.passwordInput}
                status='control'
                placeholder='OTP'
                keyboardType={'number-pad'}
                value={otp}
                onChangeText={setOtp}
              />}
          </View>
          { isLoading ? 
            <View style={styles.signInButtonContainer}>
              <View style={[styles.signInButton, {justifyContent: 'center', alignItems: 'center', paddingVertical: 10}]}>
                <Spinner status='primary'/>
              </View>
            </View> :
            <View style={styles.signInButtonContainer}>
              { showOtpField ? 
                <Button
                  style={styles.signInButton}
                  status='control'
                  size='medium'
                  disabled={isLoading}
                  onPress={onSubmit}>
                  Submit
                </Button> :
                <Button
                  style={styles.signInButton}
                  status='control'
                  size='medium'
                  disabled={isLoading}
                  onPress={registerPhone}>
                  Continue
                </Button>
              }
            </View> 

          }
        </View>
        : 
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#fff', fontSize: 16}}>Loading..</Text>
        </View>
        }
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  currentUserModel: state.currentUser
})

const mapDispatchToProps = dispatch => ({
  addTokenToHeader: (token) => dispatch(addHeader(token)),
  registerUser: (phone) => dispatch(register(phone)),
  validateOtp: (phone, otp) => dispatch(validateToken(phone, otp)),
  getUser: () => dispatch(fetchUser()),
  restoreAuth: (token) => dispatch(onValidationSuccess({token: token}))
})

export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
    marginBottom: 10,
    width: '50%'
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  passwordInput: {
    marginTop: 16,
  },
  signInButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }

});