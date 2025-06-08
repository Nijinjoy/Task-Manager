import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="HomeMain" component={HomeScreen} />
    {/* Add other home-related screens here */}
  </Stack.Navigator>
);

export default HomeStackNavigator;
