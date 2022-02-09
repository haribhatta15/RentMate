import { StyleSheet, Text, ScrollView, View, Image } from 'react-native';
import React from 'react';

const SingleItem = ({ navigation, route }) => {
  const {
    itemTitle,
    itemCategory,
    itemDescription,
    itemPrice,
    itemImage,
    itemId,
  } = route.params;
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.displayImage} source={{ uri: `${itemImage}` }} />
        <View style={{ alignSelf: 'flex-start', margin: 15, fontSize: 50 }}>
          <Text style={{ fontSize: 15 }}>Title: {itemTitle}</Text>
          <Text style={{ fontSize: 15 }}>Category: {itemCategory}</Text>
          <Text style={{ fontSize: 15 }}>Description: {itemDescription}</Text>
          <Text style={{ fontSize: 15 }}>Price: {itemPrice}</Text>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginLeft: 20,
    borderRadius: 25,
    width: '90%',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  displayImage: {
    width: '95%',
    height: 300,
    marginTop: 25,
    borderRadius: 25,
  },
});
export default SingleItem;
