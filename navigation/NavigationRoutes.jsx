import {StyleSheet} from 'react-native';
import React, { useCallback } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Home from '../screens/Home';
import Details from '../screens/Details';
import AddEdit from '../screens/AddEdit';

const Stack = createStackNavigator();

function NavigationRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={Login} />
      <Stack.Screen name="SignupScreen" component={Signup} />
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="DetailsScreen" component={Details} />
      <Stack.Screen name="AddEditScreen" component={AddEdit} />
    </Stack.Navigator>
  );
}

export default NavigationRoutes;

const styles = StyleSheet.create({});
