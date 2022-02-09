import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Modal,
} from 'react-native';
import React, { useState } from 'react';
import { useGlobalContext } from '../Components/context';
import { auth } from '../user/config';

const ItemsPosted = () => {
  const { data } = useGlobalContext();
  // const [modalVisible, setModalVisible] = useState(false);
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>Post History</Text>
        <View>
          {data.map((item, index) => {
            const { id, title, description, category, price, postedBy } = item;
            if (postedBy === auth.currentUser.uid) {
              return (
                <View style={styles.smallContainer}>
                  <View>
                    <Text>Title : {title}</Text>
                    <Text>Description : {description}</Text>
                    <Text>Category : {category}</Text>
                    <Text>Price : {price}</Text>
                  </View>
                  <Button title="Edit" />
                  {/* <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                  >
                    <Text>Title:{title}</Text>
                    <Text>Title:{description}</Text>
                    <Text>Title:{category}</Text>
                    <Text>Title:{price}</Text>
                  </Modal> */}
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
    marginTop: 50,
    marginHorizontal: 25,
    textAlign: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  smallContainer: {
    backgroundColor: 'white',
    // height: 100,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
});

export default ItemsPosted;
