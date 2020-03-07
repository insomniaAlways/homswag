import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View, ImageStyle } from 'react-native';
import { Button, Input, Text } from '@ui-kitten/components';
import { ImageOverlay } from '../../components/imageOverlay';
import { KeyboardAvoidingView } from '../../components/KeyboardAvoidView';
import { Icon } from '@ui-kitten/components';
import ImageBackground from '../../../assets/images/image-background.jpg'
import { connect } from 'react-redux';
import { addHeader, register, validateToken, onValidationSuccess, validatedAuthToken } from '../../../store/actions/authenticationAction';
import { setSessionUnauthenticated, setSessionAuthenticated } from '../../../store/actions/sessionActions';
import { fetchUser } from '../../../store/actions/userActions'
import { AsyncStorage } from 'react-native';
import { Spinner } from '@ui-kitten/components';
import * as Animatable from 'react-native-animatable';
import LoginForm from '../../components/helpers/loginForm';
import LoginButtons from '../../components/helpers/loginButtons';

const LoginScreen = (props) => {
  const { navigation,
    addTokenToHeader,
    registerUser,
    validateOtp,
    currentUserModel,
    restoreAuth,
    networkAvailability,
    unAuthenticate,
    authenticate,
    getUser,
    authModel,
    session,
    validateCurrentToken } = props
  const [ phone, setPhone ] = useState();
  const [ otp, setOtp ] = useState();
  const [ showOtpField, setShowOtpField ] = useState(false);
  const [ isLoading, setLoading ] = useState(false)
  const [ isResendEnable, enableResend ] = useState(false)
  let resendTimer;

  console.log('sessionModel', session.isUpdating)
  console.log('auth', authModel.isLoading)
  console.log('currentUserModel', currentUserModel.isLoading)

  //  ------------------ : Methods: ---------------------

  //called when first time login and after logout
  const startLoginProcess = async () => {
    await unAuthenticate()
  }

  //while application load
  const checkAuthentication = async () => {
    try {
      let token = await AsyncStorage.getItem('token')
      let tokenObject = JSON.parse(token)
      if(tokenObject && tokenObject.authToken && tokenObject.refreshToken) {
        validateCurrentToken(tokenObject.authToken, tokenObject.refreshToken)
      } else {
        startLoginProcess()
      }
    } catch (e) {
      alert(e)
    }
  }

  //should called while session is authenticated and current user data loaded
  const redirectTo = () => {
    if(currentUserModel.values && currentUserModel.values.name) {
      navigation.navigate('App')
    } else if (currentUserModel.values && !currentUserModel.values.name) {
      navigation.navigate('ProfileUpdate')
    }
  }

  const registerPhone = async () => {
    if(networkAvailability.isOffline) {
      alert('Seems like you are not connected to Internet')
    } else {
      if(phone && phone.length == 10) {
        try {
          await registerUser(phone)
          setShowOtpField(true)
          resendTimer = setTimeout(() => {
            enableResend(true)
            clearTimeout(resendTimer)
          }, 5000);
        } catch(e) {
          setLoading(false)
          alert(e)
        }
      } else {
        alert("Please provide a valid phone number")
      }
    }
  }

  //  ------------------- : END: -----------------------

  // ------------------- : Hooks : ---------------------

  useLayoutEffect(() => {
    checkAuthentication()
  }, [])

  //trigger when otp validation succeed
  useEffect(() => {
    if(!authModel.isLoading && authModel.userToken && authModel.refreshToken) {
      authenticate(authModel.userToken, authModel.refreshToken)
    } else if(!authModel.isLoading && authModel.error) {
      if(authModel.error && authModel.error.message) {
        alert(authModel.error.message)
      } else {
        alert(authModel.error)
      }
    }
  }, [authModel.isLoading, authModel.userToken])

  //trigger after session is authenticated
  useEffect(() => {
    if(session.isSessionAuthenticated) {
      getUser()
    }
  }, [session.isSessionAuthenticated])

  //trigger after only session get authenticated
  //Should responsible for redirection
  useEffect(() => {
    if(session.isSessionAuthenticated) {
      if(!currentUserModel.isLoading && currentUserModel.values && currentUserModel.values.id) {
        redirectTo()
      } else if(!currentUserModel.isLoading && currentUserModel.error) {
        if(currentUserModel.error && currentUserModel.error.message) {
          alert(currentUserModel.error.message)
        } else {
          alert(currentUserModel.error)
        }
      }
    }
  }, [currentUserModel.isLoading, currentUserModel.values, currentUserModel.error])

  // -------------------: END : ---------------------

  return (
    <KeyboardAvoidingView>
      <ImageOverlay
        style={styles.container}
        source={ImageBackground}>
        {!session.isUpdating ?
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
            <Animatable.View
              duration={400}
              style={styles.formContainer}
              animation={"fadeInUp"}
            >
              <LoginForm
                phone={phone}
                setPhone={setPhone}
                otp={otp}
                setOtp={setOtp}
                showOtpField={showOtpField}
                registerPhone={registerPhone}
                setShowOtpField={setShowOtpField}
                isResendEnable={isResendEnable}
                enableResend={enableResend}
              />
              { isLoading ? 
                <View style={styles.signInButtonContainer}>
                  <View style={[styles.signInButton, {justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}]}>
                    <Spinner status='primary'/>
                  </View>
                </View> :
                <LoginButtons
                  phone={phone}
                  otp={otp}
                  resendTimer={resendTimer}
                  networkAvailability={networkAvailability}
                  showOtpField={showOtpField}
                  enableResend={enableResend}
                  registerPhone={registerPhone}
                  setShowOtpField={setShowOtpField}
                />
            }
            </Animatable.View>
          </View> : 
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#fff', fontSize: 16}}>Loading..</Text>
          </View>
        }
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = state => ({
  authModel: state.auth,
  currentUserModel: state.currentUser,
  networkAvailability: state.networkAvailability,
  session: state.session
})

const mapDispatchToProps = dispatch => ({
  addTokenToHeader: (token) => dispatch(addHeader(token)),
  registerUser: (phone) => dispatch(register(phone)),
  validateOtp: (phone, otp) => dispatch(validateToken(phone, otp)),
  getUser: () => dispatch(fetchUser()),
  restoreAuth: (token) => dispatch(onValidationSuccess({token: token})),
  unAuthenticate: () => dispatch(setSessionUnauthenticated()),
  authenticate: (token, refreshToken) => dispatch(setSessionAuthenticated(token, refreshToken)),
  validateCurrentToken: (authToken, refreshToken) => dispatch(validatedAuthToken(authToken, refreshToken))
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
    paddingVertical: 10,
    width: 140,
    backgroundColor: '#eee',
    borderRadius: 10
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