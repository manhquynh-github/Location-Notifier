import { Dimensions, Platform, StatusBar } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  statusBarHeight: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
};
