import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/EvilIcons.js';
import Icon2 from 'react-native-vector-icons/FontAwesome';

import HomeScreen from './screen/Home';
import LoginScreen from './screen/Login';
import RegisterScreen from './screen/Register';
import ProfileScreen from './screen/Profile';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator({ route }) {
  const { userData } = route.params;
  return (
      <Tab.Navigator initialRouteName='Home'
        screenOptions={{
          headerStyle: {backgroundColor: '#5958b2'},
          headerTitleStyle: {color: 'white'},
          tabBarStyle: { backgroundColor: '#5958b2'},
          tabBarActiveTintColor: 'gold',
          tabBarInactiveTintColor: 'white',
        }}
      >
        <Tab.Screen
          name="Home" initialParams={{ userData }} component={HomeScreen}
          options={{  headerShown: false,
          tabBarIcon: ({ color }) => <Icon2 name="home" size={30} color={color} />
          }}
        />
        <Tab.Screen
          name="Explore" component={HomeScreen} initialParams={{ userData }}
          options={{ headerShown: false,
            tabBarIcon: ({ color }) => <Icon2 name="wpexplorer" size={28} color={color} />
          }}
        />
        <Tab.Screen
          name="Search" component={HomeScreen} initialParams={{ userData }}
          options={{ headerShown: false,
        tabBarIcon: ({ color }) => <Icon name="search" size={30} color={color} />
          }}
        />
        <Tab.Screen name="Profile"component={ProfileScreen} initialParams={{ userData }}
          options={{tabBarIcon: ({ color }) => <Icon name="user" size={30} color={color} />,
          }}
        />
      </Tab.Navigator>
  )}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
        <Stack.Screen name='Login' component={LoginScreen}/>
        <Stack.Screen name='Home' component={TabNavigator}/>
        <Stack.Screen name='Register'component={RegisterScreen}/>
      </Stack.Navigator>
  </NavigationContainer>
  );
}