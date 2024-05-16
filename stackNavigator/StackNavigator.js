import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import SavedScreen from '../screens/SavedScreen';
import BookingScreen from '../screens/BookingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HotelCitySearchScreen from '../screens/hotel/HotelCitySearchScreen';
import HotelHomeScreen from '../screens/hotel/HotelHomeScreen';
import FlightCitySearchScreen from '../screens/flight/FlightCitySearchScreen';
import FlightDestinationCitySearchScreen from '../screens/flight/FlightDestinationCitySearchScreen';
import FlightSearchResultScreen from '../screens/flight/FlightSearchResultScreen';
import FlightDeatailsScreen from '../screens/flight/FlightDeatailsScreen';

const StackNavigator = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            headerShown: false,
            tabBarLabelStyle: {fontSize: 15, fontWeight: 'bold'},
            tabBarIcon: ({focused}) =>
              focused ? (
                <Entypo name="home" size={25} color="#003580" />
              ) : (
                <AntDesign name="home" size={25} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Saved"
          component={SavedScreen}
          options={{
            tabBarLabel: 'Offer',
            headerShown: false,
            tabBarLabelStyle: {fontSize: 15, fontWeight: 'bold'},
            tabBarIcon: ({focused}) =>
              focused ? (
                <AntDesign name="heart" size={25} color="#003580" />
              ) : (
                <AntDesign name="hearto" size={25} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Bookings"
          component={BookingScreen}
          options={{
            tabBarLabel: 'Bookings',
            headerShown: false,
            tabBarLabelStyle: {fontSize: 15, fontWeight: 'bold'},
            tabBarIcon: ({focused}) =>
              focused ? (
                <MaterialCommunityIcons
                  name="bag-suitcase"
                  size={25}
                  color="#003580"
                />
              ) : (
                <MaterialCommunityIcons
                  name="bag-suitcase-outline"
                  size={25}
                  color="black"
                />
              ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Account',
            headerShown: false,
            tabBarLabelStyle: {fontSize: 15, fontWeight: 'bold'},
            tabBarIcon: ({focused}) =>
              focused ? (
                <Ionicons name="person" size={25} color="#003580" />
              ) : (
                <Ionicons name="person-outline" size={25} color="black" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  const TopTabs = createMaterialTopTabNavigator();

  /* function TopTabsGroup() {
    return (
      <TopTabs.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            textTransform: 'capitalize',
            fontWeight: 'bold',
          },
          tabBarIndicatorStyle: {
            height: 5,
            borderRadius: 5,
            backgroundColor: '#1DA1F2',
          },
        }}>
        <TopTabs.Screen
          name="main"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Feed',
          }}
        />
        <TopTabs.Screen name="Hotel" component={HotelHomeScreen} />

        <TopTabs.Screen name="Test" component={BookingScreen} />
      </TopTabs.Navigator>
    );
  } */

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeOverview"
          component={BottomTabs}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="FlightCitySearch"
          component={FlightCitySearchScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FlightDestinationCitySearch"
          component={FlightDestinationCitySearchScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FlightSearchResult"
          component={FlightSearchResultScreen}          
        />
        <Stack.Screen
          name="FlightDeatails"
          component={FlightDeatailsScreen}          
        />
        <Stack.Screen
          name="HotelCitySearch"
          component={HotelCitySearchScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HotelHome"
          component={HotelHomeScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
