import React from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeStack from '../stacks/Home.stack';
import ProfileStack from '../stacks/Profile.stack';
import TransactionStack from '../stacks/Transaction.stack';
import NoteStack from '../stacks/Note.stack';

import IonIcon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: [
          {
            ...styles.shadow,
            height: 60,
            display: 'flex',
          },
        ],
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <IonIcon
                name={focused ? 'home' : 'home-outline'}
                style={{
                  color: '#2E3A59',
                }}
                size={25}
              />
              <Text style={{color: '#2E3A59', ...styles.text}}>Home</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={TransactionStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <IonIcon
                name={focused ? 'card' : 'card-outline'}
                style={{
                  color: '#2E3A59',
                }}
                size={25}
              />
              <Text style={{color: '#2E3A59', ...styles.text}}>
                Transaction
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Notes"
        component={NoteStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <IonIcon
                name={focused ? 'reader' : 'reader-outline'}
                style={{
                  color: '#2E3A59',
                }}
                size={25}
              />
              <Text style={{color: '#2E3A59', ...styles.text}}>Notes</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <IonIcon
                name={focused ? 'person-circle' : 'person-circle-outline'}
                style={{
                  color: '#2E3A59',
                }}
                size={25}
              />
              <Text style={{color: '#2E3A59', ...styles.text}}>Profile</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#192038',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
  },
});
