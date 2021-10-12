import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../layout/Profile.layout';
const ProfileStackScreen = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{headerShown: false}}>
      <Stack.Screen component={Profile} name="Profile" />
    </Stack.Navigator>
  );
};

export default ProfileStackScreen;
