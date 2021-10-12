import React from 'react';
import {View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Tabs from './Tabs';
import AboutStack from '../stacks/About.stack';
const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen name="Home" component={Tabs} />
      <Drawer.Screen name="About Us" component={AboutStack} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
