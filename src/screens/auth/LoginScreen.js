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
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LoginForm from '../../components/helpers/loginForm';
import LoginButtons from '../../components/helpers/loginButtons';

const PhoneIcon = (style) => (
  <Icon {...style} name='phone'/>
);

const LoginScreen = (props) => {
  const { navigation, addTokenToHeader, registerUser, validateOtp, auth, currentUserModel, restoreAuth, networkAvailability } = props
  const [ isSessionAuthenticated, setSession ] = useState(false)
  const [ isSessionAuthenticating, setAuthenticating ] = useState(true)
  const [ phone, setPhone ] = useState();
  const [ otp, setOtp ] = useState();
  const [ showOtpField, setShowOtpField ] = useState(false);
  const [ isLoading, setLoading ] = useState(false)
  const [ isResendEnable, enableResend ] = useState(false)
  let resendTimer;
  
  const storeSession = async () => {
    let token
    try {
      if(auth.userToken) {
        await AsyncStorage.setItem('token', auth.userToken);
        token = await AsyncStorage.getItem('token')
        if(token) {
          props.getUser()
        }
      } else {
        alert('Something went wrong, Please try again')
      }
    } catch (e) {
      resetState()
    }
  };

  const redirectToApp = () =>  {
    navigation.navigate('App')
  }

  const onSubmit = async () => {
    if(networkAvailability.isOffline) {
      alert('Seems like you are not connected to Internet')
    } else {
      if(phone && otp) {
        setLoading(true)
        validateOtp(phone, otp)
      }
    }
  };

  const resetState = (skipOtp=false) => {
    setSession(false)
    setAuthenticating(false)
    setLoading(false)
    if(!skipOtp) {
      setShowOtpField(false)
      clearTimeout(resendTimer)
      resendTimer = setTimeout(() => {
        enableResend(true)
      }, 5000)
      enableResend(false)
    }
  }

  const registerPhone = async () => {
    if(networkAvailability.isOffline) {
      alert('Seems like you are not connected to Internet')
    } else {
      if(phone && (phone.length == 10)) {
        setShowOtpField(true)
        setSession(false)
        try {
          await registerUser(phone)
          setShowOtpField(true)
          resendTimer = setTimeout(() => {
            enableResend(true)
          }, 5000)
        }
        catch(e) {
          resetState()
        }
      }
    }
  }

  useEffect(() => {
    if(!currentUserModel.isLoading && currentUserModel.values.id && auth.userToken) {
      if(currentUserModel.values.name) {
        setSession(true)
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
    clearTimeout(resendTimer)
    enableResend(false)
    if(phone) {
      resetState()
    }
    return () => {
      if(!auth.isLoading && auth.userToken) {
        // setSession(true)
        setAuthenticating(false)
      }
    }
  }, [phone])

  useEffect(() => {
    if(!auth.isLoading && auth.userToken) {
      storeSession()
    }
    if(!auth.isLoading && auth.error) {
      resetState(true)
      alert(auth.error.message)
    }
    return () => {
      if(!auth.isLoading && auth.userToken) {
        // setSession(true)
        setAuthenticating(false)
      }
    }
  }, [auth.isLoading, auth.isSignOut, auth.userToken, auth.error])

  useLayoutEffect(() => {
    bootstrapApp();
    return () => {
      if(!auth.isLoading && auth.userToken) {
        // setSession(true)
        setAuthenticating(false)
      }
    }
  }, [])

  useEffect(() => {
    setOtp();
    return () => {
      if(!auth.isLoading && auth.userToken) {
        // setSession(true)
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
                  networkAvailability={networkAvailability}
                  showOtpField={showOtpField}
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
  auth: state.auth,
  currentUserModel: state.currentUser,
  networkAvailability: state.networkAvailability
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