import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeMenu from '../TabScreens/HomeMenu';
import Account from '../TabScreens/Account';
import MyCart from '../TabScreens/MyCart';
import MyMessages from '../TabScreens/MyMessages';
import Post from '../TabScreens/Post';
import Ionicons from '@expo/vector-icons/Ionicons';
const Tab = createBottomTabNavigator();
const TabView = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeMenu') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart';
          } else if (route.name === 'Post') {
            iconName = focused ? 'add-circle-outline' : 'add';
          } else if (route.name === 'Messages') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles';
          } else if (route.name === 'Account') {
            iconName = focused ? 'settings' : 'settings';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="HomeMenu" component={HomeMenu} />
      <Tab.Screen name="Cart" component={MyCart} />
      <Tab.Screen name="Post" component={Post} />
      <Tab.Screen name="Messages" component={MyMessages} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default TabView;
