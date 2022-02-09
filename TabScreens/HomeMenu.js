import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Button,
  RefreshControl,
  Pressable,
  Modal,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useGlobalContext } from '../Components/context';
import { dbR } from '../user/config';
import { ref, set } from 'firebase/database';
import { auth } from '../user/config';

const HomeMenu = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [added, setAdded] = useState(false);
  const [buttonName, setButtonName] = useState('Add to Cart');
  const [iconName, setIconName] = useState('staro');
  const {
    data,
    cart,
    createProduct,
    setCart,
    empty,
    setisEmpty,
    count,
    setCount,
  } = useGlobalContext();

  const url =
    'https://rent-mate-91f5c-default-rtdb.firebaseio.com/products.json';
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = () => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  };
  useEffect(() => {
    createProduct(url);
  }, [refreshing]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <View style={styles.view} onPress={() => Keyboard.dismiss()}>
          <TextInput style={styles.textbox} placeholder="Search item" />
          <TouchableOpacity>
            <AntDesign
              name="search1"
              size={24}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.box}>
          {data.map((item, index) => {
            const addtoCart = () => {
              console.log(item.id);
              const { id, title, imageUrl, price, category, description } =
                item;

              console.log(id);
              if (empty) {
                setAdded(true);
                setisEmpty(false);

                // setCart([{ id, title, imageUrl, price }]);
                set(ref(dbR, 'cart/' + id)),
                  {
                    title: title,
                    imageUrl: imageUrl,
                    price: price,
                  };
              } else {
                setAdded(true);
                // setCart([{ id, title, imageUrl, price }, ...cart]);
                set(ref(dbR, 'cart/' + id), {
                  id: id,
                  title: title,
                  imageUrl: imageUrl,
                  price: price,
                });
              }
            };

            // console.log(item);
            // console.log(cart);
            // {
            //   console.log(item.id);
            // }
            const singleOpen = () => {
              navigation.navigate('SingleItem', {
                itemImage: item.imageUrl,
                itemTitle: item.title,
                itemCategory: item.category,
                itemDescription: item.description,
                itemPrice: item.price,
                itemID: item.id,
              });
              console.log(item.id);
            };
            const button = () => {
              cart.map((ele) => {
                if (ele.id !== item.id) {
                  return true;
                } else {
                  return false;
                }
              });
            };
            const onPressIcon = () => {
              // setIconName('star');
              set(ref(dbR, 'favourite/' + item.id), {
                id: item.id,
                title: item.title,
                imageUrl: item.imageUrl,
                price: item.price,
                userId: auth.currentUser.uid,
              });
            };

            return (
              <View key={item.id} style={{ marginBottom: 25, marginTop: 25 }}>
                <Pressable onPress={singleOpen}>
                  <Image
                    style={styles.displayImage}
                    source={{ uri: `${item.imageUrl}` }}
                  />
                  <View
                    style={{
                      justifyContent: 'space-between',
                      maxWidth: 150,
                    }}
                  >
                    <Text style={styles.title}>Title: {item.category}</Text>
                    <Text style={styles.title}>Price: AU {item.price}$</Text>
                  </View>
                </Pressable>
                <TouchableOpacity onPress={onPressIcon}>
                  <AntDesign name={iconName} size={24} color="black" />
                </TouchableOpacity>

                <Button
                  title={'Add to cart'}
                  disabled={false}
                  style={{ backgroundColor: 'grey' }}
                  onPress={addtoCart}
                />
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  textbox: {
    backgroundColor: 'white',
    width: 280,
    height: 50,
    borderRadius: 10,
    paddingLeft: 25,
    borderColor: 'black',

    borderStartWidth: 5,
    borderStyle: 'solid',
    fontSize: 15,
  },
  view: {
    margin: 5,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  icon: {
    display: 'flex',
    alignSelf: 'center',
    marginTop: 15,
    marginLeft: -40,
    zIndex: 12,
  },
  title: {
    justifyContent: 'flex-end',
    color: 'grey',
    fontStyle: 'italic',
  },
  displayImage: {
    display: 'flex',
    height: 150,
    width: 150,
    borderRadius: 10,
  },
  box: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 45,
  },
  container: {
    margin: 25,
  },
});
export default HomeMenu;
