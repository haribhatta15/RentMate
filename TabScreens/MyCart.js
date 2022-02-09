import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  Button,
  LogBox,
} from 'react-native';
import { useGlobalContext } from '../Components/context';
import { dbR } from '../user/config';
import { ref, set, update, remove } from 'firebase/database';
import { AntDesign } from '@expo/vector-icons';

const MyCart = ({ navigation }) => {
  const { cart, empty, count, setCount, setCart, setIsEmpty, setTotal } =
    useGlobalContext();
  let url = 'https://rent-mate-91f5c-default-rtdb.firebaseio.com/cart.json';
  const fetchCart = async (url) => {
    try {
      const response = await fetch(url);
      const resData = await response.json();
      const result = Object.values(resData);

      if (result) {
        setCart(result);
      } else {
        <Text> No items in the Cart</Text>;
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCart(url);
  }, [navigation, cart]);
  console.log(cart);
  let totalvalue;
  if (!empty) {
    totalvalue = cart
      .map((item) => {
        const { price } = item;
        const value = price;
        console.log(value);
        return value;
      })
      .reduce((total, value) => {
        return total + parseInt(value);
      }, 0);
  }

  const removeItem = (id) => {
    // const filtered = cart.filter((item) => {
    //   item.id !== id;
    // });
    // setCart(filtered);
    let cartRef = remove(ref(dbR, 'cart/' + id));
    return cartRef;
  };
  const checkOut = () => {
    setTotal(totalvalue);
    navigation.navigate('Checkout');
  };

  return (
    <ScrollView>
      <View style={{ margin: 25 }}>
        {empty ? (
          <Text>No items in the Cart</Text>
        ) : (
          cart.map((item, index) => {
            console.log(item.id);
            const { id, title, imageUrl, price } = item;

            LogBox.ignoreAllLogs();
            return (
              <View key={index} style={styles.container}>
                <Image source={{ uri: `${imageUrl}` }} style={styles.image} />
                <Text style={styles.title}>{title}</Text>
                {/* <View style={styles.icons}>
                  <Pressable onPress={() => decreaseItem(id)}>
                    <AntDesign name="minuscircle" size={24} color="black" />
                  </Pressable>

                  <Text style={{ marginLeft: 15, marginRight: 15 }}>
                    {count}
                  </Text>
                  <Pressable onPress={() => addItem(id)}>
                    <AntDesign name="pluscircle" size={24} color="black" />
                  </Pressable>
                </View> */}
                <Text style={{ flexDirection: 'row', alignSelf: 'center' }}>
                  ${price}
                </Text>
                <Pressable
                  style={{ alignSelf: 'flex-end', marginRight: 15 }}
                  onPress={() => removeItem(id)}
                >
                  <Text>RemoveItem</Text>
                </Pressable>
              </View>
            );
          })
        )}
        <Text>Total : ${totalvalue}</Text>
      </View>
      {!empty ? (
        <Button style={styles.button} title="check out" onPress={checkOut} />
      ) : (
        <Button style={styles.button} title="check out" disabled={true} />
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 100,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    alignSelf: 'center',
    marginLeft: 15,
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
  },
  icons: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignSelf: 'center',
    flex: 1,
  },
  button: {
    width: '80%',
  },
});
export default MyCart;
