import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class HomePage extends React.Component {
  render() {
    return (
      <View style={styles.page.container}>
        <Text>Home Page</Text>
      </View>
    );
  }
}

const styles = {
  page: StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
  }),
};
