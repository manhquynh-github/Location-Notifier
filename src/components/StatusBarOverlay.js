import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import Colors from '../constants/Colors';

export default class StatusBarOverlay extends Component {
  render() {
    return <View style={styles.statusBar} />;
  }
}

const styles = StyleSheet.create({
  /**
   * Styles for the view behind the status bar.
   */
  statusBar: {
    height: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    backgroundColor: Colors.statusBarColor,
  },
});
