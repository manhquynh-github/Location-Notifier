import { createStackNavigator } from 'react-navigation';
import BottomTabNavigator from './BottomTabNavigator';
import DetailExploreScreen from '../screens/DetailExploreScreen';
import RingtoneScreen from '../screens/RingtoneScreen';

export default createStackNavigator(
  {
    MainScreen: {
      screen: BottomTabNavigator,
      navigationOptions: {
        title: 'Main Screen',
      },
    },
    DetailExplore: {
      screen: DetailExploreScreen,
      navigationOptions: {
        title: 'Explore Screen',
      },
    },
    Ringtone: {
      screen: RingtoneScreen,
      navigationOptions: {
        title: 'Ringtone Screen',
      },
    },
    // TODO EditFavoriteScreen, AlarmScreen
  },
  {
    initialRouteName: 'MainScreen',
    headerMode: 'none',
  }
);
