import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import RestaurantList from './src/screens/RestaurantList';
import RestaurantReview from './src/screens/RestaurantReview';
import ReviewList from './src/screens/ReviewList';

const Stack = createStackNavigator();

const App = () => {
  return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Restaurants" component={RestaurantList} />
        <Stack.Screen name="Review" component={RestaurantReview} />
        <Stack.Screen name="ReviewList" component={ReviewList} />
      </Stack.Navigator>
  );
};

export default App;
