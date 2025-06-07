import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import DrawerScreen from '../screens/home/DrawerScreen';

const Drawer = createDrawerNavigator();

const AppDrawerNavigator = () => (
  <Drawer.Navigator
    screenOptions={{ headerShown: false }}
    drawerContent={(props) => <DrawerScreen {...props} />}
  >
    <Drawer.Screen
      name="Root"
      component={TabNavigator}
      options={{ drawerItemStyle: { height: 0 } }}
    />
  </Drawer.Navigator>
);

export default AppDrawerNavigator;

