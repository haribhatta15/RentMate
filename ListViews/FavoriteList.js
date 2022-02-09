import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from '../user/config';
const FavoriteList = () => {
  const [name, setName] = useState(auth.currentUser.displayName);
  const [data, setData] = useState([{}]);
  const url =
    'https://rent-mate-91f5c-default-rtdb.firebaseio.com/favourite.json';

  const createfavourite = async (url) => {
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
    createfavourite(url);
  }, []);
  console.log(data);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          {data.map((item) => {
            const { id, imageUrl, price, title, userId } = item;
            console.log(imageUrl);
            if (auth.currentUser.uid === userId) {
              return (
                <View
                  key={id}
                  style={{
                    backgroundColor: 'white',
                    marginBottom: 15,
                    paddingTop: 15,
                    borderRadius: 25,
                  }}
                >
                  <Image
                    style={styles.displayImage}
                    source={{ uri: `${imageUrl}` }}
                  />
                  <View
                    style={{
                      alignSelf: 'flex-start',
                      margin: 15,
                      fontSize: 50,
                    }}
                  >
                    <Text style={{ fontSize: 15 }}>Title: {title}</Text>
                    <Text style={{ fontSize: 15 }}>Price: {price}</Text>
                  </View>
                </View>
              );
            }
          })}
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 25,
    marginTop: 45,
    alignItems: 'center',
    fontSize: 25,
  },
  displayImage: {
    width: 300,
    height: 100,
    borderRadius: 25,
  },
});
export default FavoriteList;
