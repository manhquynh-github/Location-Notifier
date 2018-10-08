import { createStackNavigator } from 'react-navigation';
import { Platform, StatusBar } from 'react-native';
import HomeScreen from '../screens/HomeScreen';

export default createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      title: 'Home',
      navigationOptions: {
        header: null,
      }
    },

    // TODO: Add Task Screen
  },
  {
    initialRouteName: 'Home',
    cardStyle: {
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
    }
  }
);
