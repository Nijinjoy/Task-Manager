import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Tasks" component={HomeStackNavigator} />
    {/* Add more tabs like CompletedTasksScreen if needed */}
  </Tab.Navigator>
);

export default TabNavigator;
