import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../layout/Home.layout";
import Edit from "../layout/Edit.layout";

const HomeStackScreen = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={Home} name="Home" />
      <Stack.Screen component={Edit} name="Edit" />
    </Stack.Navigator>
  );
};

export default HomeStackScreen;
