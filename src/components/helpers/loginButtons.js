import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Spinner } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { register, validateToken } from '../../../store/actions/authenticationAction';

function LoginButtons(props) {
  const { phone, otp, showOtpField, setShowOtpField, registerUser, validatedOtp, networkAvailability } = props
  const [ isLoading, setLoading ] = useState(false)
  const [ isRegisterButtonEnable, setRegisterEnable ] = useState(false)
  const [ isOtpButtonEnable, setOtpEnable ] = useState(false)

  const resetAll = (isOtp = false) => {
    setLoading(false)
    setRegisterEnable(false)
    if(isOtp) {
      setOtpEnable(false)
    }
  }

  const registerPhone = async () => {
    if(networkAvailability.isOffline) {
      alert('Seems like you are not connected to Internet')
    } else {
      if(phone && phone.length == 10) {
        try {
          setLoading(true)
          await registerUser(phone)
          setShowOtpField(true)
          setOtpEnable(false)
          setLoading(false)
        } catch(e) {
          setLoading(false)
          alert(e)
          resetAll()
        }
      }
    }
  }

  const onSubmit = async () => {
    if(networkAvailability.isOffline) {
      alert('Seems like you are not connected to Internet')
    } else {
      if(phone && phone.length == 10 && otp && otp.length) {
        try {
          setLoading(true)
          await validatedOtp(phone, otp)
          setLoading(false)
        } catch(e) {
          setLoading(false)
          alert(e)
        }
      }
    }
  }

  useEffect(() => {
    if(phone && phone.length == 10) {
      setRegisterEnable(true)
    } else {
      setRegisterEnable(false)
    }
  }, [phone])
console.log(phone)
  useEffect(() => {
    if(otp && otp.length > 0 && isRegisterButtonEnable) {
      setOtpEnable(true)
    } else {
      setOtpEnable(false)
    }
  }, [otp])

  if(isLoading) {
    <View style={styles.signInButtonContainer}>
      <View style={[styles.signInButton, {justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'}]}>
        <Spinner status='primary'/>
      </View>
    </View>
  } else {
    return (
      <View style={styles.signInButtonContainer}>            
        { showOtpField ? 
          <TouchableOpacity style={styles.signInButton} onPress={onSubmit} disabled={!isRegisterButtonEnable}>
            <Text style={{textAlign: 'center', width: '100%', fontSize: 18}}>Submit</Text>
          </TouchableOpacity>:
          <TouchableOpacity style={[styles.signInButton]} onPress={registerPhone} disabled={!isOtpButtonEnable}>
            <Text style={{textAlign: 'center', width: '100%', fontSize: 18}}>Continue</Text>
          </TouchableOpacity>
        }
      </View>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
})

const mapDispathToProps = dispatch => ({
  registerUser: (phone) => dispatch(register(phone)),
  validatedOtp: (phone, otp) => dispatch(validateToken(phone, otp))
})

export default connect(mapStateToProps, mapDispathToProps)(LoginButtons);

const styles = StyleSheet.create({
  signInButton: {
    marginHorizontal: 16,
    marginBottom: 10,
    paddingVertical: 10,
    width: 140,
    backgroundColor: '#eee',
    borderRadius: 10
  },
  signInButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});