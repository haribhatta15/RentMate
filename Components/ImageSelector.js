import React, { useState } from 'react';

import { StyleSheet, Image, Text, View, Button, Alert } from 'react-native';
// import * as firebase from 'firebase';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import * as ImagePicker from 'expo-image-picker';
// import * as Permissions from 'expo-permissions';

const ImageSelector = () => {
  //   const verifyPermissions = async () => {
  //     const result = await Permissions.askAsync(Permissions.CAMERA);
  //     if (result.status !== 'granted') {
  //       Alert.alert('Get Permission!', [{ text: 'Okay' }]);
  //       return false;
  //     }
  //     return true;
  //   };
  const [pickedImage, setPickedImage] = useState();
  const takeImageHandler = async () => {
    // const hasPermission = await verifyPermissions();
    // if (!hasPermission) {
    //   return;
    // }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.uri);
    console.log(image);
    //     if (!image.cancelled) {
    //       uploadImage(image.uri, 'test-image')
    //         .then(() => {
    //           Alert.alert('Sucess');
    //         })
    //         .catch((err) => {
    //           Alert.alert(error);
    //         });
    //     }
    //   };
    //   const uploadImage = async (uri, imageName) => {
    //     const response = await fetch(uri);
    //     const blob = await response.blob();
    //     var ref = firebase
    //       .storage()
    //       .ref()
    //       .child('images/' + imageName);
    //     ref.put(blob);
  };

  return (
    <View>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  imagePicker: {},
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
export default ImageSelector;
