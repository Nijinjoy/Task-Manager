import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';
import AddTaskScreen from '../screens/home/AddTaskScreen';
import ProfileScreen from '../screens/home/ProfileScreen';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator 
  screenOptions={{
    headerShown: false,
    tabBarActiveTintColor: '#4CAF50',
    tabBarInactiveTintColor: '#999',
    tabBarStyle: {
      backgroundColor: '#fff',
      height: 65,
      borderTopWidth: 0.5,
      borderTopColor: '#ddd',
      paddingBottom: 8,
      paddingTop: 5,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: '600',
    },
  }}
  >
     <Tab.Screen
        name="Tasks"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cube-outline" size={size} color={color} />
          ),
        }}
      />
            <Tab.Screen
        name="Add"
        component={AddTaskScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="add-circle-outline" size={size + 2} color={color} />
          ),
        }}
      />
           <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-circle" size={size} color={color} />
          ),
        }}
      />
  </Tab.Navigator>
);

export default TabNavigator;
