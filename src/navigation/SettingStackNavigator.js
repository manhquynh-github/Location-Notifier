import { createStackNavigator } from 'react-navigation';
import { Platform, StatusBar } from 'react-native';
import SettingsScreen from '../screens/SettingsScreen';
import RingtoneSetting from '../screens/RingtoneSetting';

export default createStackNavigator(
  {
    MainSetting: {
      screen: SettingsScreen,
      navigationOptions: {
        title: 'Main Setting',
      },
    },
    RingtoneSetting: {
      screen: RingtoneSetting,
      navigationOptions: {
        title: 'Ringtone Setting',
      },
    },
  },
  {
    initialRouteName: 'MainSetting',
    headerMode: 'none',
  }
);
