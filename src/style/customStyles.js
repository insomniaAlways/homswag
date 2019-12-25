import React from 'react';
import { StyleSheet } from 'react-native';

const brandColor = '#47d9a8';

const DefaultStyles = StyleSheet.create({
  brandTextColor: {
    color: brandColor
  },
  brandColorButton: {
    backgroundColor: brandColor,
  },
  basicBrandColorButton: {
    alignItems: 'center',
    borderColor: brandColor,
    borderWidth: 1,
    paddingTop: 8,
    paddingBottom: 8,
  },
  textWhite: {
    color: '#fff'
  },
  brandBackgroundColor: {
    backgroundColor: brandColor
  }
})

export default DefaultStyles;