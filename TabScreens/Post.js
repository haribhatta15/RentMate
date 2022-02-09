import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TextInput,
  ScrollView,
  Button,
  ActivityIndicator,
  LogBox,
  TouchableOpacity,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import * as firebase from 'firebase/compat';
import 'firebase/compat/storage';
import { firebaseConfig } from '../user/config';
import { auth } from '../user/config';

const Post = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [download, setDownload] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  let idUi;
  let downloadLink;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const takeImageHandler = async () => {
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setImage(image.uri);
    console.log(image);
  };
  const removeImageHandler = () => {
    setImage(null);
  };

  //Post products in database
  const createProduct = async (
    id,
    title,
    description,
    imageUrl,
    category,
    price,
    postedBy
  ) => {
    const response = await fetch(
      'https://rent-mate-91f5c-default-rtdb.firebaseio.com/products.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          title: title,
          description: description,
          imageUrl: imageUrl,
          category: category,
          price: price,
          postedBy: postedBy,
        }),
      }
    );
    const resData = await response.json();
    console.log(resData);
    idUi = resData.name;
    return resData;
  };

  const uploadImage = async () => {
    if (!image) {
      alert('Please select image.');
    }
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', image, true);
      xhr.send(null);
    });

    const ref = firebase
      .storage()
      .ref()
      .child(`images/${new Date().toISOString()}`);
    const snapshot = ref.put(blob);

    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploading(true);
      },
      (error) => {
        setUploading(false);
        console.log(error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false);
          setDownload(url);
          console.log(downloadLink);
          console.log('download url: ', url);
          blob.close();
          return url;
        });
      }
    );

    LogBox.ignoreAllLogs();
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title) {
      alert('Please Fill title');
    } else if (!category) {
      alert('* Please Fill Categoty.');
      return;
    } else if (!price) {
      alert('* Please Fill Price.');
      return;
    } else if (!image) {
      alert('* Please Upload Image.');

      return;
    } else if (image == null) {
      alert('* Please Upload Image.');
    } else if (!title || !description || !category || !price || !image) {
      alert('* Please Fill Everything.');
      return;
    } else {
      createProduct(
        new Date().getTime(),
        title,
        description,
        download,
        category,
        price,
        auth.currentUser.uid
      );
      alert('Succesfully Uploaded');
      setTitle('');
      setDescription('');
      setCategory('');
      setPrice('');
      setImage(null);
    }
    console.log(idUi);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <ImageSelector /> */}
        <View style={styles.camerabox}>
          <View style={styles.imagecontainer}>
            {image ? (
              <View style={styles.removeicon}>
                <Image source={{ uri: image }} style={styles.imagebox} />
                <Pressable onPress={removeImageHandler}>
                  <Ionicons
                    name="remove-circle-outline"
                    size={24}
                    color="black"
                    style={styles.removeicon}
                  />
                </Pressable>
              </View>
            ) : (
              <Image source={{ uri: image }} style={styles.imagebox} />
            )}
          </View>

          <View style={styles.upload}>
            <Pressable onPress={takeImageHandler}>
              <Feather name="camera" size={24} color="black" />
            </Pressable>
            <Pressable onPress={pickImage}>
              <AntDesign name="addfile" size={24} color="black" />
            </Pressable>
          </View>
        </View>
        {!uploading ? (
          <Button
            title="Upload Image"
            onPress={uploadImage}
            style={{ marginTop: 250, height: 10, alignSelf: 'flex-start' }}
          />
        ) : (
          <ActivityIndicator size="large" color="black" />
        )}

        <TextInput
          style={styles.textbox}
          placeholder="Title"
          value={title}
          onChangeText={(title) => setTitle(title)}
        />
        <TextInput
          style={styles.textbox}
          value={description}
          placeholder="Description"
          onChangeText={(description) => setDescription(description)}
        />
        <TextInput
          style={styles.textbox}
          placeholder="Category"
          value={category}
          onChangeText={(category) => setCategory(category)}
        />
        <TextInput
          style={{ ...styles.textbox, marginBottom: 25 }}
          placeholder="Price                           |Aud($) Amount"
          value={price}
          onChangeText={(price) => setPrice(price)}
          keyboardType="numeric"
        />
        {!loading ? (
          <Button
            title="Post"
            onPress={submitHandler}
            style={{ marginTop: 250 }}
          />
        ) : (
          <ActivityIndicator size="large" color="black" />
        )}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 25,
  },
  textbox: {
    backgroundColor: 'white',
    width: 350,

    height: 50,
    borderRadius: 10,
    paddingLeft: 25,
    borderColor: 'black',
    marginTop: 15,
    borderStartWidth: 5,
    borderStyle: 'solid',
    fontSize: 15,
  },
  camerabox: {
    flexDirection: 'row',
    backgroundColor: 'white',
    maxWidth: 400,
    width: 350,
    height: 100,
    borderRadius: 10,
    padding: 15,
  },
  upload: {
    alignContent: 'flex-end',

    justifyContent: 'space-around',
  },
  imagecontainer: {
    flex: 1,
    justifyContent: 'center',
  },
  imagebox: {
    height: 80,
    width: 80,
    borderRadius: 10,
  },
  removeicon: {
    flexDirection: 'row',
  },
});
export default Post;
