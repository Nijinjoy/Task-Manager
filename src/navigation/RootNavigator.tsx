import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainStackNavigator from './MainStackNavigator'

const RootNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      await new Promise(res => setTimeout(res, 3000)); // splash delay
      const token = await AsyncStorage.getItem('USER_TOKEN');
      setIsLoggedIn(!!token);
    };
    checkAuth();
  }, []);

  return (
    <NavigationContainer>
      <MainStackNavigator isLoggedIn={isLoggedIn} />
    </NavigationContainer>
  );
};

export default RootNavigator;
