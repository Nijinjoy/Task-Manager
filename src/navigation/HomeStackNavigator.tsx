import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: '',  
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{ marginLeft: 10 }}>
            <MaterialIcons name="menu" size={28} />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen}   screenOptions={{
    headerShown: false, 
  }} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
