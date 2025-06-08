import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import AuthNavigator from './AuthNavigator';
import AppDrawerNavigator from './AppDrawerNavigator';

const Stack = createNativeStackNavigator();

const MainStackNavigator = ({ isLoggedIn }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Splash is always first */}
      <Stack.Screen name="Splash" component={SplashScreen} />

      {/* If logged in, go to AppDrawer, else Auth */}
      {isLoggedIn ? (
        <Stack.Screen name="AppDrawer" component={AppDrawerNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
