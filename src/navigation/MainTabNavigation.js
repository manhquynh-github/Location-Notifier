import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import FavoriteScreen from '../screens/FavoriteScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ExploreStackNavigation from './ExploreStackNavigation';

export default createBottomTabNavigator(
  {
    Favorite: {
      screen: FavoriteScreen,
      navigationOptions: {
        title: 'Favorite',
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name='favorite'
            type='MaterialIcons' />
        ),
      },
    },
    Explore: {
      screen: ExploreStackNavigation,
      navigationOptions: {
        title: 'Explore',
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name='explore'
            type='MaterialIcons' />
        ),
      },
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        title: 'Settings',
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name='settings'
            type='MaterialIcons' />
        ),
      },
    }
  },
  {
    initialRouteName: 'Explore',
  }
);
