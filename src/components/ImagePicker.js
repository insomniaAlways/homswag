import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Text, Layout } from '@ui-kitten/components';
import { FontAwesome } from '@expo/vector-icons';

const ImagePickerView = (props) => {
  const [ image, setImage ] = useState()

  const startModule = () =>{
    getPermissionAsync();
  }

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
    _pickImage()
  }

  const _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri)
    }
  };

  return (
    <Layout style={props.styles.profilePicContainer}>
      { image ?
        <Layout>
          <Layout style={props.styles.profilePic}>
            <Image style={props.styles.profilePic} source={{uri: image}}/>
          </Layout>
        <TouchableOpacity onPress={startModule} style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text>Change</Text>
        </TouchableOpacity>
        </Layout> :
        <TouchableOpacity onPress={startModule}>
          <Layout style={props.styles.profilePicPlaceHolder}>
            <Layout style={{paddingBottom: 10, paddingRight: 10}}>
              <FontAwesome name="camera" size={24} />
            </Layout>
          </Layout>
        </TouchableOpacity>
      }
    </Layout>
  )
}

export default ImagePickerView;