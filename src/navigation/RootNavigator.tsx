// src/navigation/RootNavigator.tsx
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import AuthNavigator from './AuthNavigator';
import AppDrawerNavigator from './AppDrawerNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RootNavigator = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const initialize = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const token = await AsyncStorage.getItem('USER_TOKEN');
      setIsLoggedIn(!!token);
      setShowSplash(false);
    };
    initialize();
  }, []);

  if (showSplash) return <SplashScreen />;

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppDrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
