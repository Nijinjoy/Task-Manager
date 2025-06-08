import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import DrawerScreen from '../screens/home/DrawerScreen';

const Drawer = createDrawerNavigator();

const AppDrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={props => <DrawerScreen {...props} />}
    screenOptions={{ headerShown: false }}
  >
    <Drawer.Screen name="Tabs" component={TabNavigator} />
  </Drawer.Navigator>
);

export default AppDrawerNavigator;
