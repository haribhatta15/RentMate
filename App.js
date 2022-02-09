// import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Components/Home';
import SignUp from './Components/SignUp';
import ForgetPassword from './Components/ForgetPassword';

import Input from './Components/Input';
import TabView from './navigation/TabView';
import { AppProvider } from './Components/context';
import ItemsPosted from './ListViews/ItemsPosted';
import Profile from './ListViews/Profile';
import Checkout from './TabScreens/Checkout';
import SingleItem from './TabScreens/SingleItem';
import FavoriteList from './ListViews/FavoriteList';
// const AppContainer = createAppContainer(Navigator);
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Input" component={Input} />
          <Stack.Screen name="Tab" component={TabView} />
          <Stack.Screen name="Items Posted" component={ItemsPosted} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="SingleItem" component={SingleItem} />
          <Stack.Screen name="Favourite List" component={FavoriteList} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
