import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { auth } from '../user/config';
const Account = ({ navigation }) => {
  const data = [
    { key: 'Account' },
    { key: 'Rent History' },
    { key: 'Items Posted' },
    { key: 'Facourite List' },
    { key: 'Settings' },
    { key: 'Help' },
    { key: 'terms of Service' },
    { key: 'Sign Out' },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={[
          { key: 'Profile' },
          { key: 'Rent History' },
          { key: 'Items Posted' },
          { key: 'Favourite List' },
          { key: 'Settings' },
          { key: 'Help' },
          { key: 'Terms of Service' },
          { key: 'Sign Out' },
        ]}
        renderItem={({ item, index }) => {
          const press = (id) => {
            if (id == 0) {
              navigation.navigate('Profile');
            }
            if (id == 2) {
              navigation.navigate('Items Posted');
            }
            if (id == 3) {
              navigation.navigate('Favourite List');
            }
            if (id == 7) {
              auth.signOut().then(() => {
                navigation.navigate('Home');
              });
            }
          };
          return (
            <TouchableOpacity
              style={styles.smallbox}
              onPress={() => press(index)}
            >
              <Text key={index} style={styles.item}>
                {item.key}
              </Text>
              <Text style={styles.arrow}>
                <MaterialCommunityIcons
                  name="greater-than"
                  size={24}
                  color="black"
                />
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      {/* <Text>
        {data.map((item, index) => {
          return item.key;
        })}
      </Text> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 15,
  },
  item: {
    color: 'grey',
    fontSize: 16,
    marginLeft: 25,
    marginRight: 25,
    lineHeight: 55,
    flexGrow: 1,
  },
  smallbox: {
    borderStyle: 'solid',

    borderBottomWidth: 1,

    borderBottomColor: 'grey',
    margin: 0,
    display: 'flex',
    flexDirection: 'row',
  },
  arrow: {
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: 25,
  },
});
export default Account;
