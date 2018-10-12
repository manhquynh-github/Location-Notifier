import { createStackNavigator } from 'react-navigation';
import { Platform, StatusBar } from 'react-native';
import MainExploreScreen from '../screens/MainExploreScreen';
import ExploreScreen from '../screens/ExploreScreen';

export default createStackNavigator(
  {
    MainExplore: {
      screen: MainExploreScreen,
      navigationOptions: {
        title: 'Main Explore',
      },
    },
    DetailExplore: {
      screen: ExploreScreen,
      navigationOptions: {
        title: 'Explore Screen',
      },
    }
  },
  {
    initialRouteName: 'MainExplore',
    cardStyle: {
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
    },
    headerMode: 'none',
  }
);
