import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth, firebase } from '../user/config';
import { useGlobalContext } from '../Components/context';
const Profile = () => {
  const [name, setName] = useState(auth.currentUser.displayName);
  const [data, setData] = useState([{}]);
  const url = 'https://rent-mate-91f5c-default-rtdb.firebaseio.com/users.json';
  const { createProduct } = useGlobalContext();
  const createProfile = async (url) => {
    try {
      const response = await fetch(url);
      const resData = await response.json();
      const result = Object.values(resData);

      if (result) {
        setData(result);
      } else {
        new Error('The result is empty cant trigger rerender');
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    createProfile(url);
  }, []);
  console.log(data);
  return (
    <View style={styles.container}>
      <View>
        {data.map((item) => {
          const { email, firstname, id, lastName, phone } = item;
          if (auth.currentUser.uid === id) {
            return (
              <View key={id}>
                <Text style={{ fontSize: 25 }}>Hello i am {firstname}</Text>
                <Text style={{ fontSize: 25 }}>Email: {email}</Text>
                <Text style={{ fontSize: 25 }}>phone: {phone}</Text>
              </View>
            );
          }
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 25,
    marginTop: 45,
    alignItems: 'center',
    fontSize: 25,
  },
});
export default Profile;
