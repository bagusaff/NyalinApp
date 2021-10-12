import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import About from "../layout/About.layout";
const AboutStackScreen = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="About"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={About} name="About" />
    </Stack.Navigator>
  );
};

export default AboutStackScreen;
