import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import FavoriteScreen from '../screens/FavoriteScreen';
import MainExploreScreen from '../screens/MainExploreScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Colors from '../constants/Colors';

export default createBottomTabNavigator(
  {
    Favorites: {
      screen: FavoriteScreen,
      navigationOptions: {
        title: 'Favorites',
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name="favorite" type="MaterialIcons" />
        ),
      },
    },
    MainExplore: {
      screen: MainExploreScreen,
      navigationOptions: {
        title: 'Main Explore',
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name="explore" type="MaterialIcons" />
        ),
      },
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        title: 'Settings',
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} name="settings" type="MaterialIcons" />
        ),
      },
    },
  },
  {
    initialRouteName: 'MainExplore',
    tabBarOptions: {
      style: {
        backgroundColor: Colors.tabBar,
        elevation: 10,
        borderTopWidth: 0,
      },
    },
  }
);
