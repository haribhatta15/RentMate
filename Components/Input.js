import React, { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from 'react-native';
import { auth } from '../user/config';

import { signInWithEmailAndPassword } from 'firebase/auth';

let db;
const Input = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    db = SQLite.openDatabase('MainDB.db');
  });

  const handleSignIn = () => {
    if (!userName) {
      alert('Please Insert Username');
    }
    if (!password) {
      alert('Please Insert Password');
    }
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM RegisterUser WHERE userName="${userName}"`,
          [],
          (_, result) => {
            resolve(result);
            const len = result.rows.length;
            console.log(result);
            if (!len) {
              alert('This account does not exist');
            } else {
              const row = result.rows.item(0);
              if (password === row.password) {
                console.log('sign in sucessful');
                navigation.navigate('Tab');
                return;
              }
              alert('Authentication failed!');
            }
          },
          (_, err) => {
            reject(err);
          }
        );
      });
      return promise;
    });
  };
  const SignInUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((re) => {
        setIsSignedIn(true);
        navigation.navigate('Tab');
      })
      .catch((re) => {
        console.log(re);
      });
  };

  // };
  return (
    <View onPress={() => Keyboard.dismiss()}>
      <TextInput
        style={styles.textbox}
        placeholder="Email"
        defaultValue={email}
        onChangeText={(text) => setEmail(text)}
        textContentType="username"
      />
      <TextInput
        style={styles.textbox}
        placeholder="Password"
        defaultValue={password}
        onChangeText={(text) => setPassword(text)}
        textContentType="password"
        secureTextEntry={true}
      />
      <View style={styles.button}>
        <Button title="Sign In" onPress={() => SignInUser()} />
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
export default Input;
