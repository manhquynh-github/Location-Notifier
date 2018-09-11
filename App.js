import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import HomePage from './ui/homepage';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <HomePage />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight,
  },
});
