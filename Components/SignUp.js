import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  Alert,
} from 'react-native';
import Terms from './Terms';
import { auth, signup } from '../user/config';
import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { db } from '../user/config';
import { doc, setDoc, addDoc, collection } from 'firebase/firestore';
import { firebase } from '../user/config';
import { firebaseConfig } from '../user/config';
import { createTable, insert } from '../user/db.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';

createTable();
// .then(() => {
//   console.log('Initializing database');
// })
// .catch((err) => {
//   console.log('Initiazlind db failed');
//   console.log(err);
// });
const SignUp = ({ navigation }) => {
  const [signed, setSigned] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const register_user = async () => {
    console.log(
      firstName,
      lastName,
      userName,
      email,
      phone,
      password,
      confirmPassword
    );

    // if (!firstName) {
    //   alert('Please fill firstName');
    //   return;
    // }
    // if (!lastName) {
    //   alert('Please fill lastName');
    //   return;
    // }
    // if (!userName) {
    //   alert('Please fill userName');
    //   return;
    // }
    // if (!email) {
    //   alert('Please fill email');
    //   return;
    // }
    // if (!phone) {
    //   alert('Please fill Phone number');
    //   return;
    // }
    // if (!password) {
    //   alert('Please fill password');
    //   return;
    // }
    // if (!confirmPassword) {
    //   alert('Please fill confirmPassword');
    //   return;
    // }
    // if (password != confirmPassword) {
    //   alert('Your password donot match');
    //   return;
    // } else {
    const dbResult = await insert(
      firstName,
      lastName,
      userName,
      email,
      phone,
      password,
      confirmPassword
    );
    //   console.log(dbResult);
    // }
  };
  const createUsers = async (
    uid,
    firstName,
    lastName,
    userName,
    email,
    phone,
    password
  ) => {
    try {
      const response = await fetch(
        'https://rent-mate-91f5c-default-rtdb.firebaseio.com/users.json',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: uid,
            firstname: firstName,
            lastName: lastName,
            userName: userName,
            email: email,

            phone: phone,
            password: password,
          }),
        }
      );
      const resData = await response.json();
      console.log(resData);

      return resData;
    } catch (error) {
      console.log(error);
    }
  };
  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    const sign = createUserWithEmailAndPassword(auth, email, password)
      .then((re) => {
        console.log(re);

        createUsers(
          re.user.uid,
          firstName,
          lastName,
          userName,
          email,
          phone,
          password
        );
        navigation.navigate('Home');

        setSigned(true);
        const uid = re.user.uid;
        const data = {
          id: userName,
          displayName: firstName + lastName,
          email,
          phoneNumber: phone,
          fullName: firstName + lastName,
        };
        const usersRef = async () => {
          await setDoc(collection(db, 'users'), {
            data,
          });
        };
        // usersRef
        //   .doc(uid)
        //   .set(data)
        //   .then(() => {
        //     navigation.navigate('Home');
        //   });
        usersRef();
      })

      .catch((re) => {
        switch (re.code) {
          case 'auth/invalid-email':
            setSigned(false);
            Alert.alert('Email is not valid');
            break;
          case 'auth/email-already-in-use':
            setSigned(false);
            Alert.alert('Email already in use');
            break;
            break;
          case 'auth/weak-password':
            setSigned(false);
            Alert.alert('Password should be at least 6 character');
        }

        console.log(re);
      });

    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then((response) => {
    //     const uid = response.user.uid;
    //     const data = {
    //       id: userName,
    //       email,
    //       firstName,
    //       lastName,
    //     };
    //     const usersRef = firebase.firestore().collection('users');
    //     usersRef
    //       .doc(uid)
    //       .set(data)
    //       .then(() => {
    //         navigation.navigate('Home', { user: data });
    //       })
    //       .catch((error) => {
    //         setSpinner(false);
    //         alert(error);
    //       });
    //   })
    //   .catch((error) => {
    //     setSpinner(false);
    //     alert(error);
    //   });
  };
  return (
    <View style={{ backgroundColor: '#0BC4C4', height: '100%' }}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.text}>Create Your account</Text>

          <View>
            <View style={styles.boxalign}>
              <TextInput
                style={{ ...styles.textbox, width: 160 }}
                placeholder="First Name"
                onChangeText={(firstName) => setFirstName(firstName)}
              />

              <TextInput
                style={{ ...styles.textbox, width: 160 }}
                placeholder="Last Name"
                onChangeText={(lastName) => setlastName(lastName)}
              />
            </View>
            <TextInput
              style={styles.textbox}
              placeholder="Username"
              onChangeText={(userName) => setUserName(userName)}
            />
            <TextInput
              style={styles.textbox}
              placeholder="Email"
              required
              autoCapitalize="none"
              onChangeText={(email) => setEmail(email)}
            />
            <TextInput
              style={styles.textbox}
              placeholder="Phone"
              keyboardType="numeric"
              onChangeText={(phone) => setPhone(phone)}
            />
            <View style={styles.textAndBox}>
              <TextInput
                style={styles.textbox}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
              />
              <Text style={{ color: 'grey', alignSelf: 'center' }}>
                Your Password must be at least 8 characters long.
              </Text>
            </View>

            <TextInput
              style={styles.textbox}
              placeholder=" Confirm Password"
              secureTextEntry={true}
              onChangeText={(confirmPassword) =>
                setConfirmPassword(confirmPassword)
              }
            />
            <Terms />
            <View style={styles.button}>
              <Button title="Sign Up" onPress={onRegisterPress} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#0BC4C4',
    padding: 30,
    zIndex: 1,
  },
  scrollView: {
    marginHorizontal: 0,
    padding: 0,
    zIndex: -20,
  },
  text: {
    fontSize: 25,
    marginTop: 50,
    color: 'white',
    marginBottom: 25,
  },
  textbox: {
    backgroundColor: 'white',
    width: 350,
    maxWidth: 400,
    height: 50,
    borderRadius: 10,
    paddingLeft: 25,
    borderColor: 'black',
    marginTop: 25,
    borderStartWidth: 5,
    borderStyle: 'solid',
    fontSize: 15,
  },
  boxalign: {
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  textAndBox: {
    marginBottom: -22,
  },
  button: {
    width: 300,
    alignSelf: 'center',
    borderRadius: 10,
    fontSize: 25,
  },
});
export default SignUp;
