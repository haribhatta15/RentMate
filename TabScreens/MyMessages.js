import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

const MyMessages = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>Please type you message here:</Text>
        <View style={{ flexDirection: 'row', height: 100, marginTop: 20 }}>
          <TextInput style={styles.box} placeholder="Type here..." />
          <Button style={{ height: 20, width: 300 }} title="Send" />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignContent: 'flex-end',
  },
  box: {
    backgroundColor: 'white',
    alignContent: 'flex-end',
    height: 100,
    width: 300,
    flex: 1,
  },
});
export default MyMessages;
