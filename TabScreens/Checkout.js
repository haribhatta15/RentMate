import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextField,
  TextInput,
  View,
  Button,
  Linking,
} from 'react-native';
import { withOrientation } from 'react-navigation';
import { useGlobalContext } from '../Components/context';

const Checkout = () => {
  const { total } = useGlobalContext();
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv] = useState('');
  const onSubmit = () => {
    console.log('form submitted');
    Linking.openURL('https://www.paypal.com/au/home');
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25 }}>Payment Details</Text>
      <TextInput
        style={styles.textField}
        placeholder="Cardholder Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.textField}
        placeholder="Card Number"
        value={cardNumber}
        onChangeText={(text) => setCardNumber(text)}
      />
      <View style={styles.row}>
        <TextInput
          style={[
            styles.textField,
            {
              marginRight: 24,
            },
          ]}
          placeholder="Expiration Date"
          value={expiration}
          onChangeText={(text) => setExpiration(text)}
        />
        <TextInput
          style={styles.textField}
          placeholder="Security Code"
          value={cvv}
          onChangeText={(text) => setCvv(text)}
        />
      </View>
      <Button title={`PAY $${total}`} onPress={onSubmit} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 400,
    marginTop: 35,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 36,
  },
  textField: {
    flex: 1,
    height: 50,
    backgroundColor: 'white',
    marginTop: 24,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     margin: 25,
//     alignContent: 'center',
//   },
//   text: {},
// });
export default Checkout;
