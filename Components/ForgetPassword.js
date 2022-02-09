import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import React, { useState } from 'react';
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../user/config';

const ForgetPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const forgotPassword = (email) => {
    sendPasswordResetEmail(auth, email, null)
      .then(() => {
        alert('reset email send to ' + email);
      })
      .catch(function (e) {
        console.log(e);
      });
  };
  const login = () => {
    navigation.navigate('Home');
  };
  return (
    <View onPress={() => Keyboard.dismiss()}>
      <Text></Text>
      <TextInput
        style={styles.textbox}
        placeholder="Email"
        defaultValue={email}
        onChangeText={(text) => setEmail(text)}
        textContentType="username"
      />

      <View style={styles.button}>
        <Button title="Send Link" onPress={() => forgotPassword(email)} />
      </View>
      <View style={styles.button}>
        <Button title="Login" onPress={login} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  textbox: {
    backgroundColor: 'white',
    width: 350,
    height: 50,
    borderRadius: 10,
    paddingLeft: 25,
    borderColor: 'black',
    marginTop: 25,
    borderStartWidth: 5,
    borderStyle: 'solid',
    fontSize: 15,
  },
  button: {
    width: 300,
    alignSelf: 'center',
    borderRadius: 10,
    fontSize: 25,
    marginTop: 25,
  },
});

export default ForgetPassword;
