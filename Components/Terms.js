import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CheckBox from 'expo-checkbox';

const Terms = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [notifyCheckBox, setNotifyCheckBox] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.checkBox}>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
        />
        <Text style={{ marginLeft: 15 }}>
          I agree to the terms and conditions of use and Privacy Policy
        </Text>
      </View>
      <View style={styles.checkBox}>
        <CheckBox
          disabled={false}
          value={notifyCheckBox}
          onValueChange={(newValue) => setNotifyCheckBox(newValue)}
        />
        <Text style={{ marginLeft: 15 }}>
          Notify me on latest items and offers
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginVertical: 25,
    width: 300,
  },
  checkBox: {
    flexDirection: 'row',

    color: 'grey',
  },
});
export default Terms;
