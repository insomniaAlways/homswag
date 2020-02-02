import React, { useState } from 'react';
import { StyleSheet, View, ImageStyle } from 'react-native';
import { Button, Input, Text } from '@ui-kitten/components';
import { ImageOverlay } from '../../components/imageOverlay';
import { KeyboardAvoidingView } from '../../components/KeyboardAvoidView';
import { Icon, IconElement } from '@ui-kitten/components';
import ImageBackground from '../../../assets/images/image-background.jpg'

const PhoneIcon = (style) => (
  <Icon {...style} name='phone'/>
);

const LoginScreen = ({ navigation }) => {

  const [phone, setPhone] = useState();
  const [otp, setOtp] = useState();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSignInButtonPress = () => {
    navigation.navigate('App')
  };

  return (
    <KeyboardAvoidingView>
      <ImageOverlay
        style={styles.container}
        source={ImageBackground}>
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
            value={phone}
            onChangeText={setPhone}
          />
          <Input
            style={styles.passwordInput}
            status='control'
            placeholder='OTP'
            value={otp}
            onChangeText={setOtp}
          />
        </View>
        <Button
          style={styles.signInButton}
          status='control'
          size='giant'
          onPress={onSignInButtonPress}>
          SIGN IN
        </Button>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
    marginTop: 32,
    paddingHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
    marginBottom: 10
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
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
});